import { Search } from "lucide-react";
import { X } from "lucide-react";
const SearchBar = ({ value, onChange, handleSearch, onClearSearch , user}) => {
  return (
    user && (<div className="w-48 lg:w-80 flex items-center px-5   bg-blue-50 rounded-md">
          <input type="text" placeholder="Search Notes" value={value} onChange={onChange} className="w-full text-sm bg-transparent py-[11px] outline-none" />
          
    {value && <X className="text-xl text-blue-950 cursor-pointer" onClick={onClearSearch} />}
     <Search className="text-lg cursor-pointer text-blue-950" onClick={handleSearch} />
    </div>
  ));
};

export default SearchBar;
