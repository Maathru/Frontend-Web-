import React from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import ArticleImage from "../../assets/blog/recent-blog-image-1.png";
import { Link } from "react-router-dom";


const badgeStyle =
  "bg-fuchsia-200 dark:bg-fuchsia-300 hover:dark:bg-fuchsia-100 dark:text-neutral-800 md:text-xl text-sm font-normal px-4 py-1";
const cardColor = "bg-pink-100 dark:bg-[#251F28] hover:dark:bg-[#1D1A1F]";
const readMoreColor = "text-[#9c3cc1] dark:text-neutral-300";

const ArticleRecent2 = () => {
  return (
    <div className="">
      <Link to={"/blogs/"}>
        <div className="md:mt-10 mt-5 md:ml-10 ml-3 text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
          <MdOutlineArrowBackIosNew />
        </div>
      </Link>

      <div className="w-[90%] mx-auto">
        <div className="md:mt-5 mt-3 text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
          The Importance of Regular Prenatal Checkups
        </div>
        <div className="text-2xl font-thin text-neutral-800 dark:text-neutral-100">
          (Maternal Health)
        </div>
        <img
          src={ArticleImage}
          alt="Article"
          className="w-full rounded-lg mt-2 max-h-[500px] object-cover"
        />

        <div className="mt-4 text-base text-neutral-600 dark:text-neutral-300">
          <p>
            {" "}
            Pregnancy is a remarkable journey filled with excitement, changes,
            and expectations. Alongside maintaining a healthy diet and
            lifestyle, regular prenatal checkups play a vital role in ensuring
            the health and well-being of both mother and baby. This article will
            guide you through the significance of prenatal visits, helping you
            understand their importance in promoting a safe and healthy
            pregnancy.{" "}
          </p>
          <br></br>
          <h4>
            <b>Why Are Prenatal Checkups Important?</b>
          </h4>{" "}
          <p>
            {" "}
            Prenatal checkups are essential for monitoring the health of the
            expectant mother and the developing baby. These routine visits allow
            healthcare providers to identify and address potential risks, ensure
            the baby’s proper growth, and provide guidance on maintaining a
            healthy pregnancy. Timely prenatal care reduces the likelihood of
            complications, helps detect congenital conditions early, and ensures
            the pregnancy progresses as expected.{" "}
          </p>
          <br></br>
          <h4>
            <b>What to Expect During Prenatal Visits:</b>
          </h4>{" "}
          <p>
            {" "}
            Prenatal checkups typically involve various tests, screenings, and
            discussions aimed at ensuring maternal and fetal health. Here's what
            you can expect:{" "}
          </p>{" "}
          <ul>
            <br></br>
            <li>
              <b>Initial Assessment:</b> A detailed review of your medical
              history, physical examination, and confirmation of pregnancy
              through ultrasound or lab tests.
            </li>{" "}
            <li>
              <b>Routine Monitoring:</b> Regular checks on blood pressure,
              weight, and urine to monitor the mother’s health and detect signs
              of conditions like gestational diabetes or preeclampsia.
            </li>{" "}
            <li>
              <b>Fetal Development Tracking:</b> Ultrasounds to assess the
              baby's growth, development, and position, along with heartbeat
              monitoring.
            </li>{" "}
            <li>
              <b>Blood Tests:</b> Tests to check for anemia, blood type, and
              infections like hepatitis or HIV, along with screening for genetic
              conditions.
            </li>{" "}
            <li>
              <b>Vaccinations:</b> Guidance on immunizations, such as the flu
              shot or Tdap, to protect both mother and baby.
            </li>{" "}
            <li>
              <b>Guidance and Education:</b> Discussions about nutrition,
              physical activity, managing discomforts, and preparing for labor
              and delivery.
            </li>{" "}
          </ul>
          <br></br>
          <h4>
            <b>Benefits of Regular Prenatal Checkups:</b>
          </h4>{" "}
          <p> Consistent prenatal care offers numerous benefits, such as: </p>{" "}
          <ul>
            {" "}
            <li>
              {" "}
              - Early detection and management of potential health issues for
              both mother and baby.
            </li>{" "}
            <li>
              {" "}
              - Monitoring the baby’s growth and addressing any developmental
              concerns.
            </li>{" "}
            <li>
              {" "}
              - Reducing the risk of preterm labor or low birth weight.
            </li>{" "}
            <li>
              {" "}
              - Ensuring proper maternal health by managing chronic conditions
              like hypertension or diabetes.
            </li>{" "}
            <li>
              {" "}
              - Building a trusting relationship with healthcare providers to
              prepare for childbirth and postpartum care.
            </li>{" "}
          </ul>
          <br></br>
          <h4>
            <b>Tips for Effective Prenatal Care:</b>
          </h4>{" "}
          <p>
            {" "}
            To make the most of your prenatal visits, consider the following
            tips:{" "}
          </p>{" "}
          <ul>
            {" "}
            <li>
              {" "}
              - Schedule your first prenatal visit as soon as you confirm your
              pregnancy.
            </li>{" "}
            <li>
              {" "}
              - Attend all appointments and follow the recommended schedule for
              checkups.
            </li>{" "}
            <li>
              {" "}
              - Prepare a list of questions or concerns to discuss with your
              healthcare provider.
            </li>{" "}
            <li>
              {" "}
              - Keep a record of test results, prescriptions, and any
              instructions given during visits.
            </li>{" "}
            <li>
              {" "}
              - Communicate openly about any changes in symptoms, discomforts,
              or lifestyle challenges.
            </li>{" "}
          </ul>
          <br></br>
          <h4>
            <b>Conclusion:</b>
          </h4>{" "}
          <p>
            {" "}
            Regular prenatal checkups are the cornerstone of a healthy
            pregnancy, ensuring the well-being of both mother and baby. By
            staying consistent with prenatal care and working closely with your
            healthcare provider, you can navigate this journey with confidence
            and peace of mind. Remember, every prenatal visit is an opportunity
            to take proactive steps toward a safe delivery and a healthy start
            for your little one.{" "}
          </p>
          <br></br>
          <h4>
            <b>References:</b>
          </h4>{" "}
          <ul>
            {" "}
            <li>
              <a href="https://www.cdc.gov/pregnancy/care.html">
                https://www.cdc.gov/pregnancy/care.html
              </a>
            </li>{" "}
            <li>
              <a href="https://www.acog.org/womens-health/faqs/routine-tests-during-pregnancy">
                https://www.acog.org/womens-health/faqs/routine-tests-during-pregnancy
              </a>
            </li>{" "}
            <li>
              <a href="https://www.marchofdimes.org/pregnancy/prenatal-care.aspx">
                https://www.marchofdimes.org/pregnancy/prenatal-care.aspx
              </a>
            </li>{" "}
          </ul>
        </div>

        <div className="flex flex-wrap md:gap-4 gap-2 mt-6">
          <Badge variant="secondary" className={badgeStyle}>
            Prenatal Visits
          </Badge>
          <Badge variant="secondary" className={badgeStyle}>
            Health
          </Badge>
        </div>
        <div>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default ArticleRecent2;
