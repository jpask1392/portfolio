import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  results: any[] | boolean
  searching: boolean
}

const SearchResults: React.FC<Props> = ({
  results,
  searching
}) => {
  return (
    <div className="border border-red bg-white w-full shadow text-red">
      {
        searching ? (
          <ul className="p-3">
            {[...Array(3)].map((number, i) => {
              return (
                <li key={i} className="flex items-center mb-2 last-of-type:mb-0">
                  <div className="h-8 w-8">
                    <Skeleton circle containerClassName="flex h-full" />
                  </div>
                  <div className="ml-3 flex-1">
                    <Skeleton containerClassName="flex h-4" />
                  </div>
                </li>
              )
            })}
          </ul>
        ) : null 
      }
      
      { 
        Array.isArray(results) && results.length && !searching ? (
          <ul>
            {
              results.map((result: any) => {
                return (
                  <li 
                    key={result.id}
                    className="border-b last-of-type:border-none"
                  >
                    <Link legacyBehavior={true} href={`/product/${result.handle}`}>
                      <a
                        className="text-base p-3 flex hover:opacity-50 items-center"
                      >
                        <Image 
                          src={result.images.edges[0].node.thumbnail_url}
                          height={35}
                          width={35}
                          alt={"Thumbnail Image"}
                        /><span className="ml-3">{result.title}</span>
                      </a>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        ) : null
      }

      { 
        Array.isArray(results) && !results.length && !searching ? (
          <p className="p-3 text-base">
            No Results Found
          </p>
        ) : null
      }
    </div>
  )
}

export default SearchResults;
