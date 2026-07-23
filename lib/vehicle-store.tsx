"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { AdminVehicle, ActivityItem } from "@/lib/types";
import { ADMIN_VEHICLES, ADMIN_ACTIVITIES } from "@/lib/admin-data";

type VehicleStore = {
  vehicles: AdminVehicle[];
  activities: ActivityItem[];
  getById: (id: string) => AdminVehicle | undefined;
  create: (data: Omit<AdminVehicle, "id" | "createdAt" | "updatedAt">) => AdminVehicle;
  update: (id: string, data: Partial<Omit<AdminVehicle, "id">>) => void;
  remove: (id: string) => void;
  toggleStatus: (id: string, status: AdminVehicle["status"]) => void;
};

const VehicleContext = createContext<VehicleStore | null>(null);

export function VehicleProvider({ children }: { children: React.ReactNode }) {
  const [vehicles, setVehicles] = useState<AdminVehicle[]>(ADMIN_VEHICLES);
  const [activities, setActivities] = useState<ActivityItem[]>(ADMIN_ACTIVITIES);

  const log = useCallback((item: Omit<ActivityItem, "id" | "timestamp">) => {
    setActivities((prev) => [
      {
        ...item,
        id: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);
  }, []);

  const getById = useCallback(
    (id: string) => vehicles.find((v) => v.id === id),
    [vehicles]
  );

  const create = useCallback(
    (data: Omit<AdminVehicle, "id" | "createdAt" | "updatedAt">): AdminVehicle => {
      const now = new Date().toISOString();
      const vehicle: AdminVehicle = {
        ...data,
        id: `v-${Date.now()}`,
        createdAt: now,
        updatedAt: now,
      };
      setVehicles((prev) => [vehicle, ...prev]);
      log({
        type: "created",
        vehicleId: vehicle.id,
        vehicleLabel: `${vehicle.brand} ${vehicle.model}`,
        user: "Tú",
      });
      return vehicle;
    },
    [log]
  );

  const update = useCallback(
    (id: string, data: Partial<Omit<AdminVehicle, "id">>) => {
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === id ? { ...v, ...data, updatedAt: new Date().toISOString() } : v
        )
      );
      const target = vehicles.find((v) => v.id === id);
      if (target) {
        log({
          type: "updated",
          vehicleId: id,
          vehicleLabel: `${target.brand} ${target.model}`,
          user: "Tú",
        });
      }
    },
    [vehicles, log]
  );

  const remove = useCallback(
    (id: string) => {
      const target = vehicles.find((v) => v.id === id);
      setVehicles((prev) => prev.filter((v) => v.id !== id));
      if (target) {
        log({
          type: "deleted",
          vehicleId: id,
          vehicleLabel: `${target.brand} ${target.model}`,
          user: "Tú",
        });
      }
    },
    [vehicles, log]
  );

  const toggleStatus = useCallback(
    (id: string, status: AdminVehicle["status"]) => {
      update(id, { status });
    },
    [update]
  );

  const value = useMemo<VehicleStore>(
    () => ({ vehicles, activities, getById, create, update, remove, toggleStatus }),
    [vehicles, activities, getById, create, update, remove, toggleStatus]
  );

  return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>;
}

export function useVehicleStore() {
  const ctx = useContext(VehicleContext);
  if (!ctx) throw new Error("useVehicleStore must be used inside VehicleProvider");
  return ctx;
}