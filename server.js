var http = require('http')
var url = require('url')
var ejs = require('ejs')
var express = require('express');
const request = require('request');
const querystring = require('querystring')

const expressOasGenerator = require('express-oas-generator');
var app = express()
expressOasGenerator.init(app, function(spec) {
    app.set(spec, 'info.title', 'New Title');
    app.set(spec, 'paths[\'/path\'].get.parameters[0].example', 2);
    return spec;
});
app.set('view engine', 'ejs');

//dictionary to hold the question and answers for each parameter
var db = {'description':{'Question':'Tell me a little bit about yourself?','Answer':'I am Naveen, 23 years old and a Software Engineer'},
               'tech':{'Question':'What excites you about technology?','Answer':'The vast array of opportunities it presents'},
               'techstack':{'Question':'What is your preferred technology stack?','Answer':'Javascript/HTML,Python,MySQL'},
               'hobbies':{'Question':'What are your favorite hobbies?','Answer':'Basketball, Weight lifting, Netflix'}
             }

//route for home page
app.get('/', function(req, res) {
  res.render('home');
});

//route for posts which displays data returned in proper format
app.get('/posts', function(req, res) {
  processRequest().then(result => {
    res.render('posts',
          {
              result: result
          });
  }).catch(err => {
    console.log(err)
  })
});

//route for about me which shows question and answer, optional to pass in query with form q='param' to show a single question/answer
app.get('/aboutme', function(req, res) {
  var query = url.parse(req.url).search
  var queryParams = null
  //if query param is passed
  if(typeof query !== 'undefined' && query)
    queryParams = querystring.parse(url.parse(req.url).search.substring(1))
  if(queryParams == null){
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(db))
  }
  else{
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(db[queryParams['q']]))
  }
  res.end();
});

//shows error message for all unknown routes
app.get('*', function(req, res) {
  res.render('error');
});

//makes get requst to the specefied url and returns the contents as a promise
function processRequest(){
    var promise = new Promise((resolve)=>{
      request('https://jsonplaceholder.typicode.com/posts', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        resolve(body)
    })
  });
  return promise
}

app.listen('https://naveen-test.herokuapp.com', function (err) {
  console.log("Started Server")
});
