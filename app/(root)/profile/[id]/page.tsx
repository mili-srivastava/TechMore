import ProfileContent from "@/components/profile/ProfileContent";


const page = ({params,}: {params: {id: string;},
}) => {
  
  return (
    <div>
      {/* <ProfileContent username = {params.id} /> */}
      <p>{params.id}</p>
    </div>
  );
};

export default page;


