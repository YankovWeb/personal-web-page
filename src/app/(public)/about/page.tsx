import type { Metadata } from "next";
import { AboutView } from "@/components/about/about-view";
import { getAboutPageData } from "@/lib/about-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior React & React Native engineer — career journey, skills, and professional background.",
};

export default async function AboutPage() {
  const data = await getAboutPageData();

  return <AboutView data={data} />;
}
