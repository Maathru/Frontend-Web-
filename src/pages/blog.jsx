import React from "react";
import Pagination from "../components/pagination";
import Footer from "../components/footer";  
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import BlogImage from "../assets/blog/blog-image.png";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const blog = () => {
  return (
    <div className="bg-white">
      <div>
        <div className="md:mt-10 mt-5 md:ml-10 ml-3 text-3xl font-semibold flex items-center text-black">
          <MdOutlineArrowBackIosNew />
          <p className="ml-3 text-4xl"> Blogs</p>
        </div>
        <p className="md:mt-12 mt-8 ml-6 text-3xl font-semibold text-black">
          All Blogs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 md:mt-8 mt-4 mx-4">
        <Card className="bg-pink-50 flex flex-col justify-between">
          <CardHeader>
            <img src={BlogImage} alt="Blog Image" className="rounded-md mb-2" />
            <CardTitle>Understanding Prenatal Nutrition</CardTitle>
            <CardDescription>
              What to Eat for a Healthy Pregnancy
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p>
              Maintaining a balanced diet during pregnancy is crucial for the
              health of both the mother and the developing baby. In this post,
              we'll explore essential nutrients needed during pregnancy, healthy
              eating habits, and practical tips for managing common dietary
              challenges. Discover how to create a nutritious meal plan that
              supports a healthy pregnancy journey
            </p>
          </CardContent>
          <CardFooter className="pb-0">
            <div className="flex flex-wrap">
              <Badge variant="secondary" className="bg-fuchsia-200 m-1">
                Prenatal Nutrition
              </Badge>
              <Badge variant="secondary" className="bg-fuchsia-200 m-1">
                Meal Plan
              </Badge>
              <Badge variant="secondary" className="bg-fuchsia-200 m-1">
                Dietary Tips
              </Badge>
            </div>
          </CardFooter>
          <CardFooter className="text-sm flex justify-end text-[#9c3cc1]">
            <p>Read More</p>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Pagination />
      </div>
      
      <div>
        <Footer />
      </div>

    </div>
  );
};

export default blog;
