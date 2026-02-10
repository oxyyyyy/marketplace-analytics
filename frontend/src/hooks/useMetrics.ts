import { useQuery } from "@tanstack/react-query";
import {
  getSummaryMetrics,
  getViewsHistory,
  getRevenueHistory,
  getRecentEvents,
  getCategoryStats,
} from "../services/api";

// Hook for summary metrics
export const useSummaryMetrics = () => {
  return useQuery({
    queryKey: ["metrics", "summary"],
    queryFn: getSummaryMetrics,
    refetchInterval: 5000, // Refetch every 5 seconds
    staleTime: 3000, // Consider data fresh for 3 seconds
  });
};

// Hook for views history
export const useViewsHistory = () => {
  return useQuery({
    queryKey: ["metrics", "views-history"],
    queryFn: getViewsHistory,
    refetchInterval: 10000, // Refetch every 10 seconds
    staleTime: 5000,
  });
};

// Hook for revenue history
export const useRevenueHistory = () => {
  return useQuery({
    queryKey: ["metrics", "revenue-history"],
    queryFn: getRevenueHistory,
    refetchInterval: 10000,
    staleTime: 5000,
  });
};

// Hook for recent events
export const useRecentEvents = () => {
  return useQuery({
    queryKey: ["metrics", "recent-events"],
    queryFn: getRecentEvents,
    refetchInterval: 5000,
    staleTime: 3000,
  });
};

// Hook for category stats
export const useCategoryStats = () => {
  return useQuery({
    queryKey: ["metrics", "category-stats"],
    queryFn: getCategoryStats,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 20000,
  });
};
