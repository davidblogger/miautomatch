"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { AdminUser } from "@/lib/types";
import { ADMIN_USERS } from "@/lib/admin-data";

type UserStore = {
  users: AdminUser[];
  getById: (id: string) => AdminUser | undefined;
  create: (data: Omit<AdminUser, "id" | "joinedAt">) => AdminUser;
  update: (id: string, data: Partial<Omit<AdminUser, "id">>) => void;
  remove: (id: string) => void;
  addFavorite: (userId: string, vehicleId: string) => void;
  removeFavorite: (userId: string, vehicleId: string) => void;
};

const UserContext = createContext<UserStore | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<AdminUser[]>(ADMIN_USERS);

  const getById = useCallback((id: string) => users.find((u) => u.id === id), [users]);

  const create = useCallback((data: Omit<AdminUser, "id" | "joinedAt">): AdminUser => {
    const user: AdminUser = {
      ...data,
      id: `user-${Date.now()}`,
      joinedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };
    setUsers((prev) => [user, ...prev]);
    return user;
  }, []);

  const update = useCallback((id: string, data: Partial<Omit<AdminUser, "id">>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...data } : u))
    );
  }, []);

  const remove = useCallback((id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  const addFavorite = useCallback((userId: string, vehicleId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const ids = u.favoriteVehicleIds ?? [];
        if (ids.includes(vehicleId)) return u;
        return { ...u, favoriteVehicleIds: [...ids, vehicleId] };
      })
    );
  }, []);

  const removeFavorite = useCallback((userId: string, vehicleId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        return { ...u, favoriteVehicleIds: (u.favoriteVehicleIds ?? []).filter((id) => id !== vehicleId) };
      })
    );
  }, []);

  const value = useMemo<UserStore>(
    () => ({ users, getById, create, update, remove, addFavorite, removeFavorite }),
    [users, getById, create, update, remove, addFavorite, removeFavorite]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserStore() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserStore must be used inside UserProvider");
  return ctx;
}
