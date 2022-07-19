import SearchResults from "./SearchResults";
import DynamicIcon from "@/components/icons/DynamicIcon";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const [ active, setActive ] = useState(false);
  const [ results, setResults ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ searching, setSearching ] = useState(false);

  useEffect(() => {
    if (!searching) setSearching(true);
    if (searching && !searchTerm) setSearching(false);

    // perform front end validation
    fetch(`/api/search?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => setResults(data))

    // need some kind of time out here so the search doesn't 
    // happen until the user stops typing.
  }, [searchTerm])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('submit')
    // redirect with new query params here
  }

  const handleInput = (e: any) => {
    setSearchTerm(e.currentTarget.value)
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
              <div className="relative">
                <input
                  onInput={handleInput}
                  onBlur={() => setActive(false)}
                  className="border-b border-black bg-transparent w-full placeholder-secondaryLight focus:outline-none focus:ring ring-offset-8 ring-offset-primary rounded-none"
                  placeholder="Search for something..." 
                />

                {
                  searching ? (
                    <div className="absolute w-[250px] left-0 top-full mt-3">
                      <SearchResults results={results} />
                    </div>
                  ) : null
                }
              </div>
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
