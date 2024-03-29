
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app      = express();
var port     = process.env.PORT || 3000;



app.use(session({secret: 'New##123'}));




require('./app/server/modules/knexbookshelf'); 



require('./app/server/models/models'); 


app.use(cookieParser()); 
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());


var theme = 'default';

 
app.set('views', __dirname + '/app/server/views/'+theme+'/');
app.set('view engine', 'ejs'); 


app.use(express.static('/app/public'));


require('./app/server/routes/routes')(app,knex,bookshelf);


app.listen(port);
console.log('App is running on http://localhost:' + port);
	