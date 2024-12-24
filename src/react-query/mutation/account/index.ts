import { fillProfileInfo } from "@/supabase/account";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { useAuthMutationKeys } from "./useAccountMutationKeys";
import { ProfileFormFull } from "@/data";

export const useFillProfileInfo = (
  options?: UseMutationOptions<null, Error, ProfileFormFull, unknown>,
): UseMutationResult<null, Error, ProfileFormFull, unknown> => {
  const { PROFILE } = useAuthMutationKeys();
  return useMutation<null, Error, ProfileFormFull, unknown>({
    mutationKey: [PROFILE],
    mutationFn: fillProfileInfo,
    ...options,
  });
};
