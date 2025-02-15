from abc import ABC, abstractmethod

from pydantic import UUID4
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from database.models import TypeModels


class BaseRepository(ABC):
    @abstractmethod
    async def get_one(self, item_id: int | UUID4):
        raise NotImplementedError

    @abstractmethod
    async def get_all(self):
        raise NotImplementedError

    @abstractmethod
    async def get_by_attribute(self, attribute, value: str | UUID4):
        raise NotImplementedError

    @abstractmethod
    async def add_item(self, form):
        raise NotImplementedError

    @abstractmethod
    async def delete(self, item_id: int | UUID4):
        raise NotImplementedError

    @abstractmethod
    async def update(self, item_id: int | UUID4, kwargs):
        raise NotImplementedError

    @abstractmethod
    async def update_by_attribute(self, item_id: UUID4, attribute, value):
        raise NotImplementedError


class SqlAlchemyRepository(BaseRepository):
    model: TypeModels = None

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_one(self, item_id: int | UUID4) -> model:
        item = await self.session.get(self.model, item_id)
        return item

    async def get_all(self):
        query = select(self.model)
        items = await self.session.execute(query)
        return items.unique().scalars().all()

    async def get_by_attribute(self, attribute, value: str | UUID4) -> model:
        query = select(self.model).where(attribute == value)
        item = await self.session.execute(query)
        return item.scalars().first()

    async def add_item(self, form):
        item = self.model(**form)
        self.session.add(item)
        await self.session.commit()
        return item

    async def delete(self, item_id: int | UUID4) -> None:
        deleting_item = await self.session.get(self.model, item_id)
        await self.session.delete(deleting_item)
        await self.session.commit()

    async def update(self, item_id: int, kwargs):
        query = (
            update(self.model)
            .where(self.model.id == item_id)
            .values(kwargs)
            .returning(self.model)
        )

        item = await self.session.execute(query)
        item = item.scalar_one_or_none()
        await self.session.commit()
        await self.session.refresh(item)

        return item

    async def update_by_attribute(
        self, item_id: UUID4, attribute, value: str | UUID4
    ):
        query = (
            update(self.model)
            .where(self.model.id == item_id)
            .values({attribute: value})
        )
        item = await self.session.execute(query)
        await self.session.commit()
        return item
