import { sections } from "@/data/eligibleData";
import Eligible5Input from "../userComponents/eligible4Input";
import MinHeightTextarea from "../userComponents/minHeightTextarea";

const FilledByMidwife = ({ formObject }) => {
  return (
    <>
      <ul className="list-disc mt-12">
        <li>This Section was filled by the Midwife.</li>
      </ul>

      <div>
        <div className="grid grid-cols-4 gap-4 items-center mt-4">
          <p></p>
          <p></p>
          <p className="text-center">Wife</p>
          <p className="text-center">Husband</p>
        </div>

        {sections.map((section, index) => (
          <Eligible5Input
            title={section.title}
            index={index}
            key={index}
            value1={formObject[`woman${section.name}`]}
            value2={formObject[`man${section.name}`]}
          />
        ))}
      </div>

      <ul className="list-disc mt-12">
        <li>Special cases recognized by the midwife</li>
      </ul>
      <MinHeightTextarea cols={3} value={formObject.special || ""} />

      <ul className="list-disc mt-12">
        <li>Dates attended for counseling session</li>
      </ul>
      <MinHeightTextarea cols={3} value={formObject.session || ""} />
    </>
  );
};

export default FilledByMidwife;
