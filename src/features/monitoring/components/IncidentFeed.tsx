import { Badge } from "@medusajs/ui";
import { AnimatedList } from "@/components/ui/AnimatedList";
import { formatRelativeTime } from "@/lib/utils";
import { incidentFeed, type IncidentEvent } from "../data/monitoring-data";

type FeedSeverity = IncidentEvent["severity"];

const iconPaths: Record<FeedSeverity, string> = {
  critical:
    "M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h0",
  warning:
    "M3 3v18h18M19 9l-5 5-4-4-3 3",
  resolved:
    "M22 11.1V12a10 10 0 1 1-5.9-9.1M9 11l3 3L22 4",
  info:
    "M12 3v6M5.6 5.6l4.2 4.2M3 12h6M18.4 5.6l-4.2 4.2M12 16a4 4 0 1 1 0 8 4 4 0 0 1 0-8z",
};

const badgeColors: Record<FeedSeverity, "red" | "orange" | "green" | "blue"> = {
  critical: "red",
  warning: "orange",
  resolved: "green",
  info: "blue",
};

const iconBgClasses: Record<FeedSeverity, string> = {
  critical: "bg-rose-50 text-rose-600",
  warning: "bg-amber-50 text-amber-600",
  resolved: "bg-emerald-50 text-emerald-600",
  info: "bg-blue-50 text-blue-600",
};

function FeedIcon({ severity }: { severity: FeedSeverity }) {
  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconBgClasses[severity]}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {iconPaths[severity].split("M").filter(Boolean).map((d, i) => (
          <path key={i} d={`M${d}`} />
        ))}
      </svg>
    </div>
  );
}

export function IncidentFeed() {
  return (
    <div className="rounded-xl border border-ui-border-base bg-ui-bg-base p-5">
      <h3 className="mb-0.5 text-sm font-semibold text-ui-fg-base">Incident Feed</h3>
      <p className="mb-4 text-xs text-ui-fg-muted">Alert lifecycle events</p>
      <AnimatedList className="space-y-1">
        {incidentFeed.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-3 rounded-lg p-2 hover:bg-ui-bg-subtle transition-colors"
          >
            <FeedIcon severity={event.severity} />
            <div className="min-w-0 flex-1">
              <p
                className="text-sm leading-relaxed text-ui-fg-base"
                dangerouslySetInnerHTML={{ __html: event.message }}
              />
              <div className="mt-1 flex items-center gap-2">
                <Badge color={badgeColors[event.severity]} size="small">
                  {event.severity}
                </Badge>
                <span className="text-xs text-ui-fg-muted">
                  {formatRelativeTime(event.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </AnimatedList>
    </div>
  );
}
