import cn from 'classnames';

const StarRating = ({
  className,
}) => {
  return (
    <div className={cn(className)}>
      {[...Array(5)].map((star, index) => {
        return (
          <span className="text-accent mx-0.5 text-xl" key={index}>&#9733;</span>
        );
      })}
    </div>
  )
}

export default StarRating;
