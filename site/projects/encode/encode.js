const charmap = {
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

function encode() {
    var input = Array.from(inputarea.value);
    var output = "";
    for (var i=0; i<input.length; i++) {
        if (input[i] in charmap) {
            var character = charmap[input[i]].toString();
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
