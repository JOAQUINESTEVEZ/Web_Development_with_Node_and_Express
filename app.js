const express = require('express');
const fortune = require('./lib/fortune')
let app = express();

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'))



//routes
app.get('/', (req,res) => {
    res.render('home')
})

app.get('/about', (req,res) => {
    res.render('about', { fortune: fortune.getFortune()})
})

//custom 404 page
app.use((req,res) => {
    res.status(404)
    res.render('404')
})

//custom 500 page
app.use((err,req,res,next) => {
    console.log(err.message)
    res.status(500)
    res.render('500')
})



app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
      app.get('port') + '; press Ctrl-C to terminate.' );
  });