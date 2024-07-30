import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Button } from "flowbite-react";
import Heading from "@/components/ui/heading";
import BlogHeading from "@/components/blogComponents/blogHeading";
import BlogProgress from "@/components/blogComponents/BlogProgress";
import { set } from "date-fns";

const accentColor = "bg-[#9c3cc1]";

function WriteBlog3() {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [customKeywords, setCustomKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState("");

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    keywords: [],
    additionalNotes: "",
  });

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
  
  useEffect(() => {
    // Retrieve keywords from the 'blog' key in local storage
    const storedBlog = JSON.parse(localStorage.getItem('blog')) || {};
    const storedKeywords = storedBlog.keywords || [];
    setSelectedKeywords(storedKeywords);
    setFormData((prevFormData) => ({
      ...prevFormData,
      keywords: storedKeywords,
    }));

    // Set custom keywords that are not in predefined keywords
    const customKeywordsFromStorage = storedKeywords.filter(
      (keyword) => !keywords.includes(keyword)
    );
    setCustomKeywords(customKeywordsFromStorage);
  }, []);

  const handleKeywordChange = (keyword) => {
    setSelectedKeywords((prevSelectedKeywords) => {
      const newSelectedKeywords = prevSelectedKeywords.includes(keyword)
        ? prevSelectedKeywords.filter((k) => k !== keyword)
        : [...prevSelectedKeywords, keyword];

      // Update the formData with the new keywords array
      setFormData((prevFormData) => ({
        ...prevFormData,
        keywords: newSelectedKeywords,
      }));

      // Update local storage
      const updatedBlog = {
        ...JSON.parse(localStorage.getItem('blog') || '{}'),
        keywords: newSelectedKeywords,
      };
      localStorage.setItem('blog', JSON.stringify(updatedBlog));

      return newSelectedKeywords;
    });
  };

  const handleAddKeyword = () => {
    if (
      newKeyword &&
      !customKeywords.includes(newKeyword) &&
      !selectedKeywords.includes(newKeyword)
    ) {
      setCustomKeywords((prevCustomKeywords) => [
        ...prevCustomKeywords,
        newKeyword,
      ]);
      setSelectedKeywords((prevSelectedKeywords) => [
        ...prevSelectedKeywords,
        newKeyword,
      ]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        keywords: [...prevFormData.keywords, newKeyword],
      }));
      
      // Update local storage
      const updatedBlog = {
        ...JSON.parse(localStorage.getItem('blog') || '{}'),
        keywords: [...selectedKeywords, newKeyword],
      };
      localStorage.setItem('blog', JSON.stringify(updatedBlog));

      setNewKeyword('');
    }
  };

  const setData = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleNext = () => {
    formData.stage = Math.max(formData.stage, 4);
    localStorage.setItem("blog", JSON.stringify(formData));
    navigate("/blogs/write/4");
  };

  const handlePrevious = () => {
    formData.stage = Math.max(formData.stage, 2);
    localStorage.setItem("blog", JSON.stringify(formData));
    navigate("/blogs/write/2");
  };

  useState(() => {
    const fetchBlog = () => {
      const blog = JSON.parse(localStorage.getItem("blog"));

      if (blog) {
        setFormData({ ...formData, ...blog });
      } else {
        setFormData({ stage: 1 });
      }
    };

    fetchBlog();
  }, []);

  // console.log(formData);

  return (
    <div className="content-container">
      <Heading />

      <BlogHeading />

      <div className="md:w-[90%] w-[95%] mx-auto md:mt-10 mt-6 md:p-10 px-4 py-10 bg-white dark:bg-neutral-900 rounded-xl shadow-md">
        <BlogProgress value1={100} value2={100} value3={50} />

        <div>
          <div className="md:mt-14 mt-10 md:ml-6 font-bold md:text-2xl text-xl">
            Finalizing the Blog
          </div>

          <div className="md:w-[90%] mx-auto">
            <div className="md:mt-12 mt-8 mb-4 md:text-lg text-base font-medium text-black dark:text-neutral-300">
              Key Words
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
                        sx={{
                          color: "#9c3cc1",
                          "&.Mui-checked": { color: "#9c3cc1" },
                        }}
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
                        sx={{
                          color: "#9c3cc1",
                          "&.Mui-checked": { color: "#9c3cc1" },
                        }}
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "9999px",
                    "&.Mui-focused fieldset": {
                      borderColor: "#9c3cc1",
                    },
                  },
                  "& label.Mui-focused": {
                    color: "#9c3cc1",
                  },
                }}
              />

              <Button
                onClick={handleAddKeyword}
                className={`${accentColor} text-white text-lg px-4 py-2 rounded-full`}
              >
                Add
              </Button>
            </div>

            <div className="md:mt-12 mt-8 md:text-lg text-base font-medium text-black dark:text-neutral-300">
              Additional Notes
            </div>
            <input
              type="text"
              className="w-full md:h-12 h-10 mt-4 px-3 py-2 border-2 border-[#e0e0e0] rounded-full text-lg focus:outline-none focus:border-[#9c3cc1] dark:bg-neutral-800"
              placeholder="Additional Notes for Reviewer"
              value={formData.additionalNotes || ""}
              onChange={(e) => setData("additionalNotes", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="md:w-[90%] w-[95%] mx-auto flex justify-between">
        <button
          className={`${accentColor} px-8 md:px-16 py-3 mt-8 md:mt-12 mb-4 rounded-lg text-xl font-semibold hover:bg-neutral-100 text-white dark:hover:bg-neutral-900 hover:text-fuchsia-700 hover:ring-fuchsia-700 hover:ring-inset hover:ring-2`}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className={`${accentColor} px-8 md:px-16 py-3 mt-8 md:mt-12 mb-4 rounded-lg text-xl font-semibold hover:bg-neutral-100 text-white dark:hover:bg-neutral-900 hover:text-fuchsia-700 hover:ring-fuchsia-700 hover:ring-inset hover:ring-2`}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default WriteBlog3;
