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
        <p className="text-xs lg:text-base font-medium text-secondaryLight">
          {newsletterText}
        </p>
      </div>
      <div className="w-full relative h-7 text-base font-sans">
        <input 
          type="text" 
          className="bg-transparent w-full absolute inset-0 pr-20 border-b border-secondaryLight" 
          placeholder="Email" 
        />
        <input 
          type="submit" 
          value="Subscribe"
          className="absolute z-10 right-0 top-1/2 tranform -translate-y-1/2 font-medium text-secondary cursor-pointer underline"
        />
      </div>
    </Form>
  )
}

export default FooterNewsletter;