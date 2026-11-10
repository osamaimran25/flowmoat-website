// Notify IndexNow (Bing, Yandex, Seznam, Naver) that site URLs changed.
// Bing's index feeds ChatGPT search, so run after each production deploy:
//   node scripts/indexnow.mjs
const SITE = "https://flowmoat.com";
const KEY = "d6446111fb4d606673cea8a3ffca4b19";

const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${urlList.length} URLs, ${res.status}`);
