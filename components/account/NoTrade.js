export default function NoTrade() {
  return (
    <div className="bg-white mt-8 border">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-8 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
          <span className="block">No Open Trades!</span>
          <span className="block text-pink-600">
            Would you like to open a position?
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="cursor-pointer inline-flex items-center justify-center px-10 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700"
            >
              Trade
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
