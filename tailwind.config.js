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
    let spacingPrefixes = ['-m','m','p','-p','pb','px','-mb','mb','mr','-mr','-mx','ml','pl'];
    let spacing = ['auto','2','4','6','8', '10','12','16','24','32'];
    let cursors = ['pointer'];
    let flexs = ['col', 'col-reverse', 'row', 'row-reverse'];
    let displays = ['block', 'inline-block'];
    let bg = ['primary'];
    let textColors = ['white'];

    // non breakpoint
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
    safeList.push('bg-gray-100');
  
    return safeList;
  })(),
  jit: true,
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
      '2xl': '1920px',
    },
    container: {
      center: true,
      padding: '2rem',
    },
    fontFamily: {
      header: "'neue-haas-grotesk-display', serif",
      sans: "'neue-haas-grotesk-display', serif",
    },
    fontSize: {
      'tiny': '.68rem', // 11px
      'xs': '.75rem', // 12px
      'sm': '.875rem', // 14px
      'base': '1rem', // 16px - base (tablet paragraph)
      'lg': '1.125rem', // 18px
      'xl': '1.25rem', // 20px
      '2xl': '1.375rem', // 22px
      '3xl': '1.5rem', // 24px
      '4xl': '1.625rem', // 26px
      '5xl': '1.75rem', // 28px
      '6xl': '1.875rem', // 30px
      '7xl': '2rem', // 32px
      '8xl': '2.375rem', // 38px
      '9xl': '2.875rem', // 46px
      '10xl': '3rem', // 48px
      '11xl': '3.75rem', // 60px
      '12xl': '4.5rem', // 72px
      '13xl': '6.25rem', // 100px
    },
    ringColor: 'red',
    ringOffsetColor: 'red',
    extend: {
      colors: {
        primary: '#EDE6DB',
        secondary: "#72605B",
        black: '#050505',
        gray2: '#303030',
        gray3: '#161616',
        grayLight: '#E9E9E9',
        fadedText: '#9F9F9F'
      },
      spacing: {
        'screen-1/2': '50vw',
        'cart': '28rem',
      },
      lineHeight: {
        'tighter': '1.15',
      },
      letterSpacing: {
        'snug': '-0.01em',
        'narrow': '0.005em'
      },
      maxWidth: {
        'cart': '28rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
  ],
};
