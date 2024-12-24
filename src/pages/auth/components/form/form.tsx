import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import useCurrentLang from "@/i18n/currentLang";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginForm } from "@/data";
import { MAIN_PATH } from "@/routes/root-layout/index.enum";
import { useLogin } from "@/react-query/mutation/auth";
const AuthForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLang = useCurrentLang();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ defaultValues: { email: "", password: "" } });
  const { mutate: handleLogin } = useLogin();
  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    handleLogin(data, {
      onSuccess: () => navigate(`/${currentLang}/${MAIN_PATH.HOME}`),
    });
  };
  console.log(errors);
  return (
    <form
      className="flex flex-col gap-3 bg-yellow-500 p-5 rounded-2xl w-[450px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl">{t("auth.login")}</h1>
      <p>
        <Trans>auth.enter</Trans>
      </p>
      <div>
        <label>
          <Trans>auth.email</Trans>
        </label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "auth.emailRequired",
            minLength: {
              value: 5,
              message: "auth.emailMinLength",
            },
            maxLength: {
              value: 30,
              message: "auth.emailMaxLength",
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "auth.emailPattern",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter email"
              className={`${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
          )}
        />
        {errors.email && (
          <span className="text-red-600 font-semibold">
            {t(errors.email.message ?? "")}
          </span>
        )}
      </div>
      <div>
        <label>
          <Trans>auth.password</Trans>
        </label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "auth.passRequired",
            minLength: {
              value: 6,
              message: "auth.passMinLength",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              placeholder="Enter password"
              className={`${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
          )}
        />
        {errors.password && (
          <span className="text-red-600 font-semibold">
            {t(errors.password.message ?? "")}
          </span>
        )}
      </div>
      <Button className="bg-blue-600 font-bold text-white">
        <Trans>auth.loginBtn</Trans>
      </Button>
      <p>
        <Trans>auth.acc</Trans>{" "}
      </p>
      <Link
        to={`/${currentLang}/${MAIN_PATH.REGISTER}`}
        className="text-blue-600 font-bold hover:underline"
      >
        <Trans>auth.signup</Trans>
      </Link>
    </form>
  );
};
export default AuthForm;
