"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AdminUser } from "@/lib/types";

type UseCurrentUser = {
  user: AdminUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

export function useCurrentUser(): UseCurrentUser {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const supabaseRef = useRef(createClient());

  const fetchUser = useCallback(async () => {
    setLoading(true);
    const supabase = supabaseRef.current;
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .single();

    const { data: favorites } = await supabase
      .from("user_favorites")
      .select("vehicle_id")
      .eq("user_id", authUser.id);

    setUser({
      id: authUser.id,
      role: (profile?.role as AdminUser["role"]) ?? "user",
      name: profile?.name ?? authUser.email?.split("@")[0] ?? "",
      email: authUser.email ?? "",
      phone: profile?.phone ?? undefined,
      city: profile?.city ?? undefined,
      status: (profile?.status as AdminUser["status"]) ?? "pending",
      joinedAt: profile?.created_at ?? authUser.created_at,
      lastActiveAt: profile?.last_active_at ?? undefined,
      favoriteVehicleIds: favorites?.map((f: { vehicle_id: string }) => f.vehicle_id) ?? [],
    });
    setLoading(false);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchUser(); }, [fetchUser]);

  const signOut = useCallback(async () => {
    const supabase = supabaseRef.current;
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  return { user, loading, signOut, refresh: fetchUser };
}
