export default function MinHeightTextarea({ cols }) {
  return (
    <textarea
      aria-label="minimum height"
      rows={cols}
      disabled
      className="
        box-border
        w-full
        mt-4
        font-sans
        text-sm
        font-normal
        leading-6
        p-2
        rounded-lg
        text-gray-900
        bg-white
        border
        border-gray-200
        shadow-md
        hover:border-blue-400
        focus:border-blue-400
        focus:shadow-outline-blue
        focus:outline-none
        focus-visible:outline-none
        dark:text-gray-300
        dark:bg-gray-900
        dark:border-gray-700
        dark:hover:border-blue-600
      "
    />
  );
}
