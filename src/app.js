const path = require('path')
require('dotenv').config({path:path.join(__dirname, '../.env')})
const express = require('express')
const app = express()
const port = 3000
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const customViewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// console.log(customViewsPath)

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', customViewsPath)
hbs.registerPartials(partialsPath)

// some example
const prefix = {
  name: 'faiz',
  age: 24
}
hbs.registerPartial('memek', '{{age}}' )

// static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  // console.log(req.query)
  if (!req.query.address) {
    return res.render('index', {
      title: 'Weather',
      name: 'faiz',
      message: 'Use this to get your weather information'
    })
    // return res.send({
    //   error: 'please provide location name'
    // })
    
  }

  geocode(req.query.address, (error, data) => {
    if(error) {
      return res.send({
        error: error
      })
    }

    forecast(data.latitude, data.longitude, (error, data) => {
      if(error) {
        return res.send({
          error: error
        })
      }
      
      return res.send({
        data: data
      })
    })
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'faiz'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'faiz'
  })
})

// 404
app.get('*', (req, res) => {
  res.send('<h1>mau kemana boss..</h1>')
})



 








app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`)
})