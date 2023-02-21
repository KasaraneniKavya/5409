import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Container, Box } from "@mui/material";
import { processImage } from "../utils/imageProcesser";
import NavBar from "./auth/navbar";

const FileUpload = () => {
  const { url } = require("./../config/server-config.json");
  const userIdEmail = localStorage.getItem("USER_EMAIL");
  const userId = userIdEmail.split("@").join("");
  const [image, setImage] = useState();
  const [text, setText] = useState("");
  const [textId, setTextId] = useState("");
  const [disabled, setDisabled] = useState(true);

  const submit = async (e) => {
    e.preventDefault();
    var result = await processImage(image);
    setText(result.text);
    setTextId(result.id);
  };

  const handleChange = (e) => {
    console.log(e.target.files);
    if (e.target.files[0]) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setImage(e.target.files[0]);
  };

  return (
    <>
      <Container maxWidth="xs">
        <Box component="form" onSubmit={submit} marginTop="20px">
          <label htmlFor="upload">
            <input
              id="upload"
              name="upload"
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
            <Button className="btn-choose" variant="outlined" component="span">
              Upload Image
            </Button>
            <br />
            {image?.name}
          </label>
          <br /> <br />
          <Button
            id="submit"
            variant="contained"
            type="submit"
            color="primary"
            disabled={disabled}
          >
            {" "}
            Submit{" "}
          </Button>
          <br />
          {/*
                    <TextField margin="normal"

                        fullWidth
                        type="text"
                        label="Output Text"
                        name="text"
                        variant='outlined' color='primary' />
                    */}
          {text}
          <br />
          {text !== "" ? (
            <>
              <Button
                id="download"
                variant="contained"
                color="primary"
                onClick={() => {
                  window.location.replace(
                    url + "/text/download/" + userId + "/" + textId
                  );
                }}
              >
                {" "}
                Download{" "}
              </Button>
              <br />
              <br />
            </>
          ) : null}
        </Box>
      </Container>
    </>
  );
};

export default FileUpload;

// https://www.bezkoder.com/material-ui-image-upload/
