let button = document.querySelector("button");

button.addEventListener("click", () => {
  let input = document.querySelector("input");
  let value = input.value;
  let ip = "192.168.29.249";
  let port = 3000;
  let link = `http://${ip}:${port}/${value}`;

  window.open(link, "_blank");

  input.value = "";
});
