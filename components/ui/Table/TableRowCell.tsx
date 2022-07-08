import cn from 'classnames';

interface Props {
  value: string
  rowIndex: number
  extendHeaderColumn?: boolean
}

const TableRow: React.FC<Props> = ({
  value,
  rowIndex,
  extendHeaderColumn
}) => {
  return (
    <div 
      className={cn("p-3 border-l border-secondary border-b -mx-px", {
        "text-center" :  rowIndex > 0,
        "uppercase font-header text-secondary" : rowIndex === 0,
        "col-span-2" : rowIndex === 0 && extendHeaderColumn,
      })}
    >{value}</div>
  )
}

export default TableRow;
