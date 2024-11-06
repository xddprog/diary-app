from pydantic import UUID4
from sqlalchemy import select, delete
from sqlalchemy.orm import selectinload

from dto.student import UpdateStudentModel
from .base import SqlAlchemyRepository
from database.models import Student, Class, Subject


class StudentRepository(SqlAlchemyRepository):
    model = Student

    async def get_students_from_class(self, class_id: UUID4):
        query = select(Student).where(Student.class_fk == class_id)
        students = await self.session.execute(query)
        return students.scalars().all()

    async def delete(self, item_id: UUID4) -> None:
        query = (
            select(self.model)
            .where(self.model.id == item_id)
            .options(
                selectinload(self.model.marks),
                selectinload(self.model.subjects),
            )
        )

        student = await self.session.execute(query)
        student = student.scalar_one()
        student.subjects = []

        for mark in student.marks:
            await self.session.delete(mark)

        await self.session.commit()

        query = delete(self.model).where(self.model.id == item_id)
        await self.session.execute(query)
        await self.session.commit()

    async def update_with_cls_and_subjects(
        self, item_id: UUID4, update_data: UpdateStudentModel
    ) -> None:
        student = await self.session.get(Student, item_id)
        if update_data.student_class:
            cls = await self.session.get(Class, update_data.student_class)
            student.student_class = cls
        if update_data.subjects:
            for subject_id in update_data.subjects:
                subject = await self.session.get(Subject, subject_id)
                student.subjects.append(subject)
        await self.session.commit()

    async def get_all_student_marks(self, student_id: UUID4, year: int):
        query = select(Subject).where(Subject.students.has(id=student_id))
        subjects = await self.session.execute(query)
        return subjects.scalars().all()

    # async def get_students_rating(
    #     self,
    #     subjects: list[int] | None,
    #     classes: list[UUID4] | None,
    #     year: int | None,
    # ) -> list[Student]:
    #     async with self.session_factory() as session:
    #         query = select(Mark).join(Student).group_by(Student)
    #         if classes and subjects:
    #             query = query.where(
    #                 Mark.id,
    #                 Student.class_fk.in_(classes),
    #                 OVERLAP(Student.subjects, array(subjects)),
    #                 extract("year", Mark.date) == year,
    #             )
    #         elif subjects:
    #             query = query.where(
    #                 Mark.id,
    #                 OVERLAP(Student.subjects, array(subjects)),
    #                 extract("year", Mark.date) == year
    #             )
    #         elif classes:
    #             query = query.where(
    #                 Mark.id,
    #                 Student.class_fk.in_(classes),
    #                 extract("year", Mark.date) == year,
    #             )
    #         students = await session.execute(query)
    #         return students.scalars().all()
