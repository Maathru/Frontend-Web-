import React from "react";
import Footer from "../components/footer";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import ArticleImage from "../assets/blog/article-image.png";
import BlogImage from "../assets/blog/blog-image.png";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const badgeColor =
  "bg-fuchsia-200 dark:bg-fuchsia-300 hover:dark:bg-fuchsia-100 dark:text-neutral-800 text-xl font-normal px-4 py-1 mt-6";
const cardColor = "bg-pink-100 dark:bg-[#251F28] hover:dark:bg-[#1D1A1F]";
const readMoreColor = "text-[#9c3cc1] dark:text-neutral-300";

const Article = () => {
  return (
    <div className="">
      <div className="md:mt-10 mt-5 md:ml-10 ml-3 text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
        <MdOutlineArrowBackIosNew />
      </div>

      <div className="w-[90%] mx-auto">
        <div className="md:mt-5 mt-3 text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
          Understanding Prenatal Nutrition:
        </div>
        <div className="text-2xl font-thin text-neutral-800 dark:text-neutral-100">
          (What to Eat for a Healthy Pregnancy)
        </div>
        <img
          src={ArticleImage}
          alt="Article"
          className="w-full rounded-lg mt-2"
        />

        <div className="mt-4 text-base text-neutral-600 dark:text-neutral-300">
          <p>
            Embarking on the journey of pregnancy is a beautiful and
            transformative experience. As an expectant mother, your body
            requires extra nutrients, vitamins, and minerals to support both
            your health and the development of your baby. This article aims to
            guide you through the essentials of prenatal nutrition, ensuring you
            and your baby receive the best possible nourishment during this
            crucial time.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
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
      </div>

      <div className="ml-6 md:ml-14">
        <p className="md:mt-12 mt-8 text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
          Recent Blogs
        </p>

        <div className="mt-5 mb-16 flex flex-row gap-5 overflow-x-auto">

          <Card className={`${cardColor} flex flex-col justify-between md:min-w-[35%] min-w-[80%] p-0 `}>
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

          <Card className={`${cardColor} flex flex-col justify-between md:min-w-[35%] min-w-[80%] p-0 `}>
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

          <Card className={`${cardColor} flex flex-col justify-between md:min-w-[35%] min-w-[80%] p-0 `}>
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

          <Card className={`${cardColor} flex flex-col justify-between md:min-w-[35%] min-w-[80%] p-0 `}>
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

      <Footer />
    </div>
  );
};

export default Article;
