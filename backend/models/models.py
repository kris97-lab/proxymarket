"""
SQLAlchemy ORM models for the core prediction market backend.
"""

from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    Float,
    Text,
    JSON,
    ForeignKey,
)
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
    description = Column(Text)
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


class Bet(Base):
    """Individual bet placed by a user on a market outcome."""

    __tablename__ = "bets"
    id = Column(String(36), primary_key=True)
    market_id = Column(String(36), ForeignKey("markets.id"), nullable=False)

    # Bettor information
    user_wallet = Column(String(44), nullable=False)

    # Bet details
    outcome_index = Column(Integer, nullable=False)
    amount = Column(Float, nullable=False)  # Amount wagered in SOL
    shares = Column(Float, nullable=False)  # Shares received

    # Pricing
    entry_price = Column(Float)  # Price at time of bet (0-1 range)
    odds_decimal = Column(Float)  # Decimal odds

    # Transaction
    transaction_signature = Column(String(88), nullable=False)
    block_time = Column(DateTime, nullable=False)

    # Settlement
    claimed = Column(Boolean, default=False)
    claim_transaction = Column(String(88))
    payout = Column(Float)
    profit_loss = Column(Float)

    # Audit
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


class UserProfile(Base):
    """User profile and statistics for prediction market platform."""

    __tablename__ = "user_profiles"
    wallet_address = Column(String(44), primary_key=True)

    # Optional user info
    username = Column(String(50), unique=True)
    display_name = Column(String(100))
    bio = Column(Text)
    avatar_url = Column(String(500))

    # Statistics
    total_volume = Column(Float, default=0.0)
    total_bets = Column(Integer, default=0)
    markets_traded = Column(Integer, default=0)
    total_profit_loss = Column(Float, default=0.0)
    win_rate = Column(Float)
    avg_bet_size = Column(Float)
    reputation_score = Column(Integer, default=0)

    # Preferences
    notification_settings = Column(JSON)
    display_settings = Column(JSON)
    public_profile = Column(Boolean, default=True)

    # Audit
    created_at = Column(DateTime)
    last_active = Column(DateTime)
    updated_at = Column(DateTime)


class Transaction(Base):
    """Blockchain transaction records."""

    __tablename__ = "transactions"
    id = Column(String(36), primary_key=True)

    # Transaction identification
    signature = Column(String(88), nullable=False, unique=True)

    # References
    market_id = Column(String(36), ForeignKey("markets.id"))
    user_wallet = Column(String(44), nullable=False)

    # Transaction type
    tx_type = Column(String(50), nullable=False)  # create_market, place_bet, claim_winnings, etc.

    # Transaction details
    amount = Column(Float)
    outcome_index = Column(Integer)

    # Status
    status = Column(String(20), default="pending")  # pending, confirmed, failed
    block_time = Column(DateTime)
    slot = Column(Integer)
    fee = Column(Integer)  # In lamports

    # Error handling
    error_message = Column(Text)
    retry_count = Column(Integer, default=0)

    # Audit
    created_at = Column(DateTime)
    updated_at = Column(DateTime)


class MarketSnapshot(Base):
    """Historical snapshots of market data for analytics."""

    __tablename__ = "market_snapshots"
    id = Column(String(36), primary_key=True)
    market_id = Column(String(36), ForeignKey("markets.id"), nullable=False)

    # Snapshot data
    odds = Column(JSON, nullable=False)  # Current odds for each outcome
    volume_24h = Column(Float)
    trades_24h = Column(Integer)
    unique_traders_24h = Column(Integer)
    liquidity = Column(Float)
    pool_reserves = Column(JSON)  # AMM pool reserves

    # Timestamp
    snapshot_time = Column(DateTime, nullable=False)
