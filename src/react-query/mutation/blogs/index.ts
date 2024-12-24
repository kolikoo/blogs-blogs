/* eslint-disable @typescript-eslint/no-explicit-any */
import { addBlog } from "@/supabase/blogs";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { useBlogsMutationKeys } from "./useBlogsMutationKeys";

export const useAddBlog = (
  options?: UseMutationOptions<any, Error, any, unknown>,
): UseMutationResult<void, Error, any, unknown> => {
  const { BLOG_ADD } = useBlogsMutationKeys();
  return useMutation<void, Error, any, unknown>({
    mutationKey: [BLOG_ADD],
    mutationFn: (variables: { payload: any; user: any }) => addBlog(variables),
    ...options,
  });
};
