const container = document.getElementById("container");
const resetButton = document.getElementById("reset");
const fluidMode = document.getElementById("fluid");
const rgb = document.getElementById("rgb-mode");
const smallGrid = document.getElementById("grid-small-16");
const mediumGrid = document.getElementById("grid-medium-32");
const largeGrid = document.getElementById("grid-large-64");
const eraser = document.getElementById("eraser");
const defaultSize = 16;

let isEraserActive = false;
let isFluidModeActive = false;
let isRGBModeActive = false;

function createGrid(size) {
  container.innerHTML = "";
  container.style.setProperty("--grid-size", size);

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");

    function paintSquare() {
      if (isEraserActive) {
        square.style.backgroundColor = "white";
      } else if (isRGBModeActive) {
        const randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        square.style.backgroundColor = randomColor;
      } else {
        square.style.backgroundColor = "black";
      }
    }

    square.addEventListener("click", paintSquare);

    square.addEventListener("mouseover", () => {
      if (isFluidModeActive) {
        paintSquare();
      }
    });

    container.appendChild(square);
  }
}

smallGrid.addEventListener("click", () => createGrid(16));
mediumGrid.addEventListener("click", () => createGrid(32));
largeGrid.addEventListener("click", () => createGrid(64));

resetButton.addEventListener("click", () => {
  let newSize = prompt("Choose Grid Size (max 100):", defaultSize);
  newSize = Math.min(100, Math.max(1, parseInt(newSize) || defaultSize));
  createGrid(newSize);
});

eraser.addEventListener("click", () => {
  isEraserActive = !isEraserActive;
  isFluidModeActive = false; 
  eraser.style.backgroundColor = isEraserActive ? "#C8B6FF" : "#FFD6FF"; 
});

function toggleMode() {
  fluidMode.textContent = isFluidModeActive ? "Pixel by Pixel" : "Fluid Mode";
}

function toggleColor() {
  rgb.textContent = isRGBModeActive ? "Black Pixel" : "RGB Mode";
}

rgb.addEventListener("click", () => {
  isRGBModeActive = !isRGBModeActive;
  toggleColor();
});

fluidMode.addEventListener("click", () => {
  isFluidModeActive = !isFluidModeActive;
  toggleMode();
});

createGrid(defaultSize);
