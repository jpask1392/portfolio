import DynamicIcon from "@/components/icons/DynamicIcon";

const SearchBar = () => {
  return (
    <div>
      <form action="">
        <div className="relative hidden xl:block">
          <label htmlFor="search-bar" className="hidden">Search bar</label>
          <input 
            id="search-bar"
            type="search"
            className="flex bg-gray2 rounded-full items-center relative pr-8 pl-3 py-2 w-36 xl:w-60"
          />
          <button type="submit" className="block">
            <span className="absolute right-3 opacity-70 text-white top-1/2 transform -translate-y-1/2">
              <DynamicIcon type="search" />
            </span>
          </button>
        </div>

        <span className="xl:hidden">
          <DynamicIcon type="search" />
        </span>
      </form>
    </div>
  )
}

export default SearchBar;
