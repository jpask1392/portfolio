import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  results: any[] | boolean
}

const SearchResults: React.FC<Props> = ({
  results
}) => {
  return (
    <div className="border border-secondary p-3 bg-white w-full shadow">
      {
        !results ? (
          <ul>
            {[...Array(3)].map((index) => {
              return (
                <li key={index} className="flex items-center mb-2 last-of-type:mb-0">
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
        ) : (
          <div>
            <ul>
              {
                Array.isArray(results) && results.map((result: any) => {
                  return (
                    <li key={result.id}>
                      {result.title}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )
      }
    </div>
  )
}

export default SearchResults;
