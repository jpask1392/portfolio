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
      <div className="mb-2 flex">
        <p className="text-base font-medium text-secondaryLight mr-5">{newsletterTitle}</p>
        <p className="text-base font-medium text-secondaryLight">{newsletterText}</p>
      </div>
      <div className="w-full relative h-7">
        <input 
          type="text" 
          className="bg-transparent w-full absolute inset-0 pr-20 border-b border-secondaryLight" 
          placeholder="Email" 
        />
        <input 
          type="submit" 
          value="Subscribe"
          className="absolute z-10 right-0 top-1/2 tranform -translate-y-1/2 font-medium text-fadedText cursor-pointer underline"
        />
      </div>
    </Form>
  )
}

export default FooterNewsletter;