import ProfileContent from "@/components/profile/ProfileContent";
import { userData } from "@/types";

const page = ({
  params,
}: {
  params: {
    id: string;
  },userData:userData
}) => {
  console.log(params);
  return (
    <div>
      <ProfileContent  />
    </div>
  );
};

export default page;


