import axios from "axios";
const FormData = require('form-data');
const url = "http://localhost:5000"
export async function processImage(image) {
    const userid = "lisenor"// need to get the active users id
    try {
    
        await createTable(userid);
        const key = await uploadToBucket(image, userid);
        const text = await getText(userid, key);
        return text;  

    } catch (e) {
        console.log(e);
        alert("Error processing image");
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
    };
}

async function getText(userid, key) {
    try{
        await new Promise(r => setTimeout(r, 8000)); //change this

        var text = "";
        const response = await axios.get(url+"/text/"+userid+"/"+key);
        return response.data.text;
    }catch(e) {
        console.log(e);
    };
}
