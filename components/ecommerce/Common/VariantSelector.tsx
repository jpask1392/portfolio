import { RadioGroup } from "@/components/ui/Inputs";
import { useEffect, useState, useCallback } from "react";
import cn from "classnames";

interface Props {
  product: any
  onVariantChange: any
  displaySelected?: boolean
}

const VariantSelector: React.FC<Props> = ({
  product,
  onVariantChange,
  displaySelected,
}) => {
  let {
    variants,
    options,
  } = product;

  const [ selectedVariant, setSelectedVariant ] = useState<any | boolean>(false);
  const [ selectedOptions, setSelectedOptions ] = useState({
    option1: null,
    option2: null,
    option3: null,
  });

  const colorMap: any = {
    brown: "#72605B",
    blue: "#6166D3",
    green: "#70A35D",
    yellow: "#EFD66E",
    red: "#D6613E",
    pink: "#EBBFBB"
  }

  /**
   * Products with one option are not returned as 
   * and array. Use this to convert to array for map.
  */ 
  options = !Array.isArray(options) ? [options] : options;

  const updateOption = (value: string, name: string) => {
    setSelectedOptions({...selectedOptions, [name]: value})
  }

  useEffect(() => {
    // set defaults
    const defaultVariant = variants[0];

    setSelectedOptions({
      option1: defaultVariant.option1,
      option2: defaultVariant.option2,
      option3: defaultVariant.option3,
    })
  }, [variants])

  useEffect(() => {
    onVariantChange(selectedVariant);
  }, [selectedVariant, onVariantChange])

  useEffect(() => {
    const newVariant = variants.filter((variant: any) => {
      return (
        variant.option1 === selectedOptions.option1
        && variant.option2 === selectedOptions.option2
        && variant.option3 === selectedOptions.option3
      );
    });

    (newVariant.length === 1)
      ? setSelectedVariant(newVariant[0])
      : setSelectedVariant(false);

  }, [selectedOptions, variants])

  return (
    <div className="variants">
      {
        Array.isArray(options) && options.map((option, index) => {
          if (option.name.toLowerCase() === "color") {
            return (
              <ul className="flex items-center" key={index}>
                {
                  option.values.map((color: string, i: number) => {
                    return (
                      <li 
                        key={i}
                        onClick={() => updateOption(color, `option${index + 1}`)}
                        className={cn("rounded-full inline-block cursor-pointer transition-opacity last:mr-0", {
                          "border-black border opacity-100" : selectedVariant.name === color,
                          "opacity-30 hover:opacity-100" : selectedVariant.name !== color,
                          "w-2.5 h-2.5 md:w-5 md:h-5 mr-4" : displaySelected,
                          "w-2.5 h-2.5 md:w-4 md:h-4 mr-2" : !displaySelected
                        })}
                        style={{
                          background: colorMap[color.toLowerCase()]
                        }}
                      />
                    )
                  })
                }

                {
                  displaySelected ? (
                    <p className="ml-5 uppercase text-secondary font-header">
                      Color: {selectedVariant.name}
                    </p>
                  ) : null
                }
              </ul>
            )
          } else {
            return (
              <RadioGroup
                name={`option${index + 1}`}
                items={option.values}
                onChange={updateOption}
              />
            )
          }
        })

      }
    </div>
  ) 
}

export default VariantSelector;
