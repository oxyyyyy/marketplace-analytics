import React, { useState } from "react";
import { useRecentEvents } from "../../hooks/useMetrics";
import { useWebSocket } from "../../hooks/useWebSocket";
import type { EventRecord, MarketplaceEvent } from "../../types/metrics";
import {
  getEventDisplayText,
  getEventIcon,
  getEventColor,
  getRelativeTime,
} from "../../utils/formatters";

export const EventsTable: React.FC = () => {
  const { data: initialEvents, isLoading, error } = useRecentEvents();
  const [events, setEvents] = useState<EventRecord[]>(initialEvents || []);

  // Subscribe to real-time events via WebSocket
  useWebSocket((newEvent: MarketplaceEvent) => {
    const newEventRecord: EventRecord = {
      id: Date.now(), // Temporary ID
      type: newEvent.type,
      payload: newEvent,
      timestamp: new Date().toISOString(),
    };

    setEvents((prev) => [newEventRecord, ...prev].slice(0, 20)); // Keep only 20 most recent
  });

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="text-red-500 text-center">Error loading events</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Live Events Stream
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Real-time marketplace activity
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600 font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="divide-y divide-gray-100">
        {isLoading ? (
          <div className="px-6 py-12 text-center text-gray-400">
            <div className="animate-pulse">Loading events...</div>
          </div>
        ) : events.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-400">
            No events yet. Waiting for activity...
          </div>
        ) : (
          events.map((event) => <EventRow key={event.id} event={event} />)
        )}
      </div>
    </div>
  );
};

// Event Row Component
const EventRow: React.FC<{ event: EventRecord }> = ({ event }) => {
  const icon = getEventIcon(event.type);
  const color = getEventColor(event.type);
  const text = getEventDisplayText(event.payload);
  const time = getRelativeTime(event.timestamp);

  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150 animate-fadeIn">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl"
          style={{ backgroundColor: `${color}15` }}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{text}</p>
          <div className="flex items-center gap-3 mt-1">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
              style={{
                backgroundColor: `${color}15`,
                color: color,
              }}
            >
              {event.type.replace("_", " ")}
            </span>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
