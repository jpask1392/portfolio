import * as Tooltip from '@radix-ui/react-tooltip';

interface Props {
  text: string | false | null
  Trigger: any
}

const CustomTooltip: React.FC<Props> = ({
  text,
  Trigger,
}) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="IconButton" type="button">
            <Trigger />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          {
            text ? (
              <Tooltip.Content className="TooltipContent z-50 bg-black text-white rounded-sm text-xs uppercase py-4 px-5" sideOffset={5}>
                {text}
                <Tooltip.Arrow className="TooltipArrow " />
              </Tooltip.Content>
            ) : null
          }
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default CustomTooltip;