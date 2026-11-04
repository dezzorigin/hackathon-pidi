from datetime import datetime
from decimal import Decimal
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field

# User Schemas
class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    kyc_status: Optional[str] = "PENDING"

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


# Access Token Schemas
class AccessTokenBase(BaseModel):
    provider: str
    scope: Optional[str] = None
    encrypted_token: str
    expires_at: datetime

class AccessTokenCreate(AccessTokenBase):
    user_id: UUID

class AccessTokenResponse(AccessTokenBase):
    id: UUID
    user_id: UUID

    class Config:
        from_attributes = True


# Account Schemas
class AccountBase(BaseModel):
    bank_name: str
    account_no: str
    dynamic_buffer: Decimal = Field(default=Decimal("0.0"))

class AccountCreate(AccountBase):
    user_id: UUID

class AccountResponse(AccountBase):
    id: UUID
    user_id: UUID

    class Config:
        from_attributes = True


# Transaction Schemas
class TransactionBase(BaseModel):
    amount: Decimal
    direction: str  # "INFLOW" or "OUTFLOW"
    category: Optional[str] = None
    occurred_at: datetime

class TransactionCreate(TransactionBase):
    account_id: UUID

class TransactionResponse(TransactionBase):
    id: UUID
    account_id: UUID

    class Config:
        from_attributes = True


# Liability Schemas
class LiabilityBase(BaseModel):
    provider: str
    outstanding: Decimal = Field(default=Decimal("0.0"))
    apr: Decimal
    status: str

class LiabilityCreate(LiabilityBase):
    user_id: UUID

class LiabilityResponse(LiabilityBase):
    id: UUID
    user_id: UUID

    class Config:
        from_attributes = True


# Sweep Order Schemas
class SweepOrderBase(BaseModel):
    type: str  # "MANUAL" or "AUTOMATIC"
    amount: Decimal
    status: str
    ext_ref: Optional[str] = None

class SweepOrderCreate(SweepOrderBase):
    user_id: UUID
    liability_id: UUID

class SweepOrderResponse(SweepOrderBase):
    id: UUID
    user_id: UUID
    liability_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


# Approval Schemas
class ApprovalBase(BaseModel):
    method: str
    token_signature: str

class ApprovalCreate(ApprovalBase):
    sweep_order_id: UUID

class ApprovalResponse(ApprovalBase):
    id: UUID
    sweep_order_id: UUID
    approved_at: datetime

    class Config:
        from_attributes = True


# Investment Schemas
class InvestmentBase(BaseModel):
    fund: str
    units: Decimal
    invested_amount: Decimal

class InvestmentCreate(InvestmentBase):
    user_id: UUID

class InvestmentResponse(InvestmentBase):
    id: UUID
    user_id: UUID

    class Config:
        from_attributes = True


# Knowledge Chunk Schemas
class KnowledgeChunkBase(BaseModel):
    source: str
    content: str
    embedding: List[float] = Field(..., description="Vector dimensions = 768")

class KnowledgeChunkCreate(KnowledgeChunkBase):
    pass

class KnowledgeChunkResponse(BaseModel):
    id: UUID
    source: str
    content: str

    class Config:
        from_attributes = True
