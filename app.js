// div = document.querySelector("div");

// function changeColor(color, delay) {
//   return new Promise((success, failure) => {
//     setTimeout(() => {
//       div.style.backgroundColor = color;
//       if(div.style.backgroundColor == color) {
//         success();
//       } else {
//         failure("Color not changed");
//       }
//     }, delay);
//   })
// }

// changeColor("yellow", 1000)
//   .then(() => {
//     console.log("Color changed to yellow");
//     return changeColor("red", 1000);
//   })
//   .then(() => {
//     console.log("Color changed to red");
//     return changeColor("blue", 1000);
//   })
//   .then(() => {
//     console.log("Color changed to blue");
//     return changeColor("green", 1000);
//   })
//   .then(() => {
//     console.log("Color changed to green");
//   })
//   .catch((error) => {
//     console.log("Error : ", error);
//   });

// function savetoDb(data) {
//   return new Promise((success, failure) => {
//     let internetSpeed = Math.floor(Math.random() * 10) + 1;
//     if(internetSpeed > 4) {
//       success("Hi");
//     } else {
//       failure("Bye");
//     }
//   });
// }

// savetoDb("apna college")
//   .then((result) => {
//     console.log("Result : ", result);
//     console.log("Data saved");
//     return savetoDb("apna college");
//   })
//   .then((result) => {
//     console.log("Result : ", result);
//     console.log("Data 2 saved");
//   })
//   .catch((error) => {
//     console.log("Result : ", error);
//     console.log("Data not saved");
//   });

// async function changeColor(color, delay) {
//   return new Promise((success, failure) => {
//     setTimeout(() => {
//       div.style.backgroundColor = color;
//       if(div.style.backgroundColor == color) {
//         success(`Color changed to ${color}`);
//       } else {
//         failure("Color not changed");
//       }
//     }, delay);
//   })
  
// }

// async function change() {
//   try {
//     let result = await changeColor("yellow", 1000);
//     console.log(result);
//     result = await changeColor("red", 1000);
//     console.log(result);
//     result = await changeColor("blue", 1000);
//     console.log(result);
//     result = await changeColor("green", 1000);
//     console.log(result);
//   } catch (error) {
//     console.log("Error: ", error);
//   }
// }

// change();

// changeColor("yellow", 1000)
//   .then((result) => {
//     console.log(result);
//     return changeColor("red", 1000);
//   })
//   .then((result) => {
//     console.log(result);
//     return changeColor("blue", 1000);
//   })
//   .then((result) => {
//     console.log(result);
//     return changeColor("green", 1000);
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log("Error : ", error);
//   });

// async function greet() {
//   setTimeout(() => {
//     throw "Error"
//   }, 1000)
// }

// greet()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// async function hii() {
//   try {
//     let result = await greet();
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// }

// hii();

let url = "http://universities.hipolabs.com/search?country=";
let input = document.querySelector("input");
let button = document.querySelector("button");
let list = document.querySelector("table");

async function getCol(country) {
  try {
    let res = await axios.get(url+country);
    print(res.data);
  } catch(err) {
    console.log(err);
  }
}

function print(data) {
  for(let i = 0; i < data.length; i++) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
    <td>
      ${data[i].name}
    </td>
    <td>
      <a href="${data[i].web_pages[0]}">
        ${data[i].web_pages[0]}
    </td>`;
    list.appendChild(tr);
  }
}

button.addEventListener("click", () => {
  list.innerHTML = `
    <tr>
      <th>Collage Name</th>
      <th>website</th>
    </tr>`;
  getCol(input.value);
});
