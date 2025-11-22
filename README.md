<div align="center">

# ⚖️ Precedence

<img src="public/precedence-logo.png" alt="Precedence Logo" width="500" height="500">

### *"Know What Comes Next"*

**Case Law Prediction Markets**

[![Polymarket](https://img.shields.io/badge/Polymarket-Builder-7C3AED?style=for-the-badge&logo=ethereum&logoColor=white)](https://polymarket.com/)
[![Polygon](https://img.shields.io/badge/Polygon-8247E5?style=for-the-badge&logo=polygon&logoColor=white)](https://polygon.technology/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

---

</div>

## 🎯 Overview

**Precedence** is an AI-powered legal prediction market platform that enables users to trade on high-profile case outcomes. By leveraging **Polymarket's Builder Program** for trading infrastructure and **CourtListener's new Semantic Search API** (launched Nov 5, 2025) for legal data, Precedence provides unprecedented insights into judicial behavior and case outcomes.

Unlike traditional legal analytics platforms, Precedence combines:
- 🔍 **Semantic legal search** using natural language queries
- 🤖 **AI-powered judge analysis** and outcome predictions
- 💰 **Real-money prediction markets** via Polymarket's proven infrastructure
- ⚡ **Gas-free trading** on Polygon with instant settlement

### 🆕 What's New (Nov 2025)

**🔥 Major Platform Pivot:**
- **From:** Building everything from scratch on Solana
- **To:** Leveraging best-in-class APIs to focus on AI/ML differentiation

**Integration Highlights:**
- ✅ **Polymarket Builder Program** - $1M+ in grants, 10+ apps doing millions in daily volume
- ✅ **CourtListener Semantic Search API** - Just launched Nov 5th, 2025 with natural language queries
- ✅ **High-Profile Public Cases** - Supreme Court, major criminal trials, corporate litigation
- ✅ **7-Day MVP Timeline** - Fast iteration using proven infrastructure

---

## ✨ Key Features

### 🔍 Advanced Case Discovery (NEW!)
- **Semantic Search** - Natural language queries that understand legal meaning beyond keywords
- **Hybrid Search Mode** - Combine keyword precision with semantic understanding
- **Real-Time Case Monitoring** - Alerts when high-profile cases have developments
- **Supreme Court Database** - Comprehensive SCOTUS data with voting records

### 🤖 AI-Powered Predictions
- **Judge Behavior Analysis** - ML models trained on thousands of judicial opinions
- **Case Outcome Predictions** - Confidence scores and probability distributions
- **Historical Pattern Recognition** - Identify how judges rule on similar cases
- **Sentiment Analysis** - Track media and public sentiment around cases

### 💰 Polymarket Integration
- **Proven Trading Infrastructure** - Leverage Polymarket's CLOB (Central Limit Order Book)
- **Instant Liquidity** - Access existing Polymarket user base and markets
- **Gas-Free Trading** - Polymarket pays Polygon gas fees for seamless UX
- **Builder Rewards** - Earn revenue share on trading volume generated
- **Audited Smart Contracts** - Security-first with ChainSecurity audits

### 📊 Market Intelligence
- **High-Profile Cases Only** - Supreme Court, major criminal trials, regulatory battles
- **Multiple Outcome Options** - Win, loss, settlement, mistrial, etc.
- **Real-Time Odds** - Live market prices + AI predictions side-by-side
- **Portfolio Tracking** - Monitor positions, P&L, and trading history

---

## 🏗️ Architecture

### Platform Stack

```
┌───────────────────────────────────────────────────────┐
│              PRECEDENCE PLATFORM                       │
│    Legal Intelligence + Trading Interface              │
└───────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ CourtListener│  │  Polymarket  │  │   Your AI    │
│ Semantic API │  │   Builder    │  │   Backend    │
│              │  │              │  │              │
│ • Natural    │  │ • Orderbook  │  │ • Judge      │
│   language   │  │ • Liquidity  │  │   analysis   │
│   search     │  │ • Settlement │  │ • Outcome    │
│ • Hybrid     │  │ • Gas-free   │  │   predictions│
│   queries    │  │   trading    │  │ • Confidence │
│ • 2TB of     │  │ • Builder    │  │   scores     │
│   embeddings │  │   rewards    │  │ • Real-time  │
│ • Real-time  │  │ • $39M daily │  │   monitoring │
│   updates    │  │   volume     │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
```

### Technical Components

**Frontend:**
- Next.js 14+ with App Router
- Wallet integration (Phantom, MetaMask)
- Real-time WebSocket updates
- Responsive mobile-first design

**Backend:**
- FastAPI (Python 3.11+)
- PostgreSQL for case/judge data
- Redis for caching
- CourtListener API integration
- Polymarket CLOB client

**AI/ML:**
- Judge behavior models
- Case outcome predictors
- Semantic search integration
- ModernBERT embeddings

---

## 🚀 Getting Started

### Prerequisites

```bash
# Required
- Python 3.11+ (NOT 3.13 - dependency issues)
- Node.js 18+
- PostgreSQL 14+
- Redis 7+

# API Keys Needed
- CourtListener API key
- Polymarket Builder credentials
```

### Quick Start

```bash
# Clone the repository
git clone https://github.com/tony-42069/precedence.git
cd precedence

# Backend Setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Start backend
python run.py

# Frontend Setup (in new terminal)
cd frontend
npm install
npm run dev
```

### Environment Variables

```bash
# .env file
COURT_LISTENER_API_KEY=your_key_here
POLYMARKET_PRIVATE_KEY=your_key_here
POLYMARKET_FUNDER_ADDRESS=your_address_here
DATABASE_URL=postgresql://user:pass@localhost/precedence
REDIS_URL=redis://localhost:6379
```

---

## 💡 How It Works

### User Journey

1. **Discover Cases**
   - User searches: "Supreme Court social media cases"
   - CourtListener semantic search finds relevant pending cases
   - Results show case details, judge history, similar rulings

2. **View AI Predictions**
   - Precedence displays ML-generated outcome probabilities
   - Judge voting patterns on similar cases
   - Confidence scores and historical accuracy
   - Media sentiment analysis

3. **Trade on Markets**
   - Click "Trade on Polymarket"
   - Connect wallet (MetaMask/Phantom)
   - Place order through Polymarket's orderbook
   - Gas-free trading with instant confirmation

4. **Monitor & Win**
   - Track positions in real-time
   - Receive alerts on case developments
   - Automatic settlement when case resolves
   - Claim winnings via Polymarket

---

## 📚 Documentation

### Core Documentation
- [📐 Technical Architecture](./precedence-tech-architecture.md) - Full system design
- [⚙️ Solana Smart Contracts](./solana-smart-contracts.md) - Original contract specs (deprecated)
- [🔌 API Endpoints](./api-endpoints.md) - Backend API reference
- [🗄️ Database Schema](./database-schema.md) - Data models
- [📅 Implementation Plan](./implementation-plan.md) - Development roadmap

### Integration Guides
- [Polymarket Builder Integration](./docs/polymarket-integration.md) - CLOB API setup
- [CourtListener Semantic Search](./docs/courtlistener-integration.md) - Search API usage
- [Judge Analysis Pipeline](./docs/judge-analysis.md) - ML model documentation

---

## 🎯 Roadmap

### Week 1: MVP Foundation ✨ (Current Sprint)
- [x] Platform architecture redesign
- [x] Repository setup and documentation
- [ ] CourtListener API integration
- [ ] Polymarket CLOB connection
- [ ] Basic frontend with wallet integration
- [ ] Judge analysis pipeline

### Week 2: Launch 🚀
- [ ] 10 high-profile case markets live
- [ ] AI prediction display
- [ ] Real-time odds updates
- [ ] Apply for Polymarket builder grant
- [ ] Public beta launch

### Month 2: Growth 📈
- [ ] 50+ active markets
- [ ] Mobile-responsive design
- [ ] Premium subscription tier
- [ ] Advanced analytics dashboard
- [ ] Email/webhook alerts

### Month 3: Scale 🌍
- [ ] API for third-party integrations
- [ ] Institutional trader features
- [ ] Market maker partnerships
- [ ] International expansion

---

## 💰 Revenue Model

1. **Polymarket Builder Rewards** - Trading volume commission splits
2. **Premium Subscriptions** - $49-199/month for:
   - Advanced AI predictions
   - Judge voting analysis
   - Real-time case alerts
   - API access
3. **Market Creation Fees** - Small fee to suggest new markets
4. **Data Licensing** - Legal firms/hedge funds pay for prediction data
5. **Builder Grants** - $1M+ available from Polymarket program

---

## 🔬 Technology Highlights

### CourtListener Semantic Search
- **Natural Language Queries** - Search using plain English
- **Hybrid Mode** - Combine keywords (in quotes) with semantic search
- **Fine-Tuned ModernBERT** - Domain-adapted for legal terminology
- **2TB of Embeddings** - Pre-computed vectors for all US case law
- **Fast Retrieval** - Optimized for speed at scale

### Polymarket Integration
- **CLOB API** - Central limit orderbook for efficient matching
- **Python/TypeScript Clients** - Official SDKs for easy integration
- **Polygon Network** - Fast, cheap transactions
- **Safe Wallets** - Gas-free UX with relayer support
- **Builder Attribution** - Custom headers for volume tracking

### AI/ML Stack
- **Judge Analysis** - Pattern recognition in judicial decisions
- **Outcome Prediction** - Multi-factor probability models
- **Sentiment Tracking** - NLP on news and social media
- **Confidence Scoring** - Bayesian uncertainty quantification

---

## 🏆 Competitive Advantages

**Why Traders Choose Precedence Over Direct Polymarket:**

1. **🎯 Legal Specialization** - Curated high-profile cases only
2. **🤖 AI Predictions** - Unique insights not available elsewhere
3. **🔍 Semantic Discovery** - Find markets using natural language
4. **📊 Judge Analytics** - Deep dive into judicial behavior patterns
5. **⚡ Superior UX** - Built specifically for legal prediction trading

---

## ⚠️ Disclaimer

Precedence is a prediction market platform for informational and entertainment purposes. Trading involves risk and you may lose some or all of your investment. The predictions and odds displayed are not legal advice and should not be relied upon for making legal decisions. Always consult with qualified legal professionals for legal matters.

Prediction markets may not be legal in all jurisdictions. Users are responsible for ensuring compliance with local laws and regulations.

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Fork the repo and clone
git clone https://github.com/YOUR_USERNAME/precedence.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes and commit
git commit -m "Add amazing feature"

# Push and create a PR
git push origin feature/amazing-feature
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Documentation:** [docs.precedence.market](https://docs.precedence.market) (Coming Soon)
- **Twitter:** [@PrecedenceMarket](https://twitter.com/PrecedenceMarket)
- **Discord:** [Join Community](https://discord.gg/precedence)
- **Polymarket Builder:** [Apply Here](https://polymarket.com/builders)
- **CourtListener API:** [Documentation](https://www.courtlistener.com/help/api/)

---

## 📧 Contact

For inquiries, partnerships, or support:
- Email: hello@precedence.market
- GitHub: [@tony-42069](https://github.com/tony-42069)


---

<div align="center">

**Built with by [@tony-42069](https://github.com/tony-42069)**

*Powered by Polymarket • CourtListener • AI/ML*

**[⬆ Back to Top](#-precedence)**

</div>

## 🔌 API Smoke Tests

```
curl -s https://your-backend-url/markets
curl -s "https://your-backend-url/orderbook?marketId=111"
curl -s "https://your-backend-url/user/balances?walletAddress=0xabc"
```
