import axios from "axios";
const FormData = require('form-data');
const url = "http://group42-dal-2.us-east-1.elasticbeanstalk.com/";

export async function processImage(image) {
    const userid = "lisenor"// need to get the active users id
    try {
        await createTable(userid);
        const key = await uploadToBucket(image, userid);
        const text = await getText(userid, key);
        return text;  
    } catch(e) {
        console.log(e);
    }
}

async function createTable(userid) {
    try {
        const response = await axios.post(url+"/text/createtable/"+userid)
        console.log(response);
    }catch(e) {
        console.log(e);
    };
}

//https://www.codegrepper.com/code-examples/javascript/axios+file+upload
async function uploadToBucket(image, userid) {
    const form = new FormData();
    form.append("image", image, image.name);
    console.log(image)
    try {
        const response = await axios.put(url+"/images/upload/"+userid, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("upload successful")
        return response.data.key;
    }catch(e){
        console.log(e);
        alert("Error uploading image");
        throw(e);
    };
}

async function getText(userid, key) {
    var text = null;
    for (let tries=0; tries<3 && !text; tries++) {
        try{
            await new Promise(r => setTimeout(r, 2000));
            const response = await axios.get(url+"/text/"+userid+"/"+key);
            text = response.data.text;
        }catch(e) {
            console.log("Could not get text. Attempt: "+tries)
            console.log(e);
        }
    }
    if (!text) {
        alert("Error fetching text");
    }
    return text;
}
