import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiChevronLeft, HiPlus } from "react-icons/hi";
import { Typography, TextField, IconButton } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import EligibleService from "@/service/eligibleService";
import { errorType, Toast } from "@/components/toast";
import { useParams } from "react-router-dom";
import PageHeading from "@/components/ui/pageHeading";

const addCouples = () => {
  const { userEmail } = useParams();
  const [formData, setFormData] = useState({
    womanName: "",
    manName: "",
    address: "",
    womanPhone: "",
    manPhone: "",
    womanDob: "",
    manDob: "",
    womanAgeMarried: "",
    manAgeMarried: "",
    womanEducationLevel: "",
    manEducationLevel: "",
    womanOccupation: "",
    manOccupation: "",
    children: "",
    womanWeight: "",
    manWeight: "",
    womanHeight: "",
    manHeight: "",
    womanBmi: "",
    manBmi: "",
    womanBloodType: "",
    manBloodType: "",
    womanHemoglobin: "",
    manHemoglobin: "",
    special: "",
    session: "",
  });
  const [errors, setErrors] = useState({});
  const [pastPregnancySections, setPastPregnancySections] = useState([
    { id: 1, gender: "", result: "" },
  ]);
  const [familyMethods, setFamilyMethods] = useState([
    { id: 1, method: "", date: "" },
  ]);
  const { t } = useTranslation("eligibleCouplesAdd");

  const addPregnancySection = () => {
    setPastPregnancySections([
      ...pastPregnancySections,
      { id: pastPregnancySections.length + 1, gender: "", result: "" },
    ]);
  };
  const addFamilySection = () => {
    setFamilyMethods([
      ...familyMethods,
      { id: familyMethods.length + 1, method: "", date: "" },
    ]);
  };

  const removePregnancySection = (id) => {
    setPastPregnancySections(
      pastPregnancySections.filter((section) => section.id !== id)
    );
  };
  const removeFamilySection = (id) => {
    setFamilyMethods(familyMethods.filter((section) => section.id !== id));
  };

  const handlePregnancyInputChange = (id, field, value) => {
    setPastPregnancySections(
      pastPregnancySections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };
  const handleFamilyInputChange = (id, field, value) => {
    setFamilyMethods(
      familyMethods.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "womanName":
        if (!value) return "Woman's name is required";
        break;
      case "address":
        if (!value) return "Address is required";
        break;
      case "womanPhone":
        if (!value) return "Woman's telephone is required";
        break;
      case "womanDob":
        if (!value) return "Woman's date of birth is required";
        const womanDob = new Date(value);
        if (womanDob >= new Date())
          return "Woman's date of birth must be in the past";
        break;
      case "manDob":
        const manDob = new Date(value);
        if (manDob >= new Date())
          return "Man's date of birth must be in the past";
        break;
      case "womanEducationLevel":
        if (!value) return "Woman's education cannot be empty";
        break;
      case "womanOccupation":
        if (!value) return "Woman's occupation cannot be empty";
        break;
      case "children":
        if (!value) return "Number of children is required";
        break;
      case "womanWeight":
        if (!value || value == 0) return "Woman's weight cannot be empty";
        if (value < 0) return "Woman's weight cannot be less than 0";
        break;
      case "manWeight":
        if (value < 0) return "Man's weight cannot be less than 0";
        break;
      case "womanHeight":
        if (!value || value == 0) return "Woman's height cannot be empty";
        if (value < 0) return "Woman's height cannot be less than 0";
        break;
      case "manHeight":
        if (value < 0) return "Man's height cannot be less than 0";
        break;
      case "womanBmi":
        if (!value || value == 0) return "Woman's BMI cannot be empty";
        if (value < 0) return "Woman's BMI cannot be less than 0";
        break;
      case "manBmi":
        if (value < 0) return "Man's BMI cannot be less than 0";
        break;
      case "womanBloodType":
        if (!value) return "Woman's Blood Type cannot be empty";
        break;
      case "womanHemoglobin":
        if (!value || value == 0)
          return "Woman's hemoglobin level cannot be empty";
        if (value < 0) return "Woman's hemoglobin level cannot be less than 0";
        break;
      case "manHemoglobin":
        if (value < 0) return "Man's hemoglobin level cannot be less than 0";
        break;
      default:
        break;
    }
    return "";
  };

  const validate = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    return newErrors;
  };

  useEffect(() => {
    const fetchEligibleInfoForMidwife = async () => {
      try {
        const response = await EligibleService.getEligibleInfoForMidwife(
          userEmail
        );
        setFormData({ ...formData, ...response });

        // Update pastPregnancySections based on formData
        const newPastPregnancySections = response.pastPregnancies.map(
          (pregnancy, index) => ({
            id: index + 1,
            gender: pregnancy.gender || "",
            result: pregnancy.result || "",
          })
        );
        setPastPregnancySections(
          newPastPregnancySections.length
            ? newPastPregnancySections
            : [{ id: 1, gender: "", result: "" }]
        );

        // Update familyMethods based on formData
        const newFamilyMethods = response.familyPlanningMethods.map(
          (method, index) => ({
            id: index + 1,
            method: method.method || "",
            date: method.date || "",
          })
        );
        setFamilyMethods(
          newFamilyMethods.length
            ? newFamilyMethods
            : [{ id: 1, method: "", date: "" }]
        );
      } catch (error) {
        console.log(error.message);
        Toast(error.message, errorType.ERROR);

        const data = error.response.data;
        console.log(data);
        Toast(data, errorType.ERROR);
      }
    };

    fetchEligibleInfoForMidwife();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    const formObject = EligibleService.createMidwifeEligibleObject(
      userEmail,
      formData,
      pastPregnancySections,
      familyMethods
    );

    try {
      const response = await EligibleService.createEligibleInfo(formObject);
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

  const title = t("title");

  return (
    <div className="content-container">
      <PageHeading title={title} />
              
      {/* main details layer */}
      <div>
        <Typography variant="h5">{t("subtitle1")}</Typography>
        <div className="">
          <Typography variant="h6">{t("subtitle1.1")}</Typography>
          <div className="grid eligible-form grid-rows-9 gap-x-20 gap-y-5">
            <Typography className="col-start-2 text-center">Woman</Typography>
            <Typography className="text-center">Man</Typography>

            <Typography variant="body1">1. Name</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              value={formData.womanName || ""}
              name="womanName"
              onChange={handleInputChange || ""}
              error={errors.womanName ? true : false}
              helperText={errors.womanName ? errors.womanName : ""}
            ></TextField>
            <TextField
              className="rounded"
              size="small"
              value={formData.manName || ""}
              name="manName"
              onChange={handleInputChange}
              error={errors.manName ? true : false}
              helperText={errors.manName ? errors.manName : ""}
            ></TextField>

            <Typography variant="body1">2. Address</Typography>
            <TextField
              required
              className="rounded col-span-2"
              size="small"
              value={formData.address || ""}
              name="address"
              onChange={handleInputChange}
              error={errors.address ? true : false}
              helperText={errors.address ? errors.address : ""}
            ></TextField>

            <Typography variant="body1">3. Telephone Number</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              value={formData.womanPhone || ""}
              name="womanPhone"
              onChange={handleInputChange}
              error={errors.womanPhone ? true : false}
              helperText={errors.womanPhone ? errors.womanPhone : ""}
            ></TextField>
            <TextField
              className="rounded"
              size="small"
              value={formData.manPhone || ""}
              name="manPhone"
              onChange={handleInputChange}
              error={errors.manPhone ? true : false}
              helperText={errors.manPhone ? errors.manPhone : ""}
            ></TextField>

            <Typography variant="body1">4. Date of Birth</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              type="date"
              value={formData.womanDob || ""}
              name="womanDob"
              onChange={handleInputChange}
              error={errors.womanDob ? true : false}
              helperText={errors.womanDob ? errors.womanDob : ""}
            ></TextField>
            <TextField
              className="rounded"
              size="small"
              type="date"
              value={formData.manDob || ""}
              name="manDob"
              onChange={handleInputChange}
              error={errors.manDob ? true : false}
              helperText={errors.manDob ? errors.manDob : ""}
            ></TextField>

            <Typography variant="body1">5. Age married</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              type="number"
              value={formData.womanAgeMarried || ""}
              name="womanAgeMarried"
              onChange={handleInputChange}
              error={errors.womanAgeMarried ? true : false}
              helperText={errors.womanAgeMarried ? errors.womanAgeMarried : ""}
            ></TextField>
            <TextField
              className="rounded"
              size="small"
              type="number"
              value={formData.manAgeMarried || ""}
              name="manAgeMarried"
              onChange={handleInputChange}
              error={errors.manAgeMarried ? true : false}
              helperText={errors.manAgeMarried ? errors.manAgeMarried : ""}
            ></TextField>

            <Typography variant="body1">6. Highest Education Level </Typography>
            <TextField
              required
              className="rounded"
              size="small"
              value={formData.womanEducationLevel || ""}
              name="womanEducationLevel"
              onChange={handleInputChange}
              error={errors.womanEducationLevel ? true : false}
              helperText={
                errors.womanEducationLevel ? errors.womanEducationLevel : ""
              }
            ></TextField>
            <TextField
              className="rounded"
              size="small"
              value={formData.manEducationLevel || ""}
              name="manEducationLevel"
              onChange={handleInputChange}
              error={errors.manEducationLevel ? true : false}
              helperText={
                errors.manEducationLevel ? errors.manEducationLevel : ""
              }
            ></TextField>

            <Typography variant="body1">7. Occupation</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              value={formData.womanOccupation || ""}
              name="womanOccupation"
              onChange={handleInputChange}
              error={errors.womanOccupation ? true : false}
              helperText={errors.womanOccupation ? errors.womanOccupation : ""}
            ></TextField>
            <TextField
              className="rounded"
              size="small"
              value={formData.manOccupation || ""}
              name="manOccupation"
              onChange={handleInputChange}
              error={errors.manOccupation ? true : false}
              helperText={errors.manOccupation ? errors.manOccupation : ""}
            ></TextField>

            <Typography variant="body1">
              8. Number of children alive (Ages)
            </Typography>
            <TextField
              required
              className="rounded col-span-2"
              size="small"
              value={formData.children || ""}
              name="children"
              onChange={handleInputChange}
              error={errors.children ? true : false}
              helperText={errors.children ? errors.children : ""}
            ></TextField>
          </div>
        </div>

        <div className="mt-24">
          <Typography variant="h6">{t("subtitle1.2")}</Typography>
          <div
            className="flex items-center gap-2 text-primary-purple cursor-pointer"
            onClick={addPregnancySection}
          >
            <HiPlus className="inline" />
            <Typography>Add more</Typography>
          </div>

          {pastPregnancySections.map((section) => (
            <div
              key={section.id}
              className="flex gap-8 justify-center items-center mt-4"
            >
              <Typography>
                Pregnancy <span>{section.id}</span>
              </Typography>
              <TextField
                className="rounded"
                size="small"
                label="Gender"
                value={section.gender || ""}
                name={`gender_${section.id}`}
                onChange={(e) => {
                  handleInputChange(e);
                  handlePregnancyInputChange(
                    section.id,
                    "gender",
                    e.target.value
                  );
                }}
              />
              <TextField
                className="rounded"
                size="small"
                label="Result"
                value={section.result || ""}
                name={`result_${section.id}`}
                onChange={(e) => {
                  handleInputChange(e);
                  handlePregnancyInputChange(
                    section.id,
                    "result",
                    e.target.value
                  );
                }}
              />
              <IconButton onClick={() => removePregnancySection(section.id)}>
                <AiOutlineClose />
              </IconButton>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <Typography variant="h6">{t("subtitle1.3")}</Typography>
          <div
            className="flex items-center gap-2 text-primary-purple cursor-pointer"
            onClick={addFamilySection}
          >
            <HiPlus className="inline" />
            <Typography>Add more</Typography>
          </div>
          {familyMethods.map((familyMethod) => (
            <div
              key={familyMethod.id}
              className="flex gap-8 justify-center items-center mt-4"
            >
              <TextField
                className="rounded"
                size="small"
                label="Method"
                value={familyMethod.method || ""}
                name={`method_${familyMethod.id}`}
                onChange={(e) => {
                  handleInputChange(e);
                  handleFamilyInputChange(
                    familyMethod.id,
                    "method",
                    e.target.value
                  );
                }}
              />
              <TextField
                className="rounded"
                size="small"
                label="Accepted Date"
                type="date"
                value={familyMethod.date || ""}
                name={`date_${familyMethod.id}`}
                onChange={(e) => {
                  handleInputChange(e);
                  handleFamilyInputChange(
                    familyMethod.id,
                    "date",
                    e.target.value
                  );
                }}
                InputLabelProps={{ shrink: true }}
              />
              <IconButton onClick={() => removeFamilySection(familyMethod.id)}>
                <AiOutlineClose />
              </IconButton>
            </div>
          ))}
        </div>
      </div>

      {/* more details layer */}
      <div>
        <Typography variant="h5">{t("subtitle2")}</Typography>
        <div>
          <Typography variant="h6">{t("subtitle2.1")}</Typography>
          <div className="grid eligible-form grid-rows-5 gap-x-20 gap-y-5">
            <Typography className="col-start-2 text-center">Woman</Typography>
            <Typography className="text-center">Man</Typography>

            <Typography variant="body1">1. Weight (kg)</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              type="number"
              value={formData.womanWeight || ""}
              name="womanWeight"
              onChange={handleInputChange}
              error={errors.womanWeight ? true : false}
              helperText={errors.womanWeight ? errors.womanWeight : ""}
            ></TextField>
            <TextField
              className="rounded"
              size="small"
              type="number"
              value={formData.manWeight || ""}
              name="manWeight"
              onChange={handleInputChange}
              error={errors.manWeight ? true : false}
              helperText={errors.manWeight ? errors.manWeight : ""}
            ></TextField>

            <Typography variant="body1">2. Height (cm)</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              type="number"
              value={formData.womanHeight || ""}
              name="womanHeight"
              onChange={handleInputChange}
              error={errors.womanHeight ? true : false}
              helperText={errors.womanHeight ? errors.womanHeight : ""}
            ></TextField>
            <TextField
              className="rounded"
              size="small"
              type="number"
              value={formData.manHeight || ""}
              name="manHeight"
              onChange={handleInputChange}
              error={errors.manHeight ? true : false}
              helperText={errors.manHeight ? errors.manHeight : ""}
            ></TextField>

            <Typography variant="body1">3. BMI</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              type="number"
              value={formData.womanBmi || ""}
              name="womanBmi"
              onChange={handleInputChange}
              error={errors.womanBmi ? true : false}
              helperText={errors.womanBmi ? errors.womanBmi : ""}
            ></TextField>
            <TextField
              className="rounded"
              size="small"
              type="number"
              value={formData.manBmi || ""}
              name="manBmi"
              onChange={handleInputChange}
              error={errors.manBmi ? true : false}
              helperText={errors.manBmi ? errors.manBmi : ""}
            ></TextField>

            <Typography variant="body1">4. Blood Type</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              value={formData.womanBloodType || ""}
              name="womanBloodType"
              onChange={handleInputChange}
              error={errors.womanBloodType ? true : false}
              helperText={errors.womanBloodType ? errors.womanBloodType : ""}
            ></TextField>
            <TextField
              className="rounded"
              size="small"
              value={formData.manBloodType || ""}
              name="manBloodType"
              onChange={handleInputChange}
              error={errors.manBloodType ? true : false}
              helperText={errors.manBloodType ? errors.manBloodType : ""}
            ></TextField>

            <Typography variant="body1">5. Hemoglobin level</Typography>
            <TextField
              required
              className="rounded"
              size="small"
              type="number"
              value={formData.womanHemoglobin || ""}
              name="womanHemoglobin"
              onChange={handleInputChange}
              error={errors.womanHemoglobin ? true : false}
              helperText={errors.womanHemoglobin ? errors.womanHemoglobin : ""}
            ></TextField>
            <TextField
              className="rounded"
              size="small"
              type="number"
              value={formData.manHemoglobin || ""}
              name="manHemoglobin"
              onChange={handleInputChange}
              error={errors.manHemoglobin ? true : false}
              helperText={errors.manHemoglobin ? errors.manHemoglobin : ""}
            ></TextField>
          </div>
        </div>

        <div className="mt-24">
          <Typography variant="h6">{t("subtitle2.2")}</Typography>
          <TextField
            name="special"
            value={formData.special || ""}
            onChange={handleInputChange}
            className="rounded"
            sx={{ width: "100%" }}
          ></TextField>
        </div>
        <div className="mt-24">
          <Typography variant="h6">{t("subtitle2.3")}</Typography>
          <TextField
            name="session"
            value={formData.session || ""}
            onChange={handleInputChange}
            className="rounded"
            sx={{ width: "100%" }}
          ></TextField>
        </div>
      </div>

      <div className="flex justify-center mt-16">
        <Button className="px-20 text-lg" onClick={handleSubmit}>
          {t("submit")}
        </Button>
      </div>
    </div>
  );
};

export default addCouples;
