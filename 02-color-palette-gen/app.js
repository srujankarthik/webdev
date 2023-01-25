// selections
const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");

let initialColors;

// generate a random hex color using chroma.js
function generateHex() {
  const hexColor = chroma.random(); // generates random hex color
  return hexColor;
}

// to display whether the text should be black or white
function checkTextContrast(color, text) {
  const luminance = chroma(color).luminance();
  if (luminance > 0.5) {
    text.style.color = "black";
  } else {
    text.style.color = "white";
  }
}

// displaying randomColors
function randomColors() {
  colorDivs.forEach((div) => {
    const hexText = div.children[0]; // returns an array and we're grabbing h2
    const randomColor = generateHex();

    //  add color to the background
    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;
    // contrast check
    checkTextContrast(randomColor, hexText);
  });
}

randomColors();
