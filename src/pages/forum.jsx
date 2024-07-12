import React, { useEffect, useState } from 'react';
import {
  HiChevronLeft,
  HiOutlinePencilAlt,
  HiOutlinePlusSm,
  HiOutlineTrash,
} from "react-icons/hi";
import { List } from '@mui/material';
import Item from '@/components/ui/item';
import Pagination from "@/components/pagination";
import Footer from "@/components/footer";
import { Button } from "flowbite-react";
import SearchBar from '@mkyy/mui-search-bar';
import { NavLink } from 'react-router-dom';

import axios from 'axios';

const Forum = () => {
  const handleSearch = (labelOptionValue) => {
    console.log(labelOptionValue);
  };

  const [textFieldValue, setTextFieldValue] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:8080/api/v1';
    axios.get(url + '/question')
      .then((response) => {
        console.log(response.data);
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="p-12 grid content-start">
      <div className="flex justify-between mb-8">
        <div className="text-3xl text-[#5B5B5B] font-semibold">
          <HiChevronLeft className="text-5xl inline" />
          Discussion Forum
          <div className="text-xl text-[#5B5B5B] font-normal ml-12">
            Connect with the community and share your experiences
          </div>
        </div>
        <Button className="bg-[#6F0096] h-10 min-w-max flexbox items-center">
          <NavLink to="/forum/askquestion">
            Ask a Question
          </NavLink>
        </Button>
      </div>
      <SearchBar
        value={textFieldValue}
        onChange={newValue => setTextFieldValue(newValue)}
        onSearch={handleSearch}
        width="80%"
        className="border-black"
      />
      <div>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {questions.map((question) => (
            <Item key={question.id} question={question} />
          ))}
        </List>
      </div>
      <Pagination />
      <Footer />
    </div>
  );
};

export default Forum;
