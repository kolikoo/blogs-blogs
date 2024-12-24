import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogFormShema, BlogsForm } from "@/schema";
import { blogsDefaultValues } from "@/data";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { loginAtom } from "@/store";
import { useNavigate } from "react-router-dom";
import useCurrentLang from "@/i18n/currentLang";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { MAIN_PATH } from "@/routes/root-layout/index.enum";
import { useAddBlog } from "@/react-query/mutation/blogs";
import { useBlogsQueryKeys } from "@/react-query/query/blogs/useBlogsQueryKeys";
const CreateForm: React.FC = () => {
  const { LIST } = useBlogsQueryKeys();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const user = useAtomValue(loginAtom);
  const navigate = useNavigate();
  const currentLang = useCurrentLang();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogsForm>({
    resolver: zodResolver(blogFormShema),
    defaultValues: blogsDefaultValues,
  });
  const { mutate: handleAddBlog } = useAddBlog({
    onSuccess: () => {
      navigate(`/${currentLang}/${MAIN_PATH.HOME}`);
      queryClient.invalidateQueries({ queryKey: [LIST] });
    },
  });
  const onSubmit: SubmitHandler<BlogsForm> = (data) => {
    handleAddBlog({ payload: data, user });
  };
  return (
    <form
      className="flex flex-col gap-3 bg-yellow-500 p-5 rounded-2xl w-[600px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl text-center">Create Blog</h1>
      <div>
        <label>title</label>
        <Controller
          control={control}
          name="title_ka"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter title"
              className={`${errors.title_ka ? "border-red-500" : "border-black"}`}
            />
          )}
        />
        {errors.title_ka && (
          <span className="text-red-600 font-semibold">
            {t(errors.title_ka.message ?? "")}
          </span>
        )}
      </div>
      <div>
    
      </div>
      <div>
        <label>description</label>
        <Controller
          control={control}
          name="description_ka"
          render={({ field }) => (
            <Textarea
              {...field}
              rows={4}
              placeholder="Enter description"
              className={`${errors.description_ka ? "border-red-500" : "border-black"}`}
            />
          )}
        />
        {errors.description_ka && (
          <span className="text-red-600 font-semibold">
            {t(errors.description_ka.message ?? "")}
          </span>
        )}
      </div>
      <div>
     
        {errors.description_en && (
          <span className="text-red-600 font-semibold">
            {t(errors.description_en.message ?? "")}
          </span>
        )}
      </div>
      <div>
        <label>{t("blog.image_url")}</label>
        <Controller
        
          control={control}
          name="image_url"
          render={({ field: { onChange } }) => (
            <Input 
              onChange={(e) => {
                const file = e.target.files?.[0];
                onChange(file);
              }}
              type="file"
              className={`${errors.image_url ? "border-red-500" : "border-black " }rounded-[10px]`}
            />
          )}
        />
        {errors.image_url && (
          <span className="text-red-600 font-semibold">
            {t(errors.image_url.message ?? "")}
          </span>
        )}
      </div>
      <Button type="submit">{t("blog.create_button")}</Button>
    </form>
  );
};
export default CreateForm;
