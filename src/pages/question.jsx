import React, { useState } from 'react';
import { TextField, Typography, Chip, Paper, Input } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from 'flowbite-react';
import ReactQuill from 'react-quill';
import Footer from "../components/footer";
import 'react-quill/dist/quill.snow.css'; // import styles

function AskQuestion() {
  const [questionDetails, setQuestionDetails] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const keywords = [
    "Prenatal Care", "Pregnancy", "Pregnant Mother", "Nutrition", 
    "Health", "Parenting", "Maternal Health", "Baby Vaccinations"
  ];

  const handleDetailsChange = (value) => {
    setQuestionDetails(value);
  };

  const handleTitleChange = (value) => {
    console.log(value);
  }

  return (
    <>
      <div className="text-3xl text-[#5B5B5B] font-semibold text-center">
          Ask a Question
      </div>
      <Typography variant="subtitle1" className="text-center mb-8">
        Ask questions and get answers from our community of experts
      </Typography>
      <Paper className="p-6 h-full max-w-4xl mx-auto my-8 rounded-3xl shadow-md">
      <form noValidate autoComplete="off">
        <Typography variant="body1" className="mb-4">
            Question Title
          </Typography>
            <TextField
            value={questionTitle}
            onChange={handleTitleChange}
            variant="outlined"
            fullWidth
            className="mb-4 rounded-lg"
            />
        <div className="mb-4">
          <Typography variant="body1" className="mb-4">
            Question Details
          </Typography>
          <ReactQuill
            value={questionDetails}
            onChange={handleDetailsChange}
            className="bg-white rounded-lg shadow-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <FormGroup row>
            {keywords.map((keyword) => (
              <FormControlLabel
                key={keyword}
                control={<Checkbox />}
                label={keyword}
              />
            ))}
          </FormGroup>
        </div>
        <TextField
          label="Other Keywords"
          variant="outlined"
          fullWidth
          className="mb-4"
          InputLabelProps={{ className: 'text-gray-600' }}
        />
        <div className="text-center">
          <Button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Submit
          </Button>
        </div>
      </form>
    </Paper>
    <div>
        <Footer />
      </div>

    </>
  );
}

export default AskQuestion;
