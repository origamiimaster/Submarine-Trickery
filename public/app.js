var canvas, top, left, right;
const CreateUser = document.querySelector('.CreateUser')
CreateUser.addEventListener('submit', (e) => {
  e.preventDefault()
  const username = CreateUser.querySelector('.username').value
  const password = CreateUser.querySelector('.password1').value
  const password2 = CreateUser.querySelector('.password2').value
  if (password === password2) {
    if(password.length >= 6){
      post('/createUser', { username, password })
      .then(({status})=>{
        if(status == 200){
          alert ("Success")
        } else {
          alert("Something went wrong.  Try again later.")
        }
      })
    }else {
      alert("Password must be at least 6 characters.")
    }
  } else {
    alert("Passwords must match.")
  }
})
const Login = document.querySelector('.Login')
Login.addEventListener('submit', (e) => {
  e.preventDefault()
  const username = Login.querySelector('.username').value
  const password = Login.querySelector('.password').value
  post('/login', { username, password })
    .then((response) => {
      if (response.status === 200) {
        alert('Logging in...')
        loadGame();
        
      }
      else alert('Login failed.')
      var temp = response.json();
      temp.then((data) => {
        setCookie('ID', data.body, 1);
        SessID = data.body;
      })
    })
})
function setCookie(cname, cvalue, time_in_hours) {
  var d = new Date();
  d.setTime(d.getTime() + (time_in_hours * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}











function post(path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

function get(path) {
  fetch("/getBases")
    .then((data) => {
      return data.json()
    });
}

function doBase({ x, y, name, owner }) {
  post('/addBase', { x, y, name, owner })
    .then(({ status }) => {
      alert(status);
    })
}

function loadGame() {
  var child = document.body.lastElementChild;
  while (child) {
    document.body.removeChild(child);
    child = document.body.lastElementChild;
  }
  canvas = document.createElement("canvas")
  document.body.appendChild(canvas);
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, true);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var top = document.createElement("div");
  top.id = "top";
  document.body.appendChild(top)

  var bot = document.createElement("div");
  bot.id = "bottom";
  document.body.appendChild(bot)

  var left = document.createElement("div");
  left.id = "bot_left";
  bot.appendChild(left)
  var right = document.createElement("div");
  right.id = "bot_right";
  bot.appendChild(right)

  init();
  getBase3();
}

//This is the current call method to get the stuff
async function getBase2({ owner }) {
  const response = await fetch("/getBases")
  bases = await response.json();
}

var bases = [];
var SessID;

async function getBase3(owner = "none") {
  if (document.getElementById("top") == null) {
    return
  }
  document.getElementById("top").innerHTML = "Loading Bases ..."
  const response = await fetch('/getBase3', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  bases = await response.json();
  applyBases()
}

function applyBases() {
  toDraw = [];
  for (var i = 0; i < bases.outposts.length; i++) {
    console.log(bases.outposts[i])
    toDraw.push({ x: bases.outposts[i].x, y: bases.outposts[i].y, w: 50, h: 50 })
    console.log("success")
  }
}