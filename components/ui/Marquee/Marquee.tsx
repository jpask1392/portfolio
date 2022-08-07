import Ticker from 'react-ticker';
import { render, NODE_PARAGRAPH } from "storyblok-rich-text-react-renderer";
import { renderOptions } from "utils/constants";

interface Props {
  text: string,
  repeat: string,
}

const Marquee: React.FC<Props> = ({
  text,
  repeat = '2',
}) => {
  /**
   * TODO: Marquee causes a small bump on gsap start point detection
   *  
   * I think its rendering blank initially and then loading the content.
   * The height on the UI element is overcomming that issue for now.
   * */ 
  return (
    <div className="ui-marquee h-[35.75px]">
      <Ticker speed={10}>
        {({ index }) => (
          <div className="uppercase">
            { render(text, {
              ...renderOptions,
              nodeResolvers: {
                [NODE_PARAGRAPH]: (children) => <p className="font-medium text-2xl whitespace-nowrap">{children}</p>
              }
            }) }
          </div>
        )}
    </Ticker>
      
    </div>
  )
}

export default Marquee;
