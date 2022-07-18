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
    <div>
      <div 
        className="rounded-full aspect-square flex justify-center items-center w-full max-w-[260px] mx-auto"
        style={{
          background: backgroundColor.color,
          color: textColor.color
        }}
      >
        <div className="text-center uppercase font-header [&>p]:text-4xl">
          { render(text) }
        </div>
      </div>
    </div>
  )
}

export default Bubble;
