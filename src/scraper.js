import fetch from "node-fetch";
import { load } from "cheerio";

export const CONFIG = {
  socialNetworks: ["facebook", "twitter", "linkedin", "pinterest", "tumblr", "soundcloud"]
};

export const SUPPORTED_NETWORKS = ["facebook", "twitter", "linkedin", "pinterest", "tumblr", "soundcloud"]

const extractFromWebSite = async website => {
  return fetch(website)
    .then(res => res.text())
    .then(body => {
      const $ = load(body);
      let result = {}
      CONFIG.socialNetworks.forEach(socialNetwork => result[socialNetwork] = parseBody(socialNetwork));
    })
    .catch(
      error =>
        throw {
          message: `Error fetching website data ${JSON.stringify(error)}`
        }
    );
};

const parseFacebook = (body) => (

)

const parseTwitter = (body) => (
    const twitterHandles = $('a:regex(href,twitter)').attr('content')
    let handles = []
    twitterHandles.forEach(url => {
        const handle = url.split('/')[-1]
        handles.push(handle)
    })
    return twitterHandles
)

const parseLinkedIn = (body) => (

)

const parsePinterest = (body) => (

)
