# Discover the art collection of the Rijksmuseum

This progressive web application enables users to explore the art collection of the Rijksmuseum very fast. A live version of the application is available at [https://young-retreat-48855.herokuapp.com/](https://young-retreat-48855.herokuapp.com/).

## Up and running

1. Clone the repo
	- `git clone https://github.com/nickrttn/performance-matters && cd performance-matters`


2. Install the dependencies
	- `npm install`

3. Build the client-side assets
	- `npm run build`
	- `npm run build-css`
	- `npm run build-critical-css`
	
4. Create an `.env` file with:
	- `RIJKSMUSEUM_APIKEY: <your-apikey>`
	- `RIJKSMUSEUM_ENDPOINT: https://www.rijksmuseum.nl/api/en/collection`

4. Finally, start the server
	`npm run start`

## Features

- **Client-side rendering with [virtual-dom](https://www.npmjs.com/package/virtual-dom)**
	If the client has JavaScript, all of the content is rendered in the browser using `virtual-dom`. Requests are intercepted, and instead a request is sent to a JSON API. The History State API is used to give the user a reliable history they can navigate back through.
	
	Virtual DOM enables you to represent your DOM in a declarative way. Instead of updating the DOM yourself, you create a `VTree` that looks like the DOM state you want, for instance, when new data comes in after a request. After this, you can patch the DOM with your `VTree` and Virtual DOM will figure out how to update the DOM efficiently.
	
- **A no-JavaScript server-side rendered fallback**
	Any and all requests made in the application work if the user has no JavaScript for whatever reason. They will be routed to another page as usual.
	
	As a side-effect, this also means all links are always available, and can be shared between users. The JavaScript application does not need to be initialized before routing works.

- **Requested data is cached using PouchDB**
	On the client as well as on the server, JSON API requests are cached in IndexedDB or LevelDB. They both first check their caches to see if the request they're doing was made before, and will serve the API data from cache in that case. Otherwise, an API request will be made. On the client, the request will be sent to the server, on the server, the request will be sent to the Rijksmuseum API.
	
- **Request preloading and asset caching in a Service Worker**
	A Service Worker is installed on the first load of the application. It will preload and cache the static assets (except for the artwork images) used throughout the website, so that the user may have faster page loads.
	
	The Service Worker also makes pages that have been visited before available offline, so users may still see the content they have visited.
	 
- **Universal data fetching**
	Data is fetched using the same code on the server as well as the client. `superagent` is used to provide reliable fetching for both ends of the application. This reduces the footprint of the application and enables developers to debug code only once.
	
- **Universal rendering**
	Rendering of pages or page snippets is done by the same code on the server and the client. `virtual-dom` can be executed in the browser as well as in a NodeJS environment. This further reduces the footprint of the application.
	
- **Universal caching**
	[PouchDB](https://pouchdb.com/) is used to cache API requests on the server and client. They will both serve requests from cache if they have been cached before. The same code is used on the client as well as the server.

## Lighthouse score

![100/100](https://raw.githubusercontent.com/nickrttn/performance-matters/master/docs/lighthouse-score.png)

## Webpagetest.org results

[Results](https://www.webpagetest.org/result/170330_FP_1EWE/)

[Results (no JavaScript)](https://www.webpagetest.org/result/170330_HX_1EZQ/)

## Reflection

First off, I learned a whole damn lot in the past three weeks. I had never written a universal application before, nor a progressive web app. In this application I did it both.

My process could have been better. I did not document my optimizations while building, so I can only test performance at the end. Admittedly, the performance is pretty good, but I sadly have no material for comparison, except for the version of my application where JavaScript is disabled.

In addition to that, I should have worked with feature branches. I committed everything to `master`. This of course make it harder to test the application in various set ups and with various optimizations.

What I can say for sure, is that the application *feels* a whole lot faster with client-side rendering. Pages load much snappier, because all that's fetched is a bit of JSON instead of an entire page.

## Uses

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [`virtual-dom`](https://www.npmjs.com/package/virtual-dom)
- [PouchDB](https://pouchdb.com/)
- [`superagent`](https://www.npmjs.com/package/superagent)
- 

## License

Licensed under MIT. &copy; Nick Rutten 2017.
