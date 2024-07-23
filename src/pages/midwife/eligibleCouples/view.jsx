import { useTranslation } from "react-i18next";
import PageHeading from "@/components/ui/pageHeading";
import { TextField, Typography } from "@mui/material";
import { HiPlus } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const viewEligibleCouple = () => {
  const { t } = useTranslation("eligibleCouplesView");
  const title = t("title");
  const [isDisabled, setIsDisabled] = useState(true);

  const edit = () => {
    setIsDisabled(false);
  };

  return (
    <div className="content-container">
      <PageHeading title={title} />

      {/* main details layer */}
      <div>
        <div className="flex justify-between">
          <Typography variant="h5">
            Couple ID: <span>C002</span>
          </Typography>

          <Button onClick={edit}>Edit Details</Button>
        </div>
        <div>
          <Typography variant="h6">{t("subtitle1.1")}</Typography>
          <div className="grid eligible-form grid-rows-9 gap-x-20 gap-y-5">
            <Typography className="col-start-2 text-center">Woman</Typography>
            <Typography className="text-center">Man</Typography>

            <Typography variant="body1">1. Name</Typography>
            <TextField
              disabled={isDisabled}
              required
              className="rounded"
              size="small"
              name="womanName"
              //   value={formData.womanName}
              //   onChange={handleInputChange}
              //   error={errors.womanName ? true : false}
              //   helperText={errors.womanName ? errors.womanName : ""}
            ></TextField>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              name="manName"
              //   value={formData.manName}
              //   onChange={handleInputChange}
              //   error={errors.manName ? true : false}
              //   helperText={errors.manName ? errors.manName : ""}
            ></TextField>

            <Typography variant="body1">2. Address</Typography>
            <TextField
              disabled
              required
              className="rounded col-span-2"
              size="small"
              name="address"
              //   value={formData.address}
              //   onChange={handleInputChange}
              //   error={errors.address ? true : false}
              //   helperText={errors.address ? errors.address : ""}
            ></TextField>

            <Typography variant="body1">3. Telephone Number</Typography>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              name="womanPhone"
              //   value={formData.womanPhone}
              //   onChange={handleInputChange}
              //   error={errors.womanPhone ? true : false}
              //   helperText={errors.womanPhone ? errors.womanPhone : ""}
            ></TextField>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              name="manPhone"
              //   value={formData.manPhone}
              //   onChange={handleInputChange}
              //   error={errors.manPhone ? true : false}
              //   helperText={errors.manPhone ? errors.manPhone : ""}
            ></TextField>

            <Typography variant="body1">4. Date of Birth</Typography>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              type="date"
              name="womanDob"
              //   value={formData.womanDob}
              //   onChange={handleInputChange}
              //   error={errors.womanDob ? true : false}
              //   helperText={errors.womanDob ? errors.womanDob : ""}
            ></TextField>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              type="date"
              name="manDob"
              //   value={formData.manDob}
              //   onChange={handleInputChange}
              //   error={errors.manDob ? true : false}
              //   helperText={errors.manDob ? errors.manDob : ""}
            ></TextField>

            <Typography variant="body1">5. Age married</Typography>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              name="womanAgeMarried"
              //   value={formData.womanAgeMarried}
              //   onChange={handleInputChange}
              //   error={errors.womanAgeMarried ? true : false}
              //   helperText={errors.womanAgeMarried ? errors.womanAgeMarried : ""}
            ></TextField>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              name="manAgeMarried"
              //   value={formData.manAgeMarried}
              //   onChange={handleInputChange}
              //   error={errors.manAgeMarried ? true : false}
              //   helperText={errors.manAgeMarried ? errors.manAgeMarried : ""}
            ></TextField>

            <Typography variant="body1">6. Highest Education Level </Typography>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              name="womanEducation"
              //   value={formData.womanEducation}
              //   onChange={handleInputChange}
              //   error={errors.womanEducation ? true : false}
              //   helperText={errors.womanEducation ? errors.womanEducation : ""}
            ></TextField>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              name="manEducation"
              //   value={formData.manEducation}
              //   onChange={handleInputChange}
              //   error={errors.manEducation ? true : false}
              //   helperText={errors.manEducation ? errors.manEducation : ""}
            ></TextField>

            <Typography variant="body1">7. Occupation</Typography>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              name="womanOccupation"
              //   value={formData.womanOccupation}
              //   onChange={handleInputChange}
              //   error={errors.womanOccupation ? true : false}
              //   helperText={errors.womanOccupation ? errors.womanOccupation : ""}
            ></TextField>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              name="manOccupation"
              //   value={formData.manOccupation}
              //   onChange={handleInputChange}
              //   error={errors.manOccupation ? true : false}
              //   helperText={errors.manOccupation ? errors.manOccupation : ""}
            ></TextField>

            <Typography variant="body1">
              8. Number of children alive (Ages)
            </Typography>
            <TextField
              disabled
              required
              className="rounded col-span-2"
              size="small"
              name="childred"
              //   value={formData.childred}
              //   onChange={handleInputChange}
              //   error={errors.childred ? true : false}
              //   helperText={errors.childred ? errors.childred : ""}
            ></TextField>
          </div>
        </div>

        <div className="mt-24">
          <Typography variant="h6">{t("subtitle1.2")}</Typography>
          <div className="flex items-center gap-2 text-primary-purple">
            <HiPlus className="inline" />
            <Typography>Add more</Typography>
          </div>
          <div className="flex gap-8 justify-center items-center">
            <Typography>
              Pergnancy <span>1</span>
            </Typography>
            <TextField
              disabled
              className="rounded"
              size="small"
              label="Gender"
            ></TextField>
            <TextField
              disabled
              className="rounded"
              size="small"
              label="Result"
            ></TextField>
          </div>
        </div>

        <div className="mt-24">
          <Typography variant="h6">{t("subtitle1.3")}</Typography>
          <div className="flex items-center gap-2 text-primary-purple">
            <HiPlus className="inline" />
            <Typography>Add more</Typography>
          </div>
          <div className="flex gap-8 justify-center items-center">
            <TextField
              disabled
              className="rounded"
              size="small"
              label="Method"
              sx={{
                width: "20%",
              }}
            ></TextField>
            <TextField
              disabled
              className="rounded"
              size="small"
              label="Accepted Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{
                width: "20%",
              }}
            ></TextField>
          </div>
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
              disabled
              required
              className="rounded"
              size="small"
              type="number"
              name="womanWeight"
              //   value={formData.womanWeight}
              //   onChange={handleInputChange}
              //   error={errors.womanWeight ? true : false}
              //   helperText={errors.womanWeight ? errors.womanWeight : ""}
            ></TextField>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              type="number"
              name="manWeight"
              //   value={formData.manWeight}
              //   onChange={handleInputChange}
              //   error={errors.manWeight ? true : false}
              //   helperText={errors.manWeight ? errors.manWeight : ""}
            ></TextField>

            <Typography variant="body1">2. Height (m)</Typography>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              type="number"
              name="womanHeight"
              //   value={formData.womanHeight}
              //   onChange={handleInputChange}
              //   error={errors.womanHeight ? true : false}
              //   helperText={errors.womanHeight ? errors.womanHeight : ""}
            ></TextField>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              type="number"
              name="manHeight"
              //   value={formData.manHeight}
              //   onChange={handleInputChange}
              //   error={errors.manHeight ? true : false}
              //   helperText={errors.manHeight ? errors.manHeight : ""}
            ></TextField>

            <Typography variant="body1">3. BMI</Typography>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              type="number"
              name="womanBmi"
              //   value={formData.womanBmi}
              //   onChange={handleInputChange}
              //   error={errors.womanBmi ? true : false}
              //   helperText={errors.womanBmi ? errors.womanBmi : ""}
            ></TextField>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              type="number"
              name="manBmi"
              //   value={formData.manBmi}
              //   onChange={handleInputChange}
              //   error={errors.manBmi ? true : false}
              //   helperText={errors.manBmi ? errors.manBmi : ""}
            ></TextField>

            <Typography variant="body1">4. Blood Type</Typography>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              name="womanBloodType"
              //   value={formData.womanBloodType}
              //   onChange={handleInputChange}
              //   error={errors.womanBloodType ? true : false}
              //   helperText={errors.womanBloodType ? errors.womanBloodType : ""}
            ></TextField>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              name="manBloodType"
              //   value={formData.manBloodType}
              //   onChange={handleInputChange}
              //   error={errors.manBloodType ? true : false}
              //   helperText={errors.manBloodType ? errors.manBloodType : ""}
            ></TextField>

            <Typography variant="body1">5. Hemoglobin level</Typography>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              type="number"
              name="womanHemoglobin"
              //   value={formData.womanHemoglobin}
              //   onChange={handleInputChange}
              //   error={errors.womanHemoglobin ? true : false}
              //   helperText={errors.womanHemoglobin ? errors.womanHemoglobin : ""}
            ></TextField>
            <TextField
              disabled
              required
              className="rounded"
              size="small"
              type="number"
              name="manHemoglobin"
              //   value={formData.manHemoglobin}
              //   onChange={handleInputChange}
              //   error={errors.manHemoglobin ? true : false}
              //   helperText={errors.manHemoglobin ? errors.manHemoglobin : ""}
            ></TextField>
          </div>
        </div>
        <div className="mt-24">
          <Typography variant="h6">{t("subtitle2.2")}</Typography>
          <TextField
            disabled
            className="rounded"
            sx={{ width: "100%" }}
          ></TextField>
        </div>
        <div className="mt-24">
          <Typography variant="h6">{t("subtitle2.3")}</Typography>
          <TextField
            disabled
            className="rounded"
            sx={{ width: "100%" }}
          ></TextField>
        </div>
      </div>

      <div className="flex justify-center mt-16">
        <Button className="px-20 text-lg">{t("save")}</Button>
      </div>
    </div>
  );
};

export default viewEligibleCouple;
