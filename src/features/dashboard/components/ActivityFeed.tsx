import { Badge } from "@medusajs/ui";
import { AnimatedList } from "@/components/ui/AnimatedList";
import { ForgeAvatar } from "@/components/ui/ForgeAvatar";
import { formatRelativeTime } from "@/lib/utils";
import { activityFeed } from "../data/dashboard-data";

const typeBadgeColors: Record<string, "green" | "blue" | "orange" | "purple" | "grey"> = {
  deployment: "green",
  training: "blue",
  dataset: "purple",
  model: "orange",
  team: "grey",
};

export function ActivityFeed() {
  return (
    <div className="rounded-xl border border-ui-border-base bg-ui-bg-base p-5">
      <h3 className="mb-4 text-sm font-medium text-ui-fg-base">Recent Activity</h3>
      <AnimatedList className="space-y-3">
        {activityFeed.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-ui-bg-subtle transition-colors"
          >
            <ForgeAvatar name={event.author.name} size="md" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-ui-fg-base leading-relaxed">{event.message}</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge color={typeBadgeColors[event.type] || "grey"} size="small">
                  {event.type}
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
