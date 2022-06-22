import DynamicComponent from "./DynamicComponent";
import { sbEditable } from "@storyblok/storyblok-editable";

const WithStoryBlok = WrappedComponent => {
  const Inner = (blok, index) => {
    let props = convertModulesToComponents(blok);

    return (
      <WrappedComponent
        {...props}
      >
        { ('content' in blok) ? blok.content.map((childBlok) => <DynamicComponent key={childBlok._uid} blok={childBlok} />) : null }
        { ('slides' in blok) ? blok.slides.map((childBlok) => <DynamicComponent key={childBlok._uid} blok={childBlok} />) : null }
        { ('buttons' in blok) ? blok.buttons.map((childBlok) => <DynamicComponent key={childBlok._uid} blok={childBlok} />) : null }
      </WrappedComponent>
    )
  }

  Inner.displayName = 'test'
  return Inner;
}

export default WithStoryBlok;

/**
 * Convert Storyblok modules to components.
 * 
 * Modules like Hero take components as props - 
 * this function will help convert to the 
 * correct output type.
 * 
 * @param {*} blok 
 * @returns 
 */
const convertModulesToComponents = (blok) => {
  let props = {
    ...blok,
    blok: blok,
    sbEditable: {...sbEditable(blok)}
  }

  const checkForKeys = [
    'TopBlockComponent',
    'BottomBlockComponent'
  ];

  checkForKeys.forEach((key) => {
    if (key in props) {
      if (!props[key].length) {
        props[key] = undefined;
      } else {
        props[key] = 
          () => (
            blok[key]
              .map((childBlok) => <DynamicComponent key={childBlok._uid} blok={childBlok} />)
          )
      }
    }
  });

  return props;
}