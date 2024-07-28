import { useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Heading from "@/components/ui/heading";
import BlogProgress from "@/components/blogComponents/BlogProgress";
import BlogHeading from "@/components/blogComponents/blogHeading";

const accentColor = "bg-[#9c3cc1]";

function WriteBlog2() {
  const [description, setDescription] = useState("");

  return (
    <div className="content-container">
      <Heading />

      <BlogHeading />

      <div className="md:w-[90%] w-[95%] mx-auto md:mt-10 mt-6 md:p-10 px-4 py-10 bg-white dark:bg-neutral-900 rounded-xl shadow-md">
        <BlogProgress value1={100} value2={50} value3={0} />

        <div>
          <div className="md:mt-14 mt-10 md:ml-6 font-bold md:text-2xl text-xl">
            Draft the Blog
          </div>
          <div className="mt-6 md:ml-6 mb-8">
            <ReactQuill
              value={description}
              onChange={setDescription}
              className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 h-[400px]"
            />
          </div>
        </div>
      </div>

      <div className="md:w-[90%] w-[95%] mx-auto flex justify-between">
        <Link to="/blogs/write/1">
          <button
            className={`${accentColor} px-8 md:px-16 py-3 mt-8 md:mt-12 mb-4 rounded-lg text-xl font-semibold hover:bg-neutral-100 text-white dark:hover:bg-neutral-900 hover:text-fuchsia-700 hover:ring-fuchsia-700 hover:ring-inset hover:ring-2`}
          >
            Previous
          </button>
        </Link>
        <Link to="/blogs/write/3">
          <button
            className={`${accentColor} px-8 md:px-16 py-3 mt-8 md:mt-12 mb-4 rounded-lg text-xl font-semibold hover:bg-neutral-100 text-white dark:hover:bg-neutral-900 hover:text-fuchsia-700 hover:ring-fuchsia-700 hover:ring-inset hover:ring-2`}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}

export default WriteBlog2;
