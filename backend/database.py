from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Настройки базы данных
# В продакшене используйте переменные окружения
# DATABASE_URL = os.getenv(
#     "DATABASE_URL",
#     "postgresql://username:password@localhost/podcast_db"
# )

# Для разработки можете использовать SQLite

DATABASE_URL = "sqlite:///./podcast.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()