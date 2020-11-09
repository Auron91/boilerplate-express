var express = require('express');
var app = express();
var dotenv = require('dotenv').config();
const bodyParser = require('body-parser')

const path = __dirname + "/views/index.html";
const staticPath = __dirname + "/public";

const object = {
	message: "Hello json"
}


// --> 7)  Mount the Logger middleware here
app.use((req, res, next) => {
	console.log(req.method + " " + req.path + " - " + req.ip  )
	next()
})

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({
	extended: false
	}))

/** 1) Meet the node console. */
console.log('Hello World');

/** 2) A first working Express Server */
// app.get('/', function(req, res) {
// 	res.send("Hello Express");
// })

/** 3) Serve an HTML file */
app.get('/', function(req, res) {
	res.sendFile(path);
})

/** 4) Serve static assets  */
app.use(express.static(staticPath));
/** 5) serve JSON on a specific route */
/** 6) Use the .env file to configure the app */

//console.log(process.env.MESSAGE_STYLE);

// app.get('/json', function(req, res){
// 	if(process.env.MESSAGE_STYLE === 'uppercase'){
// 		object.message = "HELLO JSON";
// 		res.json(object);
// 		console.log('uppercase fired');
// 	} else {
// 		res.json(object);
// 		console.log('uppercase not fired');
// 	}
// })


 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now', (req, res, next) => {
	req.time = new Date().toString()
	next();
}, (req, res) => {
	res.send({time: req.time})
})

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', (req, res) => {
	const _word = req.params.word
	res.send({echo: _word})
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get('/name', (req, res) => {
	
	const response = {name: req.query.first + " " + req.query.last}
	res.send(response)
})
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.post('/name', (req, res) => {
		const response = {name: req.body.first + " " + req.body.last}
		console.log(req.body)
	res.send(response)
})


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
