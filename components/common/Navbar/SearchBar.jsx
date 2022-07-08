import Form from "@/components/modules/Form";
import { Input } from "@/components/ui/Inputs";
import DynamicIcon from "@/components/icons/DynamicIcon";
import { useState } from "react";

const SearchBar = () => {
  const [active, setActive] = useState(false);

  return (
    <form
      action="search"
      className="relative"
    >
      {
        active ? (
          <>
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-96">
              <input 
                className="border-b border-black bg-transparent w-full"
                placeholder="Search for something..." 
              />
            </div>

            <button type="submit" className="block">
              <DynamicIcon type="search"  className="h-7" />
            </button>
          </>
        ) : (
          <button onClick={() => setActive(true)} className="block">
            <DynamicIcon type="search"  className="h-7" />
          </button>
        )
      }
    </ form>
    
  )
}

export default SearchBar;
