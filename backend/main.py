from fastapi.responses import FileResponse
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import models
import schemas
from backend import crud
from backend.database import SessionLocal, engine
from contextlib import asynccontextmanager

models.Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starting up...")
    yield
    # Shutdown
    print("Shutting down...")


app = FastAPI(
    title="Podcast API",
    description="API для управления подкастами с интеграцией Telegram",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Podcast API is running"}


@app.get("/v1/podcasts", response_model=schemas.PodcastListResponse)
async def get_podcasts(
        language: Optional[str] = Query(None, description="Язык подкастов"),
        category: Optional[int] = Query(None, description="ID категории"),
        available: Optional[int] = Query(None, description="Доступность (0/1)"),
        page: int = Query(1, ge=1, description="Номер страницы"),
        limit: int = Query(9, ge=1, le=100, description="Количество на странице"),
        db: Session = Depends(get_db)
):

    result = crud.get_podcasts(
        db=db,
        language=language,
        category=category,
        available=available,
        page=page,
        limit=limit
    )
    items = []
    for podcast in result["items"]:
        podcast_dict = {
            "id": podcast.id,
            "telegram_id": podcast.telegram_id,
            "name": podcast.name,
            "description": podcast.description,
            "image": podcast.image,
            "audio": podcast.audio,
            "duration": podcast.duration,
            "language": podcast.language,
            "category": podcast.category,
            "available": podcast.available,
            "tags": podcast.tags,
            "created_at": podcast.created_at,
            "Id": podcast.id
        }
        items.append(podcast_dict)

    return {
        "items": items,
        "pages": result["pages"]
    }


@app.get("/v1/podcasts/{podcast_id}", response_model=schemas.PodcastResponse)
async def get_podcast(podcast_id: int, db: Session = Depends(get_db)):
    """Получение подкаста по ID"""
    podcast = crud.get_podcast(db=db, podcast_id=podcast_id)
    if not podcast:
        raise HTTPException(status_code=404, detail="Подкаст не найден")
    return podcast


@app.post("/v1/podcasts", response_model=schemas.PodcastResponse)
async def create_podcast(
        podcast: schemas.PodcastCreate,
        db: Session = Depends(get_db)
):
    return crud.create_podcast(db=db, podcast=podcast)


@app.put("/v1/podcasts/{podcast_id}", response_model=schemas.PodcastResponse)
async def update_podcast(
        podcast_id: int,
        podcast: schemas.PodcastUpdate,
        db: Session = Depends(get_db)
):
    updated_podcast = crud.update_podcast(db=db, podcast_id=podcast_id, podcast=podcast)
    if not updated_podcast:
        raise HTTPException(status_code=404, detail="Подкаст не найден")
    return updated_podcast


@app.delete("/v1/podcasts/{podcast_id}")
async def delete_podcast(podcast_id: int, db: Session = Depends(get_db)):
    """Удаление подкаста"""
    success = crud.delete_podcast(db=db, podcast_id=podcast_id)
    if not success:
        raise HTTPException(status_code=404, detail="Подкаст не найден")
    return {"message": "Подкаст удален"}



# Получение избранных подкастов пользователя
@app.get("/v1/users/{user_id}/favorites", response_model=List[schemas.PodcastResponse])
async def get_user_favorites(
        user_id: int,
        db: Session = Depends(get_db)
):
    # TODO: Добавить проверку авторизации пользователя
    return crud.get_user_favorites(db=db, user_id=user_id)


@app.post("/v1/users/{user_id}/favorites/{podcast_id}")
async def add_to_favorites(
        user_id: int,
        podcast_id: int,
        db: Session = Depends(get_db)
):
    # TODO: Добавить проверку авторизации пользователя
    # TODO: Добавить интеграцию с Telegram API для синхронизации
    success = crud.add_to_favorites(db=db, user_id=user_id, podcast_id=podcast_id)
    if not success:
        raise HTTPException(status_code=400, detail="Не удалось добавить в избранное")
    return {"message": "Подкаст добавлен в избранное"}


@app.delete("/v1/users/{user_id}/favorites/{podcast_id}")
async def remove_from_favorites(
        user_id: int,
        podcast_id: int,
        db: Session = Depends(get_db)
):
    # TODO: Добавить проверку авторизации пользователя
    # TODO: Добавить интеграцию с Telegram API для синхронизации
    success = crud.remove_from_favorites(db=db, user_id=user_id, podcast_id=podcast_id)
    if not success:
        raise HTTPException(status_code=404, detail="Подкаст не найден в избранном")
    return {"message": "Подкаст удален из избранного"}



@app.post("/v1/users", response_model=schemas.UserResponse)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Создание нового пользователя"""
    existing_user = crud.get_user_by_telegram_id(db, user.telegram_id)
    if existing_user:
        return existing_user

    return crud.create_user(db=db, user=user)


@app.get("/v1/users/telegram/{telegram_id}", response_model=schemas.UserResponse)
async def get_user_by_telegram_id(telegram_id: str, db: Session = Depends(get_db)):
    """Получение пользователя по Telegram ID"""
    user = crud.get_user_by_telegram_id(db=db, telegram_id=telegram_id)
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return user



@app.post("/webhook/telegram")
async def telegram_webhook(update: dict):
    """
    Webhook для получения обновлений от Telegram бота
    TODO: Добавить обработку команд бота и синхронизацию избранного
    """
    # TODO: Обработать обновления от Telegram
    # TODO: Синхронизировать избранное между сайтом и Telegram
    return {"ok": True}



@app.get("/v1/telegram/audio/{telegram_id}")
async def get_telegram_audio(telegram_id: str):
    """
    Получение аудиофайла из Telegram по telegram_id
    TODO: Реализовать получение файла через Telegram Bot API
    """
    # TODO: Реализовать получение файла из Telegram
    # telegram_id формат: groupId_messageId
    return {"message": "TODO: Implement Telegram audio fetch"}


# @app.get("/v1/categories", response_model=List[schemas.CategoryResponse])
# async def get_categories(db: Session = Depends(get_db)):
#     """Получение всех категорий"""
#     return crud.get_categories(db=db)
#
#
# @app.post("/v1/categories", response_model=schemas.CategoryResponse)
# async def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
#     """Создание новой категории"""
#     return crud.create_category(db=db, category=category)


@app.get("/v1/audio/{filename}")
async def get_audio_file(filename: str):
    audio_path = os.path.join("../data", filename)

    if not os.path.exists(audio_path):
        raise HTTPException(status_code=404, detail="Аудиофайл не найден")

    return FileResponse(audio_path, media_type="audio/mpeg")




if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
