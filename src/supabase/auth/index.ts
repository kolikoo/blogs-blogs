import { supabase } from "@/supabase";
import { AuthError, AuthResponse } from "@supabase/supabase-js";

export const register = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  return supabase.auth.signUp({ email, password });
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await supabase.auth.signInWithPassword({ email, password });

    if (res.error) {
      throw res.error;
    }

    return res;
  } catch (error) {
    console.log("Login failed");
    throw error;
  }
};

export const logout = (): Promise<{ error: AuthError | null }> => {
  return supabase.auth.signOut();
};
