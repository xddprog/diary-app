from pydantic import UUID4

from database.models import Student
from repositories.base import BaseRepository
from dto.student import StudentDTO, StudentModel, AddStudentModel, UpdateStudentModel
import utils.errors.student_errors as errors


class StudentService:
    def __init__(self, repository: BaseRepository):
        self.repository = repository

    @staticmethod
    async def model_dump(db_model: Student, dto_model: StudentDTO) -> StudentDTO:
        return dto_model.model_validate(db_model, from_attributes=True)

    async def dump_students(self, students: list[Student], dto_model: StudentDTO = StudentModel) -> list[StudentDTO]:
        return [await self.model_dump(student, dto_model) for student in students]

    async def get_student(
        self,
        student_id: UUID4,
        dto_model: StudentDTO = None,
        dump: bool = False
    ) -> Student | StudentDTO:
        student = await self.repository.get_one(student_id)
        return await self.model_dump(student, dto_model) if dump else student

    async def get_students_from_class(self, class_id: UUID4) -> list[StudentModel]:
        students = await self.repository.get_by_attribute(self.repository.model.student_class, class_id)
        return await self.dump_students(students)

    async def delete_student(self, student_id: UUID4):
        await self.repository.delete(student_id)

    async def add_student(self, form: AddStudentModel):
        await self.repository.add_item(form.model_dump())

    async def update_student(self, student_id: UUID4, update_data: UpdateStudentModel) -> None:
        if update_data.student_class or update_data.subjects:
            return await self.repository.update_with_cls_and_subjects(student_id, update_data)
        return await self.repository.update(student_id,  update_data.model_dump(exclude_none=True))

    async def check_by_register_code(self, register_code) -> Student:
        student = await self.repository.get_by_attribute(self.repository.model.register_code, register_code)
        if not student:
            raise errors.StudentNotFoundError()
        return student

    async def update_registered(self, form: dict, student_id: UUID4) -> None:
        await self.repository.update(student_id, form)

    async def get_by_email(self, email: str) -> Student:
        return await self.repository.get_by_attribute(self.repository.model.email, email)
