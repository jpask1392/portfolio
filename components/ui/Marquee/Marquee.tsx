import Ticker from 'react-ticker';
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
      <Ticker speed={15}>
        {({ index }) => (
          <>{render(text, renderOptions)}</>
        )}
    </Ticker>
      
    </div>
  )
}

export default Marquee;
