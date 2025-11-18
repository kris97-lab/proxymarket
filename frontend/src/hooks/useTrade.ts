import { useState } from 'react';
import { placeTradeRequest } from '../lib/api';

interface TradeParams {
  marketId: string;
  tokenId: string;
  side: 'YES' | 'NO';
  amount: number;
  price: number;
}

interface TradeResult {
  success: boolean;
  orderId?: string;
  transactionHash?: string;
  error?: string;
}

export function useTrade() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeTrade = async (
    params: TradeParams,
    walletAddress: string
  ): Promise<TradeResult> => {
    setLoading(true);
    setError(null);

    try {
      const result = await placeTradeRequest({
        market_id: params.marketId,
        token_id: params.tokenId,
        side: params.side,
        amount: params.amount,
        price: params.price,
        wallet_address: walletAddress,
      });

      if (!result.success) {
        throw new Error(result.error || 'Trade failed');
      }

      return {
        success: true,
        orderId: result.order_id || result.orderId,
        transactionHash: result.transaction_hash || result.transactionHash,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { placeTrade, loading, error };
}
