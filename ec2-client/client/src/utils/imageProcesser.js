import axios from "axios";
const FormData = require("form-data");
const {url} = require("./../config/server-config.json");

export async function processImage(image) {
  const userid = localStorage.getItem("USER_EMAIL");
  console.log(userid)
  try {
    await createTable(userid);
    const key = await uploadToBucket(image, userid);
    const text = await getText(userid, key);
    return text;
  } catch (e) {
    console.log(e);
  }
}

async function createTable(userid) {
  try {
    const response = await axios.post(url + "/text/createtable/" + userid);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

//https://www.codegrepper.com/code-examples/javascript/axios+file+upload
async function uploadToBucket(image, userid) {
  const form = new FormData();
  form.append("image", image, image.name);
  try {
    const response = await axios.put(url + "/images/upload/" + userid, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("upload successful");
    return response.data.key;
  } catch (e) {
    console.log(e);
    alert(e);
    throw e;
  }
}

async function getText(userid, key) {
  var text = null;
  for (let tries = 0; tries < 5 && !text; tries++) {
    try {
      await new Promise((r) => setTimeout(r, 2000));
      const response = await axios.get(url + "/text/" + userid + "/" + key);
      text = response.data;
    } catch (e) {
      console.log("Text unavailable. Attempt: " + (tries + 1));
      console.log(e);
    }
  }
  if (!text) {
    alert("Error fetching text");
  }
  return text;
}
