from typing import Generator
from sqlalchemy.orm import Session
from app.core.database import get_db

def get_db_session() -> Generator[Session, None, None]:
    """
    Dependency that yields the SQLAlchemy database session.
    """
    yield from get_db()
