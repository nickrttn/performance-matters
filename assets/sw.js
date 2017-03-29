self.addEventListener('install', event => {
	// Delete all caches
	event.waitUntil(
		caches.keys()
			.then(keys => Promise.all(keys.map(key => caches.delete(key))))
	);

	event.waitUntil(
		caches.open('erm-v1')
			.then(cache => cache.addAll([
				'/collection',
				'/src/fonts/FiraSans-Light.woff2',
				'src/fonts/FiraSans-LightItalic.woff2',
				'src/fonts/FiraSans-SemiBold.woff2',
				'/src/css/fonts.css',
				'/build/main.css',
				'/build/browser.js'
			]))
			.then(self.skipWaiting())
	);
});

self.addEventListener('fetch', event => {
	const path = new URL(event.request.url).pathname;
	if (path === '/collection' || path === '/api') {
		event.respondWith(
			fetch(event.request)
				.then(response => toCache(event.request, response))
				.catch(() => fromCache(event.request))
		);
	} else {
		event.respondWith(fetch(event.request));
	}
});

function fromCache(request) {
	return caches.open('erm-v1')
		.then(cache => cache.match(request))
		.then(response => response ? response : Promise.reject());
}

function toCache(request, response) {
	const clone = response.clone();
	caches.open('erm-v1')
		.then(cache => cache.put(request, clone));
	return response;
}
