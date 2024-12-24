import { getProfile } from "@/supabase/account";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { Profile } from "./index.types";

import { useAccountQueryKeys } from "./useAccountQueryKeys";

export const useGetProfile = ({
  id,
  queryOptions,
}: {
  id: string | number;
  queryOptions?: Omit<UseQueryOptions<Profile[], Error>, "queryKey">;
}): UseQueryResult<Profile[], Error> => {
  const { INFO } = useAccountQueryKeys();
  return useQuery<Profile[], Error>({
    queryKey: [INFO, id],
    queryFn: () => getProfile(id),
    ...queryOptions,
  });
};
