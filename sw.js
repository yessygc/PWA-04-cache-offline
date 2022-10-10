
// const CACHE_NAME = 'cache-1';
const CACHE_STATIC_NAME = 'statci-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

const CACHE_INMUTABLE_NAME = 'inmutable-v1';



self.addEventListener('install', e => {

    
    const cacheProm = caches.open( CACHE_STATIC_NAME )
        .then( cache => {

            return cache.addAll([
                '/',
                '/index.html',
                '/css/styles.css',
                '/img/main.jpg',
                '/js/app.js'
            ]);

        });

    const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME )
            .then( cache => cache.add( 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' ));


    e.waitUntil( Promise.all([cacheProm, cacheInmutable]) );


});



self.addEventListener('fetch', e => {



    // 2- Cache with Network fallback
    caches.match( e.request )
        .then( res => {

            if ( res ) return res;

            console.log('No existe', e.request.url );

            return fetch( e.request ).then( newRes => {

                caches.open( CACHE_DYNAMIC_NAME )
                    .then( cache => {
                        cache.put( e.request, newRes );
                    });

                return newRes.clone();
            });

        });


    // 1 - Cache Only
    // e.respondWith( caches.match( e.request ) );



});
