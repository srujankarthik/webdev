// selections
const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");

let initialColors;

// event listener
sliders.forEach((slider) => {
  slider.addEventListener("input", hslControls);
});

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

// hsl controls
function hslControls(e) {
  const index =
    e.target.getAttribute("data-bright") ||
    e.target.getAttribute("data-saturation") ||
    e.target.getAttribute("data-hue");

  let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
  console.log(sliders);
}

// colorize sliders
function colorizeSliders(color, hue, brightness, saturation) {
  // saturation scale
  const noSat = color.set("hsl.s", 0);
  const fullSat = color.set("hsl.s", 1);
  const scaleSat = chroma.scale([noSat, color, fullSat]);

  // brightness scale
  const midBright = color.set("hsl.l", 0.5);
  const scaleBright = chroma.scale(["black", midBright, "white"]);

  // update input color
  saturation.style.backgroundImage = `linear-gradient(to right,${scaleSat(
    0
  )}, ${scaleSat(1)})`;
  brightness.style.backgroundImage = `linear-gradient(to right,${scaleBright(
    0
  )},${scaleBright(0.5)}, ${scaleBright(1)})`;
  hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75),rgb(204,204,75),rgb(75,204,75),rgb(75,204,204),rgb(75,75,204),rgb(204,75,204), rgb(204,75,75))`;
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
    // Initial colorize sliders
    const color = chroma(randomColor);
    const sliders = div.querySelectorAll(".sliders input");
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];
    console.log(saturation);
    colorizeSliders(color, hue, brightness, saturation);
  });
}

randomColors();
