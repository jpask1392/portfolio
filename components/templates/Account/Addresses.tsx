import Form from '@/components/modules/Form';
import { Input } from '@/components/ui/Inputs';
import cn from 'classnames';
import OrdersTable from "@/components/ecommerce/OrdersTable";
import Grid from "@/components/ui/Grid";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { NextSeo } from 'next-seo';
import Header from "@/components/ui/Header";
import Script from 'next/script'

interface Props {
  account: any
  handleCreateAddress: any
  handleDeleteAddress: any
}

const AccountTemplate: React.FC<Props> = ({
  account,
  handleCreateAddress,
  handleDeleteAddress,
}) => {
  console.log(account);

  return (
    <>
      <Container maxWidth="lg">
        <div className="flex items-center justify-between">
          <Header className="flex-1">
            Addresses
          </Header>
        </div>

        <div className="mt-8">
          <Header className="flex-1" size="h4">
            Saved Addresses:
          </Header>

          <ul className="grid grid-cols-3 mt-6 gap-4">
            {
             account.addresses.length ? account.addresses.map((address: any) => {
               return (
                <li key={address.id}>
                  <div className={cn("p-5", {
                    "border border-black" : address.id === account.defaultAddress.id
                  })}>
                    <div>
                      {
                        address.formatted.map((line: string, index: number) => <p key={index}>{line}</p> )
                      }
                    </div>
                    
                    <Button 
                      className="mt-4"
                      text="Delete Address" 
                      ajaxClick={async () => {
                        await handleDeleteAddress(address.id)
                      }}
                    />
                  </div>
                </li>
               )
             }) : <p>No saved addresses</p>
            }
          </ul>
        </div>

        <div className="mt-8">
          <Header size="h4">
            Add new address:
          </Header>

          <Form
            className="mt-4"
            onSubmit={async (formData) => {
              console.log(formData)
              await handleCreateAddress({...formData});
            }}
          >
            <Input 
              id="firstName"
              placeholder="First Name"
            />

            <Input 
              id="lastName"
              placeholder="Last Name"
            />

            <Input 
              id="address1"
              placeholder="address1"
            />

            <Input 
              id="address2"
              placeholder="address2"
            />

            <Button
              text="Create Address"
              isSubmit
            />
          </Form>
        </div>
      </Container>
    </>
  )
};

export default AccountTemplate;
