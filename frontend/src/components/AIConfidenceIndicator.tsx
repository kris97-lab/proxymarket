import React from 'react';
import { AIPrediction } from '../hooks/usePredictions';

interface AIConfidenceIndicatorProps {
  prediction: AIPrediction;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  className?: string;
}

export function AIConfidenceIndicator({
  prediction,
  size = 'md',
  showDetails = false,
  className = ''
}: AIConfidenceIndicatorProps) {
  const { confidence, predicted_outcome, model_adjustment } = prediction;

  // Determine color based on confidence level
  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.8) return 'text-green-700 bg-green-100 border-green-200';
    if (conf >= 0.6) return 'text-yellow-700 bg-yellow-100 border-yellow-200';
    return 'text-red-700 bg-red-100 border-red-200';
  };

  const getConfidenceLabel = (conf: number) => {
    if (conf >= 0.8) return 'High Confidence';
    if (conf >= 0.6) return 'Medium Confidence';
    return 'Low Confidence';
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      {/* AI Confidence Badge - Single bubble like status badges */}
      <div className={`
        inline-flex items-center space-x-1 rounded-full border font-medium
        ${getConfidenceColor(confidence)}
        px-3 py-1 text-sm
      `}>
        {/* Brain Emoji */}
        <span>🧠</span>

        {/* AI Confidence Label */}
        <span className="text-xs font-medium">AI Confidence = {Math.round(confidence * 100)}%</span>
      </div>

      {/* Detailed Tooltip/Info */}
      {showDetails && (
        <div className="text-xs text-gray-500 ml-2">
          {getConfidenceLabel(confidence)}
          {model_adjustment !== undefined && (
            <span className="ml-1">
              ({model_adjustment > 0 ? '+' : ''}{Math.round(model_adjustment * 100)}% model adjustment)
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// Compact version for market cards
export function AIConfidenceBadge({
  prediction,
  size = 'sm',
  className = ''
}: {
  prediction: AIPrediction;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  return (
    <AIConfidenceIndicator
      prediction={prediction}
      size={size}
      showDetails={false}
      className={className}
    />
  );
}

// Detailed version for modals
export function AIConfidenceDetailed({
  prediction,
  className = ''
}: {
  prediction: AIPrediction;
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      <AIConfidenceIndicator
        prediction={prediction}
        size="lg"
        showDetails={true}
      />

      {/* Additional Details */}
      <div className="bg-gray-50 rounded-lg p-3 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-600">Predicted Outcome:</span>
            <div className="font-medium text-gray-900">{prediction.predicted_outcome}</div>
          </div>
          <div>
            <span className="text-gray-600">Model Version:</span>
            <div className="font-medium text-gray-900">{prediction.model_version || 'Unknown'}</div>
          </div>
        </div>
        {prediction.model_adjustment !== undefined && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <span className="text-gray-600">Model Adjustment:</span>
            <div className="mt-1 text-xs text-gray-600">
              Confidence adjusted by model signals: {prediction.model_adjustment > 0 ? '+' : ''}
              {Math.round(prediction.model_adjustment * 100)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
