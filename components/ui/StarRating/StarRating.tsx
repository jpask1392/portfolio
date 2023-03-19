import cn from 'classnames';

interface Props {
  className?: string
}

const StarRating: React.FC<Props> = ({
  className,
}) => {
  return (
    <div className={cn(className)}>
      {[...Array(5)].map((star, index) => {
        return (
          <span className="text-accent mx-0.5 text-xl align-text-bottom" key={index}>&#9733;</span>
        );
      })}
    </div>
  )
}

export default StarRating;
