from pydantic import UUID4

import utils.errors.manager_errors as errors
from database.models import Manager
from repositories.base import BaseRepository


class ManagerService:
    def __init__(self, repository: BaseRepository):
        self.repository = repository

    async def update_registered(self, form: dict, manager_id: UUID4):
        manager = await self.repository.update(manager_id, form)

    async def check_by_register_code(self, register_code) -> Manager:
        manager = await self.repository.get_by_attribute(
            self.repository.model.register_code, register_code
        )
        if not manager:
            return errors.ManagerNotFoundError()
        return manager

    async def get_by_email(self, email: str) -> Manager:
        return await self.repository.get_by_attribute(
            self.repository.model.email, email
        )
    
    async def add_item(self, form: dict):
        return await self.repository.add_item(form)