import cn from 'classnames';

interface Props {
  value: string
  rowIndex: number
}

const TableRow: React.FC<Props> = ({
  value,
  rowIndex
}) => {
  return (
    <div 
      className={cn("p-3 border-l border-secondary border-b -mx-px", {
        "text-center" :  rowIndex > 0,
        "uppercase font-header text-secondary col-span-2" : rowIndex === 0,
      })}
    >{value}</div>
  )
}

export default TableRow;
