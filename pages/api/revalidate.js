// pages/api/revalidate.js

/**
 * 
 * Req body example from Storyblok 
 * 
 * body: {
 *   text: 'The user support@techyscouts.com published the Story Login (account/login)\n' +
 *     'https://app.storyblok.com/#/me/spaces/163068/stories/0/0/171300447',
 *   action: 'published',
 *   space_id: 163068,
 *   story_id: 171300447
 * },
 * 
 * Req body example from Shopify product update: 
 * 
 * body: {
 *   id: 7723128520918,
 *   title: 'AClassic Nude',
 *   body_html: '1',
 *   vendor: 'Valentino Beauty Development',
 *   product_type: '',
 *   created_at: '2022-06-22T10:34:32-07:00',
 *   handle: 'perfect-nude-3',
 *   updated_at: '2022-08-23T13:25:54-07:00',
 *   published_at: '2022-06-22T10:34:32-07:00',
 *   template_suffix: '',
 *   status: 'active',
 *   published_scope: 'web',
 *   tags: '',
 *   admin_graphql_api_id: 'gid://shopify/Product/7723128520918',
 *   variants: [ [Object] ],
 *   options: [ [Object] ],
 *   images: [ [Object] ],
 *   image: {
 *     id: 38180869996758,
 *     product_id: 7723128520918,
 *     position: 1,
 *     created_at: '2022-08-09T11:35:23-07:00',
 *     updated_at: '2022-08-09T11:35:24-07:00',
 *     alt: null,
 *     width: 856,
 *     height: 856,
 *     src: 'https://cdn.shopify.com/s/files/1/0658/7704/9558/products/acrylic2.jpg?v=1660070124',
 *     variant_ids: [],
 *     admin_graphql_api_id: 'gid://shopify/ProductImage/38180869996758'
 *   }
 * },
 */

export default async function handler(req, res) {
  // https://api.vercel.com/v1/integrations/deploy/prj_MW2Shd722gxl15fjgAOU82IwVzyp/OLYS2J1kRN

  console.log("req:", req);

  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.ISR_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate('/path-to-revalidate')
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}