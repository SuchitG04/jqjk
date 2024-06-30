$(document).ready(function () {
  const $body = $("body");

  //viewport
  const $container = $("<div>").addClass("container");
  const $options = $("<div>").addClass("options");
  const $grid = $("<div>").addClass("grid");

  //options(to change the colors of our pen(or paint brush whatever))
  const $blackPen = $("<button>").addClass("optionBtns").text("BLACK");
  const $rainbowPen = $("<button>").addClass("optionBtns").text("RAINBOW");
  const $eraser = $("<button>").addClass("optionBtns").text("ERASER");
  const $clearBtn = $("<button>").addClass("optionBtns").text("CLEAR");
  const $submitBtn = $("<button>").addClass("optionBtns").text("SUBMIT");

  //appending elements
  $options.append($blackPen, $rainbowPen, $eraser, $clearBtn, $submitBtn);
  $container.append($options, $grid);
  $body.append($container);

  //functions
  let mouseDown = false;
  document.body.onmousedown = () => (mouseDown = true);
  document.body.onmouseup = () => (mouseDown = false);

  function addPixels(dimensions) {
    $grid.empty();
    const pixelHeight = 400 / dimensions;

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

    getNumber(pixelData);
  });

  //function to post pixelData to the server and get a number as a response
  const getNumber = (pixelData) => {
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:8000/classify",
      data: JSON.stringify({ digit_array: pixelData }),
      contentType: "application/json",
      success: function (response) {
        console.log(response);
      },
      error: function (err) {
        console.log("Error");
        console.log(err);
      },
    });
  };

  addPixels(28); //default grid
});
