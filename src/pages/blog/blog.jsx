import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { errorType, Toast } from "@/components/toast";
import { userData } from "@/context/userAuth";
import BlogImage from "../../assets/blog/blog-image.png";
import ArticleImage from "../../assets/blog/article-image.png";
import RecentBlogImage1 from "../../assets/blog/recent-blog-image-1.png";
import RecentBlogImage2 from "../../assets/blog/recent-blog-image-2.png";
import BlogService from "../../service/blogService";
import DOMPurify from "dompurify";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTitle } from "@/hooks/useTitle";
import Heading from "@/components/ui/heading";

const cardColor =
  "bg-light-blogcard dark:bg-dark-card hover:dark:bg-dark-blogcard";
const badgeColor =
  "bg-fuchsia-200 dark:bg-fuchsia-300 hover:dark:bg-fuchsia-100 dark:text-neutral-800";
const readMoreColor =
  "text-primary-purple dark:text-dark-primary font-semibold hover:text-primary-purple hover:dark:text-dark-primary";

const blog = () => {
  useTitle("Blogs");

  const [blogs, setBlogs] = useState([]);
  const {userDetails} = useContext(userData);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await BlogService.getApprovedBlogs();
        console.log(response);
        setBlogs(response);
      } catch (error) {
        // console.log(error);
        if (error.response) {
          const data = error.response.data;
          // console.log(data);
          // Toast(data, errorType.ERROR);
        } else {
          Toast("An unexpected error occurred", errorType.ERROR);
        }
      }
    };

    return () => {
      fetchBlogs();
    };
  }, []);

  return (
    <div className="content-container">
      <Heading title={"Blogs"} />

      <p className="md:mt-12 mt-8 ml-6 text-2xl text-neutral-800 dark:text-neutral-100">
        Recent Blogs
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 gap-4 md:mt-8 mt-4 mx-4">
        <div className="row-span-2">
          <Link to="/blogs/article/recent/1">
            <Card
              className={`${cardColor} flex flex-col justify-between h-[100%]`}
            >
              <CardHeader>
                <img
                  src={ArticleImage}
                  alt="Blog Image"
                  className="rounded-md mb-2"
                />
                <CardTitle>Understanding Prenatal Nutrition</CardTitle>
                <CardDescription>
                  What to Eat for a Healthy Pregnancy
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  Maintaining a balanced diet during pregnancy is crucial for
                  the health of both the mother and the developing baby. In this
                  post, we'll explore essential nutrients needed during
                  pregnancy, healthy eating habits, and practical tips for
                  managing common dietary challenges. Discover how to create a
                  nutritious meal plan that supports a healthy pregnancy journey
                </p>
              </CardContent>
              <CardFooter className="pb-0">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className={badgeColor}>
                    Prenatal Nutrition
                  </Badge>
                  <Badge variant="secondary" className={badgeColor}>
                    Meal Plan
                  </Badge>
                  <Badge variant="secondary" className={badgeColor}>
                    Dietary Tips
                  </Badge>
                </div>
              </CardFooter>
              <CardFooter
                className={`text-sm flex justify-end ${readMoreColor}`}
              >
                <p>Read More</p>
              </CardFooter>
            </Card>
          </Link>
        </div>

        <Link to="/blogs/article/recent/2">
          <Card className={`${cardColor} flex flex-row items-center row-span-1`}>
            <img
              src={RecentBlogImage1}
              alt="Blog Image"
              className="rounded-md hidden md:block m-2 max-w-72 max-h-72 object-fit"
            />
            <div className="flex flex-col justify-between">
              <CardHeader>
                <img
                  src={RecentBlogImage1}
                  alt="Blog Image"
                  className="rounded-md mb-2 md:hidden w-[100%] max-h-48 object-cover"
                />
                <CardTitle>The Importance of Regular Prenatal Checkups</CardTitle>
                <CardDescription>
                    Maternal Clinics
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  Prenatal checkups are a vital part of ensuring the well-being of
                  both mother and baby during pregnancy.
                </p>
              </CardContent>
              <CardFooter className="pb-0">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className={badgeColor}>
                    Prenatal Visits
                  </Badge>
                  <Badge variant="secondary" className={badgeColor}>
                    Health
                  </Badge>
                </div>
              </CardFooter>
              <CardFooter className={`text-sm flex justify-end ${readMoreColor}`}>
                <p>Read More</p>
              </CardFooter>
            </div>
          </Card>
        </Link>

        <Link to="/blogs/article/recent/3">
          <Card className={`${cardColor} flex flex-row items-center row-span-1`}>
            <img
              src={RecentBlogImage2}
              alt="Blog Image"
              className="rounded-md hidden md:block m-2 max-w-72 max-h-72 object-fit"
            />
            <div className="flex flex-col justify-between">
              <CardHeader>
                <img
                  src={RecentBlogImage2}
                  alt="Blog Image"
                  className="rounded-md mb-2 md:hidden w-[100%] max-h-48 object-cover"
                />
                <CardTitle>Vaccination Guide for Newborns and Infants</CardTitle>
                <CardDescription>
                  Infant Health
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  Vaccinating newborns is crucial. Their developing immune systems
                  leave them vulnerable to serious diseases. Vaccines safely train
                  their bodies to fight these illnesses, protecting them from
                  harm.
                </p>
              </CardContent>
              <CardFooter className="pb-0">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className={badgeColor}>
                    Newborn
                  </Badge>
                  <Badge variant="secondary" className={badgeColor}>
                    Vaccination
                  </Badge>
                  <Badge variant="secondary" className={badgeColor}>
                    Health
                  </Badge>
                </div>
              </CardFooter>
              <CardFooter className={`text-sm flex justify-end ${readMoreColor}`}>
                <p>Read More</p>
              </CardFooter>
            </div>
          </Card>
        </Link>
      </div>

      {userDetails.authenticated ? (
      <Card className="mt-8 md:mt:12 shadow-sm shadow-gray-100 dark:shadow-gray-900 mx-1 md:mx-8">
        <CardHeader>
          <CardTitle className="font-semibold text-3xl ml-4">
            Time to Write a Blog
          </CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent className="flex justify-center">
          <p className="text-lg">
            Share your knowledge & insights with the community. Let's protect
            pregnant mothers & babies.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to={"/blogs/write/1"}>
            <Button className="bg-primary-purple dark:bg-dark-primary text-lg hover:bg-neutral-100 hover:text-primary-purple duration-200">
              <MdCreate className="mr-2 h-4 w-4" /> Let's Write A Blog Article
            </Button>
          </Link>
        </CardFooter>
      </Card>
      ) : (
        <Card className="mt-8 md:mt:12 shadow-sm shadow-gray-100 dark:shadow-gray-900 mx-1 md:mx-8">
          {/* <CardHeader>
            <CardTitle className="font-semibold text-3xl ml-4">
              Login to Write a Blog Article
            </CardTitle>
          </CardHeader> */}
          <CardContent className="flex justify-center mt-4">
            <p className="text-lg">
              Share your knowledge & insights with the community. Let's protect
              pregnant mothers & babies.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/login">
              <Button className="bg-primary-purple dark:bg-dark-primary text-lg hover:bg-neutral-100 hover:text-primary-purple duration-200">
                Login to Write A Blog Article
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}

      <p className="md:mt-10 mt-8 ml-6 text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
        Recent Blogs
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4 md:mt-8 mt-4 mx-4">
        {blogs.map((blog) => (
          
          <Link to={`/blogs/article/${blog.blogId}`} key={blog.blogId}>
          <Card
            className={`${cardColor} flex flex-col justify-between`}
            key={blog.blogId}
          >
            <CardHeader>
              <img
                src={blog.image}
                // alt="Blog Image"
                className="rounded-md mb-2"
              />
              <CardTitle>{blog.title}</CardTitle>
              <CardDescription>{blog.category}</CardDescription>
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
              <p>Read More</p>
            </CardFooter>
          </Card>
          </Link>
        ))}
      </div>

      {/* <div>
        <Pagination />
      </div> */}
    </div>
  );
};

export default blog;
