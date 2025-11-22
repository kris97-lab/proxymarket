"""
SQLAlchemy ORM models for the core Polymarket backend.
Only trading-related models are retained to support the Polymarket flows.
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, JSON, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(100))
    organization = Column(String(100))
    role = Column(String(20), default="user")
    created_at = Column(DateTime)
    last_login = Column(DateTime)
    subscription_tier = Column(String(20), default="basic")
    subscription_expires = Column(DateTime)
    is_active = Column(Boolean, default=True)


class Market(Base):
    """Prediction market for trading outcomes."""

    __tablename__ = "markets"

    id = Column(String(36), primary_key=True)

    # Blockchain reference
    market_address = Column(String(44), unique=True)  # Solana public key
    pool_address = Column(String(44))  # AMM pool address
    escrow_address = Column(String(44))  # Escrow account address

    # Market details
    title = Column(String(500), nullable=False)
    description = Column(String(2000))
    outcomes = Column(JSON, nullable=False)  # Array of outcome objects

    # Market metrics
    total_volume = Column(Float, default=0.0)  # In SOL
    total_bets = Column(Integer, default=0)
    unique_bettors = Column(Integer, default=0)
    current_liquidity = Column(Float, default=0.0)

    # Market state
    status = Column(String(20), default="active")  # active, closed, settled, disputed, cancelled
    settlement_time = Column(DateTime, nullable=False)
    closed_at = Column(DateTime)
    settled_at = Column(DateTime)

    # Settlement
    winning_outcome_index = Column(Integer)
    settlement_transaction = Column(String(88))  # Solana transaction signature

    # Platform configuration
    fee_bps = Column(Integer, default=250)  # Platform fee (2.5%)
    creator_address = Column(String(44))

    # Metadata
    market_metadata = Column(JSON)

    # Audit
    created_at = Column(DateTime)
    updated_at = Column(DateTime)


class Order(Base):
    """Order submitted to Polymarket."""

    __tablename__ = "orders"

    id = Column(String(36), primary_key=True)
    market_id = Column(String(36), ForeignKey("markets.id"), nullable=False)
    user_wallet = Column(String(44), nullable=False)
    side = Column(String(10), nullable=False)  # buy or sell
    size = Column(Float, nullable=False)
    price = Column(Float, nullable=False)
    status = Column(String(20), default="pending")
    transaction_hash = Column(String(88))
    created_at = Column(DateTime)


class Trade(Base):
    """Executed trade record."""

    __tablename__ = "trades"

    id = Column(String(36), primary_key=True)
    market_id = Column(String(36), ForeignKey("markets.id"), nullable=False)
    user_wallet = Column(String(44), nullable=False)
    side = Column(String(10), nullable=False)  # YES/NO or buy/sell
    amount = Column(Float, nullable=False)
    price = Column(Float, nullable=False)
    order_id = Column(String(64))
    transaction_hash = Column(String(88))
    status = Column(String(20), default="pending")
    created_at = Column(DateTime)


class Position(Base):
    """Aggregated position for a user in a market."""

    __tablename__ = "positions"

    id = Column(String(36), primary_key=True)

    # User and market
    user_wallet = Column(String(44), nullable=False)
    market_id = Column(String(36), ForeignKey("markets.id"), nullable=False)
    outcome_index = Column(Integer, nullable=False)

    # Position details
    total_shares = Column(Float, default=0.0)
    total_invested = Column(Float, default=0.0)
    avg_entry_price = Column(Float)
    bet_count = Column(Integer, default=0)

    # Current valuation
    current_price = Column(Float)
    current_value = Column(Float)
    unrealized_pnl = Column(Float)

    # Realized P&L (after settlement)
    realized_pnl = Column(Float)

    # Audit
    last_bet_at = Column(DateTime)
    updated_at = Column(DateTime)

    __table_args__ = (
        {'schema': None},
    )
