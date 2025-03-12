import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Plot from "react-plotly.js";
import {
  Container, Typography, Button
} from "@mui/material";

const API_BASE_URL = "http://localhost:5000"; 

const ViewerPage = () => {
  const { file } = useParams();
  const [data, setData] = useState({ time: [], signal: [] });
  const [page, setPage] = useState(0);

  useEffect(() => {
    console.log("Fetching ECG data from:", `${API_BASE_URL}/ecg/${file}`);
    axios.get(`${API_BASE_URL}/ecg/${file}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching ECG data:", err.message, err.response?.status));
  }, [file]);


  const stripSize = 10; 
  const startIndex = page * stripSize;
  const endIndex = startIndex + stripSize;

  return (
    <Container maxWidth="lg" style={{ marginTop: "40px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>ECG Viewer</Typography>
      <Plot
        data={[{
          x: data.time.slice(startIndex, endIndex),
          y: data.signal.slice(startIndex, endIndex),
          type: "scatter",
          mode: "lines"
        }]}
        layout={{ title: `ECG Waveform (Seconds ${startIndex} - ${endIndex})`, xaxis: { title: "Time" }, yaxis: { title: "Signal" } }}
      />
      <div>
        <Button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
        <Button disabled={endIndex >= data.time.length} onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </Container>
  );
};

export default ViewerPage;