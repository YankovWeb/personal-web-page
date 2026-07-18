import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { mergeProfile } from "@/lib/about-data";
import { getProfile } from "@/lib/queries";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = mergeProfile(await getProfile());

  return (
    <>
      <Header name={profile.name} />
      <main className="flex-1 overflow-x-clip">{children}</main>
      <Footer profile={profile} />
    </>
  );
}
