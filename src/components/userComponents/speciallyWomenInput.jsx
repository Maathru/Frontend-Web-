import YesNoButton from "./yesNoButton";
import MinHeightTextarea from "./minHeightTextarea";

const SpeciallyWomenInput = ({
  title,
  index,
  placeholder,
  value1,
  value2,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 items-center mt-4">
      <div className="w-fit">
        {index >= 0 ? (
          `${index + 1}. ${title}`
        ) : (
          <ul className="list-disc ps-8">
            <li>{title}</li>
          </ul>
        )}
      </div>
      <YesNoButton onChange={(e) => onChange("woman", e)} value={value1} />

      <MinHeightTextarea
        value={value2}
        placeholder={placeholder}
        disabled={false}
        onChange={(e) => onChange("other", e.target.value)}
      />
    </div>
  );
};

export default SpeciallyWomenInput;
