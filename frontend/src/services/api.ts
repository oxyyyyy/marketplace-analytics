import axios from "axios";
import type {
  SummaryMetrics,
  ChartDataPoint,
  EventRecord,
  CategoryStats,
} from "../types/metrics";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Get current metrics
export const getSummaryMetrics = async (): Promise<SummaryMetrics> => {
  const response = await api.get<SummaryMetrics>("/api/metrics/summary");
  return response.data;
};

// Get views history for chart
export const getViewsHistory = async (): Promise<ChartDataPoint[]> => {
  const response = await api.get<ChartDataPoint[]>(
    "/api/metrics/views-history",
  );
  return response.data;
};

// Get revenue history for chart
export const getRevenueHistory = async (): Promise<ChartDataPoint[]> => {
  const response = await api.get<ChartDataPoint[]>(
    "/api/metrics/revenue-history",
  );
  return response.data;
};

// Get recent events
export const getRecentEvents = async (): Promise<EventRecord[]> => {
  const response = await api.get<EventRecord[]>("/api/metrics/recent-events");
  return response.data;
};

// Get category statistics
export const getCategoryStats = async (): Promise<CategoryStats[]> => {
  const response = await api.get<CategoryStats[]>(
    "/api/metrics/category-stats",
  );
  return response.data;
};
