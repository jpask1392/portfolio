import cn from 'classnames';

interface Props {
  value: string
  rowIndex: number
  totalRows: number
}

const TableRow: React.FC<Props> = ({
  value,
  rowIndex,
  totalRows,
}) => {
  return (
    <div 
      className={cn("p-3 w-full h-full", {
        "rounded-b-sm" : rowIndex === totalRows - 1,
        "rounded-t-sm" : rowIndex === 0,
        "bg-[#E3DDCD]" : rowIndex % 2 === 0,
        "bg-background" : rowIndex % 2 !== 0,
      })}
    >{
      value === "[dot]"
        ? <span className="text-4xl">&#9679;</span>
        : value
    }</div>
  )
}

export default TableRow;
