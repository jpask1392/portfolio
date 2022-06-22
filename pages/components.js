import { 
  Display, 
  H1, 
  H2, 
  H3, 
  H4, 
  H5, 
  H6, 
  Paragraph 
} from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import DynamicIcon from "@/components/icons/DynamicIcon";
import Container from "@/components/ui/Container";
import Grid from "@/components/ui/Grid";
import Column from "@/components/ui/Column";
import Layout from "@/components/templates/Layout";
import Header from "@/components/ui/Header";
import CustomImage from "@/components/ui/Image";
import RichText from "@/components/ui/RichText";
import Slideshow from "@/components/ui/Slideshow";

import FeaturedCollections from "@/components/ecommerce/FeaturedCollections";
import FeaturedProducts from "@/components/ecommerce/FeaturedProducts";


export default function StaticAbout() {
  return (
    <Layout>

      <Container>
      <Paragraph>Font weights controlled with Storyblok classes</Paragraph>
      <hr/>
      <Display>Display</Display>
      <H1>Header 1</H1>
      <H2>Header 2</H2>
      <H3>Header 3</H3>
      <H4>Header 4</H4>
      <H5>Header 5</H5>
      <H6>Header 6</H6>
      <Paragraph>Paragraph text</Paragraph>
      <Paragraph size="secondary">Secondary Paragraph text</Paragraph>
      <Paragraph size="tertiary">Tertiary Paragraph text</Paragraph>
      <Paragraph size="caption">Caption Paragraph text</Paragraph>
      <div className="pt-12">
        <Paragraph>Buttons</Paragraph>
        <hr/>
        <div className="p-5 bg-white">
          <Button text="Explore NXT LVL" onDark={false}/>
        </div>
        <div className="p-5">
          <Button text="Explore NXT LVL" onDark/>
        </div>
        <div className="p-5">
          <Button text="Explore NXT LVL" disabled/>
        </div>
      </div>
      <div className="pt-12">
        <Paragraph>Icons</Paragraph>
        <hr/>
        <div className="bg-primary p-10 grid grid-cols-5 gap-10">
          {
            [
              "account",
              "alertCircle",
              "arrowBack",
              "arrowBackCircle",
              "arrowDown",
              "arrowDownCircle",
              "cart",
              "facebook",
              "instagram",
              "search",
              "add",
              "addCircle",
              "apps",
              "bag",
              "caretBackCircle",
              "caretDownCircle",
              "chevronBack",
              "chevronDown",
              "close",
              "heart",
              "helpCircle",
              "informationCircle",
              "list",
              "location",
            ].map((icon, i) => (
              <div key={i} className="flex justify-center flex-col items-center">
                <DynamicIcon type={icon} />
                <span className="text-xs pt-3">{icon}</span>
              </div>
            ))
          }
        </div>
      </div>
      </Container>
      

      <Container 
        el="section"
        backgroundColor="bg-gray-100"
        textColor="text-black"
      >
        <Grid>
          <div><div className="bg-gray-300 text-white text-center p-4">Hey</div></div>
          <div><div className="bg-gray-300 text-white text-center p-4">Hey</div></div>
          <div><div className="bg-gray-300 text-white text-center p-4">Hey</div></div>
        </Grid>
        <Grid layout='D'>
          <Column>
            <Grid layout='B'>
              <Column><div className="bg-gray-500 text-white text-center p-4">1</div></Column>
              <Column><div className="bg-gray-500 text-white text-center p-4">1</div></Column>
              <Column><div className="bg-gray-500 text-white text-center p-4">1</div></Column>
            </Grid>
          </Column>
          <Column><div className="bg-gray-900 text-white text-center p-4">B</div></Column>
          <Column><div className="bg-gray-900 text-white text-center p-4">C</div></Column>
          <Column><div className="bg-gray-900 text-white text-center p-4">D</div></Column>
          <Column><div className="bg-gray-900 text-white text-center p-4">E</div></Column>
          <Column><div className="bg-gray-900 text-white text-center p-4">F</div></Column>
          <Column><div className="bg-gray-900 text-white text-center p-4">G</div></Column>
          <Column><div className="bg-gray-900 text-white text-center p-4">H</div></Column>
          <Column><div className="bg-gray-900 text-white text-center p-4">H</div></Column>
          <Column>
            <Grid layout='C'>
              <Column><div className="bg-gray-500 text-white text-center p-4">1</div></Column>
              <Column><div className="bg-gray-500 text-white text-center p-4">1</div></Column>
              <Column><div className="bg-gray-500 text-white text-center p-4">1</div></Column>
            </Grid>
          </Column>
        </Grid> 
      </Container>

      <Container 
        el="section"
        
      >
        <Grid layout='B'>
          <div><div>A</div></div>
          <div><div>B</div></div>
          <div><div>C</div></div>
          <div><div>D</div></div>
          <div><div>E</div></div>
          <div><div>F</div></div>
          <div><div>G</div></div>
          <div><div>H</div></div>
          <div><div>H</div></div>
          <div><div>H</div></div>
        </Grid> 
      </Container>
    
    </Layout>
  );  
}
