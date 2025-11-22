import { useEffect, useState, useCallback } from 'react';
import { fetchOrderbook } from '../lib/api';

export interface OrderbookSide {
  price: number;
  size: number;
}

export interface Orderbook {
  bids?: OrderbookSide[];
  asks?: OrderbookSide[];
}

export function useOrderbook(marketId?: string) {
  const [orderbook, setOrderbook] = useState<Orderbook | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrderbook = useCallback(async () => {
    if (!marketId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOrderbook(marketId);
      setOrderbook(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load orderbook';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [marketId]);

  useEffect(() => {
    loadOrderbook();
  }, [loadOrderbook]);

  return { orderbook, loading, error, refresh: loadOrderbook };
}
