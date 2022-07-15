import DynamicIcon from "@/components/icons/DynamicIcon";

interface Props {
  data: any[]
}

const DetailsTab: React.FC<Props> = ({
  data
}) => {
  return (
    <>
      <ul className="flex flex-wrap -mb-6">
        {
          data.map((item, index) => {
            let iconKey: string | undefined = "";

            const iconMap: any = {
              time : "time",
              viscosity : "viscosity",
              size : "size",
              precision : "precision",
              mix : "mixable",
              formula : "pigments",
            }

            /**
             * Check if the text contains any of the icon trigger words
             */
            iconKey = Object.keys(iconMap).find((key) => item.toLowerCase().includes(key));

            return (
              <li 
                key={index}
                className="w-1/2 mb-6 flex items-start"
              >
                { 
                  iconKey 
                    ? <DynamicIcon type={iconMap[iconKey]} className="w-7 mr-3 flex-shrink-0"/> 
                    : null 
                }
                <p className="uppercase">{item}</p>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default DetailsTab;
