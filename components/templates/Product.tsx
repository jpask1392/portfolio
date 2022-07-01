import DynamicComponent from "@/components/helpers/DynamicComponent";
import Container from "@/components/ui/Container";
import ProductMain from "@/components/ecommerce/ProductMain";
import FeaturedProducts from "@/components/ecommerce/FeaturedProducts";
import Column from "@/components/ui/Column";
import Header from "@/components/ui/Header";
import { SbEditableContent } from "@/types/storyBlok";

interface Props {
  product: any
  story: any
}

const ProductTemplate: React.FC<Props> = ({ 
  product,
  story
 }) => {
  return (
    <>
      <Container spacing="sm">
        <ProductMain 
          product={product} 
        >
          {
            story?.content?.additionalDesc.map((blok: SbEditableContent) => (
              <DynamicComponent 
                blok={blok} 
                key={blok._uid} 
              />
            ))
          }
        </ProductMain>
      </Container>

      {
        story && (
          <DynamicComponent 
            blok={story?.content || {}}
          />
        )
      }

      <Container backgroundColor="primary">
        <Column>
          <Header 
            color="secondary" 
            size="h3"
          >
            MATCHES W/ THESE
          </Header>
        </Column>

        <Column  padTop="sm">
          <FeaturedProducts
            collectionHandle="recommendations"
            productID={product.id}
            onDark
            showSlides={{
              sm: 2,
              lg: 3,
              xl: 4,
            }}
          />
        </Column>
      </Container>

      <Container>
        <Column>
          <Header 
            color="secondary" 
            size="h3"
          >
            Explore More:
          </Header>
        </Column>

        <Column padTop="sm">
          <FeaturedProducts
            collectionHandle="recommendations" 
            productID={product.id}
            showSlides={{
              sm: 2,
              lg: 3,
              xl: 4,
            }}
          />
        </Column>
      </Container>
    </>
  )
};

export default ProductTemplate;
