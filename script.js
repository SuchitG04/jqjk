$(document).ready(function () {
  const $body = $("body");
  const $container = $("<div>").addClass("container");

  //viewport
  const $optAndGrid = $("<div>").addClass("optAndGrid");
  const $options = $("<div>").addClass("options");
  const $grid = $("<div>").addClass("grid");

  //options(to change the colors of our pen(or paint brush whatever))
  const $blackPen = $("<button>").addClass("optionBtns").text("Black");
  const $rainbowPen = $("<button>").addClass("optionBtns").text("Rainbow");
  const $eraser = $("<button>").addClass("optionBtns").text("Eraser");
  const $clearBtn = $("<button>").addClass("optionBtns").text("Clear");
  const $submitBtn = $("<button>").addClass("optionBtns").text("Submit");

  //input
  const $inputContainer = $("<div>").addClass("inputContainer");
  const $inputWrapper = $("<div>").addClass("inputWrapper");
  const $userInputBox = $("<input>")
    .attr("type", "number")
    .attr("id", "userInput");
  const $inputBtn = $("<button>").addClass("inputBtn").text("Change size");

  //appending elements
  $options.append($blackPen, $rainbowPen, $eraser, $clearBtn, $submitBtn);
  $optAndGrid.append($options, $grid);
  $inputWrapper.append($userInputBox, $inputBtn);
  $inputContainer.append($inputWrapper);
  $container.append($optAndGrid, $inputContainer);
  $body.append($container);

  //functions
  let mouseDown = false;
  document.body.onmousedown = () => (mouseDown = true);
  document.body.onmouseup = () => (mouseDown = false);

  function addPixels(dimensions) {
    $grid.empty();
    const pixelHeight = 460 / dimensions;

    for (let i = 0; i < dimensions * dimensions; i++) {
      const $pixel = $("<div>")
        .addClass("pixels")
        .css({
          height: `${pixelHeight}px`,
          width: `${pixelHeight}px`,
        });
      $grid.append($pixel);
    }
    $grid.on("mouseover mousedown", ".pixels", changeColor);
  }

  let currentMode = "black"; //default mode
  function changeColor(e) {
    if (e.type === "mouseover" && !mouseDown) return;
    if (currentMode === "rainbow") {
      const randomR = Math.floor(Math.random() * 256);
      const randomG = Math.floor(Math.random() * 256);
      const randomB = Math.floor(Math.random() * 256);
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === "black") {
      e.target.style.backgroundColor = "#000";
    } else if (currentMode === "eraser") {
      e.target.style.background = "none";
    }
  }

  function clearScreen() {
    $(".pixels").css({
      background: "none",
    });
  }

  //Event listeners
  $inputBtn.on("click", function () {
    const userInput = Number($userInputBox.val());

    if (userInput > 0 && userInput <= 100) {
      addPixels(userInput);
    } else {
      alert("ERROR: Input a number between 1 and 100");
      //TODO: display the error more nicely
    }
  });

  $blackPen.on("click", function () {
    currentMode = "black";
  });

  $eraser.on("click", function () {
    currentMode = "eraser";
  });

  $clearBtn.on("click", function () {
    clearScreen();
  });

  $rainbowPen.on("click", function () {
    currentMode = "rainbow";
  });

  // Records input as array of 1s and 0s. 1s indicate selected pixel
  $submitBtn.on("click", function () {
    const pixelData = [];
    $("div.pixels").each(function () {
      // console.log($(this).css("background"));
      const color = String($(this).css("background"));
      // Console output indicated that white pixels had "background" property
      // set to rgba(0, 0, 0, 0) ...
      // and black pixels: rgb(0, 0, 0)
      if (color.startsWith("rgba(")) {
        pixelData.push(0);
      } else {
        pixelData.push(1);
      }
    });
    console.log(pixelData);
  });

  addPixels(16); //default grid
});
