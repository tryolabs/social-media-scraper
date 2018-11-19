# Social Media handles scraper
A node.js module to extract social media handles out of websites

## Features
A single configurable function that take several websites to extract and returns an array of social media handles.

## Installation

using npm:
```
$ npm i social-media-scraper
```

using yarn:
```
$ yarn add social-media-scraper
```

## Examples

```
const getHandles = require('social-media-scraper').default
const websites = ['https://your-web-site-1.com', 'https://your-web-site-2.com']
getHandles(website)
.then(handles => handles.map(handle => console.log(handle))
.catch(error => console.error(error))
```

## API

### Handles extractor

### `getHandles(urls: Array<string> | string) => Array<{ [website]: { [social_network]: Array<string> }>`

Returns an array of object containing the website's url containing and object in which the keys are the social network identifiers with the handles extracted attached.

```
[
  {
    "https://your-web-site.com/": [
      { "facebook": ["YourHandle"] },
      { "twitter": ["YourHandle"] },
      { "linkedin": ["YourHandle"] },
      { "pinterest": [] },
      { "tumblr": [] },
      { "soundcloud": [] },
      { "instagram": [] },
      { "youtube": ["YourHandle"] },
      { "snapchat": [] }
    ]
  }
]
```

### Config

Simply edit the ```socialMediaScraper.CONFIG``` array, supported social network are stored in the ```socialMediaScraper.SUPPORTED_NETWORKS``` set.


```
socialMediaScraper.CONFIG = ['twitter', 'facebook', 'my-space'].filter(id => socialMediaScraper.SUPPORTED_NETWORKS.has(id))
```
