if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),f={module:{uri:c},exports:t,require:r};s[c]=Promise.all(n.map((e=>f[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-1846d813"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Images/confirm.png",revision:"d29a4064a1686c6554b4d0ae37467a82"},{url:"/Images/create-team.png",revision:"d97566fec8d399f5070529a73955f143"},{url:"/Images/create.png",revision:"59c1811cb142ba164d319babe4bc76fe"},{url:"/Images/expense.png",revision:"816c2f1319d51238cf80b42ec10e383f"},{url:"/Images/login.png",revision:"bd489f84411fba6e87341465515603df"},{url:"/Images/money-management.png",revision:"2877ad501d0fb9b18899d14f03e3f0c9"},{url:"/Images/no-data.png",revision:"125b60ca8a2718f77a8aadb67b0d257c"},{url:"/Images/no-image.png",revision:"f49c0c1b080d638411f4bdbe930b5a1e"},{url:"/Images/order.png",revision:"c57a34a2399b44e26cc0c66117cb4e2d"},{url:"/Images/present.png",revision:"9a9ebf3671fbab746778c72baf382d23"},{url:"/Images/profile.png",revision:"c52c040b89ba4a90da47d1f18ce826b2"},{url:"/Images/run.png",revision:"f421f62207e0a73be93bec3d6712f253"},{url:"/Images/team.png",revision:"ea9add430e9f4c0e3194f1f50fbb52f2"},{url:"/Images/uniform/halfPants.jpg",revision:"756bb9e732e1b4c2edf7fd8b0e42a8bc"},{url:"/Images/uniform/jerseyDown.jpg",revision:"e1de16ae1355f8fb4bdfa30ac4139e1e"},{url:"/Images/uniform/jerseyUp.jpg",revision:"18743086a1c0279a43789c1b088bbeb9"},{url:"/Images/uniform/lightBlueTshirt.jpg",revision:"ebbef8d29f495f6de6897e0a4745b50f"},{url:"/Images/uniform/navyPinkTshirt.jpg",revision:"e846d5598b857d54a292dee5e7f135eb"},{url:"/Images/uniform/poloShirt.jpg",revision:"1c7a25d7809b6d39f7ea3264e3443415"},{url:"/Images/uniform/runningPants.jpg",revision:"95bd79d20d838b9c70e7a6fbda087e22"},{url:"/Images/uniform/runningShirt.jpg",revision:"49fa47f0b240063f8bd9722f9628e4de"},{url:"/Images/uniform/separateShorts.jpg",revision:"42c3b95b4dc9c78b7741bd1351b58142"},{url:"/Images/uniform/separateTop.jpg",revision:"0a0a7e40b9e0999f597ee52e578d6daf"},{url:"/Images/uniform/whiteTights.jpg",revision:"e17549308761ffd9733826b215c7c965"},{url:"/Images/uniform/windBreakerDown.jpg",revision:"5efe0c8552d2a2e023d36dcfd708061b"},{url:"/Images/uniform/windBreakerUp.jpg",revision:"2b761e51679dc33cc25517cbf69eb5f6"},{url:"/Images/vote.png",revision:"225d4e8b5ad293c614f6cda5b0806d33"},{url:"/Images/walking.png",revision:"ae030c6d281552c9e0b125d1dae1be79"},{url:"/_next/static/chunks/0c428ae2-10b51c208bc2d2c6.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/1883-b06e22ef852537a1.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/1bfc9850-8793395258beac82.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/252f366e-27f5d1a7fe42a77d.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/2731-059bbbc4ce264837.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/31664189-6681209c106a271f.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/3978-9badbed0b81e9dfa.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/4089-a38b1beadaeb9d96.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/4487-8f43de0cfc1cc04d.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/5194-3099b0cdc000fdf9.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/5301-5431c687ae9df91a.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/545f34e4-d4ab6baaea360b37.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/5675-316af586391d170c.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/5821-63f58a403983ea10.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/6042-4d28ba8d776a7fa4.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/7051-e12e9075aca4c531.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/7343-15e1a80bafacb67e.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/7604-14644ad73ef6e5cd.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/78e521c3-05177b42021e4715.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/8009-ee097e4ea528064f.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/8290-278bf6748d934c41.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/95b64a6e-8f8bb6528883157f.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/9651.5057209db3881ec8.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/9867-28fa915e35f65fc5.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/b98bc7c3-47b028e221fe418c.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/d0447323-25166bc7cad25316.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/d7eeaac4-626835ed3733d57e.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/framework-47503b8bb4de6bb8.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/main-962d50fe2e5110b6.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/_app-1987b0b87c2da143.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/_error-4cb47ee17c47cba7.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/demo-1ce3e91ac4d07da6.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/entry/%5Bid%5D-d13e66593f26ee0c.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/entry/confirm-8886bd03d456873e.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/entry/management-24d24ec6cb8c961a.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/entry/management/%5Bid%5D-dfa2ed9b5e750cef.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/entry/management/create-c7f8e8116d535647.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/expedition-693dae6c41ffca99.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/expedition/%5Bid%5D-5dcef433abf17631.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/expedition/confirm-70511401b1d0cc5a.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/expedition/management-971f8c737fd684c6.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/expedition/management/%5Bid%5D-eb96b9a46aca7cea.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/expedition/management/create-eda582ff829473ef.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/expense-68da4b439200ae19.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/expense/management-6c41deab4829baee.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/faq-7dfbab8a122ef446.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/index-459078dd1dd57c46.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/profile-8c50ecbac5bd13ce.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/signin-888314a1be159863.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/team/create-b99022f0c9950d7f.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/team/join-71e3ce1a11838663.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/team/management-3366f5357989a22d.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/team/profile-4eded6b5ffdaf083.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/test-86bd3815051791f9.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/uniform-d1ba8b15cb5d4e0a.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/uniform/%5Bid%5D-5ef2cef5c6d59863.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/uniform/confirm-fca6f7766d6845c2.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/uniform/management-1fdec274167e5280.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/pages/uniform/management/%5Bid%5D-41c73a974409b390.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/chunks/webpack-217c2a36ca62e6e7.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/css/d1a7be222ba9e42c.css",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/wxO6KkASBDfc84U1faBTv/_buildManifest.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/wxO6KkASBDfc84U1faBTv/_middlewareManifest.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/_next/static/wxO6KkASBDfc84U1faBTv/_ssgManifest.js",revision:"wxO6KkASBDfc84U1faBTv"},{url:"/apple-touch-icon-180x180.png",revision:"30465a1709b7e2ece194908087d09082"},{url:"/favicon.ico",revision:"77f96688ee12c18a08fd9cf4455a374f"},{url:"/icon-192x192.png",revision:"648044cd0ea04c29b221a8cdb7c6a5ca"},{url:"/icon-32x32.png",revision:"493dee9eb0ec19a326064de35a0ca6bf"},{url:"/icon-512x512.png",revision:"27345fb0156f17d286cd0799af49033d"},{url:"/manifest.json",revision:"bd12c8ebbd80230017e42332cf014256"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
