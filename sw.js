


self.addEventListener('fetch', event => {

    const offlineResp = new Response(`
    
        b   ienvenido a mi página web

        Disculpa, para usarla necesitas internet

    `);

    const resp = fetch(event.request)
                    .catch( () =>  offlineResp );



    event.respondWith( resp );

});
