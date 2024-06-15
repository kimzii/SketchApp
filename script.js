const canvas = document.querySelector("#container");
let size = 16;
let isMouseDown = false;
let currentColor = 'black'; 
let rainbowMode = false; 

function setColor(color) {
  const colorPickerColor = document.querySelector("#colorPicker");
  colorPickerColor.value = color;
  currentColor = color;
  rainbowMode = false; 
}

function setRainbowMode() {
  rainbowMode = true; 
}

function setSize(){
  const getSize = document.querySelector("#size");
  size = parseInt(getSize.value);
  if( size >= 16 && size <=100) {
    generateCanvas(size);
  }
  else {
    alert("The minimum size for the canvas is 16 and a maximum of 100.");
  }
}

function clearCanvas()  {
  const getSize = document.querySelector("#size");
  const modal = document.querySelector("#modal");
  size = parseInt(getSize.value);

  modal.style.display = "flex";

  document.querySelector("#yes").addEventListener("click", () => {
    generateCanvas(size);
    modal.style.display = "none";
  })

  document.querySelector("#no").addEventListener("click", () => {
    modal.style.display = "none";
  })
}

function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function generateCanvas(size) {
    canvas.innerHTML = '';

    for (let i = 1; i <= size; i++) {
        for (let j = 1; j <= size; j++) {
            const pixel = document.createElement("div");
            canvas.appendChild(pixel);
            pixel.className = "pixel"

            pixel.addEventListener("mouseover", function() {
              if (isMouseDown) {
                pixel.style.backgroundColor = rainbowMode ? generateRandomColor() : currentColor;
              }
            });
      
            pixel.addEventListener("mousedown", function() {
              pixel.style.backgroundColor = rainbowMode ? generateRandomColor() : currentColor;
            });
        }
    }
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
}

document.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

generateCanvas(size);


document.getElementById("red").addEventListener("click", () => setColor('#FF0000'));
document.getElementById("blue").addEventListener("click", () => setColor('#0000FF'));
document.getElementById("yellow").addEventListener("click", () => setColor('#FFFF00'));
document.getElementById("green").addEventListener("click", () => setColor('#008000'));
document.getElementById("black").addEventListener("click", () => setColor('#000000'));
document.getElementById("white").addEventListener("click", () => setColor('#FFFFFF'));
document.querySelector("#colorPicker").addEventListener("change", (e) => {
  setColor(e.target.value);
});
document.getElementById("rainbow").addEventListener("click", setRainbowMode);


function drawGridOnCanvas() {
  const divs = document.querySelectorAll(".pixel");
  const gridSize = Math.sqrt(divs.length);
  const scale = 20; 
  const canvasElement = document.createElement("canvas");
  canvasElement.width = gridSize * scale;
  canvasElement.height = gridSize * scale;
  const ctx = canvasElement.getContext("2d");

  divs.forEach((div, index) => {
    const x = (index % gridSize) * scale;
    const y = Math.floor(index / gridSize) * scale;
    ctx.fillStyle = div.style.backgroundColor || "white"; 
    ctx.fillRect(x, y, scale, scale);
  });

  return canvasElement;
}


function downloadCanvas() {
  const canvasElement = drawGridOnCanvas();
  const link = document.createElement("a");
  link.download = 'etch-a-sketch.png';
  link.href = canvasElement.toDataURL();
  link.click();
}

document.getElementById("download").addEventListener("click", downloadCanvas);
