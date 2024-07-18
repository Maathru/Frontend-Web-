import EligibleCardBoolInput from "@/components/userComponents/eligibleCardBoolInput";
import YesNoButton from "@/components/userComponents/yesNoButton";
import { TextField } from "@mui/material";
import { IoIosArrowBack } from "react-icons/io";
import { Navigate, useNavigate } from "react-router-dom";
import EligiblePagination from "@/components/userComponents/eligiblePagination";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { conditions2, meals, nutrition } from "@/data/eligibleData";
import EligibleService from "@/service/eligibleService";
import { errorType, Toast } from "@/components/toast";

const Eligible3 = () => {
  const [formObject, setFormObject] = useState({});
  const navigate = useNavigate();
  let isLoading = true;

  const initiateFields = () => {
    const initialData = {};

    conditions2.forEach((condition) => {
      initialData[condition.name + "_woman"] = false;
      initialData[condition.name + "_man"] = false;
      initialData[condition.name + "_other"] = "";
    });

    initialData["meal_woman"] = false;
    initialData["meal_other"] = false;
    initialData["meal_other"] = "";

    meals.forEach((meal) => {
      initialData[meal.name + "_woman"] = false;
      initialData[meal.name + "_man"] = false;
      initialData[meal.name + "_other"] = "";
    });

    nutrition.forEach((n) => {
      initialData[n.name + "_man"] = false;
      initialData[n.name + "_woman"] = false;
      initialData[n.name + "_other"] = "";
    });

    return initialData;
  };

  const setData = (field, name, value) => {
    const newObject = {};
    newObject[name + "_" + field] = value || "";
    setFormObject({ ...formObject, ...newObject });
  };

  const handleSave = async () => {
    // formObject.stage = Math.max(formObject.stage, 4);
    localStorage.setItem("formObject", JSON.stringify(formObject));
    // navigate("/eligible/4");

    await handleSubmit();
  };

  const handleSubmit = async () => {
    const formData = EligibleService.createObject(formObject);

    try {
      const response = await EligibleService.addEligibleInfo(formData);
      Toast(response, errorType.SUCCESS);
    } catch (error) {
      console.log(error.message);
      Toast(error.message, errorType.ERROR);

      const data = error.response.data;
      if (data) {
        if (Array.isArray(data)) {
          const newErrors = {};
          data.map((msg) => {
            Toast(msg.message, errorType.ERROR);
            newErrors[msg.field] = msg.message;
          });

          console.log(newErrors);
        } else {
          console.log(data);
          Toast(data, errorType.ERROR);
        }
      }
    }
  };

  useEffect(() => {
    const getFromLocalStorage = () => {
      const jsonString = localStorage.getItem("formObject");
      if (jsonString) {
        return JSON.parse(jsonString);
      }
      return { stage: 1 };
    };

    const obj2 = initiateFields();
    const obj1 = getFromLocalStorage();
    setFormObject({ ...formObject, ...obj2, ...obj1 });
    isLoading = false;
  }, []);

  if (!isLoading && (!formObject || !formObject.stage)) {
    return <Navigate to={"/eligible/2"} />;
  }

  if (!isLoading && formObject.stage < 3) {
    return <Navigate to={"/eligible/2"} />;
  }

  return (
    <div className="container my-10 font-poppins">
      <div className="flex items-center">
        <IoIosArrowBack
          size={45}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-2xl ms-8">Family health information</h2>
      </div>

      <ul className="list-disc mt-12">
        <li>
          It is important to know about certain disease conditions (hereditary
          diseases) that your mother, father or blood relatives may have because
          you may be at risk of developing those conditions.
        </li>
        <li className="mt-4">
          This allows you to pay special attention to it during pregnancy and in
          addition, it will help to prevent or minimize these diseases for you
          and your children.
        </li>
      </ul>

      <p className="mt-8">
        Do you, father or brothers/sisters suffer from the following diseases?
      </p>

      <div className="m-12">
        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <p></p>
          <p className="text-center">Woman</p>
          <p className="text-center">Man</p>
          <p></p>
        </div>

        {conditions2.map((condition, index) => (
          <EligibleCardBoolInput
            key={index}
            index={index}
            title={condition.title}
            placeholder={condition.placeholder}
            value1={formObject[condition.name + "_woman"] || false}
            value2={formObject[condition.name + "_man"] || false}
            value3={formObject[condition.name + "_other"] || ""}
            onChange={(filed, e) => {
              setData(filed, condition.name, e);
            }}
          />
        ))}
      </div>

      <h3 className="text-xl mt-12">Family nutrition</h3>

      <ul className="list-disc mt-4">
        <li className="mt-4">
          Eating a mixed diet (starches, proteins, fats, as well as vitamins and
          minerals in the right amount on a daily basis) will help the health of
          the womb and good nutritional habits to improve the health of the
          family, as well as the mother to give birth to healthy children in the
          future. Focusing is our goal
        </li>
      </ul>

      <div className="m-12">
        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <p></p>
          <p className="text-center">Woman</p>
          <p className="text-center">Man</p>
          <p></p>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <p>1. Did you have 3 main meals for the day?</p>
          <YesNoButton
            onChange={(e) => setData("woman", "meal", e)}
            value={formObject.meal_woman || false}
          />
          <YesNoButton
            onChange={(e) => setData("man", "meal", e)}
            value={formObject.meal_man || false}
          />
          <TextField
            label="Other Details"
            variant="outlined"
            className="w-72"
            value={formObject.meal_other || ""}
            onChange={(e) => setData("other", "meal", e.target.value)}
          />
        </div>

        {meals.map((meal, index) => (
          <EligibleCardBoolInput
            key={index}
            title={meal.title}
            placeholder={meal.placeholder}
            value1={formObject[meal.name + "_woman"] || false}
            value2={formObject[meal.name + "_man"] || false}
            value3={formObject[meal.name + "_other"] || ""}
            onChange={(filed, e) => {
              setData(filed, meal.name, e);
            }}
          />
        ))}

        {nutrition.map((n, index) => (
          <EligibleCardBoolInput
            key={index}
            index={index + 1}
            title={n.title}
            placeholder={n.placeholder}
            value1={formObject[n.name + "_woman"] || false}
            value2={formObject[n.name + "_man"] || false}
            value3={formObject[n.name + "_other"] || ""}
            onChange={(filed, e) => {
              setData(filed, n.name, e);
            }}
          />
        ))}
      </div>

      <Button onClick={handleSave}>Save and Submit</Button>

      <div className="flex w-full mt-24">
        <EligiblePagination total={4} current={3} />
      </div>
    </div>
  );
};

export default Eligible3;
