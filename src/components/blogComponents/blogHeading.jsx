const BlogHeading = () => {
  return (
    <>
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
    </>
  );
};

export default BlogHeading;
