import cn from 'classnames';

const TogglePlusMinus = ({
  open,
  className,
}) => {
  const lineClasses = cn("w-full bg-white h-px");

  return (
    <div className={cn(className, "w-3 h-3 flex flex-wrap items-center content-center justify-center")}>
      <span className={lineClasses} />
      <span className={cn(lineClasses, "transform transition-all duration-300 -translate-y-full", {
        "-rotate-90" : !open
      })} />
    </div>
  )
}

export default TogglePlusMinus;
