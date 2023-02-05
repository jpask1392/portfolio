import Modal from "@/components/ui/Modal";
import { ImageModule } from "@/components/ui/Image";
import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";
import cn from "classnames";
import type { storyBlokImage } from '@/types/storyBlok';
import { useRef, useState } from "react";
import { storyblokEditable } from "@storyblok/react";
import type { SbBlokData } from "@storyblok/react"
import { SbEditableContent } from "@/types/storyBlok";

interface Props {
  className?: string
  thumbnail: storyBlokImage
  youtube: {
    id: string
    url: string
    linktype: string
    fieldtype: string
    cached_url: string
    title?: string,
    rel?: string,
  }
}

interface Blok extends SbBlokData, Props {}

interface VideoProps extends Props {
  children?: any
  blok?: Blok
}

const Video: React.FC<VideoProps> = ( props ) => {
  const {
    className,
    thumbnail,
    youtube,
  } = props.blok || props;

  const [modalOpen, setModalIsOpen] = useState(false)

  return (
    <>
    <div
      className={cn(className, "ui-video relative cursor-pointer")}
      {...(props.blok && storyblokEditable(props.blok))}
      onClick={() => setModalIsOpen(true)}
    >
      <ImageModule 
        image={thumbnail}
        displayCaption
        insetCaption
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="border border-white rounded-full w-[75px] h-[75px] lg:w-[150px] lg:h-[150px] flex items-center justify-center bg-[#000] bg-opacity-30">
          <svg className="fill-white w-[23px] h-[23px] lg:w-[45px] lg:h-[45px] left-px lg:left-1 relative" viewBox="0 0 45 52" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 24.268C45.3333 25.0378 45.3333 26.9623 44 27.7321L3.49999 51.1148C2.16666 51.8846 0.499998 50.9223 0.499998 49.3827L0.5 2.61736C0.5 1.07776 2.16667 0.115511 3.5 0.885312L44 24.268Z"/>
          </svg>
        </div>
      </div>

    </div>

    <Modal
      modalIsOpen={modalOpen}
      setModalIsOpen={setModalIsOpen}
    >
      <div className="w-screen px-10 max-w-screen-2xl">
        <iframe 
          className="aspect-video w-full bg-[#000]"
          src={youtube.url}
          title={youtube.title || "Youtube Video Player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        />
      </div>
    </Modal>
    </>
  );
};

export default Video;
