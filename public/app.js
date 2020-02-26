var canvas, top, left, right;
const CreateUser = document.querySelector('.CreateUser')
CreateUser.addEventListener('submit', (e) => {
  e.preventDefault()
  const username = CreateUser.querySelector('.username').value
  const password = CreateUser.querySelector('.password1').value
  const password2 = CreateUser.querySelector('.password2').value
  if (password === password2) {
    if (password.length >= 6) {
      post('/createUser', { username, password })
        .then(({ status }) => {
          if (status == 200) {
            alert("Success")
          } else {
            alert("Something went wrong.  Try again later.")
          }
        })
    } else {
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
        getBase3();
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

function doBase(thing) {
  post('/addBase', thing)
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
}

//This is the current call method to get the stuff
async function getBase2({ owner }) {
  const response = await fetch("/getBases")
  bases = await response.json();
}

var bases = [];

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
    toDraw.push({ x: bases.outposts[i].x, y: bases.outposts[i].y, w: 50, h: 50, owner: bases.outposts[i].owner })
    document.getElementById("top").innerHTML = "<h1>Submarine Warfare</h1>"
    console.log("Loading Success")
  }
}

var BaseBases = {
  0: { x: 14.917335128529423, y: 18.811443310419488, w: 50, h: 50, color: "#000000" },
  1: { x: 55.793054382458074, y: 256.2447731069656, w: 50, h: 50, color: "#000000" },
  2: { x: 9.653569278291474, y: 436.61034260471956, w: 50, h: 50, color: "#000000" },
  3: { x: 77.71856101317114, y: 656.7272920530881, w: 50, h: 50, color: "#000000" },
  4: { x: 36.1021477104132, y: 830.2032491665467, w: 50, h: 50, color: "#000000" },
  5: { x: 24.244819780781153, y: 1055.9783552024246, w: 50, h: 50, color: "#000000" },
  6: { x: 48.10696290305779, y: 1270.813754018956, w: 50, h: 50, color: "#000000" },
  7: { x: 41.92320298344258, y: 1470.9543973491595, w: 50, h: 50, color: "#000000" },
  8: { x: 71.596259978953, y: 1623.793869149981, w: 50, h: 50, color: "#000000" },
  9: { x: 214.23800710785244, y: 10.49993695114787, w: 50, h: 50, color: "#100000" },
  10: { x: 217.70367464132295, y: 226.20434040669141, w: 50, h: 50, color: "#100000" },
  11: { x: 228.39469106995287, y: 401.01113336353563, w: 50, h: 50, color: "#100000" },
  12: { x: 228.01020948592054, y: 669.2841063622275, w: 50, h: 50, color: "#100000" },
  13: { x: 232.14192267814747, y: 833.3963018295563, w: 50, h: 50, color: "#100000" },
  14: { x: 271.1987104954563, y: 1066.570604246411, w: 50, h: 50, color: "#100000" },
  15: { x: 270.1118981371612, y: 1280.6177350185526, w: 50, h: 50, color: "#100000" },
  16: { x: 274.6324139010435, y: 1437.9042863927273, w: 50, h: 50, color: "#100000" },
  17: { x: 217.46579649922148, y: 1645.861510451436, w: 50, h: 50, color: "#100000" },
  18: { x: 457.08316054264066, y: 40.637874331887126, w: 50, h: 50, color: "#200000" },
  19: { x: 477.9946867094968, y: 267.6581796178178, w: 50, h: 50, color: "#200000" },
  20: { x: 443.3430239171538, y: 478.10528720172977, w: 50, h: 50, color: "#200000" },
  21: { x: 404.54938812130337, y: 633.908571199551, w: 50, h: 50, color: "#200000" },
  22: { x: 427.97950494289677, y: 846.7786361473532, w: 50, h: 50, color: "#200000" },
  23: { x: 476.47985408972386, y: 1013.5254790382735, w: 50, h: 50, color: "#200000" },
  24: { x: 443.9881907609867, y: 1218.8859460822182, w: 50, h: 50, color: "#200000" },
  25: { x: 436.3562685492782, y: 1473.4394063935488, w: 50, h: 50, color: "#200000" },
  26: { x: 471.1147420518882, y: 1648.8338041240554, w: 50, h: 50, color: "#200000" },
  27: { x: 615.9690925496362, y: 19.96055844379487, w: 50, h: 50, color: "#300000" },
  28: { x: 672.8588583705672, y: 251.36063195410347, w: 50, h: 50, color: "#300000" },
  29: { x: 605.888206884815, y: 415.1584409662906, w: 50, h: 50, color: "#300000" },
  30: { x: 678.7710627185176, y: 607.9441942524069, w: 50, h: 50, color: "#300000" },
  31: { x: 602.8683034598067, y: 816.4755496742107, w: 50, h: 50, color: "#300000" },
  32: { x: 616.3071366130029, y: 1053.0637902806325, w: 50, h: 50, color: "#300000" },
  33: { x: 609.583458786372, y: 1269.45382971257, w: 50, h: 50, color: "#300000" },
  34: { x: 628.299764992535, y: 1403.5253319813075, w: 50, h: 50, color: "#300000" },
  35: { x: 621.2712299307836, y: 1631.7810392852366, w: 50, h: 50, color: "#300000" },
  36: { x: 816.7034176668478, y: 68.36136682492722, w: 50, h: 50, color: "#400000" },
  37: { x: 831.3122223356127, y: 276.514783984225, w: 50, h: 50, color: "#400000" },
  38: { x: 826.6630337121396, y: 418.87759081617054, w: 50, h: 50, color: "#400000" },
  39: { x: 855.5117603164236, y: 664.1520752261611, w: 50, h: 50, color: "#400000" },
  40: { x: 804.0010252586882, y: 832.3167906655657, w: 50, h: 50, color: "#400000" },
  41: { x: 826.3189102149316, y: 1002.4369379535523, w: 50, h: 50, color: "#400000" },
  42: { x: 848.7327352970535, y: 1246.0307113681943, w: 50, h: 50, color: "#400000" },
  43: { x: 810.8291330435302, y: 1425.5126246271411, w: 50, h: 50, color: "#400000" },
  44: { x: 829.949518041105, y: 1663.8584379125737, w: 50, h: 50, color: "#400000" },
  45: { x: 1033.2443017998294, y: 31.59449261186063, w: 50, h: 50, color: "#500000" },
  46: { x: 1045.1884126134066, y: 249.49440014827744, w: 50, h: 50, color: "#500000" },
  47: { x: 1054.5636088459105, y: 474.5324875612235, w: 50, h: 50, color: "#500000" },
  48: { x: 1040.643654752095, y: 646.4457480902472, w: 50, h: 50, color: "#500000" },
  49: { x: 1050.5312424038586, y: 837.0858549323079, w: 50, h: 50, color: "#500000" },
  50: { x: 1029.3534168732965, y: 1080.2327778547642, w: 50, h: 50, color: "#500000" },
  51: { x: 1040.960806790791, y: 1215.3893693707282, w: 50, h: 50, color: "#500000" },
  52: { x: 1035.9453483250209, y: 1466.1400113416996, w: 50, h: 50, color: "#500000" },
  53: { x: 1069.216762431718, y: 1618.5780242170567, w: 50, h: 50, color: "#500000" }
}

