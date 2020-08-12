(window.onload = function(){

var strength = {
    0: "Worst :(",
    1: "Bad :(",
    2: "Weak :/",
    3: "Good :)",
    4: "Strong :D"
}

var password = document.getElementById('password');
var meter = document.getElementById('password-strength-meter');
var text = document.getElementById('password-strength-text');
var next = document.getElementById('next-section');

password.addEventListener('input', function()
{
var val = password.value;
var result = zxcvbn(val);

// Update the password strength meter
meter.value = result.score;

// Update the text indicator
if(val !== "") {
    text.innerHTML = "Strength: " + "<strong>" + strength[result.score] + "</strong>" + "<span class='feedback'>" + result.feedback.warning + " " + result.feedback.suggestions + "</span"; 
}
else {
    text.innerHTML = "";
}

if(result.score >= 3) {
    next.classList.remove("hidden");
}
else {
    next.classList.add("hidden");
}
})});