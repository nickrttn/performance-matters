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

- Client-side rendering with [virtual-dom](https://www.npmjs.com/package/virtual-dom)
- A no-JavaScript server-side rendered fallback
- Requested data is cached in IndexedDB
- Request preloading and asset caching in a Service Worker
- Universal data fetching
- Universal rendering
- Universal caching

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

## License

Licensed under MIT. &copy; Nick Rutten 2017.
