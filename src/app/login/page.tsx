import { AuthCard } from "@/components/auth/auth-card";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <AuthCard>
        <AuthHeader
          title="Welcome Back"
          description="Login to continue to HireFlow."
        />

        <form className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Email
            </label>

            <Input
              type="email"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Password
            </label>

            <Input
              type="password"
              placeholder="••••••••"
            />
          </div>

          <Button className="w-full">
            Login
          </Button>
        </form>

        <AuthFooter
          text="Don't have an account?"
          linkText="Create one"
          href="/signup"
        />
      </AuthCard>
    </main>
  );
}