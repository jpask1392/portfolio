import Image from '@/components/ui/Image';
import Button from '@/components/ui/Button';
import DynamicIcon from '@/components/icons/DynamicIcon';
import Header from '@/components/ui/Header';
import cn from 'classnames';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import Modal from '@/components/ui/Modal';
import { useState } from 'react';

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
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const {
    content: {
      excerpt,
      tileImage,
      siteLink,
    }
  } = project;

  return (
    <article 
      className={cn(className, "flex flex-col h-full")}
    >
      <header 
        className="aspect-[3/4] bg-gray-300 overflow-hidden rounded-lg relative cursor-pointer"
        // onClick={() => setModalIsOpen(true)}
      >
        <Image 
          image={tileImage}
          objectFit="cover"
          layout="fill"
          className="pointer-events-none"
        />
        {/* <div className="absolute inset-0 bg-[black] bg-opacity-40" /> */}
      </header>
      <footer className="pt-6 px-5 flex flex-col flex-1">
        <Header tag="h3" size="h3">{project.name}</Header>
        <p className="mt-2.5">
          {excerpt}
        </p>
        <p className="mt-auto pt-4 flex">
          <Button
            link={siteLink}
            className="w-full"
            text="Learn More"
            icon={<DynamicIcon type="arrowNewPage" />}
          />

          {/* <a 
            href={siteLink}
            target="_blank"
            rel="noopener"
            className="bg-red-100"
          >
            <DynamicIcon type="arrowNewPage" />
          </a> */}
        </p>
      </footer>

      <Modal
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
      >
        <div className="w-full bg-white max-w-[640px] ml-auto p-16 rounded-lg border border-black mr-3 shadow-md">
          {project.name}
        </div>
      </Modal>
    </article>
  )
}

export default ProjectTile;
