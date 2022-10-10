
const CACHE_NAME = 'cache-1';



self.addEventListener('install', e => {

    
    const cacheProm = caches.open( CACHE_NAME )
        .then( cache => {

            return cache.addAll([
                '/',
                '/index.html',
                '/css/styles.css',
                '/img/main.jpg',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
                '/js/app.js'
            ]);

        });


        e.waitUntil( cacheProm );


});



self.addEventListener('fetch', e => {



    // 2- Cache with Network fallback
    caches.match( e.request )
        .then( res => {

            if ( res ) return res;

            console.log('No existe', e.request.url );

            return fetch( e.request ).then( newRes => {

                caches.open( CACHE_NAME )
                    .then( cache => {
                        cache.put( e.request, newRes );
                    });

                return newRes.clone();
            });

        });


    // 1 - Cache Only
    // e.respondWith( caches.match( e.request ) );



});
