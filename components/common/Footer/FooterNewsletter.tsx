import Form from "@/components/modules/Form";
import { Input } from "@/components/ui/Inputs";
import CustomImage from "@/components/ui/Image";
import type { storyBlokImage } from "@/types/storyBlok";


interface Props {
  image?: storyBlokImage
  newsletterTitle?: string
  newsletterText?: string
}

const FooterNewsletter: React.FC<Props> = ({
  image,
  newsletterTitle,
  newsletterText,
}) => {
  return (
    <div className="flex flex-wrap w-full">

      {/* Image */}
      <div className="md:order-2 xl:order-none w-full md:w-1/2 xl:w-full">
        <div className="aspect-[4/3] xl:aspect-[16/9] bg-gray-300">
          <CustomImage 
            image={image} 
            layout="fill" 
            objectFit="cover"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="w-full md:w-1/2 xl:w-full py-10 px-7 md:px-16 xl:p-20 bg-black flex flex-col justify-center">
        <div className="max-w-[330px] mx-auto">
          { 
            newsletterTitle ? (
              <h4 className="caption mb-3">{newsletterTitle}</h4> 
            ) : null
          }
          <p className="text-sm">
            {newsletterText}
          </p>

          <Form action="newsletter">
            <div className="mt-8 sm:mt-16 xl:mt-8">
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
            </div>

            <p className="text-tiny mt-4 text-fadedText text-center md:text-left">
              To opt out of future marketing emails, click here
            </p>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default FooterNewsletter;