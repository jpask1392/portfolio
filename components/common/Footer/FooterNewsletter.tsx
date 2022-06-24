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
        <p className="w-full md:w-auto text-base xl:text-4xl uppercase font-header text-secondary mr-5 text-center md:text-left mb-4 md:mb-0">
          {newsletterTitle}
        </p>
        <p className="hidden md:block text-xs lg:text-base xl:text-xl font-medium text-secondaryLight">
          {newsletterText}
        </p>
      </div>

      <div className="w-full relative text-xs md:text-base xl:text-xl font-sans">
        <input 
          type="text" 
          className="bg-transparent w-full inset-0 pr-20 border-b border-secondaryLight placeholder-secondaryLight focus:outline-none focus:ring ring-offset-8 ring-offset-primary rounded-none" 
          placeholder="Email" 
        />
        <input 
          type="submit" 
          value="Subscribe"
          className="absolute z-10 right-0 bottom-0 font-medium text-secondary cursor-pointer underline leading-relaxed	"
        />
      </div>
      {/* Mobile only */}
      <p className="md:hidden text-xs font-medium text-secondaryLight mt-1">
        {newsletterText}
      </p>
    </Form>
  )
}

export default FooterNewsletter;