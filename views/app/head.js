module.exports = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Explore the Rijksmuseums' collection</title>

		<link rel="manifest" href="/manifest.json">

		<link rel="preload" href="/src/fonts/FiraSans-Light.woff2" as="font" type="font/woff2" crossorigin>
		<link rel="preload" href="/src/fonts/FiraSans-LightItalic.woff2" as="font" type="font/woff2" crossorigin>
		<link rel="preload" href="/src/fonts/FiraSans-SemiBold.woff2" as="font" type="font/woff2" crossorigin>

		<link rel="stylesheet" href="/src/css/fonts.css">
		<link rel="stylesheet" href="/src/css/main.css">

		<script src="/build/browser.js" async defer></script>
	</head>
	<body>
`;
