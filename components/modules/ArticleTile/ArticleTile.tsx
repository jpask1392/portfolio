import Header from '@/components/ui/Header';
import cn from 'classnames';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  className?: string
  article: any
}

const ArticleTile: React.FC<Props> = ({ 
  article,
  className,
}) => {
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
                { article?.title || <Skeleton width="33%" /> }
              </Header>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ArticleTile;
