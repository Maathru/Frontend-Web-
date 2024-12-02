import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Heading from "@/components/ui/heading";
import BlogHeading from "@/components/blogComponents/blogHeading";
import BlogProgress from "@/components/blogComponents/BlogProgress";
import { errorType, Toast } from "@/components/toast";
import BlogService from "@/service/blogService";

const accentColor = "bg-[#9c3cc1]";

const WriteBlog4 = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await BlogService.addBlog(formData);
      Toast(response, errorType.SUCCESS);
      navigate("/blogs");

      localStorage.removeItem("blog");
    } catch (error) {
      const data = error.response.data;
      if (data) {
        if (Array.isArray(data)) {
          const newErrors = {};
          data.map((msg) => {
            Toast(msg.message, errorType.ERROR);
            newErrors[msg.field] = msg.message;
          });

          console.log(newErrors);
        } else {
          console.log(data);
          Toast(data, errorType.ERROR);
        }
      }
    }
  };

  useEffect(() => {
    const fetchBlog = () => {
      const blog = JSON.parse(localStorage.getItem("blog"));

      if (blog) {
        setFormData({ ...formData, ...blog });
      } else {
        setFormData({ stage: 1 });
      }
    };
    return () => {
      fetchBlog();
    };
  }, []);

  return (
    <div className="content-container">
      <Heading />

      <BlogHeading />

      <div className="md:w-[90%] w-[95%] mx-auto md:mt-10 mt-6 md:p-10 px-4 py-10 bg-white dark:bg-neutral-900 rounded-xl shadow-md">
        <BlogProgress value1={100} value2={100} value3={100} />

        <div>
          <div className="md:mt-14 mt-10 md:ml-6 font-bold md:text-2xl text-xl">
            Posting the Blog
          </div>
          <div className="mt-2 md:ml-6 md:text-lg text-base font-medium text-[#6f6c90] dark:text-neutral-400">
            Confirm that you want to publish the article.
          </div>

          {/* print formData */}
          {/* <div className="mt-6 md:ml-6 md:text-lg text-base font-medium text-[#6f6c90] dark:text-neutral-400">
            {JSON.stringify(formData)}
          </div> */}

          <div className="md:w-[90%] mx-auto">
            <div className="flex justify-around">
              <Link to="/blogs/write/preview">
                <button
                  className={`${accentColor} px-8 md:px-16 py-3 mt-8 md:mt-12 mb-4 rounded-lg text-xl font-semibold hover:bg-neutral-100 text-white dark:hover:bg-neutral-900 hover:text-fuchsia-700 hover:ring-fuchsia-700 hover:ring-inset hover:ring-2`}
                >
                  Preview
                </button>
              </Link>
              <button
                className={`${accentColor} px-8 md:px-16 py-3 mt-8 md:mt-12 mb-4 rounded-lg text-xl font-semibold hover:bg-neutral-100 text-white dark:hover:bg-neutral-900 hover:text-fuchsia-700 hover:ring-fuchsia-700 hover:ring-inset hover:ring-2`}
                onClick={handleSubmit}
              >
                Post
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <Link to="/blogs/write/3">
              <button
                className={`${accentColor} px-8 md:px-16 py-3 mt-8 md:mt-12 mb-4 rounded-lg text-xl font-semibold hover:bg-neutral-100 text-white dark:hover:bg-neutral-900 hover:text-fuchsia-700 hover:ring-fuchsia-700 hover:ring-inset hover:ring-2`}
              >
                Previous
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog4;
