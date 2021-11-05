import { classNames, volumeFilterLabels } from "utils/config";

export default function VolumeChartFilter({ setActiveFilter, activeFilter }) {
  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      {Object.keys(volumeFilterLabels).map((label) => (
        <button
          type="button"
          key={label}
          onClick={() => setActiveFilter(label)}
          className={classNames(
            "relative inline-flex items-center px-4 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-200 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500",
            activeFilter === label && "bg-gray-800 text-white"
          )}
        >
          {volumeFilterLabels[label]}
        </button>
      ))}
    </span>
  );
}
