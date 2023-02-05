import cn from 'classnames';
import { useContext, useEffect } from 'react';
import { FormContext } from "@/components/modules/Form";

interface Props {
  hasPreviousPage: boolean
  hasNextPage: boolean
  onPageChange: () => void
  startCursor: null | string
  endCursor: null | string
  className?: string
}

const Pagination: React.FC<Props> = ({
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  startCursor,
  endCursor,
  className,
}) => {
  const buttonStyles = cn("px-3 py-2 md:px-4 md:py-3 border border-red hover:bg-red-100 transition-all duration-300 text-sm md:text-base");

  /**
   * Update form data to trigger higher level changes
   */
   const { formData, setFormData } = useContext<any>(FormContext);

  /**
   * 
   * @param direction 
   */
  const handlePageChange = (direction: string) => {
    if (direction === "next" && hasNextPage) {
      setFormData({
        ...formData,
        pagination: {
          before: null,
          after: endCursor,
        }
      })
    }

    if (direction === "previous" && hasPreviousPage) {
      setFormData({
        ...formData,
        pagination: {
          before: startCursor,
          after: null,
        }
      })
    }

    onPageChange && onPageChange();
  }

  return (
    <div className={cn(className, "text-center w-full relative")}>
      <button 
        onClick={() => handlePageChange("previous")} 
        className={cn(buttonStyles, "rounded-l-md border-r-0", {
          "opacity-20 pointer-events-none" : !hasPreviousPage
        })}
      >Prev</button>

      {
        hasPreviousPage || hasNextPage 
          ? <span className="absolute inset-y-0 w-px bg-red"/> 
          : null
      }

      <button 
        onClick={() => handlePageChange("next")} 
        className={cn(buttonStyles, "rounded-r-md", {
          "opacity-20 pointer-events-none" : !hasNextPage
        })}
      >Next</button>
    </div>
  )
}


export default Pagination;
