const extractFromWebSites = require("../src/scraper").default;
const CONFIG = require("../src/scraper").CONFIG;

const wait = async () =>
  await extractFromWebSites([
    "https://looker.com/",
    "https://www.hommework.com/",
    "https://www.todoencctv.com/"
  ])
    .then(res => console.log(JSON.stringify(res)))
    .catch(error => console.log(JSON.stringify(error)));

wait();
