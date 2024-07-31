import { Progress } from "@/components/ui/progress";

const accentColor = "bg-[#9c3cc1]";

const BlogProgress = ({ value1, value2, value3 }) => {
  return (
    <>
      <div className="md:w-[70%] w-[80%} flex gap-3 place-items-center mx-auto mb-10">
        <div
          className={`${accentColor} rounded-full md:min-h-10 md:min-w-10 min-h-7 min-w-7 text-white md:text-2xl text-lg flex justify-center items-center`}
        >
          1
        </div>

        <Progress value={value1} />

        <div
          className={`${accentColor} rounded-full md:min-h-10 md:min-w-10 min-h-7 min-w-7 text-white md:text-2xl text-lg flex justify-center items-center`}
        >
          2
        </div>

        <Progress value={value2} />

        <div
          className={`${accentColor} rounded-full md:min-h-10 md:min-w-10 min-h-7 min-w-7 text-white md:text-2xl text-lg flex justify-center items-center`}
        >
          3
        </div>

        <Progress value={value3} />

        <div
          className={`${accentColor} rounded-full md:min-h-10 md:min-w-10 min-h-7 min-w-7 text-white md:text-2xl text-lg flex justify-center items-center`}
        >
          4
        </div>
      </div>
      <hr className="w-[90%] mx-auto mt-5 border-2"></hr>
    </>
  );
};

export default BlogProgress;
