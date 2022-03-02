// Locally reguired 
const dotenv = require('dotenv').config({ path: './.env' })
// end of Locally required
const express = require('express')
const app = express()
const pexels = require('pexels')
const photoCli = pexels.createClient(process.env.API_KEY || dotenv.API_KEY)
const port = process.env.PORT || dotenv.PORT
const HTTPStatusCode = require('http-status-code')
const fortune = require('random-fortune')
var phrase = fortune.fortune()
var statusId = 200
var ignoreDrop = false
var allStatus = HTTPStatusCode.getProtocolDefinitions()

// Favicon - because I don't like unnecessary errors on log
app.use('/favicon.ico', express.static('favicon.ico'));

// Points to API URL, based on platform (local or Heroku)
app.get('/', (req, res) => {
  res.json({
    'newUrl': req.get('host') + '/api', 
    'defaultUrl': req.headers.host + '/api'
  })
})

// Get random HTTP code from allStatus object
var randomProperty = function (obj) {
  var keys = Object.keys(obj);
  var newKey = keys[ keys.length * Math.random() << 0]
  return parseInt(newKey);
};

// Randomly drops 5xx connections 
var dropConnection = function (statusId, res, jsonReturn) {
  if(statusId > 499 && statusId < 600){
    if((parseInt(Math.random() * 100) % 2) > 0){
      res.status(statusId).end()
    } else {
        res.status(statusId).json(jsonReturn)
    }
  } else {
    // Bypass if statusId < 500
    res.status(statusId).json(jsonReturn)
  }
}

/**
 * Default API request.
 * Returns random HTTP Status code from HTTPStatusCode list
 */
app.get('/api', (req, res, next) => {
  phrase = fortune.fortune()
  statusId = randomProperty(allStatus)
  var jsonReturn = {          
    'code': statusId, 
    'status': HTTPStatusCode.getMessage(statusId), 
    'message': phrase
  }

  if(statusId >= 100 && statusId < 400) {
    // Async to obtain image uri
    photoCli.photos.random()
      .then (photo => {
          jsonReturn.image = photo.src.medium
          res.status(statusId).json(jsonReturn)
      } )
      .catch(next);
  } else {
    dropConnection(statusId, res, jsonReturn)
  }
})

/**
 * Request with parameters, ex.: /api/418
 * Returns this HTTP status code 
 */

// Read parameter and set to statusId
app.param('id', function (req, res, next, id) {
  // Prevent invalid codes
  if(typeof allStatus[id] === 'undefined') {
     statusId = 500
  } else {
    statusId = parseInt(id)
  }
  next()
})

// Read OPTIONAL parameter to drop 500 connection
app.param('drop', function (req, res, next, drop) {
  if(drop) {
    ignoreDrop = true
  }
  next()
})

// Run Request
app.get('/api/:id', function (req, res, next) {
  phrase = fortune.fortune()
  var jsonReturn = {          
    'code': statusId, 
    'status': HTTPStatusCode.getMessage(statusId), 
    'message': phrase
  }

  if(statusId >= 100 && statusId < 400) {
    // Async to obtain image uri
    photoCli.photos.random()
      .then (photo => {
          jsonReturn.image = photo.src.medium
          res.status(statusId).json(jsonReturn)
      } )
      .catch(next);
  } else {
    dropConnection(statusId, res, jsonReturn)
  }
})

app.get('/api/:id/:drop', function (req, res, next) {
  phrase = fortune.fortune()
  var jsonReturn = {          
    'code': statusId, 
    'status': HTTPStatusCode.getMessage(statusId), 
    'message': phrase
  }

  if(statusId >= 100 && statusId < 400) {
    // Async to obtain image uri
    photoCli.photos.random()
      .then (photo => {
          jsonReturn.image = photo.src.medium
          res.status(statusId).json(jsonReturn)
      } )
      .catch(next);
  } else {
    res.status(statusId).json(jsonReturn)
  }
})

// Indicate running app
app.listen(port, () => {
  console.log('Our app is running on port ' + port + ', with current status: \n\n' + phrase)
});

// Export modules for Tests
module.exports = app