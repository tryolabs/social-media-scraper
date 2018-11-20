const fetch = require("node-fetch").default;
const load = require("cheerio").load;
const URL = require("url").URL;

module.exports.CONFIG = {
  socialNetworks: [
    "facebook",
    "twitter",
    "linkedin",
    "pinterest",
    "tumblr",
    "soundcloud",
    "instagram",
    "youtube",
    "snapchat"
  ]
};

module.exports.SUPPORTED_NETWORKS = new Set([
  "facebook",
  "twitter",
  "linkedin",
  "pinterest",
  "tumblr",
  "soundcloud",
  "instagram",
  "youtube",
  "snapchat"
]);

const CUSTOM_REGEX = {
  youtube: `(channel/([\\w|@|-]+?)(?:/videos)?/?$|user?/([\\w|@|-]+)/?$)`
};

module.exports.default = async websites =>
  Array.isArray(websites)
    ? Promise.all(
        websites.map(async website => ({
          [website]: await parseWebsite(website)
        }))
      )
    : [{ [websites]: await parseWebsite(websites) }];

const parseWebsite = async website => {
  try {
    const html = await fetch(website).then(res => res.text());
    const $ = load(html);
    let handles = {};
    module.exports.CONFIG.socialNetworks.forEach(socialNetwork => {
      handles[socialNetwork] = parse(socialNetwork)($);
    });
    return handles;
  } catch (error) {
    throw new Error(
      `Error fetching website data for ${website}: ${error.message}`
    );
  }
};

const getHandleFromURL = (url, customRegex = null) => {
  try {
    const path = new URL(url).pathname;
    const regex = customRegex
      ? new RegExp(customRegex, "i")
      : new RegExp(`/([\\w|@|-]+)/?$`, "i");
    const match = regex.exec(path);
    return customRegex
      ? match.find((match, index) => index > 1 && match != undefined)
      : match[1];
  } catch (error) {
    //Unable to parse handle, return empty value
    return "";
  }
};

const parse = base => $ => {
  let handles = [];
  $(`a[href*="${base}"]`).each((index, elem) => {
    const url = elem.attribs.href;
    const handle = url ? getHandleFromURL(url, CUSTOM_REGEX[base] || "") : "";
    handle && handles.push(handle);
  });
  return handles.filter(
    (handle, index) => index === handles.indexOf(handle) && handle
  );
};
