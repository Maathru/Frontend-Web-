import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiChevronLeft, HiPlus } from "react-icons/hi";
import {
  Typography,
  TextField,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import EligibleService from "@/service/eligibleService";
import { errorType, Toast } from "@/components/toast";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Heading from "@/components/ui/heading";

const addCouples = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, eligibleId } = useParams();
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
  const editMode =
    location.pathname.split("/")[2] === "add" ||
    location.pathname.split("/")[2] === "edit";
  const { t } = useTranslation("eligibleCouplesAdd");

  const addPregnancySection = () => {
    if (!editMode) return;

    setPastPregnancySections([
      ...pastPregnancySections,
      { id: pastPregnancySections.length + 1, gender: "", result: "" },
    ]);
  };
  const addFamilySection = () => {
    if (!editMode) return;

    setFamilyMethods([
      ...familyMethods,
      { id: familyMethods.length + 1, method: "", date: "" },
    ]);
  };

  const removePregnancySection = (id) => {
    if (!editMode) return;

    setPastPregnancySections(
      pastPregnancySections.filter((section) => section.id !== id)
    );
  };
  const removeFamilySection = (id) => {
    if (!editMode) return;

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
          userId
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

        const data = error.response.data;
        console.log(data);
        Toast(data || "Error occurred", errorType.ERROR);
      }
    };

    fetchEligibleInfoForMidwife();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editMode) return;

    const validationErrors = validate();

    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    const formObject = EligibleService.createMidwifeEligibleObject(
      userId,
      formData,
      pastPregnancySections,
      familyMethods
    );

    try {
      const response = await EligibleService.createEligibleInfo(formObject);
      Toast(response, errorType.SUCCESS);
      navigate(`/eligible/view/${userId}/${eligibleId}`);
    } catch (error) {
      console.log(error.message);

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
          Toast(data || "Error occurred", errorType.ERROR);
        }
      }
    }
  };

  const title =
    location.pathname.split("/")[2] === "view"
      ? `View Eligible Couple - ID ${eligibleId}`
      : location.pathname.split("/")[2] === "edit"
      ? `Edit Eligible Couple - ID ${eligibleId}`
      : "Add New Eligible Couple";

  return (
    <div className="content-container">
      <Heading title={title} />

      {/* main details layer */}
      <div>
        <div className="flex justify-between">
          <Typography variant="h5">{t("subtitle1")}</Typography>

          {/* If view page move to edit page */}
          {!editMode && (
            <Link to={`/eligible/edit/${userId}/${eligibleId}`}>
              <Button className="px-10">Edit</Button>
            </Link>
          )}
        </div>
        <div className="">
          <Typography variant="h6">{t("subtitle1.1")}</Typography>
          <div className="grid eligible-form grid-rows-9 gap-x-20 gap-y-5">
            <Typography className="col-start-2 text-center">Woman</Typography>
            <Typography className="text-center">Man</Typography>

            <Typography variant="body1">1. Name</Typography>
            <TextField
              required
              disabled={!editMode}
              className="rounded"
              size="small"
              value={formData.womanName || ""}
              name="womanName"
              onChange={handleInputChange || ""}
              error={errors.womanName ? true : false}
              helperText={errors.womanName ? errors.womanName : ""}
            ></TextField>
            <TextField
              disabled={!editMode}
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
              disabled={!editMode}
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
              disabled={!editMode}
              className="rounded"
              size="small"
              value={formData.womanPhone || ""}
              name="womanPhone"
              onChange={handleInputChange}
              error={errors.womanPhone ? true : false}
              helperText={errors.womanPhone ? errors.womanPhone : ""}
            ></TextField>
            <TextField
              disabled={!editMode}
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
              disabled={!editMode}
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
              disabled={!editMode}
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
              disabled={!editMode}
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
              disabled={!editMode}
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
              disabled={!editMode}
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
              disabled={!editMode}
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
              disabled={!editMode}
              className="rounded"
              size="small"
              value={formData.womanOccupation || ""}
              name="womanOccupation"
              onChange={handleInputChange}
              error={errors.womanOccupation ? true : false}
              helperText={errors.womanOccupation ? errors.womanOccupation : ""}
            ></TextField>
            <TextField
              disabled={!editMode}
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
              disabled={!editMode}
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
          {editMode && (
            <div
              className="flex items-center gap-2 text-primary-purple cursor-pointer"
              onClick={addPregnancySection}
            >
              <HiPlus className="inline" />
              <Typography>Add more</Typography>
            </div>
          )}

          {pastPregnancySections.map((section) => (
            <div
              key={section.id}
              className="flex gap-8 justify-center items-end mt-4"
            >
              <Typography>
                Pregnancy <span>{section.id}</span>
              </Typography>

              {/* <TextField
                disabled={!editMode}
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
                    e.target.value.toUpperCase()
                  );
                }}
              /> */}

              <FormControl>
                <InputLabel
                  id="district-select-label"
                  sx={{
                    position: "relative",
                    top: 20,
                  }}
                >
                  Select gender
                </InputLabel>
                <Select
                  disabled={!editMode}
                  size="small"
                  label="Select Gender"
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
                  sx={{
                    width: "15rem",
                    padding: 0.5,
                    borderRadius: "30px",
                  }}
                >
                  <MenuItem value="MALE">MALE</MenuItem>
                  <MenuItem value="FEMALE">FEMALE</MenuItem>
                </Select>
              </FormControl>

              <TextField
                disabled={!editMode}
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
              {editMode && (
                <IconButton onClick={() => removePregnancySection(section.id)}>
                  <AiOutlineClose />
                </IconButton>
              )}
            </div>
          ))}
        </div>

        <div className="mt-24">
          <Typography variant="h6">{t("subtitle1.3")}</Typography>

          {editMode && (
            <div
              className="flex items-center gap-2 text-primary-purple cursor-pointer"
              onClick={addFamilySection}
            >
              <HiPlus className="inline" />
              <Typography>Add more</Typography>
            </div>
          )}

          {familyMethods.map((familyMethod) => (
            <div
              key={familyMethod.id}
              className="flex gap-8 justify-center items-center mt-4"
            >
              <TextField
                disabled={!editMode}
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
                disabled={!editMode}
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

              {editMode && (
                <IconButton
                  onClick={() => removeFamilySection(familyMethod.id)}
                >
                  <AiOutlineClose />
                </IconButton>
              )}
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
              disabled={!editMode}
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
              disabled={!editMode}
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
              disabled={!editMode}
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
              disabled={!editMode}
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
              disabled={!editMode}
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
              disabled={!editMode}
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
              disabled={!editMode}
              className="rounded"
              size="small"
              value={formData.womanBloodType || ""}
              name="womanBloodType"
              onChange={handleInputChange}
              error={errors.womanBloodType ? true : false}
              helperText={errors.womanBloodType ? errors.womanBloodType : ""}
            ></TextField>
            <TextField
              disabled={!editMode}
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
              disabled={!editMode}
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
              disabled={!editMode}
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
            disabled={!editMode}
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
            disabled={!editMode}
            name="session"
            value={formData.session || ""}
            onChange={handleInputChange}
            className="rounded"
            sx={{ width: "100%" }}
          ></TextField>
        </div>
      </div>

      {editMode && (
        <div className="flex justify-center mt-16">
          <Button className="px-20 text-lg" onClick={handleSubmit}>
            {t("submit")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default addCouples;
