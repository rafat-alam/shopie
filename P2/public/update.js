let baseUrl = window.location.origin;
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

while(true) {
  if(m_submit) {
    
  }
}