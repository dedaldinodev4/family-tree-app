import { Link, Outlet } from "@tanstack/react-router";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b p-4 font-semibold">
      <Link to="/">
        Family Tree
      </Link>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
