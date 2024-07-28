import DisplayName from "@/components/DisplayName";
import FetchData from "@/components/FetchData";
import Header from "@/components/Header";
import Searchbar from "@/components/Searchbar";

const index = () => {
  return (
    <div className=" h-[100dvh] w-[361px] lg:flex mx-auto items-center justify-center lg:h-auto">
      <div className="">
        {/* <Header /> */}

        <div className="bg-blue-600">
          <Searchbar />
          <DisplayName />
        </div>
        <FetchData />
      </div>
    </div>
  );
};

export default index;
