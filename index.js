const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api', (req, res) => {
  res.json(
    [
      {'message': 'Return to API request'}
    ]
  )
})

app.post('/', (req, res) => {
  res.send('Receive a POST request!')
})

app.listen(port, () => {
  console.log(`Our app is running on port ${ port }`);
});