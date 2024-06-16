import React from "react";
import Navbar from "../components/navbar";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const blog = () => {
  return (
    <div className="w-screen h-screen bg-white">
        <div>
            <Navbar />
            <div className="mt-10 ml-10 text-4xl font-semibold flex items-center text-black">
                <MdOutlineArrowBackIosNew />
                <p className="ml-3 text-5xl"> Blogs</p>
            </div>
            <p className="mt-16 ml-6 text-3xl font-semibold text-black">Recent Blogs</p>
            
        </div>
    </div>
  );
};

export default blog;
