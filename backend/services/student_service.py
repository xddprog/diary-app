from pydantic import UUID4

from repositories.student import StudentRepository
from dto.marks import (
    AllSubjectsMarksModel,
    BaseMarkModel,
    QuarterMarksModel,
    SubjectYearModel,
)
from database.models import Student, Subject
from repositories.base import BaseRepository
from dto.student import (
    StudentDTO,
    StudentModel,
    AddStudentModel,
    StudentRatingModel,
    UpdateStudentModel,
)
import utils.errors.student_errors as errors


class StudentService:
    repository: StudentRepository

    def __init__(self, repository: BaseRepository):
        self.repository = repository

    @staticmethod
    async def model_dump(
        db_model: Student, dto_model: StudentDTO
    ) -> StudentDTO:
        return dto_model.model_validate(db_model, from_attributes=True)

    async def dump_students(
        self, students: list[Student], dto_model: StudentDTO = StudentModel
    ) -> list[StudentDTO]:
        return [
            await self.model_dump(student, dto_model) for student in students
        ]

    async def get_student(
        self,
        student_id: UUID4,
        dto_model: StudentDTO = None,
        dump: bool = False,
    ) -> Student | StudentDTO:
        student = await self.repository.get_one(student_id)
        return await self.model_dump(student, dto_model) if dump else student

    async def get_students_from_class(
        self, class_id: UUID4
    ) -> list[StudentModel]:
        students = await self.repository.get_by_attribute(
            self.repository.model.student_class, class_id
        )
        return await self.dump_students(students)

    async def delete_student(self, student_id: UUID4):
        await self.repository.delete(student_id)

    async def add_item(self, form: AddStudentModel):
        await self.repository.add_item(form)

    async def update_student(
        self, student_id: UUID4, update_data: UpdateStudentModel
    ) -> None:
        if update_data.student_class or update_data.subjects:
            return await self.repository.update_with_cls_and_subjects(
                student_id, update_data
            )
        return await self.repository.update(
            student_id, update_data.model_dump(exclude_none=True)
        )

    async def check_by_register_code(self, register_code) -> Student:
        student = await self.repository.get_by_attribute(
            self.repository.model.register_code, register_code
        )
        if not student:
            raise errors.StudentNotFoundError()
        return student

    async def update_registered(self, form: dict, student_id: UUID4) -> None:
        student = await self.repository.update(student_id, form)
        student = await self.repository.get_one(student_id)
        return student

    async def get_by_email(self, email: str) -> Student:
        return await self.repository.get_by_attribute(
            self.repository.model.email, email
        )

    @staticmethod
    async def filter_student_marks(
        student_id: UUID4, quarter: int, year: int, subject: Subject
    ) -> list[BaseMarkModel]:
        filter_func = lambda mark: [
            (mark.date.month - 1) // 3 + 1,
            mark.date.year,
            mark.student.id,
        ] == [quarter, year, student_id]
        filtered_marks = filter(filter_func, subject.marks)
        return list(
            map(
                lambda mark: BaseMarkModel.model_validate(
                    mark, from_attributes=True
                ),
                filtered_marks,
            )
        )

    async def get_all_student_marks(
        self, student_id: UUID4, year: int
    ) -> AllSubjectsMarksModel:
        subjects = await self.repository.get_all_student_marks(
            student_id, year
        )
        model = AllSubjectsMarksModel(subjects=[])

        for subject in subjects:
            subject_marks = [
                await self.filter_student_marks(
                    student_id, quarter, year, subject
                )
                for quarter in range(1, 5)
            ]
            all_quarter_models = []
            for marks in subject_marks:
                marks_values = [i.mark_value for i in marks]
                if len(marks_values) > 0:
                    quarter_model = QuarterMarksModel(
                        marks=marks,
                        average=round(sum(marks_values) / len(marks), 2),
                    )
                else:
                    quarter_model = QuarterMarksModel(
                        marks=marks, average=0.00
                    )
                all_quarter_models.append(quarter_model)

            all_marks = [
                mark.mark_value
                for quarter_model in all_quarter_models
                for mark in quarter_model.marks
            ]

            subject_model = SubjectYearModel(
                subject_name=subject.subject_name,
                first_quarter=all_quarter_models[0],
                second_quarter=all_quarter_models[1],
                third_quarter=all_quarter_models[2],
                fourth_quarter=all_quarter_models[3],
                average=round(sum(all_marks) / len(all_marks), 2),
            )

            model.subjects.append(subject_model)
        
        return model

    @staticmethod
    async def average_mark_with_subjects(
        student: list[Student], year: int, subjects: list[int]
    ) -> float:
        marks = [
            mark.mark_value
            for mark in student.marks
            if mark.subject.id in subjects and mark.date.year == year
        ]
        return round(sum(marks) / len(marks), 2) if marks else 0

    @staticmethod
    async def average_mark_without_filters(
        student: list[Student], year: int
    ) -> float:
        marks = [
            mark.mark_value for mark in student.marks if mark.date.year == year
        ]
        return round(sum(marks) / len(marks), 2) if marks else 0

    async def get_students_rating(
        self,
        subjects: list[int] | None,
        classes: list[UUID4] | None,
        year: int | None,
    ) -> list[StudentRatingModel]:
        students: list[Student] = await self.repository.get_all()
        rating = []

        for student in students:
            student_avg_mark = 0
            student_subjects = [subject.id for subject in student.subjects]

            if subjects and classes:
                if (
                    student.student_class
                    and student.student_class.id in classes
                    and any(
                        subject in student_subjects for subject in subjects
                    )
                ):
                    student_avg_mark = await self.average_mark_with_subjects(
                        student, year, subjects
                    )

            elif subjects:
                if any(subject in student_subjects for subject in subjects):
                    student_avg_mark = await self.average_mark_with_subjects(
                        student, year, subjects
                    )
            elif classes:
                if (
                    student.student_class
                    and student.student_class.id in classes
                ):
                    student_avg_mark = await self.average_mark_without_filters(
                        student, year
                    )
            else:
                student_avg_mark = await self.average_mark_without_filters(
                    student, year
                )

            if student_avg_mark != 0:
                rating.append(
                    StudentRatingModel(
                        name=student.name,
                        surname=student.surname,
                        middle_name=student.middle_name,
                        student_class=f"{student.student_class.class_number} {student.student_class.class_word}"
                        if student.student_class
                        else None,
                        average_mark=student_avg_mark,
                    )
                )

        rating.sort(key=lambda x: x.average_mark, reverse=True)

        return rating
