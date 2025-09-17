const forecast = require('./utils/forecast')

locations = ['Cedar Rapids', 'New York', 'San Francisco', 'Anchorage', 'Cancun']

for (var i = 0; i < locations.length; i++) {
  forecast(locations[i], (error, data) => {
    if (error) {
      console.log(error)
    } else {
      console.log(data)
    }
  })
}
