/* iniciamos el service worker y vemos si es soportado por el navegador*/
const init = {
    initServiceWorker: ()=> {
        /* Comprobamos si el navegador soporta service workers */
        if ('serviceWorker' in navigator) {
            console.log('Service Worker es Soportado');
            /* En ese caso, registramos nuestro sw mediante el método register(), que devuelve una promesa */
            navigator.serviceWorker.register('./sw.js').then(function(registration) {
                console.log('sw registro: ', registration);
            }).catch(function(err) {
                console.log('Service Worker fallo de registro: ', err);
            });
        }
    }
};
init.initServiceWorker();


var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/css/main.css',
  '/js/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                /* devolvemos el recurso cacheado */
                return response;
            }
            /*  nos traemos de la red el recurso solicitado  */
            return fetch(event.request);
        })
    );
});