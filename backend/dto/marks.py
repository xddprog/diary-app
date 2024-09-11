from pydantic import BaseModel


class BaseMarkModel(BaseModel):
    id: int
    mark_value: int


class QuarterMarksModel(BaseModel):
    marks: list[BaseMarkModel]
    average: float


class SubjectYearModel(BaseModel):
    subject_name: str
    first_quarter: QuarterMarksModel
    second_quarter: QuarterMarksModel
    third_quarter: QuarterMarksModel
    fourth_quarter: QuarterMarksModel
    average: float


class AllSubjectsMarksModel(BaseModel):
    subjects: list[SubjectYearModel]
