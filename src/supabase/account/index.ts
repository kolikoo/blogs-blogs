import { ProfileFormFull } from "@/data";
import { Profile } from "@/react-query/query/account/index.types";
import { supabase } from "@/supabase";

export const fillProfileInfo = async (payload: ProfileFormFull) => {
  const { data, error } = await supabase.from("profiles").upsert(payload);
  if (error) {
    if (error.code === "23505") {
      throw new Error(`Username is already taken`);
    }
    throw error;
  }
  return data;
};

export const getProfile = async (profileId: string | number) => {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profileId);

  return data as Profile[];
};
