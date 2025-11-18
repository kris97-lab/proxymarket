from fastapi import APIRouter, HTTPException, Depends, Query
from typing import Optional
from pydantic import BaseModel
from sqlalchemy.orm import Session
import logging
from integrations.polymarket import polymarket
from database import get_db
from models import Trade
from datetime import datetime
from decimal import Decimal

router = APIRouter()
logger = logging.getLogger(__name__)

class TradeRequest(BaseModel):
    market_id: str
    token_id: str
    side: str  # "YES" or "NO"
    amount: float
    price: float
    wallet_address: str
    test_mode: bool = True

class TradeResponse(BaseModel):
    success: bool
    order_id: Optional[str] = None
    transaction_hash: Optional[str] = None
    error: Optional[str] = None

@router.post("/trade", response_model=TradeResponse)
async def place_trade(
    trade_request: TradeRequest,
    db: Session = Depends(get_db)
):
    """
    Place a trade on Polymarket through Precedence backend.
    This route handles builder attribution and trade tracking.
    """
    try:
        logger.info(f"Placing trade: {trade_request.dict()}")

        # Use your existing Polymarket client
        result = polymarket.create_market_order(
            market_id=trade_request.market_id,
            side='buy' if trade_request.side == 'YES' else 'sell',
            size=trade_request.amount,
            price=trade_request.price,
            test=trade_request.test_mode
        )

        if not result.get('success'):
            return TradeResponse(
                success=False,
                error=result.get('error', 'Trade failed')
            )

        # Save trade to database when possible
        if result.get('success'):
            try:
                db_trade = Trade(
                    market_id=trade_request.market_id,
                    user_wallet=trade_request.wallet_address,
                    side=trade_request.side,
                    amount=Decimal(str(trade_request.amount)),
                    price=Decimal(str(trade_request.price)),
                    order_id=result.get('order_id'),
                    transaction_hash=result.get('transaction_hash'),
                    status='confirmed',
                    created_at=datetime.utcnow()
                )
                db.add(db_trade)
                db.commit()
            except Exception as db_error:
                db.rollback()
                logger.warning(f"Trade recorded as mock only (database not ready): {db_error}")

        logger.info(f"Trade result: {result}")

        return TradeResponse(
            success=result.get('success', False),
            order_id=result.get('order_id'),
            transaction_hash=result.get('transaction_hash'),
            error=result.get('error')
        )

    except Exception as e:
        logger.error(f"Trade failed: {str(e)}")
        return TradeResponse(
            success=False,
            error=str(e)
        )


@router.get("/user/balances")
async def get_user_balances(
    wallet_address: str = Query(..., alias="walletAddress", description="User wallet address")
):
    """Fetch user balances and positions via the Polymarket trading service."""
    try:
        result = polymarket.get_user_positions(wallet_address)

        if not result.get('success', False):
            raise HTTPException(status_code=400, detail=result.get('error', 'Failed to fetch balances'))

        return result

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to get user balances: {e}")
        raise HTTPException(status_code=500, detail=str(e))
