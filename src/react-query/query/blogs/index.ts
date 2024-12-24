import { getBlogs } from "@/supabase/blogs";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useBlogsQueryKeys } from "./useBlogsQueryKeys";
import { Blogs } from "./index.types";

export const useGetBlogs = ({
  search,
  currentlang,
}: {
  search: string;
  currentlang: string;
}): UseQueryResult<Blogs[], Error> => {
  const { LIST } = useBlogsQueryKeys();
  return useQuery<Blogs[], Error>({
    queryKey: [LIST, search],
    queryFn: () => getBlogs({ search, currentlang }),
  });
};
