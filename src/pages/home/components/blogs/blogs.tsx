import { Input } from "@/components/ui/input";
import { FilterValue } from "@/data";
import useCurrentLang from "@/i18n/currentLang";
import { Controller, useForm } from "react-hook-form";
import { useDebounce } from "@uidotdev/usehooks";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import { useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import i18n from "i18next";
import "dayjs/locale/ka";
import "dayjs/locale/en";
import { formatDate } from "@/lib/formatDate";
import { useGetBlogs } from "@/react-query/query/blogs";
dayjs.extend(relativeTime);
const Blogs: React.FC = () => {
  dayjs.locale(i18n.language);
  const currentlang = useCurrentLang();
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultFilterValues = qs.parse(searchParams.toString());
  const { control, watch } = useForm<FilterValue>({
    defaultValues: defaultFilterValues || "",
  });
  const searched = watch("search");
  const debouncedSearched = useDebounce(searched, 1000);
  const { data: blogsList } = useGetBlogs({
    search: debouncedSearched || "",
    currentlang,
  });
  useEffect(() => {
    if (searched) {
      setSearchParams(
        qs.stringify(
          { search: searched },
          {
            skipNulls: true,
            filter: (_, value) => value || undefined,
          },
        ),
      );
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [searched, setSearchParams]);

  return (
    <div className="w-full">
      <form className="max-w-sm flex gap-3 justify-center items-center">
        <Controller
          control={control}
          name="search"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter search text"
              value={field.value || ""}
            />
          )}
        />
      </form>
      <div>
        {blogsList?.map((blog) => {
          const imageUrl = blog.image_url
            ? `${import.meta.env.VITE_SUPABASE_IMAGE_STORAGE}/${blog.image_url}`
            : "";
          const { oneDay, timePassed, fullDate } = formatDate(blog.created_at);
          return (
            <div
              className="bg-yellow-500 m-5 p-2 rounded-2xl flex gap-6"
              key={blog.id}
            >
              <img src={imageUrl} className="w-[300px] h-[300px] rounded-xl" />
              <div className="flex flex-col gap-6 justify-between">
                <div>
                  <h1 className="font-bold text-white text-3xl">
                    {currentlang === "ka" ? blog.title_ka : blog.title_en}
                  </h1>
                  <p className="text-xl mt-5">
                    {currentlang === "ka"
                      ? blog.description_ka
                      : blog.description_en}
                  </p>
                </div>
                <p>{oneDay ? timePassed : fullDate}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Blogs;
