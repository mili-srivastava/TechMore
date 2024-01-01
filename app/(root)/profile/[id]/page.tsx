import ProfileContent from "@/components/profile/ProfileContent";

const page = ({ params }: { params: { id: string } }) => {
  const decoded = decodeURIComponent(params.id);

  return (
    <div>
      <ProfileContent username={decoded} />
      
    </div>
  );
};

export default page;
