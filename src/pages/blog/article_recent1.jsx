import React from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import ArticleImage from "../../assets/blog/article-image.png";
import { Link } from "react-router-dom";

const badgeStyle =
  "bg-fuchsia-200 dark:bg-fuchsia-300 hover:dark:bg-fuchsia-100 dark:text-neutral-800 md:text-xl text-sm font-normal px-4 py-1";

const ArticleRecent1 = () => {
  return (
    <div className="">
      <Link to={"/blogs/"}>
        <div className="md:mt-10 mt-5 md:ml-10 ml-3 text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
          <MdOutlineArrowBackIosNew />
        </div>
      </Link>

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
              Embarking on the journey of pregnancy is a beautiful and transformative experience. 
              As an expectant mother, your body requires extra nutrients, vitamins, and minerals to 
              support both your health and the development of your baby. This article aims to guide 
              you through the essentials of prenatal nutrition, ensuring you and your baby receive the 
              best possible nourishment during this crucial time.
            </p>

            <br></br>

            <h4><b>The Importance of Prenatal Nutrition:</b></h4>
            <p>
              Proper nutrition during pregnancy is crucial for the development of the fetus and the 
              health of the mother. It helps in reducing the risk of birth defects, ensuring healthy 
              birth weight, and supporting the mother’s health throughout the pregnancy. The right 
              diet can also minimize common pregnancy discomforts like morning sickness and fatigue.
            </p>

            <br></br>
            <h4><b>Essential Nutrients for Pregnancy:</b></h4>
            <p>
              During pregnancy, your body requires additional nutrients to support the growth and 
              development of your baby. Some of the essential nutrients include:
            </p>

            <ul>
              <li><b>Folic Acid:</b> Essential for the development of the baby’s neural tube, which forms the brain and spinal cord.</li>
              <li><b>Iron:</b> Required for the production of hemoglobin, which carries oxygen to the baby.</li>
              <li><b>Calcium:</b> Essential for the development of the baby’s bones and teeth.</li>
              <li><b>Protein:</b> Important for the growth and development of the baby.</li>
              <li><b>Omega-3 Fatty Acids:</b> Support the baby’s brain and eye development.</li>
            </ul>

            <br></br>
            <h4><b>Healthy Eating Tips for Pregnancy:</b></h4>
            <p>
              Here are some tips to help you maintain a healthy diet during pregnancy:
            </p>

            <ul>
              <li> - Eat a variety of foods to ensure you get all the essential nutrients.</li>
              <li> - Include plenty of fruits and vegetables in your diet for vitamins, minerals, and fiber.</li>
              <li> - Choose whole grains like brown rice, quinoa, and whole wheat bread for sustained energy.</li>
              <li> - Include lean protein sources like poultry, fish, beans, and legumes.</li>
              <li> - Stay hydrated by drinking plenty of water throughout the day.</li>
              <li> - Avoid processed foods, sugary snacks, and excessive caffeine.</li>
              <li> - Take prenatal vitamins as recommended by your healthcare provider.</li>
              <li> - Consult a registered dietitian or nutritionist for personalized dietary advice.</li>
            </ul>

            <br></br>

            <h4><b>Conclusion:</b></h4>
            <p>
              Proper nutrition is essential for a healthy pregnancy and the well-being of both the mother 
              and baby. By following a balanced diet rich in essential nutrients, you can support the growth 
              and development of your baby while maintaining your own health throughout pregnancy. Be sure 
              to consult with your healthcare provider or a nutrition expert to create a personalized meal 
              plan that meets your specific needs during this special time.
            </p>

            <br></br>
            <br></br>

            <h4><b>References:</b></h4>

            <ul>
              <li><a href="https://www.acog.org/womens-health/faqs/nutrition-during-pregnancy">https://www.acog.org/womens-health/faqs/nutrition-during-pregnancy</a></li>
              <li><a href="https://www.cdc.gov/ncbddd/folicacid/about.html">https://www.cdc.gov/ncbddd/folicacid/about.html</a></li>
              <li><a href="https://www.nichd.nih.gov/health/topics/pregnancy/conditioninfo/nutrition">https://www.nichd.nih.gov/health/topics/pregnancy/conditioninfo/nutrition</a></li>
            </ul>

        </div>

        <div className="flex flex-wrap md:gap-4 gap-2 mt-6">
          <Badge variant="secondary" className={badgeStyle}>
            Prenatal Nutrition
          </Badge>
          <Badge variant="secondary" className={badgeStyle}>
            Meal Plan
          </Badge>
          <Badge variant="secondary" className={badgeStyle}>
            Dietary Tips
          </Badge>
        </div>
      </div>

      {/* <div className="ml-6 md:ml-14">
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
      </div> */}

      <div>
        <br></br>
      </div>

    </div>
  );
};

export default ArticleRecent1;
