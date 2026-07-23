import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { VehicleProvider } from "@/lib/vehicle-store";

export const metadata: Metadata = {
  title: {
    default: "Dashboard · Mi Auto Match",
    template: "%s · Dashboard Mi Auto Match",
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <VehicleProvider>
      <AdminShell>{children}</AdminShell>
    </VehicleProvider>
  );
}