const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')
const initialize = require('./initialize')
const request = require('./request')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.post('/createUser', (req, res) => {
  console.log(req.body)
  store
    .createUser({
      username: req.body.username,
      password: req.body.password
    })
    .then(() => res.sendStatus(200))
})
app.post('/login', (req, res) => {
  store
    .authenticate({
      username: req.body.username,
      password: req.body.password
    })
    .then(({ success }) => {
      if (success) {
        //currentUsers.push({user: req.body.username,cookie: req.headers.cookie})
        var temp = store.generateCookie({ username: req.body.username, password: req.body.password })
        res.status(200).send({ body: temp })
        var flag = false;
        for (var i = 0; i < currentUsers.length; i++) {
          flag = currentUsers[i].username == req.body.username
          if (flag) {
            currentUsers[i] = { username: req.body.username, cookie: temp }
          }
        }
        if (!flag) {
          currentUsers.push({ username: req.body.username, cookie: temp })
        }
      }
      else {
        res.sendStatus(401)
      }
    })
})
app.post('/addBase', (req, res) => {
  console.log(req.body);
  initialize
    .createOutpost(req.body)
    .then(() => res.sendStatus(200))
})
// app.get('/getBases', (req, res) => {
//   //add in the hash info 
//   request
//     .askOutposts3(req.body.owner)
//     .then((returned) => {
//       res.send(returned);
//     })
// })

app.get('/getBase3', (req, res) => {
  var temp = req.headers.cookie.split(';');
  var name = "ID="
  var cookie = "";
  for (var i = 0; i < temp.length; i++) {
    var c = temp[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      cookie = c.substring(name.length, c.length);
    }
  }
  user = ""
  for (var i = 0; i < currentUsers.length; i++) {
    if (currentUsers[i].cookie == cookie) {
      user = currentUsers[i].username;
    }
  }
  console.log(user);
  //console.log(req)
  request
    .askOutposts3(user)
    .then((data) => {
      res.status(200).send({ outposts: data });
    })
})
var currentUsers = [];



app.listen(process.env.PORT || 7555, () => {
  console.log('Server running on http://localhost:7555')
})

