// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require("custom-env").env("staging");
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
// var cors = require('cors');
// app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", (req, res)=>{
  let regex = /[\-]/g;
  let date = (req.params.date_string!=undefined) ? new Date((req.params.date_string.match(regex)==null)?Number(req.params.date_string):req.params.date_string) : (new Date());
  console.log(req.params.date_string, date)
  console.log(typeof(req.params.date_string))
  if(date!="Invalid Date"){
    let UTCDate = date.toUTCString();
    let unix = date.getTime();
    res.json({unix: unix, utc: UTCDate})
  }else{
    res.json({"error" : "Invalid Date" })
  }
})
console.log(process.env.PORT)
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});