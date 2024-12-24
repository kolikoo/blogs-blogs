import { AUTH_MUTATION_KEYS } from './enum';

export const useAuthMutationKeys = () => {
  return {
    REGISTER: AUTH_MUTATION_KEYS.REGISTER,
    LOGIN: AUTH_MUTATION_KEYS.LOGIN,
    LOGOUT: AUTH_MUTATION_KEYS.LOGOUT,
  };
};
