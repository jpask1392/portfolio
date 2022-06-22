import cn from 'classnames';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

interface Props {
  collection: any
  visuallyHide?: boolean
}

const CollectionSubHeader: React.FC<Props> = ({
  collection,
  visuallyHide
}) => {
  return (
    <div className={cn("pb-10 md:pb-24", {
      "lg:opacity-0" : visuallyHide
    })}>
      <div className="mb-3">
        <Breadcrumbs />
      </div>
      <div>
        <h2 className="text-7xl font-medium">
          <span className="mr-2">{collection.title}</span>
          <span>({collection.products.length})</span>
        </h2>
      </div>
    </div>
  )
}

export default CollectionSubHeader;
