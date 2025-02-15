from functools import wraps
from typing import Callable
from services.auth_service import AuthService
from utils.clients.redis_client import RedisCache


class CacheUser(RedisCache):
    def __call__(self, func: Callable):
        @wraps(func)
        async def wrapper(*args, **kwargs) -> str:
            auth_service: AuthService = kwargs.get("auth_service")
            email, role = await auth_service.verify_token(kwargs.get("token"))
            user = await self.get_item(email)

            if user:
                return user.decode()

            result = await func(*args, **kwargs)
            await self.set_item(email, result)
            return result

        return wrapper
