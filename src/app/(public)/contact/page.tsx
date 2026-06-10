import type { Metadata } from "next";
import { ContactView } from "@/components/pages/contact-view";
import { getAvailabilityMessage } from "@/lib/availability";
import { getProfile } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const profile = await getProfile();
  const availabilityMessage = getAvailabilityMessage(
    profile?.availability_status,
  );

  return (
    <ContactView profile={profile} availabilityMessage={availabilityMessage} />
  );
}
