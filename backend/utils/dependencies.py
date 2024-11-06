from typing import Annotated, AsyncGenerator

from anyio.lowlevel import D
from fastapi import Depends, Request
from fastapi.security import HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession
from services.manager_service import ManagerService
from services.student_service import StudentService
from services.teacher_service import TeacherService
from utils.decorators.cache import CacheUser
from database.models import Manager, Student, Teacher
import services
import repositories


bearer = HTTPBearer(auto_error=False)


async def get_session(
    request: Request,
) -> AsyncGenerator[AsyncSession, None]:
    session: AsyncSession = await request.app.state.db_connection.get_session()
    try:
        yield session
    except Exception as exc:
        await session.rollback()
        raise exc
    finally:
        await session.close()


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


@CacheUser()
async def get_current_user(
    auth_service: Annotated[services.AuthService, Depends(get_auth_service)],
    token: Annotated[HTTPBearer, Depends(bearer)],
    teacher_service: Annotated[TeacherService, Depends(get_teacher_service)],
    student_service: Annotated[StudentService, Depends(get_student_service)],
    manager_service: Annotated[ManagerService, Depends(get_manager_service)],
) -> Student | Teacher | Manager:
    email, role = await auth_service.verify_token(token)
    if role == 1:
        user = await teacher_service.get_by_email(email)
    elif role == 2:
        user = await student_service.get_by_email(email)
    else:
        user = await manager_service.get_by_email(email)
    return str(user.id)
