import Form from "@/components/modules/Form";
import { Input } from "@/components/ui/Inputs";
import DynamicIcon from "@/components/icons/DynamicIcon";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const [ active, setActive ] = useState(false);
  const [ results, setResults ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');

  useEffect(() => {
    console.log(searchTerm)

    // need some kind of time out here so the search doesn't 
    // happen until the user stops typing.
  }, [searchTerm])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
    // redirect with new query params here

  }

  return (
    <form
      className="relative"
      onSubmit={handleSubmit}
    >
      {
        active ? (
          <>
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-44 mr-4">
              <input
                onInput={(e) => setSearchTerm(e.currentTarget.value)}
                onBlur={() => setActive(false)}
                className="border-b border-black bg-transparent w-full placeholder-secondaryLight focus:outline-none focus:ring ring-offset-8 ring-offset-primary rounded-none"
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

      {/* TODO: create results block */}
      {/* <div className="absolute w-44 border p-10 bg-black right-0 top-full mt-3">

      </div> */}
    </ form>
  )
}

export default SearchBar;
