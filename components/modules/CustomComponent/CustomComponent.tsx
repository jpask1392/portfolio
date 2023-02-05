<<<<<<< HEAD
=======
import type { SbBlokData } from "@storyblok/react"

>>>>>>> refactor
interface Props {
  componentName: string
  props: string
}

<<<<<<< HEAD
type Variant = string;

const CustomComponent: React.FC<Props> = ({
  componentName,
  props,
}) => {
=======
interface Blok extends SbBlokData, Props {}

interface ComponentProps extends Props {
  children?: any
  blok?: Blok
}

type Variant = string;

const CustomComponent: React.FC<ComponentProps> = (props) => {
  const {
    componentName,
    props: customProps,
  } = props.blok || props;
>>>>>>> refactor

  const Components: {
    [P in Variant]: React.ComponentType<any> | string
  } = {
<<<<<<< HEAD
    // ProductReviews: ProductReviews,
    // RewardsTemplate: RewardsTemplate,
    // OctaneQuiz: OctaneQuiz,
  };

  let propsJSON = {};
  if (props) {
    let propsRaw = props.replace(/(\r\n|\n|\r)/gm, ""); // remove new lines
=======
    
  };

  let propsJSON = {};
  if (customProps) {
    let propsRaw = customProps.replace(/(\r\n|\n|\r)/gm, ""); // remove new lines
>>>>>>> refactor
    propsRaw = propsRaw.replace(/~/g, ""); // remove tildas
    propsJSON = JSON.parse(propsRaw);
  }

  if (typeof Components[componentName] !== "undefined") {
    const Component = Components[componentName];
    return <Component {...propsJSON} />;
  } else {
    return null;
  }
}

export default CustomComponent;
