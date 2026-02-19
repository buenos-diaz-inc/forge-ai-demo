import { Button } from "@medusajs/ui";
import type { ComponentType } from "react";

interface EmptyStateProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ui-bg-subtle text-ui-fg-muted">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-medium text-ui-fg-base">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-ui-fg-muted">{description}</p>
      {actionLabel && onAction && (
        <Button className="mt-4" variant="secondary" size="small" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
