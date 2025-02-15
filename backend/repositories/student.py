from pydantic import UUID4
from sqlalchemy import ARRAY, and_, extract, func, select, delete
from sqlalchemy.orm import selectinload
from sqlalchemy.dialects.postgresql.operators import OVERLAP
from sqlalchemy.dialects.postgresql.array import array

from dto.student import UpdateStudentModel
from .base import SqlAlchemyRepository
from database.models import Mark, Student, Class, Subject


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

    async def get_students_rating(
        self,
        subjects: list[int] | None,
        classes: list[UUID4] | None,
        year: int | None,
    ) -> list[Student]:
        query = (
            select(Student, func.avg(Mark.mark_value).label("average_mark"))
            .join(Mark, Student.id == Mark.student_fk)
            .options(selectinload(Student.marks))
            .group_by(Student.id)
        )
        where_clauses = []
        if subjects:
            where_clauses.append(Student.subjects.any(Subject.id.in_(subjects)))
        if classes:
            where_clauses.append(Student.class_fk.in_(classes))
        if year:
            where_clauses.append(extract("year", Mark.date) == year)

        if where_clauses:
            query = query.where(*where_clauses)

        students = await self.session.execute(query)
        return students
