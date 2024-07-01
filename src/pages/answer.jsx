import React from "react";
import Pagination from "../components/pagination";
import Footer from "../components/footer";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar } from "@mui/material";

const cardColor = "bg-pink-100 dark:bg-[#251F28] hover:dark:bg-[#1D1A1F]";
const badgeColor = "bg-fuchsia-200 dark:bg-fuchsia-300 hover:dark:bg-fuchsia-100 dark:text-neutral-800";
const readMoreColor = "text-[#9c3cc1] dark:text-neutral-300";

const Answer = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1">
        <div className="row-span-2">
          <div className={` flex flex-col justify-between h-[100%]`} variant="">
            <CardHeader>
              <CardTitle className="flex md:mt-10 mt-5 md:ml-10 ml-3 text-3xl font-semibold items-center text-neutral-800 dark:text-neutral-100">
                <MdOutlineArrowBackIosNew />
                <p className="ml-3 text-4xl"> Understanding Prenatal Nutrition</p>
                </CardTitle>
              <CardDescription className="md:mt-12 mt-8 ml-20 flex gap-9">
                <div>Asked On : 12th August 2021</div>
                <div>Answers : 3</div>
                <div>Viewed : 19 times</div>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm ml-20">
              <p>
              Prenatal care is a critical component of a healthy pregnancy, providing essential medical support and guidance to expectant mothers. Regular check-ups and prenatal screenings play pivotal roles in monitoring the health of both the mother and the developing baby. These visits allow healthcare providers to detect and manage conditions such as gestational diabetes and high blood pressure early on. Moreover, prenatal care offers invaluable opportunities for nutritional counseling, childbirth education, and preparing mothers for a smooth transition into motherhood, right?
              So, What specific benefits does prenatal care offer to expectant mothers and their babies during pregnancy?
              </p>
            
            <div className="pb-5 my-5">
              <div className="flex gap-2 justify-between items-center">
                    <Badge variant="secondary" className={badgeColor}>
                      Prenatal Nutrition
                    </Badge>
                    <Badge variant="secondary" className={badgeColor}>
                      Meal Plan
                    </Badge>
                    <Badge variant="secondary" className={badgeColor}>
                      Dietary Tips
                    </Badge>
                    <Link to="/forum/question" className="mx-auto">Edit the question</Link>
                    <div className="flex ml-auto items-center gap-1">
                      <Avatar alt="Remy Sharp" src="src\assets\nav\sample-profile.png" />
                      <div className="ml-auto items-center ">
                        <Link>User Name</Link>
                        <p className="text-sm text-gray-500">Modified on 12th August 2021</p>
                        </div>
                    </div>
                </div>
            </div>
            </CardContent>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 ml-20">
        <CardTitle className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
          Answers : 3
        </CardTitle>

        <div className="my-3">
          <CardContent>
            <div className="flex gap-3">
              <div className="items-center gap-2">
                <BiSolidLike size="3.5rem"/>
                <BiDislike size="3.5rem"/>
              </div>
            Regular prenatal visits also educate mothers about childbirth preparation, breastfeeding, and newborn care, enhancing their confidence and readiness for motherhood. These consultations provide opportunities to discuss any concerns or questions, fostering a supportive relationship between the mother-to-be and healthcare provider.
            </div>
          </CardContent>
          <CardFooter className="text-sm flex justify-end text-[#9c3cc1]">
            <Link>Edit</Link>
          </CardFooter>
        </div>

        <div className="my-3">
          <CardContent>
            <div className="flex gap-3">
              <div className="items-center gap-2">
                <BiSolidLike size="3.5rem"/>
                <BiDislike size="3.5rem"/>
              </div>
            Regular prenatal visits also educate mothers about childbirth preparation, breastfeeding, and newborn care, enhancing their confidence and readiness for motherhood. These consultations provide opportunities to discuss any concerns or questions, fostering a supportive relationship between the mother-to-be and healthcare provider.
            </div>
          </CardContent>
          <CardFooter className="text-sm flex justify-end text-[#9c3cc1]">
            <Link>Edit</Link>
          </CardFooter>
        </div>

      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Answer;
