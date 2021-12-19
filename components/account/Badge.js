export default function Badge({ isLong }) {
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium ${
        isLong ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {isLong ? 'LONG' : 'SHORT'}
    </span>
  );
}
