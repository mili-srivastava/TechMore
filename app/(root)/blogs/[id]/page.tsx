import ReadBlog from "@/components/createBlog/ReadBlog";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <ReadBlog _id={params.id} />
    </div>
  );
};

export default page;
