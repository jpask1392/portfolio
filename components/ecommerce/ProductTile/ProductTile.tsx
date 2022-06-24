import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useSmoothScrollContext } from "@/components/context/smoothScrollContext";
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
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CustomEase from "gsap/dist/CustomEase";

interface Props {
  className?: string
  product: any
  animate?: boolean
  index?: number
}

const ProductTile: React.FC<Props> = ({ 
  product,
  className,
  animate,
  index
}) => {
  const { scroll } = useSmoothScrollContext();
  const hoverEffectRef = useRef(null);
  const articleRef = useRef(null);
  const imageRef = useRef(null);
  const tl = useRef<any>(null);

  const colorMap: any = {
    Brown: "#72605B",
    Blue: "#6166D3",
    Green: "#70A35D",
    Yellow: "#EFD66E",
    Red: "#D6613E",
    Pink: "#EBBFBB"
  }

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

  useEffect(() => {
    if (product) {
      ScrollTrigger.create({
        trigger: articleRef.current,
        start: 'center bottom-=50',
        markers: false,
        scroller: "[data-scroll-container]",
        onEnter: () => {
          tl.current.play();
        }
      });
    }
  }, [product, scroll])

  return (
    <article 
      className={cn("relative group", className)}
      ref={articleRef}
      data-scroll
      data-scroll-speed={`${index ? index*0.5 : 0}`}
    >
      <div className="absolute top-3 left-3">
        { product?.tags.length ? <InfoPill name={product?.tags}/> : null }
      </div>

      <Link href={`/product${product?.path || '/'}`}>
        <a aria-label={`Go to ${product?.title || "product"} page`}>
          <div className="aspect-square  relative overflow-hidden">
            <div className="w-full h-full relative" ref={imageRef}>
              <div className="">                
                {
                  product?.images.length > 1 ? (
                    <CustomImage 
                      image={product?.images[1]} 
                      layout="fill" 
                      objectFit="cover"
                    />
                  ) : null
                }

                <div className={cn({
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
          </div>
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
            </div>

            
            {
              product && product.options?.length ? (
                <div className="variations text-fadedText md:mb-0 w-full md:w-auto">
                  {
                    product ? (
                      <div className="flex md:block text-sm mt-2">
                        {  
                          product.options?.map((option: any) => {
                            return option.values.map((color: string, i: number) => {
                              return (
                                <span 
                                  key={i}
                                  className="w-4 h-4 rounded-full border-black border inline-block mr-2 cursor-pointer"
                                  style={{
                                    background: colorMap[color]
                                  }}
                                />
                              )
                            })
                          })
                        }
                      </div>
                    ) : (
                      <Skeleton />
                    )
                  }            
                </div>
              ) : null
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
        </div>
      </div>
    </article>
  )
}

export default ProductTile;
