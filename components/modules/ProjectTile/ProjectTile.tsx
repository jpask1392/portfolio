import Image from '@/components/ui/Image';
import Button from '@/components/ui/Button';
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
  project: any
}

const ProjectTile: React.FC<Props> = ({ 
  project,
  index,
  className,
}) => {
  console.log(project)
  const {
    content: {
      excerpt,
      tileImage,
      siteLink,
    }
  } = project
  return (
    <article 
      className={cn(className)}
    >
      <header className="aspect-[9/12] bg-gray-300 overflow-hidden rounded-lg relative">
        <Image 
          image={tileImage}
          objectFit="cover"
          layout="fill"
        />
      </header>
      <footer className="pt-6 px-5">
        <Header tag="h3" size="h3">{project.name}</Header>
        <p className="mt-2.5">
          {excerpt}
        </p>
        <Button
          link={siteLink}
          className="w-full mt-4"
          text="View Website"
          icon={<DynamicIcon type="arrowNewPage" />}
        />
      </footer>
    </article>
  )
}

export default ProjectTile;
