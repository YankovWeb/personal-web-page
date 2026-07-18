import { HomeView } from "@/components/home/home-view";
import { mergeProfile } from "@/lib/about-data";
import {
  getNotes,
  getProfile,
  getPublishedArticles,
  getProjects,
  getVideos,
} from "@/lib/queries";

export default async function HomePage() {
  const [profile, articles, notes, videos, projects] = await Promise.all([
    getProfile(),
    getPublishedArticles(3),
    getNotes(3),
    getVideos(),
    getProjects(true),
  ]);

  return (
    <HomeView
      profile={mergeProfile(profile)}
      articles={articles}
      notes={notes}
      videos={videos.slice(0, 2)}
      projects={projects}
    />
  );
}
