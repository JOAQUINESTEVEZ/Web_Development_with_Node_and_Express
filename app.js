const express = require('express')
const weatherMiddlware = require('./lib/middleware/weather')
const handlers = require('./lib/handlers')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

// Configure Handlebars view engine
let handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
  helpers: {
    section: function(name, options) {
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    },
  },
})
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.use(weatherMiddlware)

// Routes
app.get('/', handlers.home)
app.get('/section-test', handlers.sectionTest)
app.get('/newsletter-signup', handlers.newsletterSignUp)
app.post('/newsletter-signup/process', handlers.newsletterSignUpProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

app.use(handlers.notFound)
app.use(handlers.serverError)

if(require.main === module) {
  app.listen(port, () => {
    console.log( `Express started on http://localhost:${port}` +
      '; press Ctrl-C to terminate.' )
  })
} else {
  module.exports = app
}