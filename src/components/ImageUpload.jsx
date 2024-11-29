import { useState } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Button,
  Container,
  Typography,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import ImageService from "@/service/ImageService";

import { useState, useEffect } from "react";

const ImageUploader = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrorMessage('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }
      
      // Validate file size (e.g., 5MB limit)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrorMessage('File size should not exceed 5MB');
        return;
      }

      const imageData = new FormData();
      imageData.append("imageFile", file);
      setImageData(imageData);
      setImagePreview(URL.createObjectURL(file));
      setErrorMessage("");
    }
  };

  const uploadImage = async () => {
    if (!imageData) {
      setErrorMessage("Please select an image before uploading.");
      return;
    }

    try {
      setUploading(true);
      setErrorMessage("");
      const response = await ImageService.upload(imageData);
      setUploading(false);
      setUploadSuccess(true);
      console.log(response.data);
    } catch (error) {
      setUploading(false);
      setErrorMessage(
        error.response?.data?.message || "Failed to upload the image."
      );
    }
  };

  return (
    <Container
      maxWidth="sm"
      className="p-6 flex justify-center items-center flex-col"
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} className="mb-6">
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                image={
                  imagePreview ||
                  "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
                }
                className="h-60 w-60 object-cover mb-4"
              />
            </CardActionArea>
          </Card>
        </Grid>

        <input
          accept="image/*"
          className="hidden"
          id="upload-image"
          type="file"
          onChange={handleUploadClick}
        />
        <label htmlFor="upload-image">
          <Button
            variant="contained"
            color="primary"
            className="m-2"
            component="span"
          >
            Select Image
          </Button>
        </label>

        <Button
          variant="contained"
          color="secondary"
          className="m-2"
          onClick={uploadImage}
          disabled={uploading}
        >
          {uploading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Upload"
          )}
        </Button>

        {uploadSuccess && (
          <Typography className="m-4 text-center" color="primary">
            Image uploaded successfully!
          </Typography>
        )}

        {errorMessage && (
          <Typography className="m-4 text-center" color="error">
            {errorMessage}
          </Typography>
        )}
      </Grid>

      <Snackbar
        open={uploadSuccess}
        autoHideDuration={3000}
        onClose={() => setUploadSuccess(false)}
        message="Image uploaded successfully!"
      />
    </Container>
  );
};

export default ImageUploader;
