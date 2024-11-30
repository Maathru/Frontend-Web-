import { useTranslation } from "react-i18next";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTitle } from "@/hooks/useTitle";
import Heading from "@/components/ui/heading";
import { growthData } from "@/data/growthData";
import GrowthService from "@/service/growthService";
const Growth = () => {
  useTitle("Growth");
  const { t } = useTranslation("growth");

  const [dop, setDop] = useState("");  // Date of birth
  const [pregnancyCards, setPregnancyCards] = useState([]);  // Pregnancy cards
  const [age, setAge] = useState("");  // Age selection (for demonstration)
  const [currentWeek, setCurrentWeek] = useState(1);  // Default to 1st week

  useEffect(() => {
    // Fetch DOB from the backend
    const fetchDob = async () => {
      try {
        const response = await GrowthService.getPreganancyCards();
        response.data && setPregnancyCards(response.data);
        console.log("Pregnancy cards:", response.data);
        // setDop(new Date(userDop));
        // calculateWeek(new Date(userDop));
      } catch (error) {
        console.error("Error fetching DOB:", error);
      }
    };

    fetchDob();
  }, []);

  const calculateWeek = (dop) => {
    if (!dop) return;

    const currentDate = new Date();
    const timeDifference = currentDate - dop;
    const daysInWeek = 7 * 24 * 60 * 60 * 1000;
    const weeksPregnant = Math.floor(timeDifference / daysInWeek);
    setCurrentWeek(weeksPregnant);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const stage = growthData.find((stage) => stage.week === currentWeek) || {};

  return (
    <div className="bg-white dark:bg-dark-background p-12 pt-8">
      <div className="mb-8">
        <Heading title={t("title")} />
        <p className="ml-12 text-lg ">{t("subtitle")}</p>
      </div>

      <div className="mx-12">
        <div className="rounded-sm shadow-md px-8 py-4 flex flex-col items-end">
        <div className="flex w-full justify-between">
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
              {/* {dob && `DOB: ${dob.toLocaleDateString()}`} */}
              Current Stage: {currentWeek} Weeks Pregnant
            </p>
          </div>

          {stage.video && (
            <div className="text-right">
              <video
                src={stage.video}
                width="800"
                controls="controls"
                autoPlay="true"
              />
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <Button className="w-24">{t("previous")}</Button>
          <Button className="w-24">{t("next")}</Button>
        </div>
      </div>

      <div className="mx-12 mt-12">
        <p className="text-2xl font-semibold mb-3">
          Your child's current state:{" "}
          <span className="font-normal"> {currentWeek} weeks </span>
        </p>
        <p className="text-lg mb-10 text-justify">
          {stage.description}
        </p>

        <p className="text-2xl">Food to eat during pregnancy—Week {stage.week}</p>

        {/*food cards container starts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-10">
          {stage.foods?.map((food, index) => (
            <div key={index}>
              <Card className="bg-white flex flex-row items-center">
                <img src={food.image} alt={food.title} className="rounded-md hidden md:block m-2 max-w-52 object-fit" />
                <div className="flex flex-col">
                  <CardHeader className="pb-2 pt-0">
                    <CardTitle className="text-lg">{food.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-base pb-3 text-justify">
                    <p>{food.content}</p>
                  </CardContent>
                  {food.badgeText && (
                    <CardFooter className="pb-0">
                      <Badge variant="secondary" className="bg-light-badge-green text-light-success-green">{food.badgeText}</Badge>
                    </CardFooter>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>

        <p className="text-2xl mt-12">
          Safe exercises during this period of pregnancy
        </p>

        <p className="text-lg my-10 text-justify">
          Regular exercise during pregnancy is essential for your well-being and your baby's health...
        </p>

        {/*exercise cards container starts */}
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
          {stage.activities?.map((activity, index) => (
            <div key={index}>
              <Card className="bg-white flex flex-col items-center">
                <CardHeader className="pb-2 pt-0">
                  <CardTitle className="text-lg">{activity.title}</CardTitle>
                </CardHeader>
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="rounded-md hidden md:block m-2 object-fit px-4"
                />
                <div className="flex flex-col">
                  <CardContent className="text-base pb-3 text-justify">
                    <p>{activity.content}</p>
                  </CardContent>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Growth;
