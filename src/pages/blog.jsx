import React from "react";
import Navbar from "../components/navbar";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const blog = () => {
  return (
    <div className="w-screen h-screen bg-white">
      <div>
        <Navbar />
        <div className="md:mt-10 mt-5 md:ml-10 ml-3 text-3xl font-semibold flex items-center text-black">
          <MdOutlineArrowBackIosNew />
          <p className="ml-3 text-4xl"> Blogs</p>
        </div>
        <p className="md:mt-12 mt-8 ml-6 text-3xl font-semibold text-black">
          Recent Blogs
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

    </div>
    
  );
};

export default blog;
