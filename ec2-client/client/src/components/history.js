import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import "./history.css";
import {
  styled,
  TableCell,
  tableCellClasses,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "blue",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

export default function History() {
  const { url } = require("./../config/server-config.json");
  const userIdEmail = localStorage.getItem("USER_EMAIL");
  const userId = userIdEmail.split("@").join("");
  const [images, setImages] = useState();

  const getImages = async () => {
    try {
      let response = await axios.get(url + "/images/" + userId);
      let sortedImages = response.data.images;
      sortedImages.sort((a, b) =>
        new Date(a.date) < new Date(b.date) ? 1 : -1
      );
      setImages(sortedImages);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteDocument = async (image) => {
    try {
      await axios.delete(url + "/history/" + userId + "/" + image.id);
      getImages();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">File Name</StyledTableCell>
                <StyledTableCell align="center">Image</StyledTableCell>
                <StyledTableCell align="center">
                  Text Extracted File
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {images?.map((image) => {
                let date = new Date(image.date);
                let dateConverted =
                  date.getFullYear() +
                  "-" +
                  date.getMonth() +
                  "-" +
                  date.getDate();
                return (
                  <TableRow>
                    <StyledTableCell align="center">
                      {dateConverted}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {image.fileName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <a href={image.url} target="_blank">
                        <img src={image.url} />
                      </a>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        id="download"
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => {
                          window.location.replace(
                            url + "/text/download/" + userId + "/" + image.id
                          );
                        }}
                      >
                        {" "}
                        Download{" "}
                      </Button>
                      <br />
                      <br />
                      <Button
                        id="delete"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={() => deleteDocument(image)}
                      >
                        {" "}
                        Delete{" "}
                      </Button>
                    </StyledTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
