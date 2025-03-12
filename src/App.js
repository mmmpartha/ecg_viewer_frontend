import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button } from "@mui/material";

import UploadPage from "./upload";
import FilesPage from "./files";
import ViewerPage from "./view";


const App = () => {
  return (
    <Router>
      <nav style={{ background: "#1976d2", padding: "10px", textAlign: "center" }}>
        <Button component={Link} to="/" style={{ color: "white", marginRight: "20px" }}>Upload</Button>
        <Button component={Link} to="/files" style={{ color: "white" }}>View Files</Button>
      </nav>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/files" element={<FilesPage />} />
        <Route path="/viewer/:file" element={<ViewerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
