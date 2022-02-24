// Locally reguired 
// const dotenv = require('dotenv').config({ path: './.env' })
// end of Locally required
const express = require('express')
const app = express()
const pexels = require('pexels')
const photoCli = pexels.createClient(process.env.API_KEY);
const port = process.env.PORT
const HTTPStatusCode = require('http-status-code')
const fortune = require('random-fortune')
var phrase = fortune.fortune()
var statusId = 200
var allStatus = HTTPStatusCode.getProtocolDefinitions(statusId)

// Favicon - because I don't like unnecessary errors on log
app.use('/favicon.ico', express.static('favicon.ico'));

// Points to API URL, based on platform (local or Heroku)
app.get('/', (req, res) => {
  var hostName = req.hostname

  if(!process.env.PORT) {
    hostName += ':' + port 
  }

  res.json({'newUrl': hostName + '/api'})
})

app.post('/', (req, res) => {
  res.send(`Redirect to ${req}`)
})

/**
 * TODO: 
 * 1. if receive Status Code as /api/400 returns this status code
 *    else, returns random status code
 * 2. when returns some status code, include some text message and an image uri
 */
app.get('/api', (req, res) => {
  statusId = 200
  phrase = fortune.fortune()

  res.json(
      {
        'code': statusId, 
        'message': HTTPStatusCode.getMessage(statusId), 
        'detail': phrase
      }
    )
})

app.param('id', function (req, res, next, id) {
  statusId = parseInt(id)
  next()
})

app.get('/api/:id', function (req, res) {
  phrase = fortune.fortune()

  res.json(
      {
        'code': statusId,
        'message': HTTPStatusCode.getMessage(statusId), 
        'detail': phrase
      }
    )
  res.end()
})

// Indicate running app
app.listen(port, () => {
  console.log(`Our app is running on port ${ port }`);
});