"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeleteButton({
  onDelete,
  label = "Delete",
}: {
  onDelete: () => Promise<void>;
  label?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="danger"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!confirm(`Are you sure you want to ${label.toLowerCase()}?`)) return;
        startTransition(() => onDelete());
      }}
    >
      <Trash2 size={14} />
      {pending ? "Deleting..." : label}
    </Button>
  );
}
