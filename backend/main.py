from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer
import uvicorn
from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware

from api import *
from config import load_database_config
from utils.dependencies import get_current_user
from database.connection import DatabaseConnection
from database.test_db import init_classes


PROTECTED = Depends(get_current_user)


async def lifespan(app: FastAPI):
    # await init_classes()
    app.state.db_connection = DatabaseConnection(load_database_config())
    await app.state.db_connection.create_tables()
    app.state.security = HTTPBearer(auto_error=False)

    yield



app = FastAPI(openapi_url="/openapi.json", lifespan=lifespan)


app.include_router(auth_router)
app.include_router(teacher_router, dependencies=[PROTECTED])
app.include_router(subject_router, dependencies=[PROTECTED])
app.include_router(classes_router, dependencies=[PROTECTED])
app.include_router(student_router, dependencies=[PROTECTED])
app.include_router(manager_router, dependencies=[PROTECTED])


origins = ["http://localhost:5173", "http://127.0.0.1:5173"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request, exc: RequestValidationError
):
    print(exc)
    try:
        errors = []

        for error in exc.errors():
            field = error["loc"]
            input = error["input"]
            message = error["msg"]

            if isinstance(input, dict):
                input = input.get(field[-1])

            errors.append(
                {
                    "location": " -> ".join(field),
                    "detail": message,
                    "input": input,
                }
            )

        return JSONResponse(content=errors, status_code=422)
    except TypeError as e:
        print(e)
        return JSONResponse(
            status_code=422, content={"detail": "invalid json"}
        )


if __name__ == "__main__":
    uvicorn.run(app, port=5000)
