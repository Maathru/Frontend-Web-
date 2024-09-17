import { Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import SingleInput from "@/components/userComponents/singleInput";
import YesNoButton from "@/components/userComponents/yesNoButton";
import { birth1 } from "@/data/pregnancyData";

const ChildBirth = ({ handleChange }) => {
  const [record, setRecord] = useState({});

  const setData = (name, value) => {
    const newObject = {};
    newObject[name] = value || "";
    setRecord((prevState) => ({ ...prevState, ...newObject }));
  };

  console.log(record);

  const handleSave = (e) => {
    localStorage.setItem("birth", JSON.stringify(record));
    handleChange(e, 3);
  };

  const initiateFields = () => {
    const initialData = {};

    birth1.forEach((birth) => {
      initialData[birth.name] = "";
    });

    initialData.pregnancyResult = "";
    initialData.pregnancyStatus = "";
    initialData.complicationsCracked = "";
    initialData.complicationsPostpartumBleeding = "";
    initialData.complicationsTrappedAura = "";
    initialData.complicationsCuts = "";
    initialData.complicationsLongDelivery = "";
    initialData.complicationsOther = "";
    initialData.vitaminADose = "";
    initialData.rubellaVaccine = "";
    initialData.childSex = "";
    initialData.birthWeight = "";
    initialData.prematureBirth = "";
    initialData.complicationsAtBirth = "";
    initialData.mothersDeath = "";
    initialData.mothersDeathDate = "";
    initialData.mothersDeathCause = "";
    initialData.investigated = "";

    return initialData;
  };

  useEffect(() => {
    const getFromLocalStorage = () => {
      const jsonString = localStorage.getItem("birth");
      if (jsonString) {
        return JSON.parse(jsonString);
      }
      return {};
    };

    const obj1 = initiateFields();
    const obj2 = getFromLocalStorage();
    setRecord((prevRecord) => ({
      ...prevRecord,
      ...obj1,
      ...obj2,
    }));
  }, []);

  return (
    <div className="">
      <h2 className="font-semibold text-2xl mb-4">
        Pregnancy Records | Child Birth Related
      </h2>

      {birth1.map((birth, index) => (
        <SingleInput
          key={index}
          title={birth.title}
          index={index}
          placeholder={birth.placeholder}
          value={record[birth.name] || ""}
          onChange={(e) => {
            setData(birth.name, e);
          }}
          type={birth.type}
        />
      ))}

      {/* Result of Pregnancy */}
      <div className="grid grid-cols-3 gap-4 items-center mt-4">
        <p className="w-fit">4. Result of Pregnancy</p>
        <Select
          value={record.pregnancyResult || ""}
          onChange={(e) => setData("pregnancyResult", e.target.value)}
          className="w-96"
        >
          <MenuItem value="Live birth">Live birth</MenuItem>
          <MenuItem value="Death Birth">Death Birth</MenuItem>
          <MenuItem value="Abortion">Abortion</MenuItem>
        </Select>
      </div>

      {/* Status of Pregnancy */}
      <div className="grid grid-cols-3 gap-4 items-center mt-4">
        <p className="w-fit">5. Status of Pregnancy</p>
        <Select
          value={record.pregnancyStatus || ""}
          onChange={(e) => setData("pregnancyStatus", e.target.value)}
          className="w-96"
        >
          <MenuItem value="Normal">Normal</MenuItem>
          <MenuItem value="LessMonths">Less Months</MenuItem>
          <MenuItem value="Cesarean">Cesarean</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </div>

      {/* Obstetric Complications */}
      <h3 className="font-semibold text-xl mb-4 mt-10">
        Obstetric Complications
      </h3>

      <div className="grid grid-cols-2 gap-2 items-center mt-4">
        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <div className="w-fit">
            <span>1. Cracked Around</span>
          </div>
          <YesNoButton
            onChange={(e) => setData("complicationsCracked", e)}
            value={record.complicationsCracked || ""}
          />
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <div className="w-fit">
            <span>2. Postpartum Bleeding</span>
          </div>
          <YesNoButton
            onChange={(e) => setData("complicationsPostpartumBleeding", e)}
            value={record.complicationsPostpartumBleeding || ""}
          />
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <div className="w-fit">
            <span>3. The Trapped Aura</span>
          </div>
          <YesNoButton
            onChange={(e) => setData("complicationsTrappedAura", e)}
            value={record.complicationsTrappedAura || ""}
          />
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <div className="w-fit">
            <span>4. Any Cuts Around</span>
          </div>
          <YesNoButton
            onChange={(e) => setData("complicationsCuts", e)}
            value={record.complicationsCuts || ""}
          />
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <div className="w-fit">
            <span>5. Long Delivery</span>
          </div>
          <YesNoButton
            onChange={(e) => setData("complicationsLongDelivery", e)}
            value={record.complicationsLongDelivery || ""}
          />
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <div className="w-fit">
            <span>6. Other Complications</span>
          </div>
          <YesNoButton
            onChange={(e) => setData("complicationsOther", e)}
            value={record.complicationsOther || ""}
          />
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <div className="w-fit">
            <span>7. Vitamin A Dose</span>
          </div>
          <YesNoButton
            onChange={(e) => setData("vitaminADose", e)}
            value={record.vitaminADose || ""}
          />
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <div className="w-fit">
            <span>8. Rubella Vaccine</span>
          </div>
          <YesNoButton
            onChange={(e) => setData("rubellaVaccine", e)}
            value={record.rubellaVaccine || ""}
          />
        </div>
      </div>

      {/* Child Details */}
      <h3 className="font-semibold text-xl my-4">Child Details</h3>

      <SingleInput
        title="Child's Sex"
        index={0}
        placeholder="Enter child's sex"
        value={record.childSex || ""}
        onChange={(e) => {
          setData("childSex", e);
        }}
      />

      <SingleInput
        title="Birth Weight"
        index={1}
        placeholder="Enter birth weight"
        value={record.birthWeight || ""}
        onChange={(e) => {
          setData("birthWeight", e);
        }}
        type="number"
      />

      <div className="grid grid-cols-4 gap-4 items-center mt-4">
        <div className="w-fit">
          <span>3. Premature Birth</span>
        </div>
        <YesNoButton
          onChange={(e) => setData("prematureBirth", e)}
          value={record.prematureBirth || ""}
        />
      </div>

      <div className="grid grid-cols-4 gap-4 items-center mt-4">
        <div className="w-fit">
          <span>4. Complications at Birth</span>
        </div>
        <YesNoButton
          onChange={(e) => setData("complicationsAtBirth", e)}
          value={record.complicationsAtBirth || ""}
        />
      </div>

      <h3 className="font-semibold text-xl my-4">Mother Dead</h3>

      <div className="grid grid-cols-4 gap-4 items-center mt-4">
        <div className="w-fit">
          <span>1. Mother Dead </span>
        </div>
        <YesNoButton
          title="Mother's Death"
          value={record.mothersDeath || ""}
          onChange={(e) => setData("mothersDeath", e)}
        />
      </div>

      {record.mothersDeath && (
        <>
          <SingleInput
            title="Mother's Death Date"
            index={1}
            value={record.mothersDeathDate || ""}
            onChange={(e) => {
              setData("mothersDeathDate", e);
            }}
            type="date"
          />

          <SingleInput
            title="Mother's Death Cause"
            index={2}
            value={record.mothersDeathCause || ""}
            onChange={(e) => {
              setData("mothersDeathCause", e);
            }}
          />

          <div className="grid grid-cols-4 gap-4 items-center mt-4">
            <div className="w-fit">
              <span>3. Investigated</span>
            </div>
            <YesNoButton
              onChange={(e) => setData("investigated", e)}
              value={record.investigated || ""}
            />
          </div>
        </>
      )}

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="bg-primary-purple text-white py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ChildBirth;
