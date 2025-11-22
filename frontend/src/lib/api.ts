const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface TradeParams {
  market_id: string;
  token_id: string;
  side: 'YES' | 'NO';
  amount: number;
  price: number;
  wallet_address: string;
  test_mode?: boolean;
}

export async function fetchMarkets(limit = 20) {
  const response = await fetch(`${API_BASE}/markets?limit=${limit}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch markets: ${response.status}`);
  }
  return response.json();
}

export async function fetchOrderbook(marketId: string) {
  const response = await fetch(`${API_BASE}/orderbook?marketId=${marketId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch orderbook: ${response.status}`);
  }
  return response.json();
}

export async function placeTradeRequest(params: TradeParams) {
  const response = await fetch(`${API_BASE}/trade`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Trade request failed: ${response.status} ${errorBody}`);
  }

  return response.json();
}

export async function fetchUserBalances(walletAddress: string) {
  const response = await fetch(`${API_BASE}/user/balances?walletAddress=${walletAddress}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch balances: ${response.status}`);
  }
  return response.json();
}

export { API_BASE };
