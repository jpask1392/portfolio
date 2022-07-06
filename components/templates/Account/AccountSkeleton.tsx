import Container from "@/components/ui/Container";
import { NextSeo } from 'next-seo';
import Header from "@/components/ui/Header";

const AccountSkeleton = () => {
  return (
    <>
      <Container>
        <Header>Loading...</Header>
      </Container>
    </>
  )
};

export default AccountSkeleton;
