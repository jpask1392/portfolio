import DynamicIcon from '@/components/icons/DynamicIcon';
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
      className={cn("relative group p-5 lg:p-8 xl:p-10 2xl:p-12", className, {  
        "bg-primary text-secondary" : index % 2 !== 0,
        "bg-secondary text-primary": index % 2 === 0
      })}
    >
      <div className="mt-2 md:mt-6">
        <div className="flex justify-between flex-wrap">
          <div className="w-full">
            <Header
              tag="h2"
              size="h3"
            >
              { 
                article?.tags.length
                  ? `${ article?.tags[0] }`
                  : 'No tags'
              }
            </Header>

            <Header
              tag="h3"
              size="h4" 
              className="mb-6 mt-5"
            >
              { article?.title || <Skeleton width="33%" /> }
            </Header>

            <Paragraph>{ article?.excerpt }</Paragraph>

            <Link href={ '/' + article.blog.handle + '/' + article?.handle }>
              <a className="mt-10 block uppercase font-header text-4xl">
                Read More
                <span className="inline-block">
                  <DynamicIcon type="chevronRight" className="h-4 ml-4"/>
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ArticleTile;
