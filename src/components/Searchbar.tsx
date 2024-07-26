import { clickAtom, nameAtom, searchAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useAtom(searchAtom);
  const [name, setName] = useAtom(nameAtom);
  const [isClicked, setClick] = useAtom(clickAtom);

  const handleSearch = (e: any) => {
    setClick(true);
    // setSearchTerm(e.target.value);
    if (searchTerm !== "") {
      console.log(searchTerm);
      setName(searchTerm);
      setClick(false);
      setSearchTerm("");
    } else {
      alert("Please Enter City Name");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center gap-5 pt-5">
        <input
          type="search"
          placeholder="Search your city..."
          className="px-3 py-2 rounded-md border-2 border-solid border-gray-400 bg-gray-100"
          onChange={(e: any) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button
          onClick={handleSearch}
          className="bg-green-400 px-4 py-3 rounded-md">
          <FaSearch />
        </button>
      </div>
    </>
  );
};

export default Searchbar;
