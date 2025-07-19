from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Table, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

user_favorites = Table(
    'user_favorites',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('podcast_id', Integer, ForeignKey('podcasts.id'), primary_key=True)
)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(String, unique=True, index=True)  # ID пользователя в Telegram
    username = Column(String, nullable=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    language_code = Column(String, default="en")
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    favorite_podcasts = relationship("Podcast", secondary=user_favorites, back_populates="favorited_by")


class Podcast(Base):
    __tablename__ = "podcasts"

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(String, index=True)  # groupId_messageId для доступа к файлу в Telegram
    name = Column(String, index=True)
    description = Column(Text)
    image = Column(String)  # URL изображения
    audio = Column(String, nullable=True)  # URL аудио или null если в Telegram
    duration = Column(String)  # Продолжительность в формате "1:55"
    language = Column(String, index=True)  # Язык подкаста
    category = Column(Integer, index=True)  # ID категории
    available = Column(Integer, default=1)  # 0 - только в Telegram, 1 - доступен на сайте
    tags = Column(String, nullable=True)  # JSON строка с тегами
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    # Связь с пользователями которые добавили в избранное
    favorited_by = relationship("User", secondary=user_favorites, back_populates="favorite_podcasts")


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=func.now())


class UserAction(Base):
    __tablename__ = "user_actions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    podcast_id = Column(Integer, ForeignKey("podcasts.id"))
    action_type = Column(String)  # "add_favorite", "remove_favorite", "play", etc.
    source = Column(String)  # "website", "telegram"
    created_at = Column(DateTime, default=func.now())

    user = relationship("User")
    podcast = relationship("Podcast")