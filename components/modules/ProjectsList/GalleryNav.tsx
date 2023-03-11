interface Props {
  handleArrowClick: any
  hasExpanded: boolean
  setHasExpanded: any
}

const GalleryNav: React.FC<Props> = ({
  handleArrowClick,
  hasExpanded,
  setHasExpanded,
}) => {
  return (
    <div className="absolute z-50 w-full h-14 max-w-[200px] -translate-x-1/2 bg-black border border-[#000] rounded-full bottom-4 left-1/2 ">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
        <button onClick={(e) => handleArrowClick(e, "prev")} type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <svg className="w-6 h-6 text-gray-500 group-hover:text-greyText" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"></path>
          </svg>
          <span className="sr-only">Previous</span>
        </button>
        
        <div className="flex items-center justify-center">
          <button onClick={() => setHasExpanded(!hasExpanded)} type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-greyText rounded-full hover:bg-white group focus:ring-4 focus:ring-blue-300 focus:outline-none">
            {
              hasExpanded ? (
                <>
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"></path>
                  </svg>
                  <span className="sr-only">Collapse</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"></path>
                  </svg>
                  <span className="sr-only">Expand</span>
                </>
              )
            }
            
          </button>
        </div>
        <button onClick={(e) => handleArrowClick(e, "next")} type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <svg className="w-6 h-6 mb-0 text-gray-500  group-hover:text-greyText" fill="currentcolor" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
          </svg>
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  )
}

export default GalleryNav;