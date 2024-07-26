import { HiChevronLeft } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import meal1 from "../../assets/user/salmon-eggs.png";
import meal2 from "../../assets/user/tofu.png";
import walking from "../../assets/user/walking.png";
import { useTitle } from "@/hooks/useTitle";

const cardColor = "bg-white dark:bg-dark-card";
const badgeColor = "bg-light-badge-green text-light-success-green";
("bg-fuchsia-200 dark:bg-fuchsia-300 hover:dark:bg-fuchsia-100 dark:text-neutral-800");
const cardheader = "pb-2 pt-0";
const cardcontent = "text-base pb-3 text-justify";

const growth = () => {
  useTitle("Growth");
  const { t } = useTranslation("growth");

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="bg-white dark:bg-dark-background p-12 pt-8">
      <div className="mb-8">
        <div className="text-3xl text-[#5B5B5B] font-semibold ">
          <HiChevronLeft className="text-5xl inline" />
          {t("title")}
        </div>
        <p className="ml-12 text-lg ">{t("subtitle")}</p>
      </div>

      <div className="mx-12">
        <div className="rounded-sm shadow-md px-8 py-4">
          <div className="flex justify-between">
            <div className="">
              <FormControl style={{ minWidth: 300 }}>
                <InputLabel id="label">{t("dropdown")}</InputLabel>
                <Select
                  labelId="label"
                  variant="standard"
                  id="select"
                  value={age}
                  label="select child"
                  onChange={handleChange}
                  sx={{ border: 0 }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>

            <p className="text-right font-semibold">
              Current Stage: <span>2</span> Months Pregnant
            </p>
          </div>

          <div className="text-right">video</div>
        </div>
        <div className="flex justify-between mt-6">
          <Button className="w-24">{t("previous")}</Button>
          <Button className="w-24">{t("next")}</Button>
        </div>
      </div>

      <div className="mx-12 mt-12">
        <p className="text-2xl font-semibold mb-3">
          Your child's current state:{" "}
          <span className="font-normal">3 months</span>
        </p>
        <p className="text-lg mb-10 text-justify">
          It's month 2, and your baby is still very small. They're about an inch
          long, with tiny bud-like arms and legs. Their digestive tract, eyes,
          ears, nose, tongue, and skin are developing. Your baby's facial
          features continue to develop. Each ear begins as a little fold of skin
          at the side of the head. Tiny buds that eventually grow into arms and
          legs are forming. Fingers, toes, and eyes are also forming in the
          second month of pregnancy. <br />
          The neural tube (brain, spinal cord, and other neural tissue of the
          central nervous system) is well formed. The digestive tract and
          sensory organs begin to develop. Bone starts to replace cartilage. The
          embryo begins to move, although the mother cannot yet feel it. Due to
          hormonal changes, Mother may still be experiencing some nausea and
          fatigue in your second month.
        </p>

        <p className="text-2xl">
          Food to eat during pregnancy—Month <span>2</span>
        </p>

        {/*food cards container starts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-10">
          <div>
            <Card
              className={`${cardColor} flex flex-row items-center row-span-1`}
            >
              <img
                src={meal1}
                alt="Blog Image"
                className="rounded-md hidden md:block m-2 max-w-52 object-fit"
              />
              <div className="flex flex-col">
                <CardHeader className={`${cardheader}`}>
                  <CardTitle className="text-lg">Salmon, cooked eggs</CardTitle>
                </CardHeader>
                <CardContent className={`${cardcontent}`}>
                  <p>
                    great source of iron. It's important to get enough iron
                    throughout your pregnancy, since it's needed to support your
                    baby's developing brain.
                  </p>
                </CardContent>
              </div>
            </Card>
          </div>

          <div>
            <Card
              className={`${cardColor} flex flex-row items-center row-span-1`}
            >
              <img
                src={meal2}
                alt="Blog Image"
                className="rounded-md hidden md:block m-2 max-w-52 object-fit"
              />
              <div className="flex flex-col">
                <CardHeader className={`${cardheader}`}>
                  <CardTitle className="text-lg">
                    Leafy greens, chickpeas, tofu, beans
                  </CardTitle>
                </CardHeader>
                <CardContent className={`${cardcontent}`}>
                  <p>
                    Eat iron-rich plant foods, along with some vitamin C (just a
                    squeeze of lemon). This encourages your body's absorption of
                    iron from non-animal sources.
                  </p>
                </CardContent>
                <CardFooter className="pb-0">
                  <Badge variant="secondary" className={badgeColor}>
                    veg
                  </Badge>
                </CardFooter>
              </div>
            </Card>
          </div>
          <div>
            <Card
              className={`${cardColor} flex flex-row items-center row-span-1`}
            >
              <img
                src={meal1}
                alt="Blog Image"
                className="rounded-md hidden md:block m-2 max-w-52 object-fit"
              />
              <div className="flex flex-col">
                <CardHeader className={`${cardheader}`}>
                  <CardTitle className="text-lg">Salmon, cooked eggs</CardTitle>
                </CardHeader>
                <CardContent className={`${cardcontent}`}>
                  <p>
                    great source of iron. It's important to get enough iron
                    throughout your pregnancy, since it's needed to support your
                    baby's developing brain.
                  </p>
                </CardContent>
              </div>
            </Card>
          </div>
          <div>
            <Card
              className={`${cardColor} flex flex-row items-center row-span-1`}
            >
              <img
                src={meal2}
                alt="Blog Image"
                className="rounded-md hidden md:block m-2 max-w-52 object-fit"
              />
              <div className="flex flex-col">
                <CardHeader className={`${cardheader}`}>
                  <CardTitle className="text-lg">
                    Leafy greens, chickpeas, tofu, beans
                  </CardTitle>
                </CardHeader>
                <CardContent className={`${cardcontent}`}>
                  <p>
                    Eat iron-rich plant foods, along with some vitamin C (just a
                    squeeze of lemon). This encourages your body's absorption of
                    iron from non-animal sources.
                  </p>
                </CardContent>
                <CardFooter className="pb-0">
                  <Badge variant="secondary" className={badgeColor}>
                    veg
                  </Badge>
                </CardFooter>
              </div>
            </Card>
          </div>
        </div>

        <p className="text-2xl mt-12">
          Safe exercises during this period of pregnancy
        </p>

        <p className="text-lg my-10 text-justify">
          Regular exercise during pregnancy is essential for your well-being and
          your baby's health. It helps reduce discomfort, improves mood, and
          prepares your body for childbirth. Remember, a healthy mother means a
          healthy baby.
        </p>

        {/*exercise cards container starts */}

        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
          <div>
            <Card className={`${cardColor} flex flex-col items-center`}>
              <CardHeader className={`${cardheader}`}>
                <CardTitle className="text-lg">Walking</CardTitle>
              </CardHeader>
              <img
                src={walking}
                alt="Blog Image"
                className="rounded-md hidden md:block m-2 object-fit px-4"
              />
              <div className="flex flex-col">
                <CardContent className={`${cardcontent}`}>
                  <p>
                    great source of iron. It's important to get enough iron
                    throughout your pregnancy, since it's needed to support your
                    baby's developing brain.
                  </p>
                </CardContent>
              </div>
            </Card>
          </div>
          <div>
            <Card className={`${cardColor} flex flex-col items-center`}>
              <CardHeader className={`${cardheader}`}>
                <CardTitle className="text-lg">Walking</CardTitle>
              </CardHeader>
              <img
                src={walking}
                alt="Blog Image"
                className="rounded-md hidden md:block m-2 object-fit px-4"
              />
              <div className="flex flex-col">
                <CardContent className={`${cardcontent}`}>
                  <p>
                    great source of iron. It's important to get enough iron
                    throughout your pregnancy, since it's needed to support your
                    baby's developing brain.
                  </p>
                </CardContent>
              </div>
            </Card>
          </div>
          <div>
            <Card className={`${cardColor} flex flex-col items-center`}>
              <CardHeader className={`${cardheader}`}>
                <CardTitle className="text-lg">Walking</CardTitle>
              </CardHeader>
              <img
                src={walking}
                alt="Blog Image"
                className="rounded-md hidden md:block m-2 object-fit px-4"
              />
              <div className="flex flex-col">
                <CardContent className={`${cardcontent}`}>
                  <p>
                    great source of iron. It's important to get enough iron
                    throughout your pregnancy, since it's needed to support your
                    baby's developing brain.
                  </p>
                </CardContent>
              </div>
            </Card>
          </div>
          <div>
            <Card className={`${cardColor} flex flex-col items-center`}>
              <CardHeader className={`${cardheader}`}>
                <CardTitle className="text-lg">Walking</CardTitle>
              </CardHeader>
              <img
                src={walking}
                alt="Blog Image"
                className="rounded-md hidden md:block m-2 object-fit px-4"
              />
              <div className="flex flex-col">
                <CardContent className={`${cardcontent}`}>
                  <p>
                    great source of iron. It's important to get enough iron
                    throughout your pregnancy, since it's needed to support your
                    baby's developing brain.
                  </p>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default growth;
