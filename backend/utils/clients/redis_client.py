from typing import Any

from redis import Redis

from config import load_redis_config


class RedisCache:
    def __init__(self) -> None:
        self.config = load_redis_config()
        self.redis: Redis = Redis(host=self.config.host, port=self.config.port)
        self.redis.flushdb()

    async def set_item(self, key: str, value: Any) -> None:
        self.redis.set(key, value)

    async def get_item(self, key: str) -> Any:
        return self.redis.get(key)

    async def delete_item(self, key: str) -> None:
        self.redis.delete(key)
