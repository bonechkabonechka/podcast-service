from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
import models
import schemas


def get_podcasts(
        db: Session,
        language: Optional[str] = None,
        category: Optional[int] = None,
        available: Optional[int] = None,
        page: int = 1,
        limit: int = 9
) -> dict:
    query = db.query(models.Podcast)

    if language:
        query = query.filter(models.Podcast.language == language)
    if category is not None and category > 0:
        query = query.filter(models.Podcast.category == category)
    if available is not None:
        query = query.filter(models.Podcast.available == available)

    total = query.count()
    pages = (total + limit - 1) // limit

    # Пагинация
    offset = (page - 1) * limit
    items = query.offset(offset).limit(limit).all()

    return {
        "items": items,
        "pages": pages
    }


def get_podcast(db: Session, podcast_id: int) -> Optional[models.Podcast]:
    return db.query(models.Podcast).filter(models.Podcast.id == podcast_id).first()


def create_podcast(db: Session, podcast: schemas.PodcastCreate) -> models.Podcast:
    db_podcast = models.Podcast(**podcast.dict())
    db.add(db_podcast)
    db.commit()
    db.refresh(db_podcast)
    return db_podcast


def update_podcast(
        db: Session,
        podcast_id: int,
        podcast: schemas.PodcastUpdate
) -> Optional[models.Podcast]:

    db_podcast = db.query(models.Podcast).filter(models.Podcast.id == podcast_id).first()
    if not db_podcast:
        return None

    for field, value in podcast.dict(exclude_unset=True).items():
        setattr(db_podcast, field, value)

    db.commit()
    db.refresh(db_podcast)
    return db_podcast


def delete_podcast(db: Session, podcast_id: int) -> bool:
    db_podcast = db.query(models.Podcast).filter(models.Podcast.id == podcast_id).first()
    if not db_podcast:
        return False

    db.delete(db_podcast)
    db.commit()
    return True


def search_podcasts(db: Session, query: str) -> List[models.Podcast]:
    return db.query(models.Podcast).filter(
        or_(
            models.Podcast.name.ilike(f"%{query}%"),
            models.Podcast.description.ilike(f"%{query}%")
        )
    ).all()


def get_user_by_telegram_id(db: Session, telegram_id: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.telegram_id == telegram_id).first()


def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_or_create_user(db: Session, telegram_id: str, **kwargs) -> models.User:
    user = get_user_by_telegram_id(db, telegram_id)
    if not user:
        user_data = schemas.UserCreate(telegram_id=telegram_id, **kwargs)
        user = create_user(db, user_data)
    return user



def get_user_favorites(db: Session, user_id: int) -> List[models.Podcast]:
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return []
    return user.favorite_podcasts


def add_to_favorites(db: Session, user_id: int, podcast_id: int) -> bool:

    user = db.query(models.User).filter(models.User.id == user_id).first()
    podcast = db.query(models.Podcast).filter(models.Podcast.id == podcast_id).first()

    if not user or not podcast:
        return False

    if podcast in user.favorite_podcasts:
        return True  # Уже добавлен

    user.favorite_podcasts.append(podcast)

    action = models.UserAction(
        user_id=user_id,
        podcast_id=podcast_id,
        action_type="add_favorite",
        source="website"
    )
    db.add(action)

    db.commit()
    return True


def remove_from_favorites(db: Session, user_id: int, podcast_id: int) -> bool:
    user = db.query(models.User).filter(models.User.id == user_id).first()
    podcast = db.query(models.Podcast).filter(models.Podcast.id == podcast_id).first()

    if not user or not podcast:
        return False

    if podcast in user.favorite_podcasts:
        user.favorite_podcasts.remove(podcast)

        action = models.UserAction(
            user_id=user_id,
            podcast_id=podcast_id,
            action_type="remove_favorite",
            source="website"
        )
        db.add(action)

        db.commit()
        return True

    return False


def is_favorite(db: Session, user_id: int, podcast_id: int) -> bool:

    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return False

    return any(p.id == podcast_id for p in user.favorite_podcasts)



def get_categories(db: Session) -> List[models.Category]:

    return db.query(models.Category).all()


def create_category(db: Session, category: schemas.CategoryCreate) -> models.Category:

    db_category = models.Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category



def log_user_action(db: Session, action: schemas.UserActionCreate) -> models.UserAction:
    db_action = models.UserAction(**action.dict())
    db.add(db_action)
    db.commit()
    db.refresh(db_action)
    return db_action