const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
// so, partials are like short codes/includes - really more like short codes
app.set('view engine', 'hbs');
// __dirname refers to the directory in which the file being used resides
// in the case below, it is node-web-server

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  // if don't have next, will hang up the server
  next();
});
// maintenance file can be uncommented to take down the site
// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });
//these run in order...
app.use(express.static(__dirname + '/public'));

// getCurrentYear is a helper, not a partial. can leave out of the render
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>hello, express</h1>');
  // res.send({
  //   name: 'Mark',
  //   likes: [
  //     'running',
  //     'reading',
  //     'ruminating'
  // ]
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to ma page'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'No such page',
    what: 'I don\'t know'
  });
});



app.listen(port, () => {
  console.log(`Server is funning on port ${port}, but I really don't know why`);
});
