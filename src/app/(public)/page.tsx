import { HomeView } from "@/components/home/home-view";
import {
  getProfile,
  getPublishedArticles,
  getProjects,
} from "@/lib/queries";

export default async function HomePage() {
  const [profile, articles, projects] = await Promise.all([
    getProfile(),
    getPublishedArticles(3),
    getProjects(true),
  ]);

  return (
    <HomeView profile={profile} articles={articles} projects={projects} />
  );
}
