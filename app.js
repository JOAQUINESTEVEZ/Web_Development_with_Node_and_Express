const express = require('express');
const handlers = require('./lib/handlers');
let app = express();

// Set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

// Directories
app.use(express.static(__dirname + '/public'))

// Routes
app.get('/', handlers.home)
app.get('/about', handlers.about)
app.use(handlers.notFound) //custom 404 page
app.use(handlers.serverError) //custom 500 page

// Port
if(require.main === module){
    app.listen(port, () => {
        console.log(`Express started on http://localhost:${port}` + '; press Ctrl-C to terminate.')
    })
} else{
    module.exports = app
}