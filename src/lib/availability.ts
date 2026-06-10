import type { AvailabilityStatus } from "@/lib/types";

const labels: Record<AvailabilityStatus, string> = {
  unavailable: "",
  freelance: "Available for freelance and contract work",
  full_time: "Open to full-time opportunities",
  both: "Open to full-time and freelance work",
};

const badgeLabels: Record<AvailabilityStatus, string> = {
  unavailable: "",
  freelance: "Available for freelance",
  full_time: "Open to full-time roles",
  both: "Open to work",
};

export function getAvailabilityMessage(
  status: AvailabilityStatus | null | undefined,
): string | null {
  if (!status || status === "unavailable") return null;
  return labels[status];
}

export function getAvailabilityBadge(
  status: AvailabilityStatus | null | undefined,
): string | null {
  if (!status || status === "unavailable") return null;
  return badgeLabels[status];
}

export const availabilityOptions: {
  value: AvailabilityStatus;
  label: string;
}[] = [
  { value: "unavailable", label: "Not available" },
  { value: "freelance", label: "Freelance & contract only" },
  { value: "full_time", label: "Full-time only" },
  { value: "both", label: "Full-time and freelance" },
];
