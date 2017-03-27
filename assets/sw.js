self.addEventListener('install', function(event) {  // delete all the caches
	event.waitUntil(
		caches.keys().then(function(keys) {
			return Promise.all(keys.map(function(key) {
				return caches.delete(key);  })
			);
		})
	);
});

self.addEventListener('install', event => event.waitUntil(
	// SW cache reset on install
	caches
		.keys()
		.then(keys => Promise.all(keys.map(key => caches.delete(key))));

	caches.open('erm-v1')
		.then(cache => cache.addAll([
			'/collection',
			'/src/fonts/FiraSans-Light.woff2',
			'src/fonts/FiraSans-LightItalic.woff2',
			'src/fonts/FiraSans-SemiBold.woff2',
			'/src/css/fonts.css',
			'/src/css/main.css',
			'/build/browser.js'
		]))
		.then(self.skipWaiting())
));

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			if (response) {
				console.log('Found response in cache:', response);

				return response;
			}
			console.log('No response found in cache. About to fetch from network...');

			return fetch(event.request).then(response => {
				console.log('Response from network is:', response);

				return response;
			}).catch(err => {
				console.error('Fetching failed:', err);

				throw err;
			});
		})
	);
});
