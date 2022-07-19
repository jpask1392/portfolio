import OrdersTable from "@/components/ecommerce/OrdersTable";
import Grid from "@/components/ui/Grid";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { NextSeo } from 'next-seo';
import Header from "@/components/ui/Header";
import Script from 'next/script'

interface Props {
  account: any
  handleLogout: any
}

const AccountTemplate: React.FC<Props> = ({
  account,
  handleLogout,
}) => {
  return (
    <>
      <Script src="https://js.smile.io/v1/smile-shopify.js?shop=valentino-bp.myshopify.com" />

      <div 
        className="smile-shopify-init"
        data-channel-key="channel_6M5E5DyQiq8b8ytYhJLhYD8Q"
      />

      <Container maxWidth="lg">
        <div className="flex items-center justify-between">
          <Header className="flex-1">
            My Account
          </Header>
          <div className="flex items-center">
            <Button 
              className="mb-6"
              text="Logout"
            />
          </div>
        </div>

        {/* <a href="#smile-home">Modal</a> */}
      </Container>

      <Container maxWidth="lg">
        <Header 
          tag="h4" 
          size="h4"
        >Profile</Header>

        <div className="mt-8">
          <ul className="mb-4">
            { account.defaultAddress.formatted.map((line: string, i: number) => <li key={i}>{line}</li>)}
          </ul>

          <Button 
            text="Edit Account"
            link={{
              cached_url: "account/addresses"
            }}
          />
        </div>
      </Container>

      <Container maxWidth="lg" className="pt-10">
        <div>
          <Header 
            tag="h4" 
            size="h4"
          >Orders Info</Header>

          <div className="mt-8">
            {
              account.orders.length 
                ? <OrdersTable orders={account.orders}/>
                : "You have not placed any orders yet."
            }
          </div>
        </div>
      </Container>
    </>
  )
};

export default AccountTemplate;
