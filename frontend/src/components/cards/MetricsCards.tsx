import React from "react";
import { MetricCard } from "./MetricCard";
import { useSummaryMetrics } from "../../hooks/useMetrics";
import { formatNumber, formatCurrency } from "../../utils/formatters";

export const MetricsCards: React.FC = () => {
  const { data: metrics, isLoading, error } = useSummaryMetrics();

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 font-medium mb-2">
          ⚠️ Error loading metrics
        </div>
        <div className="text-sm text-red-500">{(error as Error).message}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="Users Online"
        value={metrics ? formatNumber(metrics.usersOnline) : 0}
        icon="👥"
        color="green"
        loading={isLoading}
      />
      <MetricCard
        title="Views / Minute"
        value={metrics ? formatNumber(metrics.viewsPerMinute) : 0}
        icon="👁️"
        color="blue"
        loading={isLoading}
      />
      <MetricCard
        title="Cart Adds / Minute"
        value={metrics ? formatNumber(metrics.cartPerMinute) : 0}
        icon="🛒"
        color="orange"
        loading={isLoading}
      />
      <MetricCard
        title="Revenue Today"
        value={metrics ? formatCurrency(metrics.revenueToday) : "$0"}
        icon="💰"
        color="purple"
        loading={isLoading}
      />
    </div>
  );
};
