import FastMarquee from "react-fast-marquee";
import { render } from "storyblok-rich-text-react-renderer";
import { renderOptions } from "utils/constants";

interface Props {
  text: string,
  repeat: string,
}

const Marquee: React.FC<Props> = ({
  text,
  repeat = '2',
}) => {
  return (
    <div className="pb-8 ui-marquee">
      <FastMarquee 
        className="overflow-y-hidden"
        gradient={false}
      >
        {[...Array(parseInt(repeat))].map(() => render(text, renderOptions))}
      </FastMarquee>
    </div>
  )
}

export default Marquee;
