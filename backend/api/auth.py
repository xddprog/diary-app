from typing import Annotated

from fastapi import APIRouter, Depends, Header
from fastapi.security import HTTPBearer

from dto.auth import RegisterModel, LoginModel, TokenModel
from services import (
    AuthService,
    TeacherService,
    StudentService,
    ManagerService,
)
from utils.dependencies import (
    get_auth_service,
    get_current_user,
    get_teacher_service,
    get_student_service,
    get_manager_service,
)


router = APIRouter(
    tags=["auth"],
    prefix="/auth",
)


@router.post("/register")
async def register_user(
    form: RegisterModel,
    auth_service: Annotated[AuthService, Depends(get_auth_service)],
    teacher_service: Annotated[TeacherService, Depends(get_teacher_service)],
    student_service: Annotated[StudentService, Depends(get_student_service)],
    manager_service: Annotated[ManagerService, Depends(get_manager_service)],
):
    if form.role == 1:
        service = teacher_service
    elif form.role == 2:
        service = student_service
    else:
        service = manager_service
    user = await service.check_by_register_code(form.register_code)
    token = await auth_service.register_user(form, user.registered)

    form.registered = True
    form = form.model_dump(exclude_none=True)

    user = await service.update_registered(form, user.id)
    return TokenModel(token=token, user_role=user.role, user_id=user.id)


@router.post("/login")
async def create_access_token(
    form: LoginModel,
    auth_service: Annotated[AuthService, Depends(get_auth_service)],
    teacher_service: Annotated[TeacherService, Depends(get_teacher_service)],
    student_service: Annotated[StudentService, Depends(get_student_service)],
    manager_service: Annotated[ManagerService, Depends(get_manager_service)],
):
    if form.role == 1:
        user = await teacher_service.get_by_email(form.email)
    elif form.role == 2:
        user = await student_service.get_by_email(form.email)
    else:
        user = await manager_service.get_by_email(form.email)
    token = await auth_service.login_user(form.email, form.password, user)
    return TokenModel(token=token, user_role=user.role, user_id=user.id)


@router.get("/check")
async def check_current_user(token_data=Depends(get_current_user)) -> bool:
    return True
