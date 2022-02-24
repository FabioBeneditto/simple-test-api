const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.json(req)
})

app.post('/', (req, res) => {
  res.send(`Redirect to ${req}`)
})

app.get('/api', (req, res) => {
  res.json(
    [
      {'message': 'Return to API request'}
    ]
  )
})

app.listen(port, () => {
  console.log(`Our app is running on port ${ port }`);
});