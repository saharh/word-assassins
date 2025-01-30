import { signOutAction } from "@/app/(auth-pages)/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { createClient } from "@/utils/supabase/server";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { Crosshair, LayoutDashboard, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
      <Button asChild variant="ghost" size="sm" className="hidden md:flex">
        <a href="/dashboard" className="flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboard</span>
        </a>
      </Button>
      <p className="text-sm text-muted-foreground hidden sm:block">
        {user?.email}
      </p>
      <form action={signOutAction} className="hidden md:block">
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
                  <div className="flex flex-col gap-3">
                    <div className="px-2">
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button asChild variant="ghost" size="sm">
                        <a
                          href="/dashboard"
                          className="flex items-center gap-2"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          <span>Dashboard</span>
                        </a>
                      </Button>
                      <form action={signOutAction}>
                        <Button
                          type="submit"
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          Sign out
                        </Button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="w-full"
                    >
                      <a href="/sign-in">Sign in</a>
                    </Button>
                    <Button asChild size="sm" className="w-full">
                      <a href="/sign-up">Sign up</a>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
