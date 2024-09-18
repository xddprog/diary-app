from pydantic import UUID4

from .base import SqlAlchemyRepository
from database.models import Class, Teacher


class ClassRepository(SqlAlchemyRepository):
    model = Class

    async def update_class_teacher(self, class_id: UUID4, teacher_id: UUID4):
        cls = await self.session.get(self.model, class_id)
        teacher = await self.session.get(Teacher, teacher_id)
        cls.classroom_teacher = teacher
        await self.session.commit()
