import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useViewsHistory } from "../../hooks/useMetrics";
import { formatChartTime } from "../../utils/formatters";

export const ViewsChart: React.FC = () => {
  const { data, isLoading, error } = useViewsHistory();

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="text-red-500 text-center">Error loading chart data</div>
      </div>
    );
  }

  const chartData =
    data?.map((point) => ({
      ...point,
      time: formatChartTime(point.timestamp),
    })) || [];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Product Views</h3>
          <p className="text-sm text-gray-500 mt-1">Last 30 minutes</p>
        </div>
        <div className="text-2xl">📈</div>
      </div>

      {/* Chart */}
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading chart...</div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
