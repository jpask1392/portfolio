import cn from 'classnames';

interface Props {
  hasPreviousPage: boolean
  hasNextPage: boolean
  onPageChange: ({
    before, 
    after
  } : {
    before: null | string
    after: null | string
  }) => void
  startCursor: null | string
  endCursor: null | string
}

const Pagination: React.FC<Props> = ({
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  startCursor,
  endCursor,
}) => {
  const handlePageChange = (direction: string) => {
    if (direction === "next" && hasNextPage) {
      onPageChange({
        before: null,
        after: endCursor,
      })
    }

    if (direction === "previous" && hasPreviousPage) {
      onPageChange({
        before: startCursor,
        after: null,
      })
    }

    // router.push({
    //   query: { 
    //     handle: collection.handle,
    //     since_id: startCursor
    //   },
    // })
  }

  return (
    <div className="text-center py-8 w-full mt-8">
      <button 
        onClick={() => handlePageChange("previous")} 
        className={cn("px-4 py-3 rounded-l-md border border-secondary border-r-0", {
          "opacity-20 pointer-events-none" : !hasPreviousPage
        })}
      >Prev</button>

      <button 
        onClick={() => handlePageChange("next")} 
        className={cn("px-4 py-3 rounded-r-md border border-secondary", {
          "opacity-20 pointer-events-none" : !hasNextPage
        })}
      >Next</button>
    </div>
  )
}


export default Pagination
