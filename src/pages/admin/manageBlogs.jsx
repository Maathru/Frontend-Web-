import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogImage from "../../assets/blog/blog-image.png";
import RecentBlogImage1 from "../../assets/blog/recent-blog-image-1.png";
import RecentBlogImage2 from "../../assets/blog/recent-blog-image-2.png";
import Heading from "@/components/ui/heading";
import Search from "@/components/Search";
import { t } from "i18next";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import BlogService from "@/service/blogService";
import { errorType, Toast } from "@/components/toast";
import DOMPurify from "dompurify";

const cardColor =
  "bg-light-blogcard dark:bg-dark-primary hover:dark:bg-dark-blogcard";
const badgeColor =
  "bg-fuchsia-200 dark:bg-fuchsia-300 hover:dark:bg-fuchsia-100 dark:text-neutral-800";
const readMoreColor =
  "text-primary-purple dark:text-dark-primary font-semibold hover:text-primary-purple hover:dark:text-dark-primary";

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        m: 2,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <GridToolbarQuickFilter
        sx={{
          width: 400,
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: "none",
            },
          "& .MuiOutlinedInput-root:focus-within": {
            outline: "none",
            boxShadow: "none",
          },
        }}
      />
    </Box>
  );
}

const BlogCard = ({ blog, handleAccept }) => {
  return (
    <div className="flex justify-between my-2">
      <Card className={`${cardColor} flex items-center`}>
        <img
          src={blog.image}
          alt="Blog Image"
          className="rounded-md hidden md:block m-2 max-w-72 max-h-72 object-fit"
        />
        <div className="flex flex-col justify-between">
          <CardHeader>
            <img
              src={blog.image}
              alt="Blog Image"
              className="rounded-md mb-2 md:hidden w-[100%] max-h-48 object-cover"
            />
            <CardTitle>{blog.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
            />
          </CardContent>
          <CardFooter className="pb-0">
            <div className="flex flex-wrap gap-2">
              {blog.keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className={badgeColor}>
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardFooter>
          <CardFooter className={`text-sm flex justify-end ${readMoreColor}`}>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {blog.approvalStatus}
              </span>
              {blog.approvalStatus === "PENDING" && (
                <Button
                  onClick={() => handleAccept(blog.blogId)}
                  className="ml-2"
                >
                  Accept
                </Button>
              )}
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchPendingBlogs = async () => {
      try {
        const response = await BlogService.getPendingBlogs();
        console.log(response);
        setBlogs(response);
      } catch (error) {
        // console.log(error);
        if (error.response) {
          const data = error.response.data;
          console.log(data);
          Toast(data, errorType.ERROR);
        } else {
          Toast("An unexpected error occurred", errorType.ERROR);
        }
      }
    };

    return () => {
      fetchPendingBlogs();
    };
  }, []);

  const handleAccept = (id) => {
    setBlogs(
      blogs.map((blog) =>
        blog.blogId === id ? { ...blog, approvalStatus: "Approved" } : blog
      )
    );
  };

  return (
    <div className="content-container">
      <Heading title={"Manage Blogs"} />

      <Search placeholder={t("search")} />

      <div className="mt-12">
        {blogs.map((blog) => (
          <BlogCard key={blog.blogId} blog={blog} handleAccept={handleAccept} />
        ))}
        <Pagination />
      </div>
    </div>
  );
};

export default ManageBlogs;
