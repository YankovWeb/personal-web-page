import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin-email";

export { getAdminEmail, isAdminEmail } from "@/lib/admin-email";

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function requireAdmin() {
  const user = await getUser();
  if (!user || !isAdminEmail(user.email)) {
    throw new Error("Unauthorized");
  }
  return user;
}
