import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useSmoothScrollContext } from "@/components/context/smoothScrollContext";
import Header from '@/components/ui/Header';
import cn from 'classnames';
import CustomImage from '@/components/ui/Image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";
import { useEffect, useRef, useState } from 'react';

interface Props {
  className?: string
  post: any
  animate?: boolean
  index?: number
}

const PostTile: React.FC<Props> = ({ 
  post,
  className,
  animate,
  index
}) => {
  const { scroll } = useSmoothScrollContext();
  const hoverEffectRef = useRef(null);

  return (
    <article 
      className={cn("relative group", className)}
    >

      <div className="mt-2 md:mt-6">
        <div className="flex justify-between flex-wrap">
          <div className="w-full">
            <div>
              <Header
                tag="h3"
                size="h4" 
                className="font-bold w-full mb-2"
              >
                { post?.title || <Skeleton width="33%" /> }
              </Header>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostTile;
