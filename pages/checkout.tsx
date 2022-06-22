/**
 * If the user tries to bypass checkout link and go straight 
 * to checkout through a URL, this will redirect them to
 * the correct checkout.
 */

import useCart from "@/components/hooks/useCart";
import { useEffect } from "react";
import Container from "@/components/ui/Container";
import Column from "@/components/ui/Column";
import Layout from "@/components/templates/Layout";
import Header from "@/components/ui/Header";
import RichText from "@/components/ui/RichText";

export default function Checkout() {
  const [ cart ] = useCart();
  useEffect(() => {
    if (cart?.url) {
      window.location.href = cart?.url;
    } else {
      window.location.href = "/";
    }
  }, [cart]);

  return (
    <Layout>
      <Container>
        <Column>
          <Header align="center">Redirecting...</Header>
        </Column>
      </Container>
    </Layout>
  );
}
