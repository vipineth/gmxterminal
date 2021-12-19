import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddressList from './AddressList';

export default function UserSearch(props) {
  let [searchAddress, setSearchAddress] = useState('');
  let router = useRouter();

  useEffect(() => {
    setSearchAddress(router.query.address);
  }, [router.query.address]);

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 font-pj">
            Search trader by address⚡️
          </h2>
          <p className="max-w-md mx-auto mt-5 text-base font-normal text-gray-600 font-pj">
            With lots of unique blocks, you can easily build a page without
            coding. Build your next landing page.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto mt-14">
          <div className="absolute -inset-x-2 -inset-y-5">
            <div
              className="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter"
              style={{
                background: `linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)`,
              }}
            ></div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/account/${searchAddress}`);
            }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Enter ethereum address ..."
              className="block w-full px-5 py-6 text-base font-normal text-black placeholder-gray-600 bg-white border border-gray-300 rounded-xl focus:border-black focus:ring-1 focus:ring-black font-pj focus:outline-none"
              value={searchAddress}
              onChange={({ target }) => setSearchAddress(target.value)}
            />
            <div className="mt-4 sm:mt-0 sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:items-center sm:pr-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent sm:w-auto sm:py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-opacity-90 rounded-xl"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <AddressList />
      </div>
    </section>
  );
}
