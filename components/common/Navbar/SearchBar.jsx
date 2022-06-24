import DynamicIcon from "@/components/icons/DynamicIcon";

const SearchBar = () => {
  return (
    <div>
      <form action="">
        <div className="relative">
          <label htmlFor="search-bar" className="hidden">Search bar</label>
          <input 
            id="search-bar"
            type="search"
            placeholder="Search for something"
            className="flex md:hidden bg-transparent items-center relative pr-8 py-1 w-36 xl:w-60 border-b border-black"
          />
          <button type="submit" className="block">
            <span className="absolute right-3 opacity-70 top-1/2 transform -translate-y-1/2">
              <DynamicIcon type="search" className="h-7"/>
            </span>
          </button>
        </div>

        {/* <span className="xl:hidden">
          <DynamicIcon type="search" />
        </span> */}
      </form>
    </div>
  )
}

export default SearchBar;
