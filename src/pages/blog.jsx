import React from "react";
import Pagination from "../components/pagination";
import Footer from "../components/footer";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { Button } from "@/components/ui/button";
import BlogImage from "../assets/blog/blog-image.png";
import RecentBlogImage1 from "../assets/blog/recent-blog-image-1.png";
import RecentBlogImage2 from "../assets/blog/recent-blog-image-2.png";

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
      </div>

      <p className="md:mt-12 mt-8 ml-6 text-3xl font-semibold text-black">
        Recent Blogs
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4 md:mt-8 mt-4 mx-4">
        <div className="row-span-2">
          <Card className="bg-pink-50 flex flex-col justify-between h-[100%]">
            <CardHeader>
              <img
                src={BlogImage}
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
                Maintaining a balanced diet during pregnancy is crucial for the
                health of both the mother and the developing baby. In this post,
                we'll explore essential nutrients needed during pregnancy,
                healthy eating habits, and practical tips for managing common
                dietary challenges. Discover how to create a nutritious meal
                plan that supports a healthy pregnancy journey
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

        <Card className="bg-pink-50 flex flex-row items-center row-span-1">
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
              {/* <CardDescription>
              Prenatal checkups are a vital part of ensuring the well-being of both mother and baby during pregnancy. 
              </CardDescription> */}
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Prenatal checkups are a vital part of ensuring the well-being of
                both mother and baby during pregnancy.
              </p>
            </CardContent>
            <CardFooter className="pb-0">
              <div className="flex flex-wrap">
                <Badge variant="secondary" className="bg-fuchsia-200 m-1">
                  Prenatal Visits
                </Badge>
                <Badge variant="secondary" className="bg-fuchsia-200 m-1">
                  Health
                </Badge>
              </div>
            </CardFooter>
            <CardFooter className="text-sm flex justify-end text-[#9c3cc1]">
              <p>Read More</p>
            </CardFooter>
          </div>
        </Card>

        <Card className="bg-pink-50 flex flex-row items-center row-span-1">
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
              {/* <CardDescription>
              Prenatal checkups are a vital part of ensuring the well-being of both mother and baby during pregnancy. 
              </CardDescription> */}
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
              <div className="flex flex-wrap">
                <Badge variant="secondary" className="bg-fuchsia-200 m-1">
                  Newborn
                </Badge>
                <Badge variant="secondary" className="bg-fuchsia-200 m-1">
                  Vaccination
                </Badge>
                <Badge variant="secondary" className="bg-fuchsia-200 m-1">
                  Health
                </Badge>
              </div>
            </CardFooter>
            <CardFooter className="text-sm flex justify-end text-[#9c3cc1]">
              <p>Read More</p>
            </CardFooter>
          </div>
        </Card>
      </div>

      <Card className="mt-8 md:mt:12 shadow-fuchsia-100 shadow-lg mx-4 md:mx-8">
        <CardHeader>
          <CardTitle className="font-semibold text-3xl ml-4">
            Time To Write A Blog
          </CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent className="flex justify-center">
          <p className="text-lg">
            Share your knowledge & insights with the community, Let's protect
            pregnant mothers & babies
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="bg-fuchsia-600 text-lg">
            <MdCreate className="mr-2 h-4 w-4" /> Let's Write A Blog Article
          </Button>
        </CardFooter>
      </Card>

      <p className="md:mt-10 mt-8 ml-6 text-3xl font-semibold text-black">
        All Blogs
      </p>

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
