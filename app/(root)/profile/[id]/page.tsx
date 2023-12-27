import ProfileContent from "@/components/profile/ProfileContent";

const page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  console.log(params);
  return (
    <div>
      <ProfileContent />
    </div>
  );
};

export default page;
