from pydantic import UUID4
from sqlalchemy import update

from .base import SqlAlchemyRepository
from database.models import Teacher, Subject


class TeacherRepository(SqlAlchemyRepository):
    model = Teacher

    async def update(self, teacher_id: UUID4, update_data: dict) -> None:
        subjects = update_data.get("subjects")

        if subjects:
            teacher = await self.session.get(Teacher, teacher_id)
            new_subjects = [
                await self.session.get(Subject, subject_id)
                for subject_id in update_data.subjects
            ]
            teacher.subjects = new_subjects
            update_data.subjects = None
            await self.session.commit()

        if update_data:
            query = (
                update(self.model)
                .where(self.model.id == teacher_id)
                .values(**update_data)
            )
            await self.session.execute(query)
            await self.session.commit()

    #
    # async def get_by_register_code(self, register_code):
    #     async with self.session_factory() as session:
    #         query = select(Teacher).where(Teacher.register_code == register_code)
    #         teachers = await session.execute(query)
    #         return teachers.scalar_one()
