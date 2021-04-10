console.log('Client-side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')
search.focus()
weatherForm.addEventListener('submit', e => {
	e.preventDefault()

	const location = search.value

	msg1.classList.remove('error')
	msg1.classList.remove('correct')
	msg2.classList.remove('correct')
	msg1.textContent = 'Loading message...'
	msg2.textContent = ' '

	fetch(`http://localhost:3000/weather?address=${location}`)
		.then(response => {
			response.json().then(data => {
				if (data.error) {
					msg1.classList.add('error')
					return (msg1.textContent = data.error)
				}
				msg1.classList.add('correct')
				msg2.classList.add('correct')
				msg1.textContent = data.location
				msg2.textContent = data.forecast
				console.log(data.location)
				console.log(data.forecast)
			})
		})
		.then(() => {
			weatherForm.reset()
		})
})
