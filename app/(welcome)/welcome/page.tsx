import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const page = () => {
  return (
    <div>
    <div className="flex justify-end p-5 gap-3">
    <Link href="/login" className="bg-purple-700 rounded-full text-white font-medium px-8 py-2 hover:border-2 dark:hover:border-purple-700 dark:hover:bg-transparent">Login</Link>
    <Link href="/signup" className="border-purple-700 dark:text-white text-purple-700 border-2 rounded-full font-medium px-6 py-2 dark:hover:bg-purple-700 dark:hover:text-white light:bg-purple-700 light:text-white ">Register</Link>
    </div>
      <div className="grid place-items-center gap-3 md:mt-20 mt-10">
        <h1 className="text-6xl text font-bold">TechMore</h1>
        <h2 className="text-black font-semibold text-3xl text-center mx-5 dark:text-white">
          Embark on a Journey of Words and Wonders
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-500 md:mx-48 mx-10 text-center">
          Embark on a journey where words become portals, inviting you to
          explore realms of imagination and inspiration.Join us in this vibrant
          space where every sentence is a stepping stone, guiding you through
          the wonders of expression.
        </p>
        <Link href="/" className="bg-black text-white px-6 py-2.5 font-medium rounded-full flex items-center gap-3 text-lg dark:bg-white dark:text-black mt-5">
          Get Started
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default page;
