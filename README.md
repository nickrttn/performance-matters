# Discover the art collection of the Rijksmuseum

This progressive web application enables users to explore the art collection of the Rijksmuseum very fast. A live version of the application is available at [https://young-retreat-48855.herokuapp.com/](https://young-retreat-48855.herokuapp.com/).

## Up and running

1. Clone the repo

`git clone https://github.com/nickrttn/performance-matters && cd performance-matters`


2. Install the dependencies

`npm install`

3. Build the client-side assets

`npm run build`

4. Finally, start the server

`npm run start`

## Features

- Client-side rendering with [virtual-dom](https://www.npmjs.com/package/virtual-dom)
- A no-JavaScript server-side rendered fallback.
- JSON caching in IndexedDB
- Request preloading and asset caching in a Service Worker
- Isomorphic data fetching library
