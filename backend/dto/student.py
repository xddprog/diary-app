from datetime import datetime
import email
from uuid import uuid4

from pydantic import BaseModel, UUID4, Field, field_validator
from dto.person import Person


class StudentModel(Person):
    pass


class AddStudentModel(StudentModel):
    id: UUID4 = Field(default_factory=lambda: uuid4())
    student_class: UUID4


class UpdateStudentModel(BaseModel):
    name: str | None = None
    surname: str | None = None
    middle_name: str | None = None
    age: int | None = None
    student_class: UUID4 | None = None
    subjects: list[int] | None = None
    email: str | None = None
    vk: str | None = None
    telegram: str | None = None


class StudentRatingModel(BaseModel):
    name: str
    surname: str
    middle_name: str
    student_class: str | None
    average_mark: float


class GetRatingForm(BaseModel):
    subjects: list[int] | None = None
    classes: list[UUID4] | None = None
    year: int | None

    @field_validator("year")
    def validate_year(cls, v):
        return datetime.now().year if not v else v


type StudentDTO = (
    StudentModel
    | UpdateStudentModel
    | AddStudentModel
    | StudentRatingModel
    | GetRatingForm
)
