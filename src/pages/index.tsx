import DisplayName from "@/components/DisplayName";
import FetchData from "@/components/FetchData";
import Header from "@/components/Header";
import Searchbar from "@/components/Searchbar";

const index = () => {
  return (
    <div className="bg-gradient-to-tl from-blue-300 to-blue-500 via-white h-screen w-[361px] lg:flex mx-auto items-center justify-center lg:h-auto">
      <div className="">
        <Header />
        <Searchbar />
        <DisplayName />
        <FetchData />
      </div>
    </div>
  );
};

export default index;
