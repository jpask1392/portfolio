

const SearchSkeleton = () => {
  const repeater = 3;

  return (
    <>
      {
        [...Array(repeater)].map((index) => {
          return (
            <div 
              key={index}
              className="bg-red-100 w-full h-96 mb-10"
            ></div>
          )
        })
      }
    </>
  )
};

export default SearchSkeleton;
