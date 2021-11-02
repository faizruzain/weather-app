// require('dotenv').config({path:__dirname+'../.env'})
const axios = require('axios')

// example = https://api.mapbox.com/geocoding/v5/mapbox.places/jakarta.json?access_token=pk.eyJ1IjoiZmFpenJ1emFpbiIsImEiOiJja3BueHhkcDUxZnF3MnVuMnhkdmJkYXZqIn0.uAyQ6LMgtnGBbOLmPHKT6Q&limit=1

// mapbox access tokens
// process.env.ACCESS_TOKENS

const geocode = (address, callback) => {
  // mapbox things
  const mapboxBaseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
  const limit = 1
  const mapBoxURL = mapboxBaseURL + encodeURIComponent(address) + '.json?' + 'access_token=' + process.env.ACCESS_TOKENS + '&limit=' + limit

  if (address.length === 0) {
    callback('lack of argument', undefined)
  } else {
    axios.get(mapBoxURL).then((res) => {
      const apiResponse = res.data
    
      if (apiResponse.features.length === 0) {
        callback('No data found. Mind your input!', undefined)
      } else {
        // callback(undefined, `${apiResponse.features[0].place_name}\n${apiResponse.features[0].center}`)
        callback(undefined, {
          location: apiResponse.features[0].place_name,
          latitude: apiResponse.features[0].center[1],
          longitude: apiResponse.features[0].center[0]
        })
      }
    
    }).catch((error) => {
      if (error.code === 'ENOTFOUND') {
        callback('cannot connect to the internet, please check your connection', undefined)
      } else {
        callback(`location ${error.response.data.message}`, undefined)
      }
    })
  }
}

module.exports = geocode
