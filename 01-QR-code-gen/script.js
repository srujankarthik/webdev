// Input text value
const dataInput = document.querySelector("#data");
const dataError = document.querySelector(".dataError");

// Selecting Image Format
const imageFormat = document.querySelector('input[name="format"]:checked');
console.log({ checked: imageFormat });

// colors
const mainColor = document.querySelector("#color");
const backgroundColor = document.querySelector("#bg-color");

// color hex value
const mainColorValue = document.querySelector("#color-value");
const backgroundColorValue = document.querySelector("#bg-color-value");

// update hex value for mainColor
const updateColor = (e) => {
  const value = e.target.value;
  mainColorValue.innerText = value;
};

// update hex value for bgColor
const updateBackgroundColor = (e) => {
  const { value } = e.target;
  backgroundColorValue.innerText = value;
};

const addColorPicketEventListener = () => {
  mainColor.addEventListener("change", updateColor);
  backgroundColor.addEventListener("change", updateBackgroundColor);
};

addColorPicketEventListener();

// SLIDERS

const sizeSlider = document.querySelector("#size");
const marginSlider = document.querySelector("#margin");

// Slider values
const sizeValue = document.querySelector("#size-value");
const marginValue = document.querySelector("#margin-value");

const updateSize = (e) => {
  const { value } = e.target;
  sizeValue.innerText = `${value} x ${value}`;
};

const updateMargin = (e) => {
  const { value } = e.target;
  marginValue.innerText = `${value} px`;
};

const addSliderEventListener = () => {
  sizeSlider.addEventListener("change", updateSize);
  marginSlider.addEventListener("change", updateMargin);
};

addSliderEventListener();

// btn
const submitBtn = document.querySelector("#cta");

const showInputError = () => {
  dataError.classList.add("border", "border-red-500");
};

const dataInputEventListener = () => {
  dataInput.addEventListener("change", (e) => {
    if (e.target.value !== "") {
      dataError.classList.remove("border-red-500");
      submitBtn.removeAttribute("disabled");
    } else {
      dataError.classList.add("border-red-500");
      submitBtn.setAttribute("disabled", true);
    }
  });
};

dataInputEventListener();

const prepareParameters = (params) => {
  return {
    data: params.data,
    size: `${params.size}x${params.size}`,
    color: params.color.replace("#", ""),
    bgcolor: params.bgColor.replace("#", ""),
    qzone: params.qZone,
    format: params.format,
  };
};

const settingsContainer = document.querySelector(".settings-container");
const resultContainer = document.querySelector(".result-container");
const qrCodeImage = document.querySelector("#qr-code-image");

console.log(settingsContainer, resultContainer);

const displayQrCode = (imgUrl) => {
  settingsContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  qrCodeImage.setAttribute("src", imgUrl);
};

const getQrCode = (parameters) => {
  const baseUrl = "http://api.qrserver.com/v1/create-qr-code/";
  const urlParams = new URLSearchParams(parameters).toString();

  const URL = `${baseUrl}?${urlParams}`;

  fetch(URL).then((res) => {
    if (res.status === 200) {
      displayQrCode(URL);
    }
  });
};

const onSubmit = () => {
  console.log("clicked");
  const data = dataInput.value;
  if (!data.length) {
    return showInputError();
  }
  const color = mainColor.value;
  const bgColor = backgroundColor.value;
  const size = sizeSlider.value;
  const qZone = marginSlider.value;
  const format = imageFormat.value;

  const parameters = prepareParameters({
    data,
    color,
    bgColor,
    size,
    qZone,
    format,
  });

  getQrCode(parameters);
};

const addSubmitEventListener = () => {
  submitBtn.addEventListener("click", onSubmit);
};

addSubmitEventListener();

const editBtn = document.querySelector(".goback-btn");

const editBtnEventListener = editBtn.addEventListener("click", () => {
  settingsContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");
});
