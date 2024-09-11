from .base import SqlAlchemyRepository
from database.models import Subject


class SubjectRepository(SqlAlchemyRepository):
    model = Subject
