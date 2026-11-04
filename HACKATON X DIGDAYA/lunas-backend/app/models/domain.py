import uuid
from sqlalchemy import Column, String, DateTime, Numeric, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from pgvector.sqlalchemy import Vector
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True, index=True)
    phone = Column(String, nullable=True)
    kyc_status = Column(String, nullable=True, default="PENDING")
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # Relationships
    access_tokens = relationship("AccessToken", back_populates="user", cascade="all, delete-orphan")
    accounts = relationship("Account", back_populates="user", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="user", cascade="all, delete-orphan")
    liabilities = relationship("Liability", back_populates="user", cascade="all, delete-orphan")
    sweep_orders = relationship("SweepOrder", back_populates="user", cascade="all, delete-orphan")
    investments = relationship("Investment", back_populates="user", cascade="all, delete-orphan")


class AccessToken(Base):
    __tablename__ = "access_tokens"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    provider = Column(String, nullable=False)
    scope = Column(String, nullable=True)
    encrypted_token = Column(String, nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)

    # Relationships
    user = relationship("User", back_populates="access_tokens")


class Account(Base):
    __tablename__ = "accounts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    bank_name = Column(String, nullable=False)
    account_no = Column(String, nullable=False)
    dynamic_buffer = Column(Numeric(precision=20, scale=4), nullable=False, default=0.0)

    # Relationships
    user = relationship("User", back_populates="accounts")
    transactions = relationship("Transaction", back_populates="account", cascade="all, delete-orphan")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    action = Column(String, nullable=False)
    entity = Column(String, nullable=False)
    payload_hash = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # Relationships
    user = relationship("User", back_populates="audit_logs")


class Liability(Base):
    __tablename__ = "liabilities"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    provider = Column(String, nullable=False)
    outstanding = Column(Numeric(precision=20, scale=4), nullable=False, default=0.0)
    apr = Column(Numeric(precision=5, scale=4), nullable=False)  # Example: 0.1500 for 15.00%
    status = Column(String, nullable=False)

    # Relationships
    user = relationship("User", back_populates="liabilities")
    sweep_orders = relationship("SweepOrder", back_populates="liability", cascade="all, delete-orphan")


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    account_id = Column(UUID(as_uuid=True), ForeignKey("accounts.id", ondelete="CASCADE"), nullable=False)
    amount = Column(Numeric(precision=20, scale=4), nullable=False)
    direction = Column(String, nullable=False)  # e.g., "INFLOW", "OUTFLOW"
    category = Column(String, nullable=True)
    occurred_at = Column(DateTime(timezone=True), nullable=False)

    # Relationships
    account = relationship("Account", back_populates="transactions")


class SweepOrder(Base):
    __tablename__ = "sweep_orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    liability_id = Column(UUID(as_uuid=True), ForeignKey("liabilities.id", ondelete="CASCADE"), nullable=False)
    type = Column(String, nullable=False)  # e.g., "MANUAL", "AUTOMATIC"
    amount = Column(Numeric(precision=20, scale=4), nullable=False)
    status = Column(String, nullable=False)
    ext_ref = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # Relationships
    user = relationship("User", back_populates="sweep_orders")
    liability = relationship("Liability", back_populates="sweep_orders")
    approvals = relationship("Approval", back_populates="sweep_order", cascade="all, delete-orphan")


class Approval(Base):
    __tablename__ = "approvals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sweep_order_id = Column(UUID(as_uuid=True), ForeignKey("sweep_orders.id", ondelete="CASCADE"), nullable=False)
    method = Column(String, nullable=False)  # e.g., "EMAIL", "SMS", "TOTP"
    token_signature = Column(String, nullable=False)
    approved_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # Relationships
    sweep_order = relationship("SweepOrder", back_populates="approvals")


class Investment(Base):
    __tablename__ = "investments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    fund = Column(String, nullable=False)
    units = Column(Numeric(precision=20, scale=8), nullable=False)  # Fund units can have high scale
    invested_amount = Column(Numeric(precision=20, scale=4), nullable=False)

    # Relationships
    user = relationship("User", back_populates="investments")


class KnowledgeChunk(Base):
    __tablename__ = "knowledge_chunks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    source = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    embedding = Column(Vector(768), nullable=False)
