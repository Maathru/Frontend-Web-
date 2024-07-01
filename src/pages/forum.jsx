import React, { useState } from 'react';
import {
    HiChevronLeft,
    HiOutlinePencilAlt,
    HiOutlinePlusSm,
    HiOutlineTrash,
} from "react-icons/hi";
import {List } from '@mui/material';
import Item from '@/components/ui/item';
import Pagination from "../components/pagination";
import Footer from "../components/footer";
import { Button } from "flowbite-react";
import SearchBar from '@mkyy/mui-search-bar';
import { NavLink } from 'react-router-dom';

const Forum = () => {
  const handleSearch = labelOptionValue => {
    //...
    console.log(labelOptionValue);
  };

  const [textFieldValue, setTextFieldValue] = useState('');

  return (
    <div className="p-12 grid content-start">
      
        <div className="flex justify-between mb-8">
        <div className="text-3xl text-[#5B5B5B] font-semibold ">
          <HiChevronLeft className="text-5xl inline" />
          Discussion Forum
          <div className="text-xl text-[#5B5B5B] font-normal ml-12">
            Connect with the community and share your experiences
          </div>
        </div>

        <Button className="bg-[#6F0096] h-10 min-w-max flexbox items-center" >
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

      <div className="">
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Item />
          <Item />
          <Item />
        </List>
      </div>

      <div>
        <Pagination />
      </div>

      <div>
        <Footer />
      </div>

    </div>
  )
}

export default Forum;