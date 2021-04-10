const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', { title: 'Weather App', name: 'Jan Paul' })
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Jan Paul Galido',
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		name: 'Jan Paul Galido',
		text: 'Hi I am JP, just contact me tru email whenever you need help',
	})
})

app.get('/weather', (req, res) => {
	const address = req.query.address

	geocode(
		address,
		(error, { latitude: lat, longitude: long, location: loc } = {}) => {
			// if (!address)
			// 	return res.send({
			// 		error: 'You must provide an address',
			// 	})
			if (error) {
				return res.send({ error })
			}
			forecast(lat, long, (error, forecastData) => {
				if (error) {
					return res.send({ error })
				}
				console.log(loc)
				console.log(forecastData)
				res.send({
					forecast: forecastData,
					location: loc,
					address: req.query.address,
				})
			})
		}
	)
})

app.get('/products', (req, res) => {
	if (!req.query.search)
		return res.send({
			error: 'You must provide a search term',
		})
	console.log(req.query.search)
	res.send({
		products: [],
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Jan Paul Galido',
		errorMessage: 'Help article not found',
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Jan Paul Galido',
		errorMessage: 'Page not found',
	})
})

app.listen(3000, () => console.log('Serving on port 3000...'))
