import Form from '@/components/modules/Form';
import { Input } from '@/components/ui/Inputs';
import Button from "@/components/ui/Button";
import { useEffect, useRef, useState } from 'react';

interface Props {
  // className?: string
}

const ContactForm: React.FC<Props> = () => {
  const handleSubmit = async (data: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(false);
      }, 2000)
    });
  }

  // eventually set this up from the CMS
  const formFields = [
    {
      name: "name",
      placeholder: "Name",
      type: "text",
      required: false,
    },
    {
      name: "email",
      placeholder: "Email Address",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      placeholder: "Phone Number",
      type: "tel",
      required: true,
    },
    {
      name: "business",
      placeholder: "Business Name",
      type: "text",
      required: true,
    }
  ]

  return (
    <div className="">
      <Form
        action="/api/contact"
      >
        <div className="flex flex-wrap -mx-5">
          <div className="w-full lg:w-1/2 px-5">
            <div className="flex flex-wrap -mx-5">
              {
                formFields.map((field) => {
                  return (
                    <div 
                      className="w-full md:w-1/2 lg:w-full px-5" 
                      key={field.name}
                    >
                      <Input 
                        name={field.name} 
                        placeholder={field.placeholder}
                        type={field.type}
                        required={field.required}
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div className="w-full lg:w-1/2 px-5 flex">
            <Input 
              name="message" 
              placeholder="Message"
              type="textarea"
            />
          </div>

          <div className="w-full px-5 mt-20">
            <div className="text-right">
              <Button
                text="Submit"
                isSubmit
                onDark={false}
              />
            </div>
          </div>
        </div>
      </Form>

    </div>
  )
}

export default ContactForm;
