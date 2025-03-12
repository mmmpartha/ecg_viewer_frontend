import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container, Typography, Button
} from "@mui/material";

const API_BASE_URL = "http://localhost:5000"; // Update if running on another host


const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !file.name.endsWith(".edf")) {
      setMessage("Please upload a valid EDF file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${API_BASE_URL}/upload`, formData);
      setMessage("File uploaded successfully!");
      setTimeout(() => navigate("/files"), 1500);
    } catch (error) {
      setMessage("Upload failed. Try again.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "40px" }}>
      <Typography variant="h4" gutterBottom>Upload ECG File</Typography>
      <input type="file" accept=".edf" onChange={handleFileChange} style={{ margin: "20px 0" }} />
      <br />
      <Button variant="contained" color="primary" onClick={handleUpload}>Upload</Button>
      {message && <Typography color="error" style={{ marginTop: "10px" }}>{message}</Typography>}
    </Container>
  );
};

export default UploadPage;