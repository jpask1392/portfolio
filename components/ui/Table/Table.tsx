import TableheaderCell from './TableHeaderCell';
import TableRowCell from './TableRowCell';

interface Props {
  table: {
    fieldtype: string
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
  table
}) => {
  return (
    <div className="ui-table border border-secondary p">
      <div className="grid grid-cols-5">
      {
        table.thead.map((headCell, index) => 
          <TableheaderCell
            key={headCell._uid}
            value={headCell.value}
            rowIndex={index}
          />
        )
      }
      </div>

      {
        table.tbody.map((row, index) => {
          return (
            <div 
              key={row._uid}
              className="grid grid-cols-5 -mb-px"
            >
              {
                row.body.map((rowCell, index) => 
                  <TableRowCell
                    key={rowCell._uid}
                    value={rowCell.value}
                    rowIndex={index}
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
