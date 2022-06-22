import AddToCartButton from '@/components/ecommerce/AddToCartButton';
import Header from '@/components/ui/Header';
import cn from 'classnames';
import CustomImage from '@/components/ui/Image';
import InfoPill from '@/components/ui/InfoPill';
import Link from 'next/link';
import { Price } from "@/components/ecommerce/Common";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";
import { useRef } from 'react';
import { gsap } from 'gsap';
import CustomEase from "gsap/dist/CustomEase";
import Button from '@/components/ui/Button';

interface Props {
  className?: string
  product: any
  animate?: boolean
}

const ProductTile: React.FC<Props> = ({ 
  product,
  className,
  animate
}) => {
  const hoverEffectRef = useRef(null);
  const articleRef = useRef(null);
  const imageRef = useRef(null);
  const tl = useRef<any>(null);

  useIsomorphicLayoutEffect(() => {
    if (hoverEffectRef && animate) {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: articleRef.current,
          start: 'center bottom-=100',
          markers: false,
        },
      });

      tl.current.to(hoverEffectRef.current, {
        yPercent: -100,
        delay: 0,
        duration: 1,
        ease: CustomEase.create("custom", "0.5,0,0,1"),
      })

      tl.current.from(imageRef.current, {
        yPercent: 20,
        opacity: 0,
        duration: 1,
        scale: 1.2,
        ease: CustomEase.create("custom", "0.5,0,0,1"),
      }, "-=0.8")
    }
  }, [])

  return (
    <article 
      className={cn("relative", className)}
      ref={articleRef}
    >
      <div className="absolute top-3 left-3">
        { product?.tags.length ? <InfoPill name={product?.tags}/> : null }
      </div>

      <Link href={`/product${product?.path || '/'}`}>
        <a aria-label={`Go to ${product?.title} page`}>
          <div className="aspect-square bg-secondary relative overflow-hidden">
            <div className="w-full h-full" ref={imageRef}>
              <CustomImage 
                image={product?.images[0]} 
                layout="fill" 
                objectFit="cover"
              />
            </div>

            {
              animate ? (
                <span 
                  ref={hoverEffectRef}
                  className="absolute inset-0 bg-primary z-10"
                />
              ) : null
            }
          </div>
        </a>
      </Link>

      <div className="mt-6">
        <div className="flex justify-between flex-wrap">
          <div className="w-full">
            <Header
              tag="h3"
              size="h4" 
              className="font-bold w-full mb-2"
            >
              { product?.title || <Skeleton width="33%" /> }
            </Header>

            {
              product ? (
                <Price
                  originalPrice={(
                    product.variants[0].compare_at_price && 
                    product.variants[0].compare_at_price > product.variants[0].price
                  )
                    ? product.variants[0].compare_at_price
                    : product.variants[0].price
                  }
                  salePrice={(
                    product.variants[0].compare_at_price && 
                    product.variants[0].compare_at_price > product.variants[0].price
                  )
                    ? product.variants[0].price
                    : product.variants[0].compare_at_price || 0
                  }
                />
              ) : <Skeleton />
            }

            <AddToCartButton 
              buttonText="ADD TO CART"
              className="mt-2.5 !max-w-none w-full"
              variants={[
                {
                  variantId: product?.variants[0].id,
                  quantity: 1,
                }
              ]}
            />
            
          </div>

          {/* {
            product && product.options?.length ? (
              <span className="variations text-fadedText md:mb-0 w-full md:w-auto">
                {
                  product ? (
                    <ul className="flex md:block text-sm">
                      {  
                        product.options?.map((option: any) => {
                          return (
                            <li className="whitespace-nowrap mr-2 md:mr-0" key={option.id}>
                              {`${option.values.length} ${option.name}s`}
                            </li>
                          )
                        })
                      }
                    </ul>
                  ) : (
                    <Skeleton />
                  )
                }            
              </span>
            ) : null
          } */}
          
        </div>
      </div>
    </article>
  )
}

export default ProductTile;
