import React, { useState } from 'react';
import { TextField, Typography, Paper} from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from 'flowbite-react';
import ReactQuill from 'react-quill';
import Footer from "../components/footer";
import 'react-quill/dist/quill.snow.css'; 
import { Card } from '@/components/ui/card';

import axios from "axios";

function AskQuestion() {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [customKeywords, setCustomKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');
  const keywords = [
    "Prenatal Care", "Pregnancy", "Pregnant Mother", "Nutrition", 
    "Health", "Parenting", "Maternal Health", "Baby Vaccinations"
  ];

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleKeywordChange = (keyword) => {
    setSelectedKeywords(prevSelectedKeywords => 
      prevSelectedKeywords.includes(keyword)
        ? prevSelectedKeywords.filter(k => k !== keyword)
        : [...prevSelectedKeywords, keyword]
    );
  }

  const handleNewKeywordChange = (e) => {
    setNewKeyword(e.target.value);
  }

  const handleAddKeyword = () => {
    if (newKeyword && !customKeywords.includes(newKeyword) && !keywords.includes(newKeyword)) {
      setCustomKeywords(prevCustomKeywords => [...prevCustomKeywords, newKeyword]);
      setSelectedKeywords(prevSelectedKeywords => [...prevSelectedKeywords, newKeyword]);
      setNewKeyword('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = process.env.BACKEND_API_URL;
    const data = {
      title,
      description,
      keywords: selectedKeywords,
      author: 1
    };

    axios.post(url + '/question', data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div className="text-3xl text-[#5B5B5B] font-semibold text-center">
        Ask a Question
      </div>
      <Typography variant="subtitle1" className="text-center mb-8">
        Ask questions and get answers from our community of experts
      </Typography>
      <Card className="p-6 h-full max-w-4xl mx-auto my-8 rounded-3xl shadow-md">
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Typography variant="body1" className="mb-4">
            Question Title
          </Typography>
          <TextField
            value={title}
            onChange={handleTitleChange}
            variant="outlined"
            fullWidth
            className="mb-4 rounded-lg"
          />
          <div className="mb-4 my-5">
            <Typography variant="body1" className="mb-4">
              Question Details
            </Typography>
            <ReactQuill
              value={description}
              onChange={setDescription}
              className="bg-white rounded-lg shadow-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <FormGroup row>
              {keywords.map((keyword) => (
                <FormControlLabel
                  key={keyword}
                  control={
                    <Checkbox 
                      checked={selectedKeywords.includes(keyword)}
                      onChange={() => handleKeywordChange(keyword)}
                    />
                  }
                  label={keyword}
                />
              ))}
              {customKeywords.map((keyword) => (
                <FormControlLabel
                  key={keyword}
                  control={
                    <Checkbox 
                      checked={selectedKeywords.includes(keyword)}
                      onChange={() => handleKeywordChange(keyword)}
                    />
                  }
                  label={keyword}
                />
              ))}
            </FormGroup>
          </div>
          <div className="flex items-center mb-4 gap-3">
            <TextField
              label="Add New Keyword"
              variant="outlined"
              fullWidth
              value={newKeyword}
              onChange={handleNewKeywordChange}
              className="mr-2"
              InputLabelProps={{ className: 'text-gray-600' }}
            />
            <Button onClick={handleAddKeyword} className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Add
            </Button>
          </div>
          <div className="text-center mt-5">
            <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Submit
            </Button>
          </div>
        </form>
      </Card>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default AskQuestion;
