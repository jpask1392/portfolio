import { render } from "storyblok-rich-text-react-renderer";

interface Props {
  text: string
  backgroundColor: {
    color: string
  }
  textColor: {
    color: string
  }
}

const Bubble: React.FC<Props> = ({
  text,
  backgroundColor, 
  textColor
}) => {
  return (
    <div 
      className="rounded-full aspect-square flex justify-center items-center"
      style={{
        background: backgroundColor.color,
        color: textColor.color
      }}
    >
      <div className="text-center uppercase font-header [&>p]:text-4xl">
        { render(text) }
      </div>
    </div>
  )
}

export default Bubble;
