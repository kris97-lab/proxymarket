# Deployment Guide

## Backend → Railway
1. Connect GitHub repo.
2. Set root to /backend
3. Add variables:
   - POLYMARKET_BUILDER_API_KEY=
   - POLYMARKET_BUILDER_API_SECRET=
   - API_BASE_URL=https://clob.polymarket.com
4. Deploy

## Frontend → Vercel
1. Set root to /frontend
2. Add env:
   - NEXT_PUBLIC_API_URL=https://<railway-backend>
   - NEXT_PUBLIC_POLYMARKET_API=https://clob.polymarket.com
3. Deploy
