import ProfileContent from "@/components/profile/ProfileContent";


const page = ({params,}: {params: {id: string;},
}) => {
  
  return (
    <div>
      <ProfileContent  />
    </div>
  );
};

export default page;


