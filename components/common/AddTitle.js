function AddTitle({ children, title }) {
  return (
    <>
      <h2 className="mt-6 mb-4 text-lg leading-6 font-medium text-gray-900">
        {title}
      </h2>
      {children}
    </>
  );
}

export default AddTitle;
