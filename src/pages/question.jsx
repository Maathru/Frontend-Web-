import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card } from "@/components/ui/card";
import { errorType, Toast } from "@/components/toast";
import ForumService from "@/service/forumService";
import { useNavigate } from "react-router-dom";

function AskQuestion() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [customKeywords, setCustomKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState("");
  const navigate = useNavigate();
  const keywords = [
    "Prenatal Care",
    "Pregnancy",
    "Pregnant Mother",
    "Nutrition",
    "Health",
    "Parenting",
    "Maternal Health",
    "Baby Vaccinations",
  ];

  const handleKeywordChange = (keyword) => {
    setSelectedKeywords((prevSelectedKeywords) =>
      prevSelectedKeywords.includes(keyword)
        ? prevSelectedKeywords.filter((k) => k !== keyword)
        : [...prevSelectedKeywords, keyword]
    );
  };

  const handleAddKeyword = () => {
    if (
      newKeyword &&
      !customKeywords.includes(newKeyword) &&
      !keywords.includes(newKeyword)
    ) {
      setCustomKeywords((prevCustomKeywords) => [
        ...prevCustomKeywords,
        newKeyword,
      ]);
      setSelectedKeywords((prevSelectedKeywords) => [
        ...prevSelectedKeywords,
        newKeyword,
      ]);
      setNewKeyword("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      keywords: selectedKeywords,
    };

    try {
      const response = await ForumService.addQuestion(data);
      Toast(response, errorType.SUCCESS);
      navigate("/forum");
    } catch (error) {
      console.log(error.message);

      const data = error.response.data;
      console.log(data);
      Toast(data || "Error occurred", errorType.ERROR);
    }
  };

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
            onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setNewKeyword(e.target.value)}
              className="mr-2"
              InputLabelProps={{ className: "text-gray-600" }}
            />
            <Button
              onClick={handleAddKeyword}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Add
            </Button>
          </div>
          <div className="text-center mt-5">
            <Button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Submit
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default AskQuestion;
