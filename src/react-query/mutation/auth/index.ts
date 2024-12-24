import { login, logout, register } from "@/supabase/auth";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useAuthMutationKeys } from "./useAuthMutationKeys";
import { AuthError, AuthResponse, PostgrestError } from "@supabase/supabase-js";
import { LoginResponse, RegisterProps } from "./index.types";

export const useRegister = (): UseMutationResult<
  AuthResponse,
  PostgrestError,
  RegisterProps
> => {
  const { REGISTER } = useAuthMutationKeys();
  return useMutation<AuthResponse, PostgrestError, RegisterProps>({
    mutationKey: [REGISTER],
    mutationFn: register,
  });
};
export const useLogin = (): UseMutationResult<
  LoginResponse,
  PostgrestError,
  RegisterProps
> => {
  const { LOGIN } = useAuthMutationKeys();
  return useMutation<LoginResponse, PostgrestError, RegisterProps>({
    mutationKey: [LOGIN],
    mutationFn: login,
  });
};
export const useLogOut = (): UseMutationResult<
  { error: AuthError | null },
  PostgrestError,
  void
> => {
  const { LOGOUT } = useAuthMutationKeys();
  return useMutation<{ error: AuthError | null }, PostgrestError, void>({
    mutationKey: [LOGOUT],
    mutationFn: logout,
  });
};
