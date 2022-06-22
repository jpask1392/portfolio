import getCollectionsByQuery from "@/shopify/operations/getCollectionsByQuery";
import Storyblok from "../utils/storyblok";

const getGlobalData = async (sbParams: any) => {
  let global: any = await Storyblok.get(`cdn/stories/templates/global-template`, sbParams);

  // add global settings to global object
  let globalSettings: any = await Storyblok.get(`cdn/stories/settings/global-settings`, sbParams);
  if (globalSettings && global) global.data.story['settings'] = globalSettings.data.story;

  /**
   * Custom resolver for side navigation collection menu
   * 
   */
  const { content: { collectionNavigation } } = global.data.story['settings'];
  // console.log(collectionNavigation)

  if (typeof collectionNavigation === "string") {
    // build query
    const searchArr = collectionNavigation.split(',');
    let searchString = '';
    searchArr.forEach((collectionTitle: string, i: number) => {
      searchString += `(title:${collectionTitle})`;
      if (i !== searchArr.length - 1) searchString += " OR ";
    });

    const collectionsForNavigation = await getCollectionsByQuery(searchString, [], {
      without_products: true,
    });

    global.data.story.settings.content.collectionNavigation = collectionsForNavigation;
  }

  return global;
}

export default getGlobalData;