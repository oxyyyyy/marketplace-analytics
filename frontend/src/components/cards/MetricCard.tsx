import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: string;
  color?: "blue" | "green" | "orange" | "purple" | "red";
  loading?: boolean;
}

const colorClasses = {
  blue: "text-blue-600 bg-blue-50",
  green: "text-green-600 bg-green-50",
  orange: "text-orange-600 bg-orange-50",
  purple: "text-purple-600 bg-purple-50",
  red: "text-red-600 bg-red-50",
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon = "📊",
  color = "blue",
  loading = false,
}) => {
  const colorClass = colorClasses[color];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 relative overflow-hidden">
      {/* Loading indicator */}
      {loading && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-transparent animate-pulse" />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <span className="text-2xl">{icon}</span>
      </div>

      {/* Value */}
      <div
        className={`text-3xl font-bold mt-2 ${loading ? "text-gray-400" : colorClass.split(" ")[0]}`}
      >
        {loading ? "..." : value}
      </div>

      {/* Icon background decoration */}
      <div
        className={`absolute -bottom-4 -right-4 w-24 h-24 ${colorClass.split(" ")[1]} rounded-full opacity-10`}
      />
    </div>
  );
};
