import cn from 'classnames';
import DynamicIcon from "@/components/icons/DynamicIcon";

interface Props {
  type: string
  display: string
}

const Icon: React.FC<Props> = ({
  type,
  display = "block"
}) => {
  return (
    <div className={cn("w-10", {
      "inline-block ml-4" : display === "inline-block",
      "mb-6 mx-auto" : display === "block"
    })}>
      <DynamicIcon 
        type={type} 
        className="text-red mx-auto"
      />
    </div>
  )
}

export default Icon;
