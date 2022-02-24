const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const HTTPStatusCode = require('http-status-code')
var statusId = 200
var allStatus = HTTPStatusCode.getProtocolDefinitions(statusId)

// Points to API URL, based on platform (local or Heroku)
app.get('/', (req, res) => {
  var hostName = req.hostname
  
  if(!process.env.PORT) {
    hostName += ':' + port 
  }

  res.json([{'newUrl': hostName + '/api'}])
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
  statusId = 200;
  res.json(
      {'message': 'Return to API request: ' + statusId, allStatus}
    )
})

app.param('id', function (req, res, next, id) {
  statusId = id
  next()
})

app.get('/api/:id', function (req, res) {
  res.json(
      {
        'message': 'Return to API request: ' + statusId,
        'status': HTTPStatusCode.getMessage(statusId)
      }
    )
  res.end()
})

// Indicate running app
app.listen(port, () => {
  console.log(`Our app is running on port ${ port }`);
});