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
  console.log(account)
  return (
    <>
      <Script src="https://js.smile.io/v1/smile-shopify.js?shop=valentino-bp.myshopify.com" />
      <div 
        className="smile-shopify-init"
        data-channel-key="channel_6M5E5DyQiq8b8ytYhJLhYD8Q"
      />

      <Container>
        <Header>Account</Header>
        <Header tag="h3" size="h3">
          Hello: {account.displayName}
        </Header>

        <Button 
          className="mb-6"
          text="Logout"
        />

        <a href="#smile-home">Modal</a>
      </Container>

      <Container>
        <div>
          <Header 
            tag="h4" 
            size="h4"
          >Profile</Header>
          <div className="mt-8">
            <ul>
              <li>First Name: { account.firstName || "N/A" }</li>
              <li>Last Name: { account.lastName || "N/A" }</li>
            </ul>
            <Button 
              text="Update Account"
            />
          </div>
        </div>
      </Container>

      <Container>
        <div>
          <Header 
            tag="h4" 
            size="h4"
          >Orders Info</Header>

          <div className="mt-8">
            {
              account.orders.edges.length ? (
                account.orders.edges.map(({ node: order } : { node: any }) => {
                  return order.id;
                })
              ) : "You have not placed any orders yet."
            }
          </div>
        </div>
      </Container>
    </>
  )
};

export default AccountTemplate;
