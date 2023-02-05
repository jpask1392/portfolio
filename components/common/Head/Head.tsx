import HeadScripts from "../HeadScripts";
import NextHead from "next/head";
import { DefaultSeo } from 'next-seo';
import config from 'config/seo.json';


interface Props {
  seo: any,
}

const Head: React.FC<Props> = () => {
  return (
    <>
      <DefaultSeo {...config} />
      <NextHead>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </NextHead>
      <HeadScripts />
    </>
  )
};

export default Head;
