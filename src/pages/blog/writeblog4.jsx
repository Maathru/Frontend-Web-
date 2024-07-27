import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { IoImageOutline } from "react-icons/io5";

const accentColor = "bg-[#9c3cc1]";

const WriteBlog4 = () => {
  return (
    <div className="">
      <div className="md:mt-10 mt-5 md:ml-10 ml-3 text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
        <Link to="/blogs/write/3">
          <MdOutlineArrowBackIosNew />
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="md:mt-5 mt-3 md:text-4xl text-3xl font-bold text-neutral-800 dark:text-neutral-100">
          Write a Blog Article
        </div>
      </div>

      <div className="flex justify-center">
        <div className="md:mt-3 mt-2 md:text-2xl text-lg font-medium text-[#6f6c90] dark:text-neutral-400">
          Please fill the form below to post the blog article.
        </div>
      </div>

      <div className="md:w-[90%] w-[95%] mx-auto md:mt-10 mt-6 md:p-10 px-4 py-10 bg-white dark:bg-neutral-900 rounded-xl shadow-md">
        <div className="md:w-[70%] w-[80%} flex gap-3 place-items-center mx-auto mb-10">
          <div
            className={`${accentColor} rounded-full md:min-h-10 md:min-w-10 min-h-7 min-w-7 text-white md:text-2xl text-lg flex justify-center items-center`}
          >
            1
          </div>

          <Progress value={100} />

          <div
            className={`${accentColor} rounded-full md:min-h-10 md:min-w-10 min-h-7 min-w-7 text-white md:text-2xl text-lg flex justify-center items-center`}
          >
            2
          </div>

          <Progress value={100} />

          <div
            className={`${accentColor} rounded-full md:min-h-10 md:min-w-10 min-h-7 min-w-7 text-white md:text-2xl text-lg flex justify-center items-center`}
          >
            3
          </div>

          <Progress value={100} />

          <div
            className={`${accentColor} rounded-full md:min-h-10 md:min-w-10 min-h-7 min-w-7 text-white md:text-2xl text-lg flex justify-center items-center`}
          >
            4
          </div>
        </div>

        <hr className="w-[90%] mx-auto mt-5 border-2"></hr>

        <div>
          <div className="md:mt-14 mt-10 md:ml-6 font-bold md:text-2xl text-xl">
            Posting the Blog
          </div>
          <div className="mt-2 md:ml-6 md:text-lg text-base font-medium text-[#6f6c90] dark:text-neutral-400">
            Confirm that you want to publish the article.
          </div>

          <div className="md:w-[90%] mx-auto">
            <div className="flex justify-around">
              <Link to="#">
                <button
                  className={`${accentColor} px-8 md:px-16 py-3 mt-8 md:mt-12 mb-4 rounded-lg text-xl font-semibold hover:bg-neutral-100 text-white dark:hover:bg-neutral-900 hover:text-fuchsia-700 hover:ring-fuchsia-700 hover:ring-inset hover:ring-2`}
                >
                  Preview
                </button>
              </Link>
              <Link to="/blogs">
                <button
                  className={`${accentColor} px-8 md:px-16 py-3 mt-8 md:mt-12 mb-4 rounded-lg text-xl font-semibold hover:bg-neutral-100 text-white dark:hover:bg-neutral-900 hover:text-fuchsia-700 hover:ring-fuchsia-700 hover:ring-inset hover:ring-2`}
                >
                  Post
                </button>
              </Link>
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
