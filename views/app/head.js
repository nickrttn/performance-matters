/**
 * [head renders the head of a HTML document]
 * @param  {[type]} criticalCSS [Critical path CSS for the requested page]
 * @return {[type]}             [The head of a HTML document]
 */
function head(criticalCSS) {
	return `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<meta http-equiv="X-UA-Compatible" content="ie=edge">
			<meta name="theme-color" content="#222222">
			<title>Explore the Rijksmuseums' collection</title>
			<style>
				${criticalCSS}
			</style>
			<link rel="apple-touch-icon" sizes="180x180" href="ios/ios-appicon-180-180.png">
			<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
			<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
			<link rel="manifest" href="/manifest.json">
			<link rel="stylesheet" href="/build/main.css">
			<script src="/build/browser.js" async defer></script>
		</head>
		<body>
	`;
}

module.exports = head;
