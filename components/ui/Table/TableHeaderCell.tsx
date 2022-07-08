import cn from 'classnames';

interface Props {
  value: string
  rowIndex: number
  extendHeaderColumn?: boolean
}

const TableHeader: React.FC<Props> = ({
  value,
  rowIndex,
  extendHeaderColumn,
}) => {
  return (
    <div className={cn("py-4 px-4 text-center whitespace-pre-wrap border-x border-secondary border-b -mx-px", {
      "bg-red-100" : !value,
      "bg-primary" : value,
      "col-span-2" : rowIndex === 0 && extendHeaderColumn,
    })}>
      <p className="first-line:font-header first-line:uppercase text-secondary">{value}</p>
    </div>
  )
}

export default TableHeader;
