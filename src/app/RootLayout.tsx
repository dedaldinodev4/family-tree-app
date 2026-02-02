import { Outlet } from "@tanstack/react-router";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b p-4 font-semibold">
        Family Tree
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
