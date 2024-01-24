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
    "a": 110,
    "b": 190,
    "c": 180,
    "d": 170,
    "e": 160,
    "f": 150,
    "g": 140,
    "h": 130,
    "i": 120,
    "j": 100,
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
    "u": 301,
    "v": 310,
    "w": 399,
    "x": 389,
    "y": 379,
    "z": 211,
    ".": 400,
    "?": 398,
    "!": 500,
    " ": 420
};
var currentMode = "jonas";
var currentDir = "encode";

var inputarea = document.getElementById("input");
var outputarea = document.getElementById("output");
var copyButton = document.getElementById("copy");

function swap(arr) {
    ret = {};
    for (var key in arr) {
        ret[arr[key]] = key;
    }
    return ret;
}

function disableCopy() {
    if(inputarea.value == "") {
        copyButton.disabled = true;
    } else {
        copyButton.disabled = false;
    }
}

function displayHeader() {
    header = document.querySelector("h1");
    modeText = currentMode == "jonas" ? "JonasCode" : "JackCode";
    dirText = currentDir == "encode" ? "Encoder" : "Decoder";
    header.innerText = modeText + " " + dirText;
}
function switchEncode() {
    inputarea.value = ""
    outputarea.value = ""
    currentMode = currentMode == "jonas" ? "jack" : "jonas";
    displayHeader();
    main();
}
function switchDir() {
    inputarea.value = ""
    outputarea.value = ""
    currentDir = currentDir == "encode" ? "decode" : "encode";
    displayHeader();
    main();
}

function main() {
    var output = "";
    var charMap = "jonas" == currentMode ? jonasmap : jackmap;
    if (currentDir == "encode") {
        var input = Array.from(inputarea.value.toLowerCase());
        for (var i=0; i<input.length; i++) {
            if (input[i] in charMap) {
                var character = charMap[input[i]].toString();
                output += character;
            }
        }
    } else {
        var input = inputarea.value;
        var index = 0;
        var length = currentMode == "jonas" ? 2 : 3;
        while (index < input.length) {
            var character = input.substring(index, index+length);
            for (i in charMap) {
                if (charMap[i] == character) {
                    output += i;
                }
            }
            index += length;
        }
    }
    outputarea.innerText = output;
    disableCopy();
}

function copyOutput() {
    navigator.clipboard.writeText(outputarea.innerText)
    .then(() => {
        copyButton.innerText = "Copied!";
        setTimeout(function() {
            copyButton.innerText = "Copy";
        }, 750);
    });
}

inputarea.addEventListener("input", main);
