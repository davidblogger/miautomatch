import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { VehicleProvider } from "@/lib/vehicle-store";
import { BlogProvider } from "@/lib/blog-store";
import { ToastProvider } from "@/lib/toast-store";
import { UserProvider } from "@/lib/user-store";

export const metadata: Metadata = {
  title: {
    default: "Dashboard · Mi Auto Match",
    template: "%s · Dashboard Mi Auto Match",
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <UserProvider>
        <VehicleProvider>
          <BlogProvider>
            <AdminShell>{children}</AdminShell>
          </BlogProvider>
        </VehicleProvider>
      </UserProvider>
    </ToastProvider>
  );
}
