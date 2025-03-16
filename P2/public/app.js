function showMessage(message) {
  alert(message);
}

const params = new URLSearchParams(window.location.search);
if (params.has("message")) {
  showMessage(params.get("message"));
}

function enableInput() {
  document.getElementById('disabled-user').disabled = false;
}

let baseUrl = window.location.origin;
let l_submit = document.getElementById('l-submit');
let s_submit = document.getElementById('s-submit');
let m_submit = document.getElementById('m-submit');

async function fetch_post(url, data) {
  const urlEncodedData = new URLSearchParams(data).toString();
  try {
    let res = await axios.post(url, urlEncodedData);
    return res;
  } catch(e) {
    console.log("Error :", e);
    return e;
  }
}

if(l_submit) {
  l_submit.addEventListener("click", async () => {
    let l_user = document.getElementById('l-user');
    let l_pass = document.getElementById('l-pass');
    let data = {
      user : l_user.value,
      pass : l_pass.value
    }
    let url = `${baseUrl}/login`;
    let res = await fetch_post(url, data);
    l_user.value = "";
    l_pass.value = "";
    if(res.data == "failed") {
      let para = document.createElement('p');
      para.textContent = 'Username or Password is incorrect!';
      l_submit.insertAdjacentElement("beforebegin", para);
    } else {
      document.documentElement.innerHTML = res.data;
    }
  });
}

if(s_submit) {
  s_submit.addEventListener("click", async () => {
    let s_user = document.getElementById('s-user');
    let s_email = document.getElementById('s-email');
    let s_pass = document.getElementById('s-pass');
    let data = {
      user : s_user.value,
      email : s_email.value,
      pass : s_pass.value
    }
    let url = `${baseUrl}/signup`;
    let res = await fetch_post(url, data);
    s_user.value = "";
    s_email.value = "";
    s_pass.value = "";
    if(res.data == "success") {
      let para = document.createElement('p');
      para.textContent = 'User Created successfully!';
      s_submit.insertAdjacentElement("beforebegin", para);
    } else {
      let para = document.createElement('p');
      para.textContent = 'Username already taken!';
      s_submit.insertAdjacentElement("beforebegin", para);
    }
  });
}

document.addEventListener("click", async (event) => {
  if (event.target && event.target.id === "m-submit") {
    let m_text = document.getElementById('m-text-box');
    let m_user = document.querySelector('i');
    let data = {
      user : m_user.innerText,
      msg : m_text.value
    }
    let url = `${baseUrl}/msg`;
    let res = await fetch_post(url, data);
    m_text.value = "";
    document.documentElement.innerHTML = res.data;
  }
});