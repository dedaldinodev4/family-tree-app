import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { Link, Outlet } from "@tanstack/react-router";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-between items-center border-b p-4 font-semibold">
        <Link to="/" className="text-lg">
          Family Tree
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
