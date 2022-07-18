interface padding {
  [base: string]: {
    top: string
    bottom: string
  }
  lg: {
    top: string
    bottom: string
  }
}

/**
 * Export classes based on padding object
 * passed in from Storyblok
 * 
 * @param padding
 * @returns 
 */
export const modulePadding: (padding: padding) => string = (padding) => {
  if (!padding) return "";

  let classes: any[] = [];
  
  Object.keys(padding).forEach((key: string) => {
    // sizes in tailwind units
    const sizes: any = {
      sm: '5',
      md: '10',
      lg: '12',
    }

    padding[key].top && classes.push((key === 'base' ? "" : key + ":") + 'pt-' + sizes[padding[key].top]);
    padding[key].bottom && classes.push((key === 'base' ? "" : key + ":") + 'pb-' + sizes[padding[key].bottom]);
  })

  return classes.join(" ");
}
