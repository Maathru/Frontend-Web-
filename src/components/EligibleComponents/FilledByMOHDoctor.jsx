import { examinations } from "@/data/eligibleData";
import Eligible5Input from "../userComponents/eligible4Input";
import MinHeightTextarea from "../userComponents/minHeightTextarea";
import { TextField } from "@mui/material";

const FilledByMOHDoctor = ({ formObject }) => {
  return (
    <>
      <ul className="list-disc mt-12">
        <li>This Section was filled by the MOH Doctor.</li>
      </ul>

      <div className="grid grid-cols-4 gap-4 items-center mt-4">
        <p></p>
        <p></p>
        <p className="text-center">Wife</p>
        <p className="text-center">Husband</p>
      </div>
      <div className="grid grid-cols-4 gap-4 items-center mt-4">
        <p>1. General Examination</p>
        <p></p>
        <div className="mx-auto">
          <TextField
            disabled
            size="small"
            className="w-48 shadow-xl"
            variant="standard"
          />
        </div>
        <div className="mx-auto">
          <TextField
            disabled
            size="small"
            className="w-48 shadow-lg"
            variant="standard"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 items-center mt-4">
        <p>2. Brest</p>
        <p></p>
        <div className="mx-auto">
          <TextField
            disabled
            size="small"
            className="w-48 shadow-xl"
            variant="standard"
          />
        </div>
      </div>

      {examinations.map((examination, index) => (
        <Eligible5Input title={examination} index={index + 2} key={index} />
      ))}

      <ul className="list-disc mt-12">
        <li>Observations and conclusions of the doctor</li>
      </ul>
      <MinHeightTextarea cols={3} />

      <ul className="list-disc mt-12">
        <li>References</li>
      </ul>
      <MinHeightTextarea cols={2} />

      <ul className="list-disc mt-12">
        <li>Follow ups</li>
      </ul>
      <MinHeightTextarea cols={2} />
    </>
  );
};

export default FilledByMOHDoctor;
