import DynamicIcon from "@/components/icons/DynamicIcon";

interface Props {
  name: string
}

const InfoPill: React.FC<Props> = ({
  name,
}) => {
  // only show is name is in list
  const allowedNames: string[] = [
    "best seller"
  ];

  if (!allowedNames.includes(name.toLowerCase())) return null;

  return (
    <div className="bg-primary text-primary rounded-full p-1.5 flex items-center space-x-2">
      <span className="text-primary"><DynamicIcon type="star"/></span>
      <span className="hidden lg:block uppercase font-bold text-tiny tracking-widest leading-none">
        {name}
      </span>
    </div>
  )
}

export default InfoPill;
