if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('public/js/sw.js').then(
  	function(reg) {
  		if(reg.installing){
  			reg.installing.postMessage('Installing in page');
  		}
    	console.log('Yey!', reg);
  	}).catch(function(err) {
    	console.log('Boo!', err);
  	});
}

var cacheName = "cacheFiles";
var filesToCache = [];
self.addEventListener('install', function(e){
  console.log('[serviceWorker] install');
  e.waitUntil(
    cache.open(cacheName).then(function(cache){
      console.log('[serviceWorker] caching app shell');
      return cache.addAll(fileToCache);
    })
  );
});

self.addEventListener('activate', function(e){
  console.console.log('[serviceWorker] Activate');
  e.waitUntil(
    cache.keys().then(function(keyList) {
      return Promisse.all(keyList.map(function(key) {
        console.console.log('[serviceWorker] removing old cache', key);
        if (key !== cacheName) {
          return cache.delete(key);
        }
      }));
    })
  );
});

var filesToCache = [
  '/',
  '/index.html',
  '/public/images/android-chrome-192x192.png',
  '/public/images/favicon.ico',
  '/public/images/mstile-310x150.png',
  '/public/images/android-chrome-512x512.png',
  '/public/images/ic_add_white_24px.svg',
  '/public/images/mstile-310x310.png',
  '/public/images/apple-touch-icon.png',
  '/public/images/ic_refresh_white_24px.svg',
  '/public/images/mstile-70x70.png',
  '/public/images/safari-pinned-tab.svg',
  '/public/images/favicon-16x16.png',
  '/public/images/mstile-144x144.png',
  '/public/images/favicon-32x32.png',
  '/public/images/mstile-150x150.png',
  '/public/css/styles.css',
  '/public/js/sw.js'
];
self.addEventListener('fetch', function(e) {
  console.log('[serviceWorker] fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
