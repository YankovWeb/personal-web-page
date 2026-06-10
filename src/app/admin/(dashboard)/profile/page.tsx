import { createClient } from "@/lib/supabase/server";
import { ProfileEditor } from "@/components/admin/profile-editor";
import type { Profile } from "@/lib/types";

export default async function AdminProfilePage() {
  const supabase = await createClient();
  const { data } = await supabase.from("profile").select("*").single();
  const profile = data as Profile;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="mt-1 text-sm text-muted">
        Edit your public profile and preview how it looks on the site.
      </p>

      {profile ? (
        <ProfileEditor profile={profile} />
      ) : (
        <p className="mt-8 text-muted">Profile not found.</p>
      )}
    </div>
  );
}
