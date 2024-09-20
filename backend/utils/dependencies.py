from typing import Annotated

from anyio.lowlevel import D
from fastapi import Depends, Request
from fastapi.security import HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession
from database.models import Manager, Student, Teacher
import services
import repositories


bearer = HTTPBearer(auto_error=False)


async def get_session(request: Request) -> AsyncSession:
    return await request.app.state.db_connection.get_session()


async def get_class_service(session: Annotated[AsyncSession, Depends(get_session)]):
    return services.ClassService(repositories.ClassRepository(session=session))


async def get_teacher_service(session: Annotated[AsyncSession, Depends(get_session)]):
    return services.TeacherService(repositories.TeacherRepository(session=session))


async def get_subject_service(session: Annotated[AsyncSession, Depends(get_session)]):
    return services.SubjectService(repositories.SubjectRepository(session=session))


async def get_student_service(session: Annotated[AsyncSession, Depends(get_session)]):
    return services.StudentService(repositories.StudentRepository(session=session))


async def get_auth_service():
    return services.AuthService()


async def get_manager_service(session: Annotated[AsyncSession, Depends(get_session)]):
    return services.ManagerService(repositories.ManagerRepository(session=session))


async def get_schedule_service(session: Annotated[AsyncSession, Depends(get_session)]):
    return services.ScheduleService(repositories.ScheduleRepository(session=session))



async def get_current_user(
    auth_service: Annotated[services.AuthService, Depends(get_auth_service)],
    token: Annotated[HTTPBearer, Depends(bearer)],
) -> Student | Teacher | Manager:
    payload = await auth_service.verify_token(token)
    return payload
