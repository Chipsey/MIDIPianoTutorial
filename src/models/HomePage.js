import { Box, Button, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Midi } from "@tonejs/midi";

const theme = createTheme({
  palette: {
    ochre: {
      main: "#000000",
      light: "#E9DB5D",
      dark: "#A29415",
      contrastText: "#242105",
    },
  },
});

const Home = () => {
  const fileInputRef = useRef();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploaded file:", file.name);
      parseMidi(file);
    }
  };

  const parseMidi = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const midi = new Midi(arrayBuffer);
    console.log(midi.tracks);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid
          size={12}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            paddingTop: "40vh",
          }}
        >
          <div className="d-block">
            <div className="mb-3">
              <img
                src="media/images/piano.png"
                alt="logo"
                style={{ width: "3vw" }}
              />
            </div>
            <div>
              {/* Hidden file input element */}
              <input
                type="file"
                accept=".mid"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {/* Upload button */}
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                color="ochre"
                sx={{ fontSize: "0.7rem" }}
                onClick={handleUploadClick}
              >
                Upload Midi
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Home;
