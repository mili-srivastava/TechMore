import ProfileContent from "@/components/profile/ProfileContent";


const page = ({params,}: {params: {id: string;},
}) => {
  
  return (
    <div>
      {/* <ProfileContent username = {params.id} /> */}
      <p className="text-7xl m-56 text-white">{params.id}</p>
    </div>
  );
};

export default page;


