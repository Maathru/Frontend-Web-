import { useEffect, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { List } from "@mui/material";
import Item from "@/components/ui/item";
import Pagination from "@/components/pagination";
import { Button } from "flowbite-react";
import SearchBar from "@mkyy/mui-search-bar";
import { NavLink } from "react-router-dom";
import ForumService from "@/service/forumService";
import { errorType, Toast } from "@/components/toast";
import { useTitle } from "@/hooks/useTitle";

const Forum = () => {
  useTitle("Forum");
  const handleSearch = (labelOptionValue) => {
    console.log(labelOptionValue);
  };

  const [textFieldValue, setTextFieldValue] = useState("");
  const [questions, setQuestions] = useState([]);
  const [pageSize, setPageSize] = useState(0);
  const [offset, setOffset] = useState(10);

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
        Toast(data, errorType.ERROR);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="p-12 grid content-start min-h-screen">
      <div className="flex justify-between mb-8">
        <div className="text-3xl text-[#5B5B5B] font-semibold">
          <HiChevronLeft className="text-5xl inline" />
          Discussion Forum
          <div className="text-xl text-[#5B5B5B] font-normal ml-12">
            Connect with the community and share your experiences
          </div>
        </div>
        <Button className="bg-[#6F0096] h-10 min-w-max flexbox items-center">
          <NavLink to="/forum/ask">Ask a Question</NavLink>
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
