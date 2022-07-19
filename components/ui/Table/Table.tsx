import cn from 'classnames';
import TableheaderCell from './TableHeaderCell';
import TableRowCell from './TableRowCell';

interface Props {
  extendHeaderColumn?: boolean
  table: {
    fieldtype?: string
    thead: {
      _uid: string
      value: string // escaped
    }[]
    tbody: {
      _uid: string
      body: {
        _uid: string
        value: string
      }[]
    }[]
  }
}

const Table: React.FC<Props> = ({
  table,
  extendHeaderColumn = false
}) => {
  if (!table) return null;

  return (
    <div className="ui-table border border-secondary p">
      <div className={cn("grid", {
        [`grid-cols-${table.thead.length}`] : !extendHeaderColumn,
        [`grid-cols-${table.thead.length + 1}`] : extendHeaderColumn,
      })}>
      {
        table.thead.map((headCell, index) => 
          <TableheaderCell
            key={headCell._uid}
            value={headCell.value}
            rowIndex={index}
            extendHeaderColumn={extendHeaderColumn}
          />
        )
      }
      </div>

      {
        table.tbody.map((row, index) => {
          console.log(row)
          return (
            <div 
              key={row._uid}
              className={cn("grid -mb-px", {
                [`grid-cols-${table.thead.length}`] : !extendHeaderColumn,
                [`grid-cols-${table.thead.length + 1}`] : extendHeaderColumn,
              })}>
              {
                row.body.map((rowCell, index) => 
                  <TableRowCell
                    key={rowCell._uid}
                    value={rowCell.value}
                    rowIndex={index}
                    extendHeaderColumn={extendHeaderColumn}
                  />
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default Table;
