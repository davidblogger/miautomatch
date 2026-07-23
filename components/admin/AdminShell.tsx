import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <div className="px-6 lg:px-10 pt-2 pb-12 max-w-[1600px] mx-auto">
          <Topbar />
          {children}
        </div>
      </main>
    </div>
  );
}