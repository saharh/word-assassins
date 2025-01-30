import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { createClient } from "@/utils/supabase/server";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { Crosshair } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const AuthButtons = () => (
    <div className="flex items-center gap-4">
      <Button asChild variant="ghost" size="sm">
        <a href="/sign-in">Sign in</a>
      </Button>
      <Button asChild size="sm">
        <a href="/sign-up">Sign up</a>
      </Button>
    </div>
  );

  const UserMenu = () => (
    <div className="flex items-center gap-4">
      <p className="text-sm text-muted-foreground hidden sm:block">
        {user?.email}
      </p>
      <form action={signOutAction}>
        <Button type="submit" variant="outline" size="sm">
          Sign out
        </Button>
      </form>
    </div>
  );

  return (
    <header className="w-full border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo section */}
        <a href="/" className="flex items-center gap-2 hover:opacity-90">
          <Crosshair className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg hidden sm:block">
            Word Assassins
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ThemeSwitcher />
          {!hasEnvVars ? (
            <Button disabled variant="outline" size="sm">
              Setup required
            </Button>
          ) : user ? (
            <UserMenu />
          ) : (
            <AuthButtons />
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {!hasEnvVars ? (
                  <Button disabled variant="outline" size="sm">
                    Setup required
                  </Button>
                ) : user ? (
                  <UserMenu />
                ) : (
                  <AuthButtons />
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
