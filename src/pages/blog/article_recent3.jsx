import React from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import ArticleImage from "../../assets/blog/recent-blog-image-2.png";
import { Link } from "react-router-dom";

const badgeStyle =
  "bg-fuchsia-200 dark:bg-fuchsia-300 hover:dark:bg-fuchsia-100 dark:text-neutral-800 md:text-xl text-sm font-normal px-4 py-1";

const ArticleRecent3 = () => {
  return (
    <div className="">
      <Link to="/blogs/" aria-label="Back to blogs">
        <div className="md:mt-10 mt-5 md:ml-10 ml-3 text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
          <MdOutlineArrowBackIosNew />
        </div>
      </Link>

      <div className="w-[90%] mx-auto">
        <div className="md:mt-5 mt-3 text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
          Vaccination Guide for Newborns and Infants
        </div>
        <div className="text-2xl font-thin text-neutral-800 dark:text-neutral-100">
          (Infant Health)
        </div>
        <img
          src={ArticleImage}
          alt="Article"
          className="w-full rounded-lg mt-2 max-h-[500px] object-cover"
        />

        <div className="mt-4 text-base text-neutral-600 dark:text-neutral-300">
          <p>
            {" "}
            Vaccination is one of the most effective ways to protect newborns
            and infants from potentially life-threatening diseases. By following
            the recommended immunization schedule, parents can ensure their
            child’s health and safeguard them against preventable illnesses.
            This article serves as a comprehensive guide to vaccinations for
            newborns and infants, highlighting their importance and what parents
            need to know.{" "}
          </p>
          <br></br>
          <h4>
            <b>The Importance of Vaccination:</b>
          </h4>{" "}
          <p>
            {" "}
            Vaccinations are essential for building a child’s immunity against
            dangerous diseases during the early stages of life. They help
            protect infants from infections such as polio, measles, and whooping
            cough, which can have severe consequences if left unaddressed.
            Vaccines not only protect the individual child but also contribute
            to community immunity, reducing the spread of diseases within the
            population.{" "}
          </p>
          <br></br>
          <h4>
            <b>Recommended Vaccination Schedule:</b>
          </h4>{" "}
          <p>
            {" "}
            Healthcare organizations like the World Health Organization (WHO)
            and the Centers for Disease Control and Prevention (CDC) provide
            detailed immunization schedules. Below is an overview of the
            vaccines typically recommended for newborns and infants:{" "}
          </p>{" "}
          <br></br>
          <ul>
            {" "}
            <li>
              <b>Hepatitis B:</b> The first dose is given at birth, followed by
              subsequent doses at 1-2 months and 6-18 months.
            </li>{" "}
            <li>
              <b>DTaP:</b> Protects against diphtheria, tetanus, and pertussis,
              administered in multiple doses starting at 2 months.
            </li>{" "}
            <li>
              <b>Rotavirus:</b> Prevents severe diarrhea and dehydration caused
              by rotavirus; given in two or three doses starting at 2 months.
            </li>{" "}
            <li>
              <b>Polio (IPV):</b> Protects against poliomyelitis, given in four
              doses beginning at 2 months.
            </li>{" "}
            <li>
              <b>Hib:</b> Prevents Haemophilus influenzae type b infections,
              which can cause meningitis; administered in multiple doses
              starting at 2 months.
            </li>{" "}
            <li>
              <b>Pneumococcal (PCV13):</b> Protects against pneumococcal
              diseases, such as pneumonia and meningitis; given in multiple
              doses starting at 2 months.
            </li>{" "}
            <li>
              <b>MMR:</b> Protects against measles, mumps, and rubella,
              typically given at 12-15 months.
            </li>{" "}
            <li>
              <b>Varicella:</b> Prevents chickenpox, administered at 12-15
              months.
            </li>{" "}
          </ul>
          <br></br>
          <h4>
            <b>Key Tips for Parents:</b>
          </h4>{" "}
          <p>
            {" "}
            Vaccination can be a new experience for first-time parents. These
            tips will help you navigate the process effectively:{" "}
          </p>{" "}
          <ul>
            {" "}
            <li>
              {" "}
              - Keep a record of your child’s vaccinations and maintain an
              immunization card.
            </li>{" "}
            <li>
              {" "}
              - Follow the recommended vaccination schedule closely and never
              skip doses.
            </li>{" "}
            <li>
              {" "}
              - Prepare for vaccination day by ensuring your baby is well-fed
              and rested.
            </li>{" "}
            <li>
              {" "}
              - Comfort your baby during and after the vaccination, as some may
              experience mild reactions like fever or redness at the injection
              site.
            </li>{" "}
            <li>
              {" "}
              - Consult your pediatrician if you have any concerns about vaccine
              safety or side effects.
            </li>{" "}
            <li>
              {" "}
              - Stay informed about booster shots and additional vaccines
              required in later years.
            </li>{" "}
          </ul>
          <br></br>
          <h4>
            <b>Are Vaccines Safe for Infants?</b>
          </h4>{" "}
          <p>
            {" "}
            Vaccines are rigorously tested for safety and effectiveness before
            they are approved for use. Mild side effects like fever or soreness
            are common but temporary. Serious side effects are extremely rare,
            and the benefits of vaccination far outweigh the risks. Parents can
            rest assured that vaccines are a critical step in ensuring their
            child’s lifelong health.{" "}
          </p>
          <br></br>
          <h4>
            <b>Conclusion:</b>
          </h4>{" "}
          <p>
            {" "}
            Vaccinating your newborn or infant is a vital step in protecting
            them from severe and preventable diseases. By adhering to the
            recommended immunization schedule and consulting your pediatrician,
            you can ensure your child starts life with a strong defense against
            illness. Remember, a vaccinated child is a healthier, happier child.{" "}
          </p>
          <br></br>
          <h4>
            <b>References:</b>
          </h4>{" "}
          <ul>
            {" "}
            <li>
              <a href="https://www.cdc.gov/vaccines/parents/downloads/parent-ver-sch-0-6yrs.pdf">
                https://www.cdc.gov/vaccines/parents/downloads/parent-ver-sch-0-6yrs.pdf
              </a>
            </li>{" "}
            <li>
              <a href="https://www.who.int/health-topics/vaccines-and-immunization">
                https://www.who.int/health-topics/vaccines-and-immunization
              </a>
            </li>{" "}
            <li>
              <a href="https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/in-depth/vaccines/art-20048334">
                https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/in-depth/vaccines/art-20048334
              </a>
            </li>{" "}
          </ul>
        </div>

        <div className="flex flex-wrap md:gap-4 gap-2 mt-6">
          <Badge variant="secondary" className={badgeStyle}>
            Newborn
          </Badge>
          <Badge variant="secondary" className={badgeStyle}>
            Vaccination
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

export default ArticleRecent3;
