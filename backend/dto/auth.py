from uuid import uuid4
from pydantic import BaseModel, UUID4, Field


class RegisterModel(BaseModel):
    role: int
    register_code: UUID4
    email: str
    hashed_password: str
    vk: str | None = None
    telegram: str | None = None
    registered: bool = False


class LoginModel(BaseModel):
    role: int
    email: str
    password: str


class TokenModel(BaseModel):
    token: str
    user_role: int
    user_id: UUID4
