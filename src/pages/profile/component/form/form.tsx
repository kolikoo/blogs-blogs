import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { loginAtom } from "@/store";
import { useAtomValue } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ProfileForm } from "@/data";
import { useFillProfileInfo } from "@/react-query/mutation/account";
import { useAccountQueryKeys } from "@/react-query/query/account/useAccountQueryKeys";
const Form: React.FC = () => {
  const { INFO } = useAccountQueryKeys();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const user = useAtomValue(loginAtom);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProfileForm>({
    defaultValues: {
      username: "",
      name_ka: "",
      name_en: "",
      surname_ka: "",
      surname_en: "",
      phone: "",
      avatar_url: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: handleProfile } = useFillProfileInfo({
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [INFO],
      });
    },
    onError: (error) => {
      if (error.message === "Username is already taken") {
        setErrorMessage("Username is already taken");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    },
    onSuccess: () => {
      console.log("Success!");
      setErrorMessage("");
      if (Object.keys(errors).length === 0) {
        reset();
      }
    },
  });

  const onSubmit: SubmitHandler<ProfileForm> = (data) => {
    if (user) {
      handleProfile({ ...data, id: user?.user.id });
    }
  };
  return (
    <form
      className="flex flex-col gap-3 bg-yellow-500 p-5 rounded-2xl w-[450px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl">{t("profile.info")}</h1>
      <div>
        <label>{t("profile.username")}</label>
        <Controller
          control={control}
          name="username"
          rules={{
            required: "profile.usernameRequired",
            minLength: {
              value: 4,
              message: "profile.userMinLength",
            },
            maxLength: {
              value: 20,
              message: "profile.userMaxLength",
            },
          }}
          render={({ field }) => (
            <Input
              placeholder="Enter username"
              {...field}
              onChange={(e) => {
                setValue(
                  "avatar_url",
                  `https://api.dicebear.com/9.x/pixel-art/svg?seed=${e.target.value}`,
                );
                setErrorMessage("");
                field.onChange(e);
              }}
              className={`${errors.username ? "border-red-600" : "border-gray-300"}`}
            />
          )}
        />
        {errorMessage && <p className="text-red-700">{errorMessage}</p>}
        {!errorMessage && errors.username && (
          <span className="text-red-600 font-semibold">
            {t(errors.username.message ?? "")}
          </span>
        )}
      </div>
      <label>name</label>
      <Controller
        control={control}
        name="name_ka"
        rules={{
          required: "profile.nameReq",
          minLength: {
            value: 3,
            message: "profile.nameMinLength",
          },
          maxLength: {
            value: 10,
            message: "profile.nameMaxLength",
          },
        }}
        render={({ field }) => (
          <Input
            placeholder="Enter name in Georgian"
            {...field}
            className={`${errors.name_ka ? "border-red-600" : "border-gray-300"}`}
          />
        )}
      />
      {errors.name_ka && (
        <span className="text-red-600 font-semibold">
          {t(errors.name_ka.message ?? "")}
        </span>
      )}
     

     
      <label>usernmae </label>
      <Controller
        control={control}
        name="surname_en"
        rules={{
          required: "profile.surnameReq",
          minLength: {
            value: 4,
            message: "profile.surnameMinLength",
          },
          maxLength: {
            value: 15,
            message: "profile.surnameMaxLength",
          },
        }}
        render={({ field }) => (
          <Input
            placeholder="Enter surname in English"
            {...field}
            className={`${errors.surname_en ? "border-red-600" : "border-gray-300"}`}
          />
        )}
      />
      {errors.surname_en && (
        <span className="text-red-600 font-semibold">
          {t(errors.surname_en.message ?? "")}
        </span>
      )}

      <div>
        <label>{t("profile.phone")}</label>
        <Controller
          control={control}
          name="phone"
          rules={{
            required: "profile.phoneReq",
            pattern: {
              value: /^[0-9]{9}$/,
              message: "profile.phoneExactLength",
            },
          }}
          render={({ field }) => (
            <Input
              placeholder="Enter phone number"
              {...field}
              className={`${errors.phone ? "border-red-600" : "border-gray-300"}`}
            />
          )}
        />
        {errors.phone && (
          <span className="text-red-600 font-semibold">
            {t(errors.phone.message ?? "")}
          </span>
        )}
      </div>

      <Button type="submit">{t("profile.save")}</Button>
    </form>
  );
};

export default Form;
