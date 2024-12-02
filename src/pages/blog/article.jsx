import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import ArticleImage from "../../assets/blog/article-image.png";
import BlogImage from "../../assets/blog/blog-image.png";
import DOMPurify from "dompurify";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import BlogService from "@/service/blogService";
import { errorType, Toast } from "@/components/toast";

const badgeStyle =
  "bg-fuchsia-200 dark:bg-fuchsia-300 hover:dark:bg-fuchsia-100 dark:text-neutral-800 md:text-xl text-sm font-normal px-4 py-1";
const cardColor = "bg-pink-100 dark:bg-[#251F28] hover:dark:bg-[#1D1A1F]";
const readMoreColor = "text-[#9c3cc1] dark:text-neutral-300";

const Article = () => {

  const { articleId } = useParams();
  const [Article, setArticle] = useState({});

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await BlogService.getArticle(articleId);
        setArticle(response);
      } catch (error) {
        const data = error.response?.data;
        Toast(data || "Failed to fetch article", errorType.ERROR);
      }
    };
    fetchArticle();
  }, [articleId]);

    
  return (
    <div className="">
      <Link to={"/blogs/"}>
        <div className="md:mt-10 mt-5 md:ml-10 ml-3 text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
          <MdOutlineArrowBackIosNew />
        </div>
      </Link>

      <div className="w-[90%] mx-auto">
        <div className="md:mt-5 mt-3 text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
          {Article.title}
        </div>
        <div className="text-2xl font-thin text-neutral-800 dark:text-neutral-100">
          {Article.category}
        </div>
        <img
          src={Article.image}
          alt="Article"
          className="w-full rounded-lg mt-2  max-h-[500px] object-cover"
        />

        <div className="mt-4 text-base text-neutral-600 dark:text-neutral-300">
        <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(Article.content),
                }}
              />
        </div>

        {Article.keywords && (        
        <div className="flex flex-wrap md:gap-4 gap-2 mt-6">
          {Article.keywords.map((keyword, index) => (
              <Badge key={index} variant="secondary" className={badgeStyle}>
                {keyword}
              </Badge>
          ))}
        </div>
        )}
      </div>

      <div className="ml-6 md:ml-14">
        <p className="md:mt-12 mt-8 text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
          Recent Blogs
        </p>

        <div className="mt-5 mb-16 flex flex-row gap-5 overflow-x-auto">
          <Card
            className={`${cardColor} flex flex-col justify-between md:min-w-[35%] min-w-[80%] p-0 `}
          >
            <CardHeader>
              <img
                src={BlogImage}
                alt="Blog Image"
                className="rounded-md mb-2"
              />
              <CardTitle>Understanding Prenatal Nutrition</CardTitle>
            </CardHeader>
            <CardFooter className={`text-sm flex justify-end ${readMoreColor}`}>
              <p>Read More</p>
            </CardFooter>
          </Card>

          <Card
            className={`${cardColor} flex flex-col justify-between md:min-w-[35%] min-w-[80%] p-0 `}
          >
            <CardHeader>
              <img
                src={BlogImage}
                alt="Blog Image"
                className="rounded-md mb-2"
              />
              <CardTitle>Understanding Prenatal Nutrition</CardTitle>
            </CardHeader>
            <CardFooter className={`text-sm flex justify-end ${readMoreColor}`}>
              <p>Read More</p>
            </CardFooter>
          </Card>

          <Card
            className={`${cardColor} flex flex-col justify-between md:min-w-[35%] min-w-[80%] p-0 `}
          >
            <CardHeader>
              <img
                src={BlogImage}
                alt="Blog Image"
                className="rounded-md mb-2"
              />
              <CardTitle>Understanding Prenatal Nutrition</CardTitle>
            </CardHeader>
            <CardFooter className={`text-sm flex justify-end ${readMoreColor}`}>
              <p>Read More</p>
            </CardFooter>
          </Card>

          <Card
            className={`${cardColor} flex flex-col justify-between md:min-w-[35%] min-w-[80%] p-0 `}
          >
            <CardHeader>
              <img
                src={BlogImage}
                alt="Blog Image"
                className="rounded-md mb-2"
              />
              <CardTitle>Understanding Prenatal Nutrition</CardTitle>
            </CardHeader>
            <CardFooter className={`text-sm flex justify-end ${readMoreColor}`}>
              <p>Read More</p>
            </CardFooter>
          </Card>
        </div>
      </div>

    </div>
  );
}

export default Article;
