import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  LinkIcon,
  MenuAlt1Icon,
  SearchIcon,
} from '@heroicons/react/outline';
import { useWallet } from 'components/context/WalletContext';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { classNames } from 'utils/config';
import { getSmallAddress } from 'utils/dates';
import AvatarGenerator from './AvatarGenerator';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];
export default function Header({ sidebarOpen, setSidebarOpen, shadow = true }) {
  let wallet = useWallet();
  let [searchAddress, setSearchAddress] = useState('');
  let router = useRouter();

  return (
    <>
      <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
        <button
          type="button"
          className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        {/* Search bar */}
        <div className="flex-1 px-4 flex items-center justify-between sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
          <div className="flex-1 flex">
            <form
              className="w-full flex md:ml-0"
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/account/${searchAddress}`);
              }}
            >
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <div className="hidden sm:block relative w-full text-gray-400 focus-within:text-gray-600">
                <div
                  className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <SearchIcon className="h-5 w-5" aria-hidden="true" />
                </div>

                <input
                  id="search-field"
                  name="search-field"
                  className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                  placeholder="Enter users ETH address ..."
                  type="search"
                  value={searchAddress}
                  onChange={({ target }) => setSearchAddress(target.value)}
                />
              </div>
            </form>
          </div>
          {wallet.web3Provider ? (
            <LoggedIn wallet={wallet} />
          ) : (
            <button
              type="button"
              onClick={wallet?.connect}
              className="inline-flex items-center px-3 py-3 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <LinkIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Connect to a wallet
            </button>
          )}
        </div>
      </div>
      <div className="sm:hidden relative w-full text-gray-400 focus-within:text-gray-600">
        <div
          className="absolute inset-y-0 pl-4 left-0 flex items-center pointer-events-none"
          aria-hidden="true"
        >
          <SearchIcon className="h-5 w-5" aria-hidden="true" />
        </div>

        <input
          id="search-field"
          name="search-field"
          className="block w-full h-full pl-12 pr-3 py-4 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
          placeholder="Enter users ETH address ..."
          type="search"
          value={searchAddress}
          onChange={({ target }) => setSearchAddress(target.value)}
        />
      </div>
    </>
  );
}

function LoggedIn({ wallet }) {
  return (
    <div className="ml-4 flex items-center md:ml-6">
      {/* Profile dropdown */}
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
            <AvatarGenerator
              className="h-8 w-8 rounded-full"
              seed={wallet.address}
              size={8}
            />
            <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
              {getSmallAddress(wallet.address)}
            </span>
            <ChevronDownIcon
              className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  Your Profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  Settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  onClick={wallet.disconnect}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  Logout
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
