const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false,
})

module.exports = withBundleAnalyzer({
  images: {
    domains: [
      'lh3.googleusercontent.com', 
      'ipfs.io', 
      'opensea.mypinata.cloud',
      'openseauserdata.com',
      'i.seadn.io',
      'a.storyblok.com',
    ],
  }
});
