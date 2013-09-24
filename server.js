var express = require('express'),
    wines = require('./routes/wines');
 
var app = express();

app.configure(function(){
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router);
  app.use(express.static(__dirname));
});


app.get('/api/wines/:id', wines.findById);
app.get('/api/wines', wines.findAll);
app.put('/api/wines/:id', wines.update);

//app.patch('/employees/:id', wines.patch);

app.listen(3030);
console.log('Listening on port 3030...');

