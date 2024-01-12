const jonasmap = {
    "a": 21,
    "b": 35,
    "c": 33,
    "d": 23,
    "e": 13,
    "f": 24,
    "g": 25,
    "h": 26,
    "i": 18,
    "j": 27,
    "k": 28,
    "l": 29,
    "m": 37,
    "n": 36,
    "o": 19,
    "p": 10,
    "q": 11,
    "r": 14,
    "s": 22,
    "t": 15,
    "u": 17,
    "v": 34,
    "w": 12,
    "x": 32,
    "y": 16,
    "z": 31,
    ".": 96,
    "?": 97,
    "!": 98,
    " ": 99
};
const jackmap = {
    "a": 1107,
    "b": 19,
    "c": 18,
    "d": 17,
    "e": 16,
    "f": 15,
    "g": 14,
    "h": 13,
    "i": 12,
    "j": 11,
    "k": 201,
    "l": 210,
    "m": 209,
    "n": 208,
    "o": 207,
    "p": 206,
    "q": 205,
    "r": 204,
    "s": 203,
    "t": 202,
    "u": 3001,
    "v": 3100,
    "w": 3099,
    "x": 3089,
    "y": 3079,
    "z": 111,
    ".": 4000,
    "?": 3999,
    "!": 5000,
    " ": 42
};
var currentMode = "jonas";

var inputarea = document.getElementById("input");
var outputarea = document.getElementById("output");
var copyButton = document.getElementById("copy");

function disableCopy() {
    if(inputarea.value == "") {
        copyButton.disabled = true;
    } else {
        copyButton.disabled = false;
    }
}

function switchEncode() {
    header = document.querySelector("h1");
    if (currentMode == "jonas") {
        currentMode = "jack";
        header.innerText = "JackCode Encoder";
    } else {
        currentMode = "jonas";
        header.innerText = "JonasCode Encoder"
    }
    encode();
}

function encode() {
    var input = Array.from(inputarea.value.toLowerCase());
    var output = "";
    var charMap = "jonas" == currentMode ? jonasmap : jackmap;
    for (var i=0; i<input.length; i++) {
        if (input[i] in charMap) {
            var character = charMap[input[i]].toString();
            output += character;
        }
    }
    outputarea.innerText = output;
    disableCopy();
}

function copyOutput() {
    navigator.clipboard.writeText(outputarea.innerText)
    .then(() => {
        alert("Copied to clipboard");
    });
}

inputarea.addEventListener("input", encode);
