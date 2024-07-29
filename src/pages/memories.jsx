import React from "react";
import {
  Container,
  Typography,
  Box,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import {
  Upload as UploadIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import babyImage from "@/assets/Babys-First-Words-When-Do-Babies-Start-Talking.jpg";
import Heading from "@/components/ui/heading";

const memories = [
  { title: "Memories 1", date: "02/10/2024", video: "/path-to-video1" },
  { title: "Memories 2", date: "02/10/2024", video: "/path-to-video2" },
  { title: "Memories 3", date: "02/10/2024", video: "/path-to-video3" },
];

const scenarios = [
  {
    date: "20/07/2024",
    title: "ADD TITLE",
    description: "Add Description",
    images: [babyImage, babyImage, babyImage, babyImage],
  },
  {
    date: "05/08/2024",
    title: "1 Month More",
    description: "",
    images: [babyImage, babyImage, babyImage, babyImage],
  },
];

const Memories = () => {
  return (
    <Container>
      <PageHeading title="Memories with your Child" />

      <Box display="flex" alignItems="center" mb={2}>
        <Select defaultValue="account1" variant="outlined" sx={{ mr: 2 }}>
          <MenuItem value="account1">Child Account 1</MenuItem>
          <MenuItem value="account2">Child Account 2</MenuItem>
        </Select>
      </Box>
      <Grid container spacing={2} mb={2}>
        {memories.map((memory, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="video"
                src={memory.video}
                alt={memory.title}
                controls
              />
              <CardContent>
                <Typography variant="subtitle1">{memory.title}</Typography>
                <Typography variant="subtitle2">{memory.date}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Search your photos and albums"
          variant="standard"
          size="small"
          sx={{
            flexGrow: 1,
            marginRight: 2,
            "& .MuiInput-underline:before": {
              borderBottom: "1px solid #ccc",
            },
            "& .MuiInput-underline:hover:before": {
              borderBottom: "1px solid #000096",
            },
            "& .MuiInput-underline:after": {
              borderBottom: "2px solid #000096",
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{
            marginLeft: 3,
            backgroundColor: "#9C33C1",
            "&:hover": { backgroundColor: "#6F0096" },
          }}
        >
          Upload Media
          <UploadIcon sx={{ marginLeft: 1 }} />
        </Button>
      </Box>
      {scenarios.map((scenario, index) => (
        <Box key={index} mb={4}>
          <Typography variant="h6" gutterBottom>
            {scenario.date} - {scenario.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {scenario.description}
          </Typography>
          <Grid container spacing={2}>
            {scenario.images.map((image, idx) => (
              <Grid item xs={6} md={3} key={idx}>
                <Card>
                  <CardMedia
                    component="img"
                    image={image}
                    alt={`Scenario ${index + 1} Image ${idx + 1}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography
            align="right"
            variant="body2"
            sx={{ mt: 1, color: "black" }}
          >
            See More
          </Typography>
        </Box>
      ))}
    </Container>
  );
};

export default Memories;
