import DynamicIcon from "@/components/icons/DynamicIcon";

interface Props {
  type: string
}

const Icon: React.FC<Props> = ({
  type
}) => {
  return (
    <div className="w-10 mx-auto mb-6">
      <DynamicIcon 
        type={type} 
        className="text-secondary"
      />
    </div>
  )
}

export default Icon;
