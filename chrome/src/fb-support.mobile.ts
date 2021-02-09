fetch('https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed').then(function (response) {
	// The API call was successful!
	return response.text();
}).then( (html: any) => {
	console.log(html.replaceAll("\\", "").match(/accessToken":"([A-Za-z0-9-]{0,255})"/)[1]);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});