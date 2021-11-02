// require('dotenv').config({path:__dirname+'../.env'})
const axios = require('axios')

// example = http://api.weatherstack.com/current?access_key=4a5f6c661ad41372ae789489d1c09c57&query=-7.45194,109.30806
// weatherstack API key
// process.env.WEA_API_KEY

const forecast = (latitude, longitude, callback) => {
  // weatherstack things
  const weatherstackURL = `http://api.weatherstack.com/current?access_key=${process.env.WEA_API_KEY}&query=${latitude},${longitude}`

  axios.get(weatherstackURL).then((res) => {
    const apiResponse = res.data

    if (apiResponse.hasOwnProperty('error')) {
      callback('location not found, please provide a valid location name', undefined)
    } else {
      callback(undefined, `${apiResponse.current.weather_descriptions} in ${apiResponse.location.name} and it is currently ${apiResponse.current.temperature}°C`)
    }

  }).catch((err) => {
    if (err.code === 'ENOTFOUND') {
      callback('cannot connect to the internet, please check your connection', undefined)
    }
  })
}

module.exports = forecast