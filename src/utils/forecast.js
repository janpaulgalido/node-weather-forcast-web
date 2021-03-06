const request = require('postman-request')

const forecast = (lat, long, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=ef5535fa39d8b12f79e7db875c68e99e&query=${lat},${long}&units=f`

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service', undefined)
		} else if (body.error) {
			callback('Unable to find location', undefined)
		} else {
			callback(
				undefined,
				`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The current wind direction is ${body.current.wind_dir} and a humidity of ${body.current.humidity}%.`
			)
		}
	})
}

module.exports = forecast
