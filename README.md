# Simple Test API

## Main Goal
Useful in code tests:
- main uri reveals `/api/` uri
- `/api` returns random http status code
- for tests, `/api/418` returns 418 http status code
- if http status code is between `100` and `399` returns image uri
- if http status code is `5xx` randomly drops connection

## Requirements
- `node` and `npm` 
- `.env` for local running
  - `PORT=3000` or other as you wish
  - `API_KEY` from [Pexels API](https://www.pexels.com/api/) - to get random image URI
- for remote hosting I'm using [Heroku](https://dashboard.heroku.com/)

## How to use locally
- `npm install` 
- set `.env` variables
- `node index.js`
- open `http://localhost:3000` (replace `3000` with your `.env PORT` config)

