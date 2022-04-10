self.addEventListener('install', function (event) {
    console.log('The service worker is being installed.');
    event.waitUntil(
        caches.open('athletic-corner').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/stylesheet_changes.css',
                '/manifest.json',
                '/assets/icon1.png',
                '/preferences.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    console.log('The service worker is serving the asset.');
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || caches.match('/index.html');
        })
    );
});