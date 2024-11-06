from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

from config import DatabaseConfig
from database.models import Base


class DatabaseConnection:
    def __init__(self, config: DatabaseConfig):
        self._engine = create_async_engine(
            url=f"postgresql+asyncpg://{config.db_user}:{config.db_pass}"
            f"@{config.db_host}:{config.db_port}/{config.db_name}",
            pool_size=100,
        )

    async def get_session(self) -> AsyncSession:
        return AsyncSession(bind=self._engine)

    async def create_tables(self):
        async with self._engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
