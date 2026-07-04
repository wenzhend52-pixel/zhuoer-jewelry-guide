import { elementMeta } from "@/lib/wuxing";
import type { ElementKey } from "@/lib/types";

export function ElementBadge({ element }: { element: ElementKey }) {
  const meta = elementMeta[element];

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${meta.className}`}>
      五行 {meta.label}
    </span>
  );
}
