import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Fetch profile dari tabel user_profiles */
  async function fetchProfile(uid) {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", uid)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error.message);
      return null;
    }

    /* Kalau profile belum ada (trigger gagal), buat otomatis */
    if (!data) {
      const fullName =
        user?.user_metadata?.full_name ||
        user?.email?.split("@")[0] ||
        "User";
      const role = user?.user_metadata?.role || "member";

      const { data: newProfile, error: insertError } = await supabase
        .from("user_profiles")
        .insert({
          id: uid,
          full_name: fullName,
          role: role,
          points: 0,
          tier: "Bronze",
        })
        .select()
        .maybeSingle();

      if (insertError) {
        console.error("Error creating profile:", insertError.message);
        return null;
      }

      if (newProfile) {
        setProfile(newProfile);
        return newProfile;
      }
      return null;
    }

    setProfile(data);
    return data;
  }

  /* Init: cek session yang ada */
  useEffect(() => {
    async function initSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      }
      setLoading(false);
    }
    initSession();

    /* Listener: sync state saat auth berubah */
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  /* Login */
  async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    setUser(data.user);
    const prof = await fetchProfile(data.user.id);
    return prof;
  }

  /* Register - selalu jadi member, admin diatur manual di Supabase */
  async function register({ email, password, fullName }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    if (error) throw error;
    return data;
  }

  /* Logout */
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setProfile(null);
  }

  const value = {
    user,
    profile,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
