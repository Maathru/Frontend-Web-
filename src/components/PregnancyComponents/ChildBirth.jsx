import { Select, MenuItem } from "@mui/material";
import { useState } from "react";
import SingleInput from "@/components/userComponents/singleInput"; 
import YesNoButton from "@/components/userComponents/yesNoButton"; 

const ChildBirth = ({ formObject, setFormObject, handleChangeMainDetails }) => {
  const [birthPlace , setBirthPlace] = useState("");

  const [dob, setDob] = useState("");
  const [dateReleased, setDateReleased] = useState("");
  const [doneBy, setDoneBy] = useState("");
  const [pregnancyResult, setPregnancyResult] = useState(formObject.pregnancyResult || "");
  const [pregnancyStatus, setPregnancyStatus] = useState(formObject.pregnancyStatus || "");

  const [childSex, setChildSex] = useState("");
  const [birthWeight, setBirthWeight] = useState("");

  const [mothersDeath, setMothersDeath] = useState(false);
  const [mothersDeathDate, setMothersDeathDate] = useState("");
  const [mothersDeathCause, setMothersDeathCause] = useState("");
  const [investigated, setInvestigated] = useState(false);

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

  const handleSave = (e) => {
    const record = {
      birthPlace,
      dob,
      dateReleased,
      doneBy,
      pregnancyStatus,
      pregnancyResult,
      childSex,
      birthWeight,
      mothersDeath,
      mothersDeathDate,
      mothersDeathCause,
      investigated,
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
    };

    localStorage.setItem("pregnancyRecord", JSON.stringify(record));
    handleChangeMainDetails(e, 4); 
  };

  return (
    <div className="overflow-y-scroll max-h-screen p-4">
      <h2 className="font-semibold text-2xl mb-4">Pregnancy Records | Child Birth Related</h2>
      
      {/* Mother's Name */}
      <SingleInput
        title="Birth Place"
        index={0}
        placeholder="Enter birth place"
        value={birthPlace}
        onChange={setBirthPlace}
      />

      {/* Date */}
      <SingleInput
        title="Date of Birth"
        index={1}
        value={dob}
        onChange={setDob}
        type="date"
      />

      {/* Date Released */}
      <SingleInput
        title="Date Released"
        index={2}
        value={dateReleased}
        onChange={setDateReleased}
        type="date"
      />

      {/* Done By */}
      <SingleInput
        title="Done By"
        index={3}
        value={doneBy}
        onChange={setDoneBy}
      />


      {/* Result of Pregnancy */}
      <div className="grid grid-cols-3 gap-4 items-center mt-4">
        <p className="w-fit">4. Result of Pregnancy</p>
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

      {/* Status of Pregnancy */}
      <div className="grid grid-cols-3 gap-4 items-center mt-4">
        <p className="w-fit">5. Status of Pregnancy</p>
        <Select
          value={pregnancyStatus}
          onChange={(e) => setPregnancyStatus(e.target.value)}
          className="w-96"
        >
          <MenuItem value="Normal">Normal</MenuItem>
          <MenuItem value="LessMonths">Less Months</MenuItem>
          <MenuItem value="Cesarean">Cesarean</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </div>


      {/* Obstetric Complications */}
    <h3 className="font-semibold text-xl mb-4 mt-10">Obstetric Complications</h3>

    <div className="grid grid-cols-2 gap-2 items-center mt-4">

    <div className="grid grid-cols-4 gap-4 items-center mt-4">
      <div className="w-fit">
          <span>1. Cracked Around</span>s
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

    </div>

    {/* Child Details */}
    <h3 className="font-semibold text-xl my-4">Child Details</h3>

    <SingleInput
      title="Child's Sex"
      index={0}
      placeholder="Enter child's sex"
      value={childSex}
      onChange={setChildSex}
    />

    <SingleInput
      title="Birth Weight"
      index={1}
      placeholder="Enter birth weight"
      value={birthWeight}
      onChange={setBirthWeight}
      type="number"
    />

    <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <div className="w-fit">
        <span>3. Premature Birth</span>
    </div>
    <YesNoButton onChange={(e) => setPrematureBirth(e)} value={prematureBirth} />
    </div>

    <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <div className="w-fit">
        <span>4. Complications at Birth</span>
    </div>
    <YesNoButton onChange={(e) => setComplicationsAtBirth(e)} value={complicationsAtBirth} />
    </div>

    <h3 className="font-semibold text-xl my-4">Mother Dead</h3>

    <div className="grid grid-cols-4 gap-4 items-center mt-4">
    <div className="w-fit">
        <span>1. Mother Dead </span>
    </div>
    <YesNoButton
        title="Mother's Death"
        value={mothersDeath}
        onChange={setMothersDeath}
      />
    </div>

    {mothersDeath && (
      <>
        <SingleInput
          title="Mother's Death Date"
          index={1}
          value={mothersDeathDate}
          onChange={setMothersDeathDate}
          type="date"
        />

        <SingleInput
          title="Mother's Death Cause"
          index={2}
          value={mothersDeathCause}
          onChange={setMothersDeathCause}
        />


      <div className="grid grid-cols-4 gap-4 items-center mt-4">
      <div className="w-fit">
          <span>3. Investigated</span>
      </div>
      <YesNoButton onChange={(e) => setInvestigated(e)} value={investigated} />
      </div>
    </>
    )}
    


      {/* Save Button */}
      <div className="mt-6">
        <button onClick={handleSave} className="bg-primary-purple text-white py-2 px-4 rounded">
          Save
        </button>
      </div>
    </div>
  );
};

export default ChildBirth;
