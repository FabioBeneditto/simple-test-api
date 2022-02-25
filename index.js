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
var allStatus = HTTPStatusCode.getProtocolDefinitions()

// Favicon - because I don't like unnecessary errors on log
app.use('/favicon.ico', express.static('favicon.ico'));

// Points to API URL, based on platform (local or Heroku)
app.get('/', (req, res) => {
  res.json({'newUrl': req.get('host') + '/api'})
})

app.post('/', (req, res) => {
  res.send(`Redirect to ${req}`)
})

// Get random HTTP code from allStatus object
 var randomProperty = function (obj) {
  var keys = Object.keys(obj);
  var newKey = keys[ keys.length * Math.random() << 0]
  return parseInt(newKey);
};

app.get('/api', (req, res, next) => {
  phrase = fortune.fortune()
  statusId = randomProperty(allStatus)
  var jsonReturn = {          
    'code': statusId, 
    'message': HTTPStatusCode.getMessage(statusId), 
    'detail': phrase
  }
  photoCli.photos.random()

  .then (photo => {
      if(statusId >= 100 && statusId < 400) {
        jsonReturn.image = photo.src.medium
      }
      res.status(statusId).json(jsonReturn)
   } )
  .catch(next); // error passed on to the error handling route
})

app.param('id', function (req, res, next, id) {
  statusId = parseInt(id)
  next()
})

app.get('/api/:id', function (req, res, next) {
  phrase = fortune.fortune()
  var jsonReturn = {          
    'code': statusId, 
    'message': HTTPStatusCode.getMessage(statusId), 
    'detail': phrase
  }
  photoCli.photos.random()

  .then (photo => {
      if(statusId >= 100 && statusId < 400) {
        jsonReturn.image = photo.src.medium
      }
      res.status(statusId).json(jsonReturn)
   } )
  .catch(next); // error passed on to the error handling route
})

// Indicate running app
app.listen(port, () => {
  console.log(`Our app is running on port ${ port }`)
});