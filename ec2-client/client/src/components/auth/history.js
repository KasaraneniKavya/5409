import * as React from "react";
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
  Grid
} from "@mui/material";
import { Container } from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "blue",
    color: "white"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16
  }
}));

export default function History() {
  return (
    // <Container maxWidth="sm">
    //   <Paper elevation={7}>
    //     <TableContainer component={Paper}>
    //       <Table sx={{ minWidth: 400 }} aria-label="customized table">
    //         <TableHead>
    //           <TableRow>
    //             <StyledTableCell align="center">Name</StyledTableCell>
    //             <StyledTableCell align="center">Files</StyledTableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           <TableRow>
    //             <StyledTableCell align="center">Kavya</StyledTableCell>
    //             <StyledTableCell align="center">Files</StyledTableCell>
    //           </TableRow>
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   </Paper>
    // </Container>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >

      <Grid item xs={3}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">File Name</StyledTableCell>
                <StyledTableCell align="center">Image URL</StyledTableCell>
                <StyledTableCell align="center">Text Extracted File</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <StyledTableCell align="center">29-01-1999</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">URL</StyledTableCell>
                <StyledTableCell align="center">File</StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

    </Grid>
  );
}
