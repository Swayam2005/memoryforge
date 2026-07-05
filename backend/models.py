from pydantic import BaseModel


class RememberRequest(BaseModel):
    text: str


class RecallRequest(BaseModel):
    query: str


class ForgetRequest(BaseModel):
    query: str