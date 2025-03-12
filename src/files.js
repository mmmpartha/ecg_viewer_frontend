import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, Paper
} from "@mui/material";

const API_BASE_URL = "http://localhost:5000"; 


const FilesPage = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/files`).then((res) => setFiles(res.data));
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: "40px" }}>
      <Typography variant="h4" gutterBottom>Uploaded Files</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>File Name</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file, index) => (
              <TableRow key={index}>
                <TableCell>{file.filename}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/viewer/${file.filename}`} variant="contained" color="secondary">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default FilesPage;