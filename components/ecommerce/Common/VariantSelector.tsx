import { RadioGroup } from "@/components/ui/Inputs";
import { useEffect, useState, useCallback } from "react";

interface Props {
  product: any
  onVariantChange: any
}

const VariantSelector: React.FC<Props> = ({
  product,
  onVariantChange,
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
          return (
            <div className="mb-6 last-of-type:mb-0" key={index}>
              <p className="caption">Select {option.name}</p>
              <div className="mt-4">
                <RadioGroup
                  name={`option${index + 1}`}
                  items={option.values}
                  onChange={updateOption}
                />
              </div>
            </div>
          )
        })
      }
    </div>
  ) 
}

export default VariantSelector;
