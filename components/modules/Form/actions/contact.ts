export const handleContactFormSubmit = async (data: any) => {
  var formData = new FormData();

  // add constants to form data
  formData.append('FROM', "contact@jamiepask.com")
  formData.append('SENDTO', "contact@jamiepask.com")
  formData.append('SUBJECT', "TEST")

  // add all inputs to form data
  for ( var key in data ) {
    formData.append(key, data[key])
  }

  // perform front end validation
  fetch('/api/contact', {
    method: 'POST',
    headers: {},
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })

  // update success 
  console.log('submit')
}