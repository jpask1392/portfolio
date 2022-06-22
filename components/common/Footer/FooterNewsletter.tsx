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
      <div className="w-full relative h-14">
        <input 
          type="text" 
          className="bg-gray2 w-full rounded-full absolute inset-0 pl-5 pr-20" 
          placeholder="Email Address" 
        />
        <input 
          type="submit" 
          value="Sign up"
          className="absolute z-10 right-5 top-1/2 tranform -translate-y-1/2 font-medium text-fadedText cursor-pointer"
        />
      </div>
    </Form>
  )
}

export default FooterNewsletter;