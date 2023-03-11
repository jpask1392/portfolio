import tinycolor from "tinycolor2";
import DynamicIcon from "@/components/icons/DynamicIcon";
import Link from "next/link";
import CustomImage from "@/components/ui/Image"
import cn from "classnames";
import { NextSeo } from "next-seo";
import { SbEditableContent } from "@/types/storyBlok";
import { StoryblokComponent } from "@storyblok/react"
import { useGlobalContext } from "../context/globalContext";

interface Props {
  blok: SbEditableContent
}

const Page: React.FC<Props> = (props) => {
  const {
    body,
    seo,
    scripts,
    backgroundColor,
    fixedImage,
  } = props.blok || props;

  const { story: page } = useGlobalContext();
  const isDarkBackground = tinycolor(backgroundColor.value).isDark();

  return (
    <>
      <NextSeo
        title={seo && seo.length ? seo[0].title : page.name}
        description={seo && seo.length ? seo[0].description : ""}
      />

      {
        page.slug !== "home" ? (
          <div className="absolute top-6 right-6 md:top-12 md:right-12 z-50">
            <Link href="/" className="page-change-button bg-black w-10 h-10 flex items-center justify-center rounded-full p-3 hover:bg-opacity-90 transition-all hover:bg-darkGrey focus:ring-4 focus:ring-blue-300 focus:outline-none">
              <DynamicIcon type="close" className="w-full text-accent" />
            </Link>
          </div>
        ) : null
      }

      <main
        id={`page-${page.slug}`}
        className="min-h-screen"
        style={{
          backgroundColor: backgroundColor.value,
          color: isDarkBackground ? "#fff" : "currentcolor"
        }}
      >
        <div className="relative z-10">
          {
            body ? (
              body.map((blok: SbEditableContent) => (
                <StoryblokComponent
                  blok={blok} 
                  key={blok._uid} 
                />
              ))
            ) : null
          }
        </div>

        {
          fixedImage ? (
            <div className="hidden md:block absolute inset-x-2.5 top-0 z-0" data-scroll-sticky data-scroll-target="#main-scroll-wrapper">
              <div className="h-screen flex items-end">
                <div className="w-5/12 ml-auto mr-[8.333%] px-5 relative">
                  {/* <CustomImage 
                    image={fixedImage}
                    preload 
                  /> */}
                </div>
              </div>
            </div>
          ) : null
        }
      </main>
    </>
  )
};

export default Page;
