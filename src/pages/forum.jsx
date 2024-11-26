import { useContext, useEffect, useState } from "react";
import { List } from "@mui/material";
import Item from "@/components/ui/item";
import Pagination from "@/components/pagination-dynamic";
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

  const [textFieldValue, setTextFieldValue] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();
  const { userDetails } = useContext(userData);

  const fetchQuestions = async (page) => {
    try {
      const offset = (page - 1) * pageSize;
      const response = await ForumService.getAllQuestionsWithPagination(offset, pageSize);
      setQuestions(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error.message);
      Toast(error.response?.data || "Error occurred", errorType.ERROR);
    }
  };

  useEffect(() => {
    fetchQuestions(currentPage);
  }, [currentPage]);

  const handleAsk = () => {
    if (userDetails.authenticated) {
      navigate("/forum/ask");
    } else {
      Toast("You need to login to ask a question", errorType.ERROR);
      navigate("/login");
    }
  };

  const handleSearch = async () => {
    try {
      const response = await ForumService.searchQuestionsByKeyword(textFieldValue);
      setQuestions(response);
    } catch (error) {
      console.log(error.message);
      Toast(error.response?.data || "Error occurred", errorType.ERROR);
    }
  };

  return (
    <div className="p-12 grid content-start content-container">
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
          onClick={handleAsk}
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
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Forum;

