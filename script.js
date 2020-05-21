console.log("%cajinkya.space", "position: absolute; top: 10px; padding:5px; font-weight: 400; font-family: Roboto; font-size: 20px; margin:0 auto; align:center;");
console.log("%cApache\/2.4.29 (Ubuntu)", "position: absolute; top: 10px; padding:5px; font-weight: 400; font-family: Roboto; font-size: 15px; margin:0 auto; align:center;");

function goToConnect(el) {

    setTimeout(function() {
        window.location = "#connect";
    }, 299);
}

let jokeRequest = new XMLHttpRequest();
jokeRequest.open("GET", "https://official-joke-api.appspot.com/jokes/programming/random");
jokeRequest.send();
jokeRequest.onload = () => {
    if (jokeRequest.status == 200) {
        joke = JSON.parse(jokeRequest.response);
        setup = document.querySelector(".setup");
        setup.innerText = joke[0].setup;
        setup = document.querySelector(".punchline");
        setup.innerText = joke[0].punchline;

    } else {
        console.log(`error ${jokeRequest.status} ${jokeRequest.statusText}`);
    }
}

function sendMail(el) {
    el.innerText = "Loading..";
    setTimeout(function() {
        window.location = "mailto:hello@ajinkya.space?subject=Hi%21%20I%27d%20like%20to%20connect%20with%20you.";
    }, 499);
}

function toLinkedIn(el) {
    el.innerText = "Loading..";
    setTimeout(function() {
        window.location = "https://www.linkedin.com/in/ajinkyabawaskar/";
    }, 499);
}

function toWhatsapp(el) {
    el.innerText = "Loading..";
    setTimeout(function() {
        window.location = "https://wa.me/7058834841?text=Hi%21%20I%27d%20like%20to%20connect%20with%20you.";
    }, 499);
}


function toFacebook(el) {
    el.innerText = "Loading..";
    setTimeout(function() {
        window.location = "https://www.facebook.com/ajinkyabawaskar.5/";
    }, 499);
}

function toTwitter(el) {
    el.innerText = "Loading..";
    setTimeout(function() {
        window.location = "https://twitter.com/ajinkyabawaskar/";
    }, 499);
}

function toInstagram(el) {
    el.innerText = "Loading..";
    setTimeout(function() {
        window.location = "https://www.instagram.com/ajinkya_bawaskar/";
    }, 499);
}

function goToMoreProjects(el) {
    el.innerText = "Loading..";
    setTimeout(function() {
        window.location = "https://www.github.com/ajinkyabawaskar/";
    }, 499);
}


function goToMoreCertificates(el) {
    initial = el.innerHTML;
    el.innerText = "To be added soon!";
    setTimeout(function() {
        el.innerHTML = initial;
    }, 2999);
}