import DynamicComponent from "@/components/helpers/DynamicComponent";

interface Props {
  tiles: any[]
  columnCount?: number
}

const TileGrid: React.FC<Props> = ({
  tiles,
  columnCount,
}) => {
  return (
    <div className="flex flex-wrap">
      {
       tiles.length ? tiles.map((tile, i) => {
        return (
          <div 
            key={i}
            className={`bg-primary border border-secondary w-1/2 md:w-1/${columnCount} -mx-px -mb-px p-4`}
          >
            <DynamicComponent
              blok={tile}
              key={tile._uid} 
            />
          </div>
        )
       })  : null
      }
    </div>
  )
}

export default TileGrid;
