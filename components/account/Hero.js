import {
  CheckCircleIcon,
  ClipboardCheckIcon,
  ClipboardCopyIcon,
  OfficeBuildingIcon,
  StarIcon,
} from '@heroicons/react/outline';
import AvatarGenerator from 'components/common/AvatarGenerator';
import { useEffect, useState } from 'react';
import useCopyToClipboard from 'react-use/lib/useCopyToClipboard';
import { getSmallAddress } from 'utils/dates';

export default function Hero({ address }) {
  let [clipboard, setClipboard] = useCopyToClipboard();
  let [copied, setCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCopied(!copied);
    }, 10000);
  }, [copied]);
  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="flex-1 min-w-0">
            {/* Profile */}
            <div className="flex items-center">
              <AvatarGenerator
                className="w-4 h-4 bg-gray-300 rounded-full flex-shrink-0"
                seed={address}
                size={16}
              />
              <div>
                <div className="flex items-center">
                  <h1
                    onClick={() => {
                      setClipboard(address);
                      setCopied(true);
                    }}
                    className="ml-3 text-2xl flex justify-center items-center font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate"
                  >
                    {getSmallAddress(address)}
                    {copied ? (
                      <ClipboardCheckIcon className="ml-6 h-6 w-6 text-gray-900" />
                    ) : (
                      <ClipboardCopyIcon className="ml-6 h-6 w-6 text-gray-500 hover:text-gray-900 cursor-pointer" />
                    )}
                  </h1>
                </div>
                <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                  <dd className="hidden sm:flex items-center text-xs text-gray-500 font-medium capitalize sm:mr-6 hover:underline cursor-pointer hover:text-pink-500">
                    {address}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4 mx-auto">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border-2 border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <StarIcon className="w-4 h-4" />
              </button>
              <a
                href={`https://arbiscan.io/address/${address}`}
                target="_blank"
                rel="noopener"
              >
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border-2 border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <img src="/images/arbiscan.png" className="w-4" alt="" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
