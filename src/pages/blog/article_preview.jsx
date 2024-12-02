import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import DOMPurify from "dompurify";
import BlogService from "@/service/blogService";
import { errorType, Toast } from "@/components/toast";

const accentColor = "bg-[#9c3cc1]";

const badgeStyle =
  "bg-fuchsia-200 dark:bg-fuchsia-300 hover:dark:bg-fuchsia-100 dark:text-neutral-800 md:text-xl text-sm font-normal px-4 py-1";
const cardColor = "bg-pink-100 dark:bg-[#251F28] hover:dark:bg-[#1D1A1F]";
const readMoreColor = "text-[#9c3cc1] dark:text-neutral-300";

const ArticlePreview = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        image: "",
        content: "",
        keywords: [],
    });

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

    useState(() => {
        const fetchBlog = () => {
            const blog = JSON.parse(localStorage.getItem("blog"));

            if (blog) {
            setFormData({ ...formData, ...blog });
            }
        };

        fetchBlog();
    }, []);

    
  return (
    <div className="">
      <Link to={"/blogs/write/4"}>
        <div className="md:mt-10 mt-5 md:ml-10 ml-3 text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
          <MdOutlineArrowBackIosNew />
        </div>
      </Link>

      <div className="w-[90%] mx-auto">
        <div className="md:mt-5 mt-3 text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
          {formData.title}
        </div>
        <div className="text-2xl font-thin text-neutral-800 dark:text-neutral-100">
          {formData.category}
        </div>
        <img
          src={formData.image}
          alt="Article Image"
          className="w-full rounded-lg mt-2 max-h-[500px] object-cover"
        />

        <div className="mt-4 text-base text-neutral-600 dark:text-neutral-300">
        <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(formData.content),
                }}
              />
        </div>

        {formData.keywords && (        
        <div className="flex flex-wrap md:gap-4 gap-2 mt-6 mb-2">
          {formData.keywords.map((keyword, index) => (
              <Badge key={index} variant="secondary" className={badgeStyle}>
                {keyword}
              </Badge>
          ))}
        </div>
        )}
      </div>

      <div className="md:w-[90%] mx-auto mb-3">
        <div className="flex justify-center">
            <button
            className={`${accentColor} px-8 md:px-16 py-3 mt-8 md:mt-12 mb-4 rounded-lg text-xl font-semibold hover:bg-neutral-100 text-white dark:hover:bg-neutral-900 hover:text-fuchsia-700 hover:ring-fuchsia-700 hover:ring-inset hover:ring-2`}
            onClick={handleSubmit}
            >
            Post
            </button>
        </div>
    </div>

    </div>
  );
}

export default ArticlePreview;
