import { useContext, useEffect, useState } from "react";
import { List } from "@mui/material";
import Item from "@/components/ui/item";
import Pagination from "@/components/pagination";
import { Button } from "flowbite-react";
import SearchBar from "@mkyy/mui-search-bar";
import ForumService from "@/service/forumService";
import { errorType, Toast } from "@/components/toast";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { userData } from "@/context/userAuth";
import { useTitle } from "@/hooks/useTitle";

const Forum = () => {
  useTitle("Forum");
  const handleSearch = async (labelOptionValue) => {
    try {
      const response = await ForumService.searchQuestionsByKeyword(
        textFieldValue
      );
      setQuestions(response);
    } catch (error) {
      console.log(error.message);
      Toast(error.message, errorType.ERROR);

      const data = error.response.data;
      console.log(data);
      Toast(data, errorType.ERROR);
    }
  };

  const [textFieldValue, setTextFieldValue] = useState("");
  const [questions, setQuestions] = useState([]);
  const [pageSize, setPageSize] = useState(0);
  const [offset, setOffset] = useState(10);

  const navigate = useNavigate();

  const { userDetails } = useContext(userData);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await ForumService.getAllQuestionsWithPagination(
          pageSize,
          offset
        );
        setQuestions(response.content);
      } catch (error) {
        console.log(error.message);

        const data = error.response.data;
        console.log(data);
        Toast(data || "Error occurred", errorType.ERROR);
      }
    };

    fetchQuestions();
  }, []);

  const handleAsk = (e) => {
    if (userDetails) {
      navigate("/forum/ask");
    } else {
      Toast("Log in to ask question");
      navigate("/login");
    }
  };

  return (
    <div className="p-12 grid content-start min-h-screen">
      <div className="flex justify-between mb-8">
        <div className="flex text-3xl text-[#5B5B5B] font-semibold">
          <IoIosArrowBack
            size={45}
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="col ml-3">
            Discussion Forum
            <div className="text-xl text-[#5B5B5B] font-normal">
              Connect with the community and share your experiences
            </div>
          </div>
        </div>
        <Button
          className="bg-[#6F0096] h-10 min-w-max flexbox items-center"
          onClick={(e) => handleAsk(e)}
        >
          Ask a Question
        </Button>
      </div>
      <SearchBar
        value={textFieldValue}
        onChange={(newValue) => setTextFieldValue(newValue)}
        onSearch={handleSearch}
        width="80%"
        className="border-black"
      />
      <div>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {questions.map((question) => (
            <Item key={question.id} question={question} />
          ))}
        </List>
      </div>
      <Pagination />
    </div>
  );
};

export default Forum;
