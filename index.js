import extractFromWebSite from "../src/scraper";

const res = await extractFromWebSite("http://www.k405records.com/");
console.log(JSON.stringify(res));
