$(document).ready(function () {
  const $body = $("body");
  const $container = $("<div>").addClass("container");

  //viewport
  const $optAndGrid = $("<div>").addClass("optAndGrid");
  const $options = $("<div>").addClass("options");
  const $grid = $("<div>").addClass("grid");

  //options(to change the colors of our pen(or paint brush whatever))
  let color = "black"; //default color
  const $blackPen = $("<button>").addClass("optionBtns").text("Black");
  const $rainbowPen = $("<button>").addClass("optionBtns").text("Rainbow");
  const $shadeBtn = $("<button>").addClass("optionBtns").text("Shade");
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
  $options.append($blackPen, $rainbowPen, $shadeBtn, $eraser, $clearBtn, $submitBtn);
  $optAndGrid.append($options, $grid);
  $inputWrapper.append($userInputBox, $inputBtn);
  $inputContainer.append($inputWrapper);
  $container.append($optAndGrid, $inputContainer);
  $body.append($container);

  //functions
  function addPixels(dimensions) {
    const pixelHeight = 460 / dimensions;

    for (let i = 0; i < dimensions * dimensions; i++) {
      const $pixel = $("<div>")
        .addClass("pixels")
        .css({
          height: `${pixelHeight}px`,
          width: `${pixelHeight}px`,
          opacity: "0"
        });
      $grid.append($pixel);
    }
    staticColorEffect();
  }

  function removePixels() {
    $(".pixels").remove();
  }

  function staticColorEffect() {
    $(".pixels").on("dragenter mousedown", function () {
      $(this).css({
        background: color,
        opacity: "1",
      });
    });
  }

  function rainbowEffect() {
    const colors = [
      "rebeccapurple",
      "lightblue",
      "blue",
      "green",
      "yellow",
      "orange",
      "red",
    ];
    $(".pixels").on("dragenter mousedown", function () {
      const randomIndex = Math.floor(Math.random() * colors.length);
      $(this).css({
        background: colors[randomIndex],
        opacity: "1",
      });
    });
  }

  function shadeEffect() {
    $(".pixels").each(function () {
      let density = 0;
      $(this).on("dragenter mousedown", function () {
        density += 0.1;
        $(this).css("opacity", density);
      });
    });
  }

  addPixels(16); //default grid

  //Event listeners
  $inputBtn.on("click", function () {
    const userInput = Number($userInputBox.val());

    if (userInput > 0 && userInput <= 100) {
      removePixels();
      addPixels(userInput);
    } else {
      alert("ERROR: Input a number between 1 and 100");
    }
  });

  $blackPen.on("click", function () {
    staticColorEffect();
    color = "black";
  });

  $eraser.on("click", function () {
    staticColorEffect();
    color = "none";
  });

  $clearBtn.on("click", function () {
    $(".pixels").css({
      background: "none",
      opacity: "0",
    });
    staticColorEffect();
  });

  $rainbowPen.on("click", function () {
    rainbowEffect();
  });

  $shadeBtn.on("click", function () {
    shadeEffect();
  });

  $submitBtn.on("click", function() {
    const pixelData = [];
    $("div.pixels").each(function() {
      const opacity = Number($(this).css("opacity"));
      pixelData.push(opacity > 0 ? opacity : 0);
      $(this).css({opacity: "0"});
    });
    console.log(pixelData);
  });
  
  // This is better code. Uttam js pro pls make it work
  // $submitBtn.on("click", function() {
  //   const pixelData = [];
  //   $("div.pixels").each(function() {
  //     const color = $(this).css("background") == "black" ? 1 : 0;
  //     pixelData.push(color);
  //   });
  //   console.log(pixelData)
  // });


  const $footer = $("<div>")
    .addClass("footer")
    .html(
      'Photo by <a href="https://unsplash.com/@pbernardon?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Pascal Bernardon</a> on <a href="https://unsplash.com/photos/illustration-of-marvels-avengers-zWHZ_QsU4rc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'
    );
});
