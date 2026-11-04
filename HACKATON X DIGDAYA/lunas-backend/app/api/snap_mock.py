import uuid
from decimal import Decimal
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.deps import get_db_session
from app.models.domain import User, Account, Liability

router = APIRouter()

@router.post("/sync/{user_id}", status_code=status.HTTP_201_CREATED)
def sync_mock_data(user_id: uuid.UUID, db: Session = Depends(get_db_session)):
    """
    Simulates a SNAP BI integration that extracts account balances and liabilities
    without manual user input, injecting mock data for the specified user_id.
    """
    # 1. Check if user exists in the USERS table; if not, create a dummy user
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        user = User(
            id=user_id,
            name="Dummy User",
            email=f"dummy_{user_id}@example.com",
            phone=None,
            kyc_status="PENDING"
        )
        db.add(user)
        db.flush()  # Use flush so the user exists for foreign keys but we can commit once at the end
    
    # 2. To ensure idempotency and prevent duplicate records, delete any existing accounts
    # and liabilities for this user before recreating them.
    db.query(Account).filter(Account.user_id == user_id).delete(synchronize_session=False)
    db.query(Liability).filter(Liability.user_id == user_id).delete(synchronize_session=False)
    
    # 3. Create 1 mock ACCOUNT (e.g. Bank BCA, account_no: "1234567890", dynamic_buffer: 1500000)
    mock_account = Account(
        user_id=user_id,
        bank_name="Bank BCA",
        account_no="1234567890",
        dynamic_buffer=Decimal("1500000.00")
    )
    db.add(mock_account)
    
    # 4. Create 2 mock LIABILITIES:
    # - Kredivo: outstanding = 2100000, apr = 42.0 (stored as 0.4200 to fit Numeric(5, 4))
    # - GoPay Later: outstanding = 1000000, apr = 30.0 (stored as 0.3000 to fit Numeric(5, 4))
    kredivo = Liability(
        user_id=user_id,
        provider="Kredivo",
        outstanding=Decimal("2100000.00"),
        apr=Decimal("0.4200"),
        status="ACTIVE"
    )
    gopay_later = Liability(
        user_id=user_id,
        provider="GoPay Later",
        outstanding=Decimal("1000000.00"),
        apr=Decimal("0.3000"),
        status="ACTIVE"
    )
    db.add(kredivo)
    db.add(gopay_later)
    
    # Commit transaction
    db.commit()
    
    return {
        "status": "success",
        "message": "SNAP BI Mock data synchronized successfully",
        "user_id": user_id,
        "data": {
            "account": {
                "bank_name": mock_account.bank_name,
                "account_no": mock_account.account_no,
                "dynamic_buffer": float(mock_account.dynamic_buffer)
            },
            "liabilities": [
                {
                    "provider": kredivo.provider,
                    "outstanding": float(kredivo.outstanding),
                    "apr": float(kredivo.apr),
                    "status": kredivo.status
                },
                {
                    "provider": gopay_later.provider,
                    "outstanding": float(gopay_later.outstanding),
                    "apr": float(gopay_later.apr),
                    "status": gopay_later.status
                }
            ]
        }
    }
