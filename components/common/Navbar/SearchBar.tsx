import SearchResults from "./SearchResults";
import DynamicIcon from "@/components/icons/DynamicIcon";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

const SearchBar = () => {
  const [ active, setActive ] = useState(false);
  const [ results, setResults ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ searching, setSearching ] = useState(false);
  const inputRef = useRef<HTMLFormElement | null >(null);
  const router = useRouter();

  /**
   * Make the request when search term changes
   * 
   */
  // useEffect(() => {
  //   if (!searching) setSearching(true);
  //   if (searching && !searchTerm) setSearching(false);
  //   if (!searchTerm) return;

  //   // perform front end validation
  //   fetch(`/api/search?q=${searchTerm}`)
  //     .then(response => response.json())
  //     .then(data => setResults(data))
  //     .then(data => setSearching(false))
  // }, [searchTerm])

  /**
   * Redirect the user to the search page on return.
   * 
   * @param e 
   */
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // redirect with new query params here
    if (searchTerm) {
      router.push({
        pathname: '/search',
        query: { q: searchTerm },
      })
    }
  }

  /**
   * Set the search term after user finishes typing
   * 
   * @param e
   */
  // let timeout: any = null;
  // const handleInput = (e: any) => {
  //   clearTimeout(timeout);
  //   timeout = setTimeout(() => {
  //     setSearchTerm(e.target.value)
  //   }, 450);
  // }

  const handleClickOffElement = (e: any) => {
    if (!inputRef.current?.contains(e.target)) {
      setActive(false);
      setSearchTerm('');
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOffElement)

    return () => {
      document.removeEventListener('click', handleClickOffElement)
    }
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      ref={inputRef}
    >
      {
        active ? (
          <div className="absolute top-full w-screen p-4  border-b border-red left-1/2 -translate-x-1/2">
            <div className="relative max-w-[650px] mx-auto text-red">
              <input
                onInput={(e: React.SyntheticEvent<HTMLInputElement>) => setSearchTerm(e.currentTarget.value)}
                className="text-red bg-transparent w-full placeholder-red focus:outline-none focus:ring ring-offset-8 ring-offset-tertiary rounded-none pl-8"
                placeholder="What are you looking for?" 
              />

              <DynamicIcon 
                type="search" 
                className="h-5 absolute left-0 top-0" 
              />

              <button 
                type="submit"
                className="absolute right-0 top-0 text-red"
                aria-label={"Site Search Button"}
              >Search</button>

              {/* {
                searchTerm ? (
                  <div className="absolute w-[250px] left-0 top-full mt-3">
                    <SearchResults 
                      results={results}
                      searching={searching}
                    />
                  </div>
                ) : null
              } */}
            </div>
          </div>
        ) : null
      }

      {/* <button type="submit" className="block">
        <DynamicIcon type="search"  className="h-5 lg:h-7" />
      </button> */}

      <button 
        type="button"
        onClick={() => setActive(true)} 
        className="block"
        aria-label={"Site Search Button"}
      >
        <DynamicIcon type="search"  className="h-5 md:h-7" />
      </button>
    </ form>
  )
}

export default SearchBar;
