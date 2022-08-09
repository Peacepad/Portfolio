const colorButtons = [...document.querySelectorAll('input[type="color"]')];
const colorLabels = document.querySelectorAll(".color-label");
const rangeLabelValue = document.querySelector(".orientation-value");

const gradientData = {
  angle: 90,
  colors: ["#FF5F6D", "#FFC371"],
};

function colorUI() {
  colorLabels[0].textContent = gradientData.colors[0];
  colorLabels[1].textContent = gradientData.colors[1];

  colorButtons[0].value = gradientData.colors[0];
  colorButtons[1].value = gradientData.colors[1];

  colorLabels[0].style.background = gradientData.colors[0];
  colorLabels[1].style.background = gradientData.colors[1];

  document.body.style.background = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`;

  rangeLabelValue.textContent = `${gradientData.angle}°`;
  adaptInputsContrast();
}

colorUI();

function adaptInputsContrast() {
  colorLabels.forEach((label) => {
    const hexColor = label.textContent.replace("#", "");
    const red = parseInt(hexColor.slice(0, 2), 16);
    const green = parseInt(hexColor.slice(2, 4), 16);
    const blue = parseInt(hexColor.slice(4, 6), 16);

    const yiq = (red * 299 + green * 587 + blue * 144) / 1000;
    // console.log(yiq);

    if (yiq >= 128) {
      label.style.color = "#111";
    } else {
      label.style.color = "#f1f1f1";
    }
  });
}

const rangeInput = document.querySelector("#orientation-input");
rangeInput.addEventListener("input", handleInclination);

function handleInclination() {
  gradientData.angle = rangeInput.value;
  rangeLabelValue.textContent = `${gradientData.angle}°`;

  colorUI();
}



colorButtons.forEach(colorButton => colorButton.addEventListener("input", colorInputModification));

function colorInputModification(e) {
    const currentIndex = colorButtons.indexOf(e.target);
    gradientData.colors[currentIndex] = e.target.value.toUpperCase();
  colorUI();
}

copyBtn = document.querySelector('.copy-btn');

copyBtn.addEventListener('click', handleGradientCopy);

function handleGradientCopy() {
    const gradient = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`;

    navigator.clipboard.writeText(gradient)

    copyBtn.classList.add("active")

    setTimeout(() => {
    copyBtn.classList.remove("active")
    lock = false;
    }, 1000)
}

const randomGradientBtn = document.querySelector(".random-btn");
randomGradientBtn.addEventListener("click", createRandomGradient)

function createRandomGradient(){

  for(let i = 0; i < colorLabels.length; i++) {
    randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    console.log(randomColor);
    gradientData.colors[i] = randomColor.toUpperCase()
  }

  randomAngle = `${Math.floor(Math.random() * 360)}`;
  rangeInput.value = randomAngle;
  gradientData.angle = randomAngle;

  colorUI()
}