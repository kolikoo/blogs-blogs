import Form from "#/profile/component/form";
import MainInfo from "#/profile/component/mainInfo";
import Info from "#/profile/component/additionalInfo";
import { loginAtom } from "@/store";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { useGetProfile } from "@/react-query/query/account";
const ProfileView: React.FC = () => {
  const user = useAtomValue(loginAtom);
  const { data } = useGetProfile({
    id: user?.user.id ?? "",
    queryOptions: { enabled: !!user?.user.id },
  });
  const [edit, setEdit] = useState(false);
  const hasProfileData =
    data &&
    data[0].id &&
    (data[0].name_en ||
      data[0].name_ka ||
      data[0].phone ||
      data[0].surname_en ||
      data[0].surname_ka);
  return (
    <div className="flex w-full gap-5 justify-around">
      {hasProfileData && (
        <div className="w-[500px]">
          <MainInfo data={data} />
          <Info data={data} setEdit={setEdit} edit={edit} />
        </div>
      )}
      {(!hasProfileData || edit) && <Form />}
    </div>
  );
};
export default ProfileView;
