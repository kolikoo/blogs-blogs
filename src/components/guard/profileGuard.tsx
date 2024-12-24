import useCurrentLang from "@/i18n/currentLang";
import { MAIN_PATH } from "@/routes/root-layout/index.enum";
import { loginAtom } from "@/store";
import { useAtomValue } from "jotai";
import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProfileGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useAtomValue(loginAtom);
  const currentLang = useCurrentLang();
  if (!user) {
    return <Navigate to={`/${currentLang}/${MAIN_PATH.HOME}`} />;
  }
  return children || <Outlet />;
};
export default ProfileGuard;
