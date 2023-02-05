interface Props {
  componentName: string
  props: string
}

type Variant = string;

const CustomComponent: React.FC<Props> = ({
  componentName,
  props,
}) => {

  const Components: {
    [P in Variant]: React.ComponentType<any> | string
  } = {
    // ProductReviews: ProductReviews,
    // RewardsTemplate: RewardsTemplate,
    // OctaneQuiz: OctaneQuiz,
  };

  let propsJSON = {};
  if (props) {
    let propsRaw = props.replace(/(\r\n|\n|\r)/gm, ""); // remove new lines
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
