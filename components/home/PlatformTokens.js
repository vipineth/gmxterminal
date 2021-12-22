import { InformationCircleIcon } from '@heroicons/react/outline';
import AddTitle from 'components/common/AddTitle';
import useGLPStats from 'hooks/useGLPStats';
import useGMXInfo from 'hooks/useGMXInfo.js';
import { toK, toKWithoutDollar } from 'utils/dates';
import { formatAmount } from 'utils/format';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// flex items-center space-x-4 p-6 md:px-10 md:py-6  rounded-b-xl leading-6 font-semibold

export default function PlatformTokens() {
  let { gmxSupply, gmxPrice, marketCap } = useGMXInfo();
  let { glpSupply, tvl, price } = useGLPStats();

  return (
    <AddTitle title="Platform Tokens">
      <div className="rounded-lg overflow-hidden divide-y sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-x-4">
        <section
          className="bg-white text-gray-800"
          aria-labelledby="achart-tooltip"
        >
          <div className="sm:rounded-lg">
            <div className="px-4 py-3 sm:px-6 flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div className="flex">
                <h2
                  id="achart-tooltip"
                  className="text-lg leading-6 font-medium mr-2"
                >
                  GMX
                </h2>
                <InformationCircleIcon className="w-5 h-5" />
              </div>
              <div className="ml-4 flex-shrink-0">
                <a
                  target="_blank"
                  href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a"
                >
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Buy GMX Now
                  </button>
                </a>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid gap-x-4 gap-y-6 grid-cols-2">
                <div className="sm:col-span-1">
                  <div className="inline-flex items-center">
                    <span className="p-2 w-2 inline-block mr-2 bg-gray-800"></span>
                    <dt className="text-sm font-medium text-gray-500">
                      Price in USD:
                    </dt>
                  </div>
                  <dd className="mt-1 text-sm text-gray-900">
                    $ {formatAmount(gmxPrice?.priceInUSD, 30, 2, true)}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <div className="inline-flex items-center">
                    <span className="p-2 w-2 inline-block mr-2 bg-gray-800"></span>
                    <dt className="text-sm font-medium text-gray-500">
                      Price in ETH:
                    </dt>
                  </div>
                  <dd className="mt-1 text-sm text-gray-900">
                    {Number(gmxPrice?.priceInEth).toFixed(4)} ETH
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <div className="inline-flex items-center">
                    <span className="p-2 w-2 inline-block mr-2 bg-gray-800"></span>
                    <dt className="text-sm font-medium text-gray-500">
                      Total Supply:
                    </dt>
                  </div>
                  <dd className="mt-1 text-sm text-gray-900">
                    {toKWithoutDollar(formatAmount(gmxSupply, 18, 2, true))}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <div className="inline-flex items-center">
                    <span className="p-2 w-2 inline-block mr-2 bg-gray-800"></span>
                    <dt className="text-sm font-medium text-gray-500">
                      Market Cap:
                    </dt>
                  </div>
                  <dd className="mt-1 text-sm text-gray-900">
                    {toK(formatAmount(marketCap, null, 2, true))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
        <section
          className="bg-white text-gray-800"
          aria-labelledby="achart-tooltip"
        >
          <div className="sm:rounded-lg">
            <div className="px-4 py-3 sm:px-6 flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div className="flex">
                <h2
                  id="achart-tooltip"
                  className="text-lg leading-6 font-medium mr-2"
                >
                  GLP
                </h2>
                <InformationCircleIcon className="w-5 h-5" />
              </div>
              <div className="ml-4 flex-shrink-0">
                <a target="_blank" href="https://gmx.io/buy_glp">
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Buy GLP Now
                  </button>
                </a>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid gap-x-4 gap-y-6 grid-cols-2">
                <div className="sm:col-span-1">
                  <div className="inline-flex items-center">
                    <span className="p-2 w-2 inline-block mr-2 bg-gray-800"></span>
                    <dt className="text-sm font-medium text-gray-500">
                      Price of GLP:
                    </dt>
                  </div>
                  <dd className="mt-1 text-sm text-gray-900">
                    $ {formatAmount(price, null, 2, true)}
                  </dd>
                </div>

                <div className="sm:col-span-1">
                  <div className="inline-flex items-center">
                    <span className="p-2 w-2 inline-block mr-2 bg-gray-800"></span>
                    <dt className="text-sm font-medium text-gray-500">
                      Current Supply:
                    </dt>
                  </div>
                  <dd className="mt-1 text-sm text-gray-900">
                    {toKWithoutDollar(formatAmount(glpSupply, 18, 2, true))}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <div className="inline-flex items-center">
                    <span className="p-2 w-2 inline-block mr-2 bg-gray-800"></span>
                    <dt className="text-sm font-medium text-gray-500">
                      Market Cap
                    </dt>
                  </div>
                  <dd className="mt-1 text-sm text-gray-900">
                    {toK(formatAmount(tvl, 18, 2, true))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </div>
    </AddTitle>
  );
}
