const http = require('http')

const url =
  'http://api.weatherstack.com/current?access_key=aafec964702a0d8e44d77a02850927fc&query=Cedar Rapids&units=f'

const request = http.request(url, response => {
  let data = ''

  response.on('data', chunk => {
    data = data + chunk.toString()
  })

  response.on('end', () => {
    const body = JSON.parse(data)
    console.log(body)
  })
})

request.on('error', error => {
  console.log('Errorr ', error)
})

request.end()
