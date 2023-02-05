import Link from "next/link"
import HoverLink from "./HoverLink"

const IndexBody = () => {
  return (
    <>
     <h1 className="!text-[6vw] h1 mx-[8.3333%] w-7/12 text-outlined">living in <HoverLink name="Los Angeles" action={{ type: "link", data: { link: "/static/about"} }} />, working as a web engineer. seeking opportunities to collaborate with a lively, forward thinking team. I  work with technologies like <HoverLink name="nextjs" />, <Link href="/static/about">Shopify</Link> & web3 to create engaging, performant digital experiences for clients & brands. also I’m <HoverLink name="welsh" /> and I think thats pretty cool. but enough about me, <HoverLink name="reach out" /> to chat through your next big project. </h1>
    </>
  )
}

export default IndexBody