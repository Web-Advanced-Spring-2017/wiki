function submitForm() {
	console.log('Submitting form')
	var formData = {
		firstName: document.getElementById('first_name').value,
		lastName: document.getElementById('last_name').value
	}

	// console.log(formData)
	fetch('/post', {
		method: 'POST',
		body: JSON.stringify(formData),
		headers: {
			'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
			'Content-Type': 'application/json' // Required
		}
	}).then(function(response) {
		return response.json() // First get the response
	}).then(function(res) {
		console.log(res) // Then do whatever with it
	}).catch(function(err) {
		console.log(err)
	})
}
