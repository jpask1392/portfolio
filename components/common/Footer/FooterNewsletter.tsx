import DynamicIcon from "@/components/icons/DynamicIcon";
import Form from "@/components/modules/Form";
import { Input } from "@/components/ui/Inputs";

interface Props {
  newsletterTitle?: string
  newsletterText?: string
}

const FooterNewsletter: React.FC<Props> = ({
  newsletterTitle,
  newsletterText,
}) => {
  return (
    <Form 
      action="newsletter"
    > 
      <div className="mb-2 flex flex-wrap md:flex-nowrap items-center">
        <h3 className="h3 w-full md:w-auto text-red mr-5 text-center md:text-left mb-4 md:mb-0">
          {newsletterTitle}
        </h3>
        <p className="hidden md:block text-white">
          {newsletterText}
        </p>
      </div>

      <div className="w-full relative text-xs md:text-base xl:text-xl">
        <input 
          type="text" 
          className="bg-transparent py-2 w-full inset-0 pr-20 border-b border-white placeholder-red focus:outline-none focus:ring ring-offset-8 ring-offset-red rounded-none" 
          placeholder="Email" 
        />
        <button 
          className="absolute z-10 right-0 top-1/2 text-red cursor-pointer -translate-y-1/2 -scale-x-100"
          aria-label={"Submit newsletter form"}
          type="submit"
        >
          <DynamicIcon type="arrowBack" />
        </button>
      </div>
      {/* Mobile only */}
      <p className="md:hidden text-xs font-medium text-red mt-1">
        {newsletterText}
      </p>
    </Form>
  )
}

export default FooterNewsletter;