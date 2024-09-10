from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import UUID4
from starlette import status

from dto.teacher import BaseTeacherModel, NewTeacherModel, UpdateTeacherModel
from services import SubjectService
from services.teacher_service import TeacherService
from utils.dependencies import get_teacher_service, get_subject_service, get_auth_service

router = APIRouter(
    prefix="/teachers",
    tags=["teacher"]
)


@router.get('/free')
async def get_all_teachers(
    teacher_service: Annotated[TeacherService, Depends(get_teacher_service)]
) -> list[BaseTeacherModel]:
    teachers = await teacher_service.get_free_teachers()
    return await teacher_service.dump_teachers(teachers)


@router.get('/{subject_id}')
async def get_teachers_from_subject(
    subject_id: int,
    teacher_service: Annotated[TeacherService, Depends(get_teacher_service)],
    subject_service: Annotated[SubjectService, Depends(get_subject_service)]
) -> list[BaseTeacherModel]:
    subject = await subject_service.get_subject(subject_id, dump=False)
    teachers = await teacher_service.dump_teachers(subject.teachers)
    return teachers


@router.delete('/{teacher_id}')
async def delete_teacher(
    teacher_id: UUID4,
    teacher_service: Annotated[TeacherService, Depends(get_teacher_service)]
) -> JSONResponse:
    await teacher_service.delete_teacher(teacher_id)
    return JSONResponse(
        status_code=200,
        content={
            "message": "Teacher deleted successfully"
        }
    )


@router.post('/add')
async def add_teacher(
    form: NewTeacherModel,
    teacher_service: Annotated[TeacherService, Depends(get_teacher_service)],
    subject_service: Annotated[SubjectService, Depends(get_subject_service)]
) -> JSONResponse:
    form.subjects = [await subject_service.get_subject(form.subjects)]
    await teacher_service.add_teacher(form)
    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content={'message': 'Teacher added successfully'}
    )


@router.put('/{teacher_id}')
async def update_teacher(
    teacher_id: UUID4,
    form: UpdateTeacherModel,
    teacher_service: Annotated[TeacherService, Depends(get_teacher_service)]
) -> JSONResponse:
    await teacher_service.update_teacher(teacher_id, form)
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={'message': 'Teacher edit successfully'}
    )
