import cn from 'classnames';
import { useRef, useState } from 'react';
import TableheaderCell from './TableHeaderCell';
import TableRowCell from './TableRowCell';
import { storyblokEditable } from "@storyblok/react";
import type { SbBlokData } from "@storyblok/react"
import { SbEditableContent } from "@/types/storyBlok";

interface Props {
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

interface Blok extends SbBlokData, Props {}

interface TableProps extends Props {
  children: any
  blok?: Blok
}

const Table: React.FC<TableProps> = (props) => {
  const {
    table
  } = props.blok || props;

  const colCount = table.thead.length; // desktop
  const [ visibleCol, setVisibleCol ] = useState(0);
  const tableHeaderRef = useRef<HTMLDivElement | null>(null);
  const rowsRef = useRef<HTMLDivElement[] | null[]>([]);

  if (!table) return null;

  /**
   * Updates scroll position on mobile devices
   * 
   * @param index 
   */
  const handleClick = (index: number) => {
    setVisibleCol(index);

    if (tableHeaderRef.current && rowsRef.current) {
      tableHeaderRef.current.scrollLeft = (tableHeaderRef.current.clientWidth / 2) * index;
      rowsRef.current.forEach((row) => {
        if (row) row.scrollLeft = (row.clientWidth / 2) * index;
      })
    }
  }

  return (
    <div className="ui-table p bg-black rounded-sm">
      <div className="p-1">
        <div 
          ref={tableHeaderRef}
          className="flex flex-nowrap overflow-hidden -mx-0.5 mb-1"
        >
          {
            table.thead.map((headCell, index) => 
              <div 
                key={headCell._uid}
                className={cn(`w-1/2 lg:w-auto flex flex-shrink-0 lg:flex-1 px-0.5`, {
                  "sticky left-0" : index === 0,
                })}
              >
                <TableheaderCell
                  value={headCell.value}
                  rowIndex={index}
                />
              </div>
            )
          }
        </div>

        <div className="border border-black">
          {
            table.tbody.map((row, i: number) => {
              return (
                <div 
                  key={row._uid}
                  id={"row_" + row._uid}
                  ref={el => (rowsRef.current[i] = el)}
                  className={cn("flex flex-nowrap overflow-hidden -mx-0.5", {
                    
                  })}
                >
                  {
                    row.body.map((rowCell, index) => 
                      <div 
                        key={rowCell._uid}
                        className={cn("w-1/2 lg:w-auto flex flex-shrink-0 lg:flex-1 px-0.5", {
                          "sticky left-0" : index === 0,
                        })}
                      >
                        <TableRowCell
                          value={rowCell.value}
                          rowIndex={i}
                          totalRows={table.tbody.length}
                        />
                      </div>
                    )
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Table;
