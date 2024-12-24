import { ModeToggle } from "@/components/theme/mode-toggle";
import { ChangeLanguage } from "@/components/base/change-language";
import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import useCurrentLang from "@/i18n/currentLang";
import { loginAtom } from "@/store";
import { useAtomValue } from "jotai";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MAIN_PATH } from "@/routes/root-layout/index.enum";
import { useLogOut } from "@/react-query/mutation/auth";
import { useGetProfile } from "@/react-query/query/account";
const Header: React.FC = () => {
  const { t } = useTranslation();
  const currentLang = useCurrentLang();
  const user = useAtomValue(loginAtom);
  const { mutate: logOut } = useLogOut();

  const { data } = useGetProfile({
    id: user?.user.id ?? "",
    queryOptions: { enabled: !!user?.user.id },
  });

  const handleLogOut = () => {
    logOut();
  };
  return (
    <header className="w-full h-20 sticky top-0 bg-yellow-500 flex items-center justify-between px-16 py-6 z-10">
      <h1 className="text-2xl font-semibold uppercase text-black">
        BLOGS
      </h1>
      <div className="flex gap-6">
        <NavLink to={`/${currentLang}/${MAIN_PATH.HOME}`} className="uppercase text-black">
          <Trans>header.home</Trans>
        </NavLink>
        
        <NavLink
          to={`/${currentLang}/${MAIN_PATH.WRITE}`}
          className="uppercase text-black"
        >
          <Trans>header.write</Trans>
        </NavLink>
      </div>
      <div className="flex justify-center items-center gap-3">
        {user ? (
          <div className="flex justify-center items-center gap-4">
            <Link to={`/${currentLang}/${MAIN_PATH.PROFILE}`}>
              <Avatar>
                <AvatarImage
                  src={
                    data && data[0].avatar_url ? data[0].avatar_url : undefined
                  }
                />
                <AvatarFallback>PP</AvatarFallback>
              </Avatar>
            </Link>
            <div
              onClick={handleLogOut}
              className="cursor-pointer hover:text-white text-black"
            >
              <Trans>header.logout</Trans>
            </div>
          </div>
        ) : (
          <Link to={`/${currentLang}/${MAIN_PATH.LOGIN}`}>
            <Button className="hover-white font-semibold text-black">
              <Trans>header.sign</Trans>
            </Button>
          </Link>
        )}

        <ChangeLanguage />
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
