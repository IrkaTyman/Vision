const express = require('express')
const app = express()
const port = process.env.PORT || 3306
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const routes = require('./server/setting/routes')
routes(app)
app.listen(port, () => {
  console.log('Hello')
})