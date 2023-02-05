import cn from "classnames";
import { FC } from 'react'

interface Props {
  className?: string
  children?: any
}

const Display: FC<Props> = (props) => <span className="text-display">{props.children}</span>
const H1: FC<Props> = (props) => <h1 className={props.className}>{props.children}</h1>
const H2: FC<Props> = (props) => <h2 className={props.className}>{props.children}</h2>
const H3: FC<Props> = (props) => <h3 className={props.className}>{props.children}</h3>
const H4: FC<Props> = (props) => <h4 className={props.className}>{props.children}</h4>
const H5: FC<Props> = (props) => <h5 className={props.className}>{props.children}</h5>
const H6: FC<Props> = (props) => <h6 className={props.className}>{props.children}</h6>

interface ParagraphProps {
  size?: 'secondary' | 'caption' | undefined
  className?: string
  children?: any
}

const Paragraph: FC<ParagraphProps> = ({
  children, 
  size,
  className,
}) => {
  const paragraphClassnames = cn(className, {
    'caption' : size === 'caption',
  })

  return (
    <p className={paragraphClassnames}>{children}</p>
  )
}

export {
  Display,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Paragraph
};
