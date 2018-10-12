const Tracking = require("../Tracking");

const btns = document.querySelectorAll("button");

btns.forEach( elem => {
    elem.addEventListener("click", (e) => {
        Tracking.trackRequest(elem.innerText, "default");
    });
})