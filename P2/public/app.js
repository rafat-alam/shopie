let baseUrl = window.location.origin;
let l_submit = document.getElementById('l-submit');
let s_submit = document.getElementById('s-submit');
let m_submit = 0;
let usr1 = 0;
let send_btn = 0;
let text_box = 0;

async function fetch_post(url, data) {
  const urlEncodedData = new URLSearchParams(data).toString();
  try {
    let res = await axios.post(url, urlEncodedData);
    return res;
  } catch(e) {
    return e;
  }
}

async function fetch_put(url, data) {
  const urlEncodedData = new URLSearchParams(data).toString();
  try {
    let res = await axios.put(url, urlEncodedData);
    return res;
  } catch(e) {
    return e;
  }
}

async function fetch_patch(url, data) {
  const urlEncodedData = new URLSearchParams(data).toString();
  try {
    let res = await axios.patch(url, urlEncodedData);
    return res;
  } catch(e) {
    return e;
  }
}

async function fetch_delete(url, data) {
  const urlEncodedData = new URLSearchParams(data).toString();
  try {
    let res = await axios.delete(url, urlEncodedData);
    return res;
  } catch(e) {
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
      m_submit = document.getElementsByClassName('msg-btn');
      usr1 = document.querySelector('i').innerText;
      flist();
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

function flist() {
  for(let i=0; i<m_submit.length; i++) {
    m_submit[i].addEventListener('click', async () => {
      let usr2 = m_submit[i].id;
      let url = `${baseUrl}/msg`;
      let data = {
        user1: usr1,
        user2: usr2
      }
      let res = await fetch_post(url, data);
      url = `${baseUrl}/msg/${res.data}`;
      let res2 = await fetch_post(url, data);
      document.documentElement.innerHTML = res2.data;
      send_btn = document.getElementById('m-send');
      text_box = document.getElementById('m-text-box');
      msend(data.user1, data.user2, res.data);
      setInterval(uptodate, 1000, data.user1, data.user2, res.data);
    });
  }
}

function msend(usr1, usr2, id) {
  send_btn.addEventListener('click', async () => {
    let msgs = text_box.value;
    text_box.value = "";
    if(msgs) {
      let url = `${baseUrl}/msg/${id}`;
      let data = {
        user1 : usr1,
        user2 : usr2,
        msg : msgs
      }
      let res = await fetch_put(url, data);
      if(res) {
        let res2 = await fetch_patch(url, data);
        document.querySelector('table').innerHTML = res2.data;
      }
    }
  });
}

async function uptodate(usr1, usr2, id) {
  let url1 = `${baseUrl}/msg/`;
  let res = await fetch_put(url1, {id : id});
  let updated_session = res.data;
  let curr_session = document.getElementById('curr-session').innerText;
  if(updated_session != curr_session) {
    let url = `${baseUrl}/msg/${id}`;
    let data = {
      user1 : usr1,
      user2 : usr2
    }
    let res2 = await fetch_patch(url, data);
    document.querySelector('table').innerHTML = res2.data;
  }
}
