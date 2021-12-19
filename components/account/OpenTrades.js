import BigNumber from 'bignumber.js';
import AddTitle from 'components/common/AddTitle';
import useTokens from 'hooks/useTokens';
import { toNiceDateYear } from 'utils/dates';
import { compareTwoStrings, formatAmount, sortWithKey } from 'utils/format';
import { formatOpenTrades } from 'utils/reformat';
import NoTrade from './NoTrade';

export default function OpenTrades({ data }) {
  let formattedData = sortWithKey(formatOpenTrades(data), 'openDate');
  if (formattedData.length < 1) {
    return <NoTrade />;
  }

  return (
    <AddTitle title="Open Trades">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Asset
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Entry Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Volume
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Entry Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formattedData.map((trade) => (
                    <Trade key={trade.id} {...trade} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AddTitle>
  );
}

function Trade(props) {
  let { tokens } = useTokens();
  let currentTokenInfo = tokens.find(({ address }) =>
    compareTwoStrings(address, props.indexToken)
  );

  if (!currentTokenInfo) {
    return 'Loading';
  }

  return (
    <tr key={props.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src={currentTokenInfo.icon}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {currentTokenInfo.name}
            </div>
            <div className="text-sm text-gray-500">
              {currentTokenInfo.symbol}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          $ {formatAmount(props.entryPrice, 30, 2, true)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          <div className="text-sm text-gray-900">
            $ {formatAmount(props.volume, 30, 2, true)}
          </div>
          <div className="text-sm text-gray-500">
            {new BigNumber(props.volume)
              .dividedBy(props.entryPrice)
              .toFixed(2) +
              ' ' +
              currentTokenInfo.symbol}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {toNiceDateYear(props.openDate)}
      </td>
    </tr>
  );
}
