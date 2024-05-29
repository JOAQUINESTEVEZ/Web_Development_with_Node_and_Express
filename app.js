const express = require('express');

let app = express();

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'))


const fortunes = [
    'Conquer your fears or they will conquer you.',
    'Ribers need springs.',
    'Do not fear what you don\' know',
    'You will have a pleasant surprise.',
    'Whenever possible, keep it simple.'
]





//routes
app.get('/', (req,res) => {
    res.render('home')
})

app.get('/about', (req,res) => {
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about', { fortune: randomFortune})
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