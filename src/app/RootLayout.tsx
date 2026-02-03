import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { Link, Outlet } from "@tanstack/react-router";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster
        richColors
        position="top-center"
        icons={{
          success: <CheckCircle className="h-5 w-5 text-green-500" />,
          error: <XCircle className="h-5 w-5 text-red-500" />,
          warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
          info: <Info className="h-5 w-5 text-blue-500" />,
        }}
      />

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
