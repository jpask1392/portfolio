import Storyblok from "../utils/storyblok";

const getGlobalData = async (sbParams: any) => {
  let global: any = await Storyblok.get(`cdn/stories/templates/global-template`, sbParams);

  // add global settings to global object
  let globalSettings: any = await Storyblok.get(`cdn/stories/settings/global-settings`, sbParams);
  if (globalSettings && global) global.data.story['settings'] = globalSettings.data.story;

  return global;
}

export default getGlobalData;