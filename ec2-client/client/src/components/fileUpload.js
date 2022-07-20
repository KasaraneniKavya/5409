import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Container, Box } from '@mui/material';
import { processImage } from "../utils/imageProcesser";
import NavBar from "./auth/navbar"

const FileUpload = () => {

    const [image, setImage] = useState();
    const [text, setText] = useState("");

    const submit = async (e) => {
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

    return (
        // <>
        //     <form onSubmit={submit}>
        //     <input type="file" id="image" name="image" accept=".jpg, .png, .tiff" onChange={handleChange}/><br/>
        //     <input type="submit" id="submit" disabled={true}/>
        //     </form>
        //     <p/>
        //     <div>{text}</div>
        // </>
        <>
            <Container maxWidth="xs">


                <Box component='form' onSubmit={submit} marginTop='20px'>

                    <label htmlFor="upload">
                        <input
                            id="upload"
                            name="upload"
                            style={{ display: 'none' }}
                            type="file"
                            accept="image/*"
                            onChange={handleChange} />
                        <Button
                            className="btn-choose"
                            variant="outlined"
                            component="span" >
                            Upload Image
                        </Button>
                    </label>

                    <br /> <br />
                    <Button variant='contained' type='submit' color='primary' > Submit </Button>

                    <br />
                    <TextField margin="normal"

                        fullWidth
                        type="text"
                        label="Output Text"
                        name="text"
                        placeholder='Your Text'

                        variant='outlined' color='primary' />

                    <br />

                </Box>
            </Container>
        </>
    );
}

export default FileUpload;

// https://www.bezkoder.com/material-ui-image-upload/