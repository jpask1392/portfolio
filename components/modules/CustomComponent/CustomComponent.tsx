import type { SbBlokData } from "@storyblok/react"

interface Props {
  componentName: string
  props: string
}

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

  const Components: {
    [P in Variant]: React.ComponentType<any> | string
  } = {
    
  };

  let propsJSON = {};
  if (customProps) {
    let propsRaw = customProps.replace(/(\r\n|\n|\r)/gm, ""); // remove new lines
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
