module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: (function () { // function to safelist any classes used in the CMS
    let safeList = [];
    let breakpoints = ['sm:','md:','lg:','xl:','2xl:'];
    let widths = ['full','1/12','2/12','2.4/12','3/12','4/12','5/12','6/12','7/12','8/12','9/12','10/12','11/12'];
    let maxWidths = ['sm', 'md','lg','xl','2xl'];
    let justify = ['start', 'center', 'end', 'between'];
    let itemsAlign = ['start', 'center', 'end'];
    let order = ['none','1','2','3','4','5','6','7','8','9','10','11','12'];
    let align = ['left','center','right'];
    let spacingPrefixes = ['-m','m','p','-p','pb','pt','px','py','-mb','mb','mr','-mr','-mx','ml','pl', '-my'];
    let spacing = ['auto','1', '2','4','5','6','8', '10','12','16', '20','24','28','32','36','6-12','1-12'];
    let cursors = ['pointer'];
    let flexs = ['col', 'col-reverse', 'row', 'row-reverse'];
    let displays = ['block', 'inline-block'];
    let bg = [];
    let textColors = ['white'];
    let grids = [1, 2, 3, 4, 5];

    // non breakpoint
    grids.forEach(grid => safeList.push('grid-cols-' + grid));
    bg.forEach(bg => safeList.push('bg-' + bg));
    textColors.forEach(textColor => safeList.push('text-' + textColor));
    displays.forEach(display => safeList.push(display));
    flexs.forEach(dir => safeList.push('flex-' + dir));
    cursors.forEach(cursor => safeList.push('cursor-' + cursor));
    widths.forEach(width => safeList.push('w-' + width));
    justify.forEach(justify => safeList.push('justify-' + justify));
    order.forEach(order => safeList.push('order-' + order));
    maxWidths.forEach(maxWidth => safeList.push('max-w-screen-' + maxWidth));
    itemsAlign.forEach(align => safeList.push('items-' + align))
    itemsAlign.forEach(align => safeList.push('self-' + align))
    align.forEach(align => safeList.push('text-' + align))
    spacing.forEach((spacing) => {
      spacingPrefixes.forEach((prefix) => {
        safeList.push(prefix + '-' + spacing);
      })
    })

    // with breakpoints
    breakpoints.forEach(bp => {
      displays.forEach(display => safeList.push(bp + display));
      flexs.forEach(dir => safeList.push(bp + 'flex-' + dir));
      widths.forEach(width => safeList.push(bp + 'w-' + width))
      justify.forEach(justify => safeList.push(bp + 'justify-' + justify))
      order.forEach(order => safeList.push(bp + 'order-' + order))
      align.forEach(align => safeList.push(bp + 'text-' + align))
      itemsAlign.forEach(align => safeList.push(bp + 'items-' + align))

      spacing.forEach((spacing) => {
        spacingPrefixes.forEach((prefix) => {
          safeList.push(bp + prefix + '-' + spacing);
        })
      })
    });

    safeList.push('flex-1');
  
    return safeList;
  })(),
  jit: true,
  theme: {
    screens: {
      'sm': '640px',
      'md': '960px',
      'lg': '1281px',
      'xl': '1440px',
      '2xl': '1920px',
    },
    container: {
      center: true,
      padding: '1.875rem',
    },
    fontFamily: {
      header: "'Sofia Sans Extra Condensed', sans-serif",
      sans: "'Inter', sans-serif",
    },
    fontSize: {
      'tiny': '.625rem', // 10px
      'xs': '.75rem', // 12px
      'sm': '.8125rem', // 14px
      'base': '0.9375rem', // 15px - base 
      'lg': '1.125rem', // 18px
      'xl': '1.25rem', // 20px 
      '2xl': '1.375rem', // 22px 
      '3xl': '1.5rem', // 24px 
      '4xl': '1.5625rem', // 25px 
      '5xl': '1.6875rem', // 27px
      '6xl': '1.875rem', // 30px
      '7xl': '2.1875rem', // 35px
      '8xl': '2.5rem', // 40px
      '9xl': '2.75rem', // 44px
      '10xl': '3.125rem', // 50px
      '11xl': '4rem', // 64px
      '12xl': '4.6875rem', // 75px
      '13xl': '5.875rem', // 94px
      '14xl': '6.625rem', // 108px
    },
    extend: {
      colors: {
        background: "#FFF",
        accent: "#CAFF66",
        black: "#1A1A1C",
        white: "#FFFFFF",
        yellow: "#E7BD56",
        red: "#F15D4D",
        green: "#B9CDB3"
      },
      margin: {
        '6-12': '50%',
        '1-12': '8.33333%',
        '3-12': '25%',
      }
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
  ],
};
