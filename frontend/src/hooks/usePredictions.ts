import { useState, useCallback } from 'react';

export interface AIPrediction {
  predicted_outcome: string;
  confidence: number;
  model_adjustment?: number;
  notes?: string;
  model_version?: string;
}

export interface MarketWithAI extends Market {
  ai_prediction?: AIPrediction;
}

interface Market {
  id?: string;
  question?: string;
  description?: string;
  volume?: number;
  closed?: boolean;
  active?: boolean;
  tags?: string[];
  current_yes_price?: number;
  current_no_price?: number;
  title?: string;
  probability?: number;
  endDate?: string;
}

export function usePredictions() {
  const [predictions, setPredictions] = useState<Map<string, AIPrediction>>(new Map());
  const [loading, setLoading] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Map<string, string>>(new Map());

  // Get AI prediction for a market (locally simulated to avoid removed endpoints)
  const getPrediction = useCallback(async (marketId: string, marketData?: any) => {
    if (!marketId) return null;

    setLoading(prev => new Set(prev).add(marketId));
    setErrors(prev => {
      const newErrors = new Map(prev);
      newErrors.delete(marketId);
      return newErrors;
    });

    try {
      const volume = Number(marketData?.market_data?.volume || marketData?.volume || 0);
      const momentum = Number(marketData?.market_data?.probability || marketData?.probability || 0.5);

      const confidence = Math.max(0.5, Math.min(0.9, 0.55 + (volume / 1_000_000) + (momentum - 0.5) * 0.3));
      const predicted_outcome = momentum >= 0.5 ? 'YES' : 'NO';
      const model_adjustment = (momentum - 0.5) * 0.1;

      const prediction: AIPrediction = {
        predicted_outcome,
        confidence,
        model_adjustment,
        notes: 'Simulated AI signal',
        model_version: 'offline-simulation-1.0'
      };

      setPredictions(prev => new Map(prev).set(marketId, prediction));

      return prediction;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setErrors(prev => new Map(prev).set(marketId, errorMessage));
      console.error('Prediction computation error:', error);
      return null;
    } finally {
      setLoading(prev => {
        const newLoading = new Set(prev);
        newLoading.delete(marketId);
        return newLoading;
      });
    }
  }, []);

  // Get model status (simulated)
  const getModelStatus = useCallback(async () => {
    return {
      status: 'ok',
      model_version: 'offline-simulation-1.0',
      last_trained: 'N/A',
    };
  }, []);

  // Enhanced market data with AI predictions
  const enhanceMarketWithAI = useCallback(async (market: Market): Promise<MarketWithAI> => {
    const enhancedMarket: MarketWithAI = { ...market };

    // Get AI prediction for this market
    const prediction = await getPrediction(market.id || '', {
      market_title: market.question || market.title,
      market_data: {
        volume: market.volume,
        tags: market.tags,
        closed: market.closed,
      }
    });

    if (prediction) {
      enhancedMarket.ai_prediction = prediction;
    }

    return enhancedMarket;
  }, [getPrediction]);

  // Batch enhance multiple markets
  const enhanceMarketsWithAI = useCallback(async (markets: Market[]): Promise<MarketWithAI[]> => {
    const enhancedMarkets: MarketWithAI[] = [];

    // Process in batches to avoid overwhelming the API
    const batchSize = 3;
    for (let i = 0; i < markets.length; i += batchSize) {
      const batch = markets.slice(i, i + batchSize);
      const batchPromises = batch.map(market => enhanceMarketWithAI(market));
      const batchResults = await Promise.all(batchPromises);
      enhancedMarkets.push(...batchResults);

      // Small delay between batches
      if (i + batchSize < markets.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return enhancedMarkets;
  }, [enhanceMarketWithAI]);

  // Clear cache for a specific market
  const clearPrediction = useCallback((marketId: string) => {
    setPredictions(prev => {
      const newPredictions = new Map(prev);
      newPredictions.delete(marketId);
      return newPredictions;
    });
    setErrors(prev => {
      const newErrors = new Map(prev);
      newErrors.delete(marketId);
      return newErrors;
    });
  }, []);

  // Get prediction for a market (from cache or fetch)
  const getCachedPrediction = useCallback((marketId: string) => {
    return predictions.get(marketId) || null;
  }, [predictions]);

  // Check if prediction is loading
  const isLoadingPrediction = useCallback((marketId: string) => {
    return loading.has(marketId);
  }, [loading]);

  // Get prediction error
  const getPredictionError = useCallback((marketId: string) => {
    return errors.get(marketId) || null;
  }, [errors]);

  return {
    // Core functions
    getPrediction,
    getModelStatus,
    enhanceMarketWithAI,
    enhanceMarketsWithAI,

    // Cache management
    clearPrediction,
    getCachedPrediction,

    // State
    predictions,
    loading,
    errors,

    // Helpers
    isLoadingPrediction,
    getPredictionError,
  };
}
