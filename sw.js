var APP_PREFIX = 'CoffeeMovies'
var VERSION = '_1.0.0'              
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            
  '/',                     
  '/index.html',
  '/css/style.css',
  '/images'           
]

self.addEventListener('install', function(e) 
{
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) 
    {
      return cache.addAll(URLS);
    })
  );
});

self.addEventListener('fetch', function(e) 
{
  e.respondWith(
    caches.match(e.request).then(function(response) 
    {
      return response || fetch(e.request);
    })
  );
});