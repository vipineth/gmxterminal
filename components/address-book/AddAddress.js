import useLocalStorage from 'hooks/useLocalStorage';
import { useState } from 'react';
import { isAddress } from 'utils/dates';
import AddressbookList from './AddressbookList';

export default function AddAddress(props) {
  let [addresses, setAddresses] = useLocalStorage('gmx-watchlist', []);
  let [address, setAddress] = useState('');

  function handleSubmit(e) {
    if (isAddress(address)) {
      let isDuplicate = addresses.includes(address.toLowerCase());
      if (isDuplicate) {
        alert('The address already exists!');
      } else {
        setAddresses((addresses) => addresses.concat(address.toLowerCase()));
      }
      setAddress('');
    } else {
      alert('Not a valid ETH address!');
    }
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 font-pj">
            Add awesome traders to your watchlist 📚
          </h2>
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
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="Enter ethereum address ..."
              className="block w-full px-5 py-6 text-base font-normal text-black placeholder-gray-600 bg-white border border-gray-300 rounded-xl focus:border-black focus:ring-1 focus:ring-black font-pj focus:outline-none"
              value={address}
              onChange={({ target }) => setAddress(target.value)}
            />
            <div className="mt-4 sm:mt-0 sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:items-center sm:pr-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-12 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent sm:w-auto sm:py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-opacity-90 rounded-xl"
              >
                ADD
              </button>
            </div>
          </form>
        </div>
        {addresses?.length > 0 && <AddressbookList data={addresses} />}
      </div>
    </section>
  );
}
