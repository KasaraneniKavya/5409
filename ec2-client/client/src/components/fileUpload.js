import { useState } from "react";
import { processImage } from "../utils/imageProcesser";

const FileUpload = () => {

    const [image,setImage] = useState();
    const [text,setText] = useState("");

    const submit = async(e) => {
        e.preventDefault();
        var result = await processImage(image);
        setText(result);
    }
    
    const handleChange = (e) => {
        if (e.target.files[0]) {
            document.getElementById("submit").disabled = false;
        } else {
            document.getElementById("submit").disabled = true;
        }
        setImage(e.target.files[0]);
    }

    return  (
        <>
            <form onSubmit={submit}>
            <input type="file" id="image" name="image" accept=".pdf, .jpg, .png, .tiff" onChange={handleChange}/><br/>
            <input type="submit" id="submit" disabled={true}/>
            </form>
            <p/>
            <div>{text}</div>
        </>
    );
}

export default FileUpload;