import { Select, MenuItem } from "@mui/material";
import { useState } from "react";
import SingleInput from "@/components/userComponents/singleInput"; // Import the SingleInput component
import YesNoButton from "@/components/userComponents/yesNoButton"; // Import the YesNoButton component

const ChildBirth = ({ formObject, setFormObject, handleChangeMainDetails }) => {
  // Individual state variables for each detail
  const [motherName, setMotherName] = useState(formObject.motherName || "");
  const [date, setDate] = useState(formObject.date || "");
  const [pregnancyResult, setPregnancyResult] = useState(formObject.pregnancyResult || "");
  const [childSex, setChildSex] = useState("");
  const [mothersDeath, setMothersDeath] = useState(false);
  const [birthWeight, setBirthWeight] = useState("");
  const [childDate, setChildDate] = useState("");

  // Boolean fields for complications
  const [complicationsCracked, setComplicationsCracked] = useState(false);
  const [complicationsPostpartumBleeding, setComplicationsPostpartumBleeding] = useState(false);
  const [complicationsTrappedAura, setComplicationsTrappedAura] = useState(false);
  const [complicationsCuts, setComplicationsCuts] = useState(false);
  const [complicationsLongDelivery, setComplicationsLongDelivery] = useState(false);
  const [complicationsOther, setComplicationsOther] = useState(false);
  const [vitaminADose, setVitaminADose] = useState(false);
  const [rubellaVaccine, setRubellaVaccine] = useState(false);
  const [prematureBirth, setPrematureBirth] = useState(false);
  const [complicationsAtBirth, setComplicationsAtBirth] = useState(false);
  const [investigated, setInvestigated] = useState(false);

  const handleSave = (e) => {
    const record = {
      motherName,
      date,
      pregnancyResult,
      childSex,
      mothersDeath,
      birthWeight,
      childDate,
      complicationsCracked,
      complicationsPostpartumBleeding,
      complicationsTrappedAura,
      complicationsCuts,
      complicationsLongDelivery,
      complicationsOther,
      vitaminADose,
      rubellaVaccine,
      prematureBirth,
      complicationsAtBirth,
      investigated,
    };

    localStorage.setItem("pregnancyRecord", JSON.stringify(record));
    handleChangeMainDetails(e, 4); // Adjust the page number as necessary
  };

  return (
    <div className="overflow-y-scroll max-h-screen p-4">
      <h2 className="font-semibold text-2xl mb-4">Pregnancy Records | Child Birth Related</h2>
      
      {/* Mother's Name */}
      <SingleInput
        title="Mother’s Name"
        index={0}
        placeholder="Enter mother’s name"
        value={motherName}
        onChange={setMotherName}
      />

      {/* Date */}
      <SingleInput
        title="Date"
        index={1}
        value={date}
        onChange={setDate}
        type="date"
      />

      {/* Result of Pregnancy */}
      <div className="grid grid-cols-3 gap-4 items-center mt-4">
        <p className="w-fit">3. Result of Pregnancy</p>
        <Select
          value={pregnancyResult}
          onChange={(e) => setPregnancyResult(e.target.value)}
          className="w-96"
        >
          <MenuItem value="Live birth">Live birth</MenuItem>
          <MenuItem value="Death Birth">Death Birth</MenuItem>
          <MenuItem value="Abortion">Abortion</MenuItem>
        </Select>
      </div>

      {/* Child Details */}
      <h3 className="font-semibold text-xl mb-4">Child Details</h3>

      <SingleInput
        title="Child's Sex"
        index={2}
        placeholder="Enter child's sex"
        value={childSex}
        onChange={setChildSex}
      />

      <SingleInput
        title="Birth Weight"
        index={3}
        placeholder="Enter birth weight"
        value={birthWeight}
        onChange={setBirthWeight}
        type="number"
      />

    <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <div className="w-fit">
        <span>5. Mother's Dead </span>
    </div>
    <YesNoButton
        title="Mother's Death"
        value={mothersDeath}
        onChange={setMothersDeath}
      />
    </div>
    

      {/* Obstetric Complications */}
    <h3 className="font-semibold text-xl mb-4 mt-10">Obstetric Complications</h3>

    <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <div className="w-fit">
        <span>1. Cracked Around</span>
    </div>
    <YesNoButton onChange={(e) => setComplicationsCracked(e)} value={complicationsCracked} />
    </div>

    <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <div className="w-fit">
        <span>2. Postpartum Bleeding</span>
    </div>
    <YesNoButton onChange={(e) => setComplicationsPostpartumBleeding(e)} value={complicationsPostpartumBleeding} />
    </div>

    <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <div className="w-fit">
        <span>3. The Trapped Aura</span>
    </div>
    <YesNoButton onChange={(e) => setComplicationsTrappedAura(e)} value={complicationsTrappedAura} />
    </div>

    <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <div className="w-fit">
        <span>4. Any Cuts Around</span>
    </div>
    <YesNoButton onChange={(e) => setComplicationsCuts(e)} value={complicationsCuts} />
    </div>

    <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <div className="w-fit">
        <span>5. Long Delivery</span>
    </div>
    <YesNoButton onChange={(e) => setComplicationsLongDelivery(e)} value={complicationsLongDelivery} />
    </div>

    <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <div className="w-fit">
        <span>6. Other Complications</span>
    </div>
    <YesNoButton onChange={(e) => setComplicationsOther(e)} value={complicationsOther} />
    </div>

    <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <div className="w-fit">
        <span>7. Vitamin A Dose</span>
    </div>
    <YesNoButton onChange={(e) => setVitaminADose(e)} value={vitaminADose} />
    </div>

    <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <div className="w-fit">
        <span>8. Rubella Vaccine</span>
    </div>
    <YesNoButton onChange={(e) => setRubellaVaccine(e)} value={rubellaVaccine} />
    </div>

    <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <div className="w-fit">
        <span>9. Premature Birth</span>
    </div>
    <YesNoButton onChange={(e) => setPrematureBirth(e)} value={prematureBirth} />
    </div>

    <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <div className="w-fit">
        <span>10. Complications at Birth</span>
    </div>
    <YesNoButton onChange={(e) => setComplicationsAtBirth(e)} value={complicationsAtBirth} />
    </div>

    <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <div className="w-fit">
        <span>11. Investigated</span>
    </div>
    <YesNoButton onChange={(e) => setInvestigated(e)} value={investigated} />
    </div>


      {/* Save Button */}
      <div className="mt-6">
        <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">
          Save
        </button>
      </div>
    </div>
  );
};

export default ChildBirth;
