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

  const API_BASE = 'http://localhost:8000/api';

  // Get AI prediction for a market
  const getPrediction = useCallback(async (marketId: string, marketData?: any) => {
    if (!marketId) return null;

    setLoading(prev => new Set(prev).add(marketId));
    setErrors(prev => {
      const newErrors = new Map(prev);
      newErrors.delete(marketId);
      return newErrors;
    });

    try {
      const response = await fetch(`${API_BASE}/predictions/market-outcome`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          market_id: marketId,
          market_data: marketData || {},
        }),
      });

      if (!response.ok) {
        throw new Error(`Prediction API error: ${response.status}`);
      }

      const prediction: AIPrediction = await response.json();
      setPredictions(prev => new Map(prev).set(marketId, prediction));

      return prediction;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setErrors(prev => new Map(prev).set(marketId, errorMessage));
      console.error('Prediction fetch error:', error);
      return null;
    } finally {
      setLoading(prev => {
        const newLoading = new Set(prev);
        newLoading.delete(marketId);
        return newLoading;
      });
    }
  }, [API_BASE]);

  // Get model status
  const getModelStatus = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/predictions/models/status`);
      if (!response.ok) {
        throw new Error(`Model status API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Model status fetch error:', error);
      return null;
    }
  }, [API_BASE]);

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
