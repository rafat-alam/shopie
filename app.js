div = document.querySelector("div");

function changeColor(color, delay, nextColorChange) {
  setTimeout(() => {
    div.style.backgroundColor = color;
    console.log(color);
    if(nextColorChange) {
      nextColorChange();
    }
  }, delay);
}

changeColor("yellow", 1000, () => {
  changeColor("red", 1000, () => {
    changeColor("blue", 1000, () => {
      changeColor("green", 1000);
    })
  })
});

function savetoDb(data, success, failure) {
  let internetSpeed = Math.floor(Math.random() * 10) + 1;
  if(internetSpeed > 4) {
    success();
  } else {
    failure();
  }
}

savetoDb(
  "data1",
  () => {
    console.log("Data 1 saved successfully");
    savetoDb(
      "data2",
      () => {
        console.log("Data 2 saved successfully");
        savetoDb(
          "data3",
          () => {
            console.log("Data 3 saved successfully");
          },
          () => {
            console.log("Data 3 failed to save");
          }
        );
      },
      () => {
        console.log("Data 2 failed to save");
      }
    );
  }, () => {
    console.log("Data 1 failed to save");
  }
);