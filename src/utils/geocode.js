const request = require('postman-request')

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoicGF1bDAzIiwiYSI6ImNraGZvdGs3aDByYmQydXMxMjdxejJjdGsifQ.tOdQ8xnSfM9H1yl6zU3c5A&limit=1`

	request({ url, json: true }, (error, { body }) => {
		if (!address) {
			callback('You must provide an address!', undefined)
		} else if (error) {
			callback('Unable to connect to location service..', undefined)
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search.', undefined)
		} else {
			callback(undefined, {
				location: body.features[0].place_name,
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
			})
		}
	})
}

module.exports = geocode
