import axios from "axios";

export async function processImage(image) {
    const userid = "lisenor"// need to get the active users id
    try {
    
        await createTable(userid);
        const key = await uploadToBucket(image, userid);
        const text = await getText(userid, key);
        console.log(text);
        return text;  

    } catch (e) {
        console.log(e);
        alert("Error processing image");
    }
}

async function createTable(userid) {
    axios.post("/text/createtable/"+userid).then(result => {
        console.log(result);
    }).catch(e => {
        console.log(e);
    });
}

//https://www.codegrepper.com/code-examples/javascript/axios+file+upload
async function uploadToBucket(image, userid) {
    axios.put("/images/upload/"+userid, image, { 
        headers: {
            'Content-Type': image.type
        }
      }).then(result => {
        console.log(result);
        return result.data.key;
    }).catch(e => {
        console.log(e);
    });
}

async function getText(userid, key) {

    await new Promise(r => setTimeout(r, 6000)); //change this

    var text = "";
    axios.get("/images/"+userid+"/"+key).then(result => {
            text = result.data.text;
        }).catch(e => {
            console.log(e);
        });
    return text;
}
