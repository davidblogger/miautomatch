import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { VehicleProvider } from "@/lib/vehicle-store";
import { ToastProvider } from "@/lib/toast-store";

export const metadata: Metadata = {
  title: {
    default: "Dashboard · Mi Auto Match",
    template: "%s · Dashboard Mi Auto Match",
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <VehicleProvider>
        <AdminShell>{children}</AdminShell>
      </VehicleProvider>
    </ToastProvider>
  );
}