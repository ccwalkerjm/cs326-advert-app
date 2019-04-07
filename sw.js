// 1. Save the files to the user's device
// The "install" event is called when the ServiceWorker starts up.
// All ServiceWorker code must be inside events.
self.addEventListener('install', function (e) {
    console.log('install');

    // waitUntil tells the browser that the install event is not finished until we have
    // cached all of our files
    e.waitUntil(
        // Here we call our cache "myonsenuipwa", but you can name it anything unique
        caches.open('cs262project').then(cache => {
            // If the request for any of these resources fails, _none_ of the resources will be
            // added to the cache.
            return cache.addAll([
                '/',
                'index.html',
                'index.css',
                'index.js',               
                'manifest.json',
                'js/jquery.js',
                'js/onsenui.js',
                'css/onsenui.css',
                'css/onsen-css-components.css',
                'css/ionicons/css/ionicons.min.css',
                'css/font_awesome/css/font-awesome.min.css',
                'css/font_awesome/css/v4-shims.min.css',
                'css/material-design-iconic-font/css/material-design-iconic-font.min.css',
                'css/material-design-iconic-font/fonts/Material-Design-Iconic-Font.woff2',
                'css/material-design-iconic-font/fonts/Material-Design-Iconic-Font.woff',
                'css/material-design-iconic-font/fonts/Material-Design-Iconic-Font.ttf'
            ]);
        })
    );
});

// 2. Intercept requests and return the cached version instead
self.addEventListener('fetch', function (e) {
    e.respondWith(
        // check if this file exists in the cache
        caches.match(e.request)
        // Return the cached file, or else try to get it from the server
        .then(response => response || fetch(e.request))
    );
});

