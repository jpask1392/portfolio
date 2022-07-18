import WishlistButton from '@/components/ecommerce/WishlistButton';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useSmoothScrollContext } from "@/components/context/smoothScrollContext";
import AddToCartButton from '@/components/ecommerce/AddToCartButton';
import Header from '@/components/ui/Header';
import cn from 'classnames';
import CustomImage from '@/components/ui/Image';
import Link from 'next/link';
import { Price } from "@/components/ecommerce/Common";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import CustomEase from "gsap/dist/CustomEase";
import { VariantSelector } from '@/components/ecommerce/Common';

interface Props {
  className?: string
  product: any
  animate?: boolean
  index?: number
  onDark?: boolean
}

const ProductTile: React.FC<Props> = ({ 
  product,
  className,
  animate,
  index,
  onDark
}) => {
  const { scroll } = useSmoothScrollContext();
  const hoverEffectRef = useRef(null);
  const articleRef = useRef(null);
  const imageRef = useRef(null);
  const tl = useRef<any>(null);
  
  const [ selectedVariant, setSelectedVariant ] = useState<any | boolean>(false);

  /**
   * Set up animations ready for play()
   * 
   */
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (hoverEffectRef && imageRef && animate) {
      tl.current = gsap.timeline({
        paused: true,
      });

      tl.current.to(hoverEffectRef.current, {
        yPercent: -100,
        delay: 0,
        duration: 1,
        ease: CustomEase.create("custom", "0.5,0,0,1"),
      })

      tl.current.fromTo(imageRef.current, {
        yPercent: 20,
        opacity: 0,
        duration: 1,
        scale: 1.2,
        ease: CustomEase.create("custom", "0.5,0,0,1"),
      }, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        scale: 1,
        ease: CustomEase.create("custom", "0.5,0,0,1"),
      }, "-=0.8")
    }
  }, [])

  /**
   * Add animations
   * 
   */
  useEffect(() => {
    if (product) {
      ScrollTrigger.create({
        trigger: articleRef.current,
        start: 'center bottom-=50',
        markers: false,
        scroller: "[data-scroll-container]",
        onEnter: () => {
          tl.current?.play();
        }
      });
    }
  }, [product, scroll]);

  /**
   * Set a default variant only if product exists
   * 
   */
  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0])
    }
  }, [product])

  return (
    <article 
      className={cn("relative group", className)}
      ref={articleRef}
    >
      <div className="absolute right-3 top-3 z-10">
        <WishlistButton />
      </div>
      <Link href={`/product/${product?.handle || ''}`}>
        <a aria-label={`Go to ${product?.title || "product"} page`}>
          <div className="aspect-square flex overflow-hidden">
            <div className="w-full relative" ref={imageRef}>        
                {
                  product?.images.length > 1 ? (
                    <CustomImage 
                      image={product?.images[1]} 
                      layout="fill" 
                      objectFit="cover"
                    />
                  ) : null
                }

                <div className={cn("relative h-full w-full", {
                  "group-hover:opacity-0 transition-opacity duration-300" : product?.images.length > 1
                })}>
                  <CustomImage 
                    image={product?.images[0]} 
                    layout="fill" 
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>

            {
              animate ? (
                <span 
                  ref={hoverEffectRef}
                  className="absolute inset-0 z-10"
                />
              ) : null
            }
          
        </a>
      </Link>

      <div className="mt-2 md:mt-6">
        <div className="flex justify-between flex-wrap">
          <div className="w-full">
            <div>
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
                      selectedVariant.compare_at_price && 
                      selectedVariant.compare_at_price > selectedVariant.price
                    )
                      ? selectedVariant.compare_at_price
                      : selectedVariant.price
                    }
                    salePrice={(
                      selectedVariant.compare_at_price && 
                      selectedVariant.compare_at_price > selectedVariant.price
                    )
                      ? selectedVariant.price
                      : selectedVariant.compare_at_price || 0
                    }
                  />
                ) : <Skeleton />
              }
            </div>

            
            {
              product && product.variants.length > 1 ? (
                <div className="mt-2">
                  <VariantSelector 
                    product={product}
                    onVariantChange={setSelectedVariant}
                  />
                </div>
              ) : null
            }

            <AddToCartButton 
              onDark={onDark}
              buttonText="ADD TO CART"
              className="mt-2.5 w-full"
              variants={[
                {
                  variantId: selectedVariant.id,
                  quantity: 1,
                }
              ]}
            />
            
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductTile;
