import { LoginForm } from "@/components/admin/login-form";
import { ThemeToggle } from "@/components/theme/theme-toggle";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>
      <LoginForm errorParam={error} />
    </div>
  );
}
