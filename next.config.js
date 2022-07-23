const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  i18n: {
    localeDetection: false,
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ['a.storyblok.com'],
  },
  compiler: {
    // ssr and displayName are configured by default
    // styledComponents: true,
  },
});
