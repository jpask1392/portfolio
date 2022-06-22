import Form from "@/components/modules/Form";
import getGlobalData from "@/utils/getGlobalData";
import Storyblok from "@/utils/storyblok";
import Container from "@/components/ui/Container";
import Column from "@/components/ui/Column";
import Layout from "@/components/templates/Layout";
import Header from "@/components/ui/Header";
import RichText from "@/components/ui/RichText";
import type { Story } from '@/types/storyBlok';
import { Input } from '@/components/ui/Inputs';
import Button from "@/components/ui/Button";

export default function Account({
  global,
  preview,
} : {
  preview: boolean,
  global: Story | undefined
  product: any
  story: Story | any
}) {  
  return (
    <Layout global={global} preview={preview}>
      <Container>
        <Column>
          <Header align="center">Account</Header>
        </Column>

        <Column padTop="lg">
          <Container 
            el="div" 
            backgroundColor="white"
            textColor="black"
            maxWidth="md"
          >
            <Column 
              hAlignContent="center"
            >
              <div className="pb-16">
                <Form action="accountLogin">
                  <Input
                    type="email"
                    name="email" 
                    placeholder="Email"
                    required
                  />
                  <Input 
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                  <div className="mt-10 text-center">
                    <Button 
                      text="Login"
                      onDark={false}
                      isSubmit
                    />
                  </div>
                </Form>
              </div>
            </Column>
          </Container>
        </Column>
      </Container>
    </Layout>
  );  
}


 /**
  * Function is run on every page generated from
  * getStaticPaths() and pages directory. 
  * 
  * See here: https://nextjs.org/docs/basic-features/data-fetching/get-static-props
  */
  export async function getStaticProps({
    locale,
    params,
    preview = false,
  } : {
    locale: string
    params: any
    preview: boolean,
  }) { 
   let sbParams: any = {
     version: preview ? "draft" : "published", // or "published"
     language: locale,
   };
 
   if (preview) {
     sbParams.version = "draft";
     sbParams.cv = Date.now();
   }
 
   try {
     // get global layout information for header, footer etc
     const global = await getGlobalData(sbParams);
 
     return {
       props: {
         preview,
         global: global ? global.data.story : false,
       },
       revalidate: 3600, // revalidate every hour
     };
 
   } catch (error) {
     throw new Error(error.message); // stop the build
   }
}

