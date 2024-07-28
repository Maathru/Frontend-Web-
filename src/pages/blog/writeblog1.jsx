import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { IoImageOutline } from "react-icons/io5";
import Heading from "@/components/ui/heading";
import BlogHeading from "@/components/blogComponents/blogHeading";
import BlogProgress from "@/components/blogComponents/BlogProgress";

const accentColor = "bg-[#9c3cc1]";

const WriteBlog1 = () => {
  return (
    <div className="content-container">
      <Heading />

      <BlogHeading />

      <div className="md:w-[90%] w-[95%] mx-auto md:mt-10 mt-6 md:p-10 px-4 py-10 bg-white dark:bg-neutral-900 rounded-xl shadow-md">
        <BlogProgress value1={50} value2={0} value3={0} />

        <div>
          <div className="md:mt-14 mt-10 md:ml-6 font-bold md:text-2xl text-xl">
            Blog Details
          </div>
          <div className="mt-2 md:ml-6 md:text-lg text-base font-medium text-[#6f6c90] dark:text-neutral-400">
            Please fill the article information to publish the article.
          </div>

          <div className="md:w-[90%] mx-auto">
            <div className="md:mt-12 mt-8 md:text-lg text-base font-medium text-black dark:text-neutral-300">
              Blog Title
            </div>
            <input
              type="text"
              className="w-full md:h-12 h-10 mt-4 px-3 py-2 border-2 border-[#e0e0e0] rounded-full text-lg focus:outline-none focus:border-[#9c3cc1] dark:bg-neutral-800"
              placeholder="Enter the blog title"
            />

            <div className="md:mt-12 mt-8 md:text-lg text-base font-medium text-black dark:text-neutral-300">
              Main area covered by the blog
            </div>
            <select
              className="w-full md:h-12 h-10 mt-4 px-3 py-2 border-2 border-[#e0e0e0] rounded-full text-lg text-gray-400 focus:outline-none focus:border-[#9c3cc1] bg-white dark:bg-neutral-800"
              placeholder="Select the area of the blog post"
            >
              <option value="" hidden>
                Select the area of the blog post
              </option>
              <option value="Prenatal Nutrition">Prenatal Nutrition</option>
              <option value="Maternal Clinics">Maternal Clinics</option>
              <option value="Infant Health">Infant Health</option>
              <option value="Child Growth">Child Growth</option>
            </select>

            <div className="md:mt-12 mt-8 md:text-lg text-base font-medium text-black dark:text-neutral-300">
              Upload the main blog image
            </div>
            <div className="md:grid md:grid-cols-6 md:gap-2">
              <input
                type="text"
                className="w-full md:col-span-3 md:h-12 h-10 mt-4 px-3 py-2 border-2 border-[#e0e0e0] rounded-full text-lg focus:outline-none focus:border-[#9c3cc1] dark:bg-neutral-800"
                placeholder="Description of the image"
              />

              <label
                htmlFor="picture"
                className="md:col-span-2 w-full md:h-12 h-10 mt-4 px-3 py-2 border-2 border-[#e0e0e0] text-neutral-400 rounded-full text-lg focus:outline-none focus:border-[#9c3cc1] dark:bg-neutral-800 cursor-pointer flex items-center gap-2"
              >
                <IoImageOutline />
                Choose File
              </label>
              <Input id="picture" type="file" className="hidden" />
              <div className="flex justify-center md:block">
                <button
                  className={`${accentColor} px-4 py-2 md:h-12 h-10 md:col-span-1 mt-4 rounded-full text-sm hover:bg-neutral-100 text-white dark:hover:bg-neutral-900 hover:text-fuchsia-700 hover:ring-fuchsia-700 hover:ring-inset hover:ring-2`}
                >
                  Preview Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Link to="/blogs/write/2">
          <button
            className={`${accentColor} px-8 md:px-16 py-3 mt-8 md:mt-12 mb-4 rounded-lg text-xl font-semibold hover:bg-neutral-100 text-white dark:hover:bg-neutral-900 hover:text-fuchsia-700 hover:ring-fuchsia-700 hover:ring-inset hover:ring-2`}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WriteBlog1;
