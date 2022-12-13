let nameInput = document.getElementById("username");
let passwordInput = document.querySelector("#password");
let nomInterfaceGame = document.getElementById("gamerName");
let validation = document.getElementById("validation");
let containerEntrerNom = document.querySelector(".containerEntrerNom");
let gamerName = document.getElementById("gamerName");
let interfacegame = document.getElementById("interfacegame");
let easy = document.getElementById("easy");
let paraInit = document.getElementById("paraInit");
let paraMain = document.getElementById("paraMain");
let paraTrial = document.getElementById("paraTrial");
let paraPoint = document.getElementById("paraPoint");
let randomNum 
let mypoint;
let myTrial;
let maxNum;
let minNum;
let btnValider = document.getElementById("btnValider")
let level = document.querySelectorAll(".level")
let numInput = document.getElementById("numInput")
let gamerScore = document.getElementById("gamerScore");
let result = document.querySelector(".result");
let trialMessage = document.getElementById("trialMessage");
let bye = document.getElementById("bye")
gamerScore.innerText = localStorage.getItem("myScore")
  ? localStorage.getItem("myScore")
  : 0;

validation.addEventListener("click", event => {
    event.preventDefault()
    let email = nameInput.value;
    let password = passwordInput.value;
    if (email && password) {
      fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.token) {
            localStorage.setItem("nom", nameInput.value);
            containerEntrerNom.style.display = "none";
            gamerName.innerText = localStorage.getItem("nom");
            interfacegame.style.display = "block";
          } else if (result.error) {
            alert(result.error);
          }
        });
    }
})

if (localStorage.getItem("nom")){
    containerEntrerNom.style.display = "none"
    interfacegame.style.display = "block";
    gamerName.innerText = localStorage.getItem("nom");
}

function chooseLevel(minNumber, maxNumbre, point, trial) {
    paraInit.style.display = "none"
    paraMain.style.color = "CCFF00";
    paraMain.innerText = `entrez un nombre entier entre ${minNumber} et ${maxNumbre}`;
    paraTrial.innerText = `vous avez ${trial} essais pour deviner`;
    paraPoint.innerText = `pour chaque nombre validé vous gagnez ${point} points`;
    randomNum = Math.floor(Math.random() * maxNumbre);
    if (randomNum < minNumber){
        randomNum = randomNum + minNumber;
    }
    mypoint = point;
    myTrial = trial;
    maxNum = maxNumbre;
    minNum = minNumber;
}

function levelFacile () {
    chooseLevel(1,10,1,3)
    console.log(randomNum);
}
function levelMoyen() {
  chooseLevel(10, 100, 3, 5);
  console.log(randomNum);
}
function levelDifficile() {
  chooseLevel(100, 1000, 5, 10);
  console.log(randomNum);
}

btnValider.addEventListener (`click`, (event) =>{
    event.preventDefault();
    Array.from(level).forEach(elt => elt.disabled = true)
    if(numInput.value == randomNum) {
        let score = parseInt(gamerScore.innerText) + mypoint;
        localStorage.setItem("myScore", score);
        gamerScore.innerText = localStorage.getItem("myScore");
        interfacegame.style.display = "none";
        result.style.display = "block";
    }
    else if (numInput.value > maxNum || numInput.value < minNum){
        paraTrial.style.display = "none";
        paraPoint.style.display = "none";
        paraMain.style.color = "red";
        paraMain.innertext = `entrez un nombre entier entre ${minNum} et ${maxNum}`;
        trialMessage.innerText = `il vous reste ${myTrial} essai`
    }
    else{
        paraTrial.style.display = "none";
        paraPoint.style.display = "none";
        paraMain.style.color = "red";
        paraMain.innerText = "desolé ce n est pas le bon nombre!";
        myTrial = myTrial - 1;
        trialMessage.innerText =`il vous reste ${myTrial} Essai`;
    }
    if(myTrial == 0){
        interfacegame.style.display = "none"
        bye.style.display = "block"
    }
})
let btnOui = document.getElementById("btnOui");
let btnNon = document.getElementById("btnNon");

btnOui.addEventListener(`click`, (event) => {
    event.preventDefault()
    bye.style.display = "none"
    interfacegame.style.display = "block"
    window.location.reload()
    numInput.focus()
})
btnNon.addEventListener(`click`, (event) => {
    event.preventDefault();
    bye.style.display = "none";
    containerEntrerNom.style.display = "block";
})
let btnResultOui = document.getElementById("btnResultOui");
let btnResultNon = document.getElementById("btnResultNon");

btnResultOui.addEventListener(`click`, (event) => {
  event.preventDefault();
  result.style.display = "none";
  interfacegame.style.display = "block";
  window.location.reload();
  numInput.focus();
});
btnResultNon.addEventListener(`click`, (event) => {
  event.preventDefault();
  result.style.display = "none";
  containerEntrerNom.style.display = "block";
});

