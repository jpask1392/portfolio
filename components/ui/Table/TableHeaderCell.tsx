import cn from 'classnames';

interface Props {
  value: string
  rowIndex: number
  extendHeaderColumn?: boolean
}

const TableHeader: React.FC<Props> = ({
  value,
  rowIndex,
}) => {
  return (
    <div className={cn("py-4 px-4 text-center whitespace-pre-wrap border border-white h-full w-full bg-[#000] text-white rounded-sm", {
    })}>
      <p className="uppercase font-medium">{value}</p>
    </div>
  )
}

export default TableHeader;
