from pydantic import BaseModel, Field, field_serializer
from typing import Optional, List
from datetime import datetime


class PodcastBase(BaseModel):
    telegram_id: Optional[str] = None
    name: str
    description: Optional[str] = None
    image: Optional[str] = None
    audio: Optional[str] = None
    duration: Optional[str] = None
    language: str
    category: int
    available: int = Field(default=1, ge=0, le=1)
    tags: Optional[str] = None


class PodcastCreate(PodcastBase):
    pass


class PodcastUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    audio: Optional[str] = None
    duration: Optional[str] = None
    language: Optional[str] = None
    category: Optional[int] = None
    available: Optional[int] = Field(None, ge=0, le=1)
    tags: Optional[str] = None


class PodcastResponse(PodcastBase):
    id: int
    created_at: datetime
    Id: int = Field(alias="id")

    @field_serializer('audio')
    def serialize_audio(self, audio: str | None, _info):
        if audio is None:
            return None
        return f"/v1/audio/{audio}"  # Автоматическое преобразование в полный URL

    class Config:
        from_attributes = True
        populate_by_name = True

class PodcastListResponse(BaseModel):
    items: List[PodcastResponse]
    pages: int

class UserBase(BaseModel):
    telegram_id: str
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    language_code: str = "en"


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    language_code: Optional[str] = None


class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryResponse(CategoryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class UserActionCreate(BaseModel):
    user_id: int
    podcast_id: int
    action_type: str
    source: str = "website"


class UserActionResponse(UserActionCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True