import type { ICellRendererParams } from "ag-grid-community";
import { ForgeAvatar } from "@/components/ui/ForgeAvatar";

export function AvatarCellRenderer(params: ICellRendererParams) {
  const data = params.data;
  if (!data) return null;

  const name = data.author?.name || data.name || params.value || "";

  return (
    <div className="flex items-center gap-2.5">
      <ForgeAvatar name={name} size="sm" />
      <span className="text-sm text-ui-fg-base">{name}</span>
    </div>
  );
}
