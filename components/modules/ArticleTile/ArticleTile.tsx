import Header from '@/components/ui/Header';
import { Paragraph } from '@/components/ui/Typography';
import cn from 'classnames';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  className?: string
  index?: number
  article: any
}

const ArticleTile: React.FC<Props> = ({ 
  article,
  index,
  className,
}) => {
  return (
    <article 
      className={cn("relative group p-5 lg:p-8 xl:p-10 2xl:p-12", className)}
    >
      <div className="mt-2 md:mt-6">
        <div className="flex justify-between flex-wrap">
          <div className="w-full">
            <div>
            <Header
              color="secondary"
              tag="h2"
              size="h3">
            { article?.tags.length
              ? `${ article?.tags[0] }`
              : 'No tags'
             }
             </Header>
              <Header
                tag="h3"
                size="h4" 
                className="font-bold w-full mb-2"
              >
                { article?.title || <Skeleton width="33%" /> }
              </Header>

              <Paragraph>{ article?.excerpt }</Paragraph>
              <Link href={ '/' + article.blog.handle + '/' + article?.handle }>Read More</Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ArticleTile;
