"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fetch = require("node-fetch").default;
var load = require("cheerio").load;
var URL = require("url").URL;

module.exports.CONFIG = {
  socialNetworks: ["facebook", "twitter", "linkedin", "pinterest", "tumblr", "soundcloud", "instagram", "youtube"]
};

module.exports.SUPPORTED_NETWORKS = new Set(["facebook", "twitter", "linkedin", "pinterest", "tumblr", "soundcloud", "instagram", "youtube"]);

var CUSTOM_REGEX = {
  youtube: "(channel/([\\w|@|-]+?)(?:/videos)?/?$|user?/([\\w|@|-]+)/?$)"
};

module.exports.default = async function (websites) {
  return Array.isArray(websites) ? Promise.all(websites.map(async function (website) {
    return _defineProperty({}, website, (await parseWebsite(website)));
  })) : [_defineProperty({}, websites, (await parseWebsite(websites)))];
};

var parseWebsite = async function parseWebsite(website) {
  try {
    var html = await fetch(website).then(function (res) {
      return res.text();
    });
    var $ = load(html);
    return module.exports.CONFIG.socialNetworks.map(function (socialNetwork) {
      return _defineProperty({}, socialNetwork, parse(socialNetwork)($));
    });
  } catch (error) {
    throw new Error("Error fetching website data for " + website + ": " + error.message);
  }
};

var getHandleFromURL = function getHandleFromURL(url) {
  var customRegex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  try {
    var path = new URL(url).pathname;
    var regex = customRegex ? new RegExp(customRegex, "i") : new RegExp("/([\\w|@|-]+)/?$", "i");
    var match = regex.exec(path);
    return customRegex ? match.find(function (match, index) {
      return index > 1 && match != undefined;
    }) : match[1];
  } catch (error) {
    //Unable to parse handle, return empty value
    return "";
  }
};

var parse = function parse(base) {
  return function ($) {
    var handles = [];
    $("a[href*=\"" + base + "\"]").each(function (index, elem) {
      var url = elem.attribs.href;
      var handle = url ? getHandleFromURL(url, CUSTOM_REGEX[base] || "") : "";
      handle && handles.push(handle);
    });
    return handles.filter(function (handle, index) {
      return index === handles.indexOf(handle) && handle;
    });
  };
};
