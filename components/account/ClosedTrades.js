import {
  ArrowSmDownIcon,
  ArrowUpIcon,
  CashIcon,
  ChevronRightIcon,
  MailIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from '@heroicons/react/outline';
import A from 'components/common/A';
import AddTitle from 'components/common/AddTitle';
import useTokens from 'hooks/useTokens';
import { classNames } from 'utils/config';
import { getSmallAddress, toNiceDateYear } from 'utils/dates';
import { compareTwoStrings, formatAmount, sortWithKey } from 'utils/format';
import Badge from './Badge';

const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800',
};

export default function ClosedTrades({ data }) {
  return (
    <AddTitle title="Closed Trades">
      {/* <Mobile data={data} /> */}
      <Desktop data={data} />
    </AddTitle>
  );
}

function Mobile({ data }) {
  let { tokens } = useTokens();
  let sortedTrades = sortWithKey(data, 'closedDate');

  return (
    <div className="shadow sm:hidden">
      <ul
        role="list"
        className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
      >
        {sortedTrades.map((trade) => {
          let currentTokenInfo = tokens.find(({ address }) =>
            compareTwoStrings(address, trade.indexToken)
          );
          if (!currentTokenInfo) return '';
          return (
            <li key={trade.id}>
              <span className="flex items-center space-x-4">
                <span className="flex-1 flex space-x-2 truncate">
                  <img
                    src={currentTokenInfo.icon}
                    className="w-5 h-5 rounded-full"
                  />
                  <p className="text-gray-500 group-hover:text-gray-900">
                    {currentTokenInfo.symbol}
                  </p>
                  {/* <Badge isLong={trade.isLong} /> */}
                  <span className="flex flex-col text-gray-500 text-sm truncate">
                    <span className="truncate">{currentTokenInfo.name}</span>
                    <span>
                      <span className="text-gray-900 font-medium">
                        $ {formatAmount(trade.entryPrice, 30, 2, true)}
                      </span>{' '}
                      $ {formatAmount(trade.entryPrice, 30, 2, true)}
                    </span>
                    <time>
                      {' '}
                      $ {formatAmount(trade.entryPrice, 30, 2, true)}
                    </time>
                  </span>
                </span>
                <ChevronRightIcon
                  className="flex-shrink-0 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </li>
          );
        })}
      </ul>

      <nav
        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
        aria-label="Pagination"
      >
        <div className="flex-1 flex justify-between">
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
          >
            Previous
          </a>
          <a
            href="#"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
          >
            Next
          </a>
        </div>
      </nav>
    </div>
  );
}

function Desktop({ data }) {
  let { tokens } = useTokens();
  let sortedData = sortWithKey(data, 'closedDate');

  return (
    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Asset
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Entry Price
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Size
            </th>
            <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
              PnL
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Exit Price
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tx Hash
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((trade) => (
            <DesktopCard {...trade} tokens={tokens} />
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      {/* <nav
        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">10</span> of{' '}
            <span className="font-medium">20</span> results
          </p>
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </a>
        </div>
      </nav> */}
    </div>
  );
}

function DesktopCard(props) {
  let currentTokenInfo = props.tokens.find(({ address }) =>
    compareTwoStrings(address, props.indexToken)
  );
  if (!currentTokenInfo) return '';
  return (
    <tr
      key={props.id}
      className={`${props.type === 'Liquidated' ? 'bg-red-50' : 'bg-white'}`}
    >
      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-700">
        <div className="flex">
          <div className="group inline-flex space-x-2 text-sm">
            <img src={currentTokenInfo.icon} className="w-5 h-5 rounded-full" />
            <p className="text-gray-500 group-hover:text-gray-900">
              {currentTokenInfo.symbol}
            </p>
            <Badge isLong={props.isLong} />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
        <span className="text-gray-900 font-medium">
          $ {formatAmount(props.entryPrice, 30, 2, true)}
        </span>
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
        <span className="text-gray-900 font-medium">
          $ {formatAmount(props.volume, 30, 2, true)}
        </span>
      </td>
      <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
        <span
          className={classNames(
            'inline-flex items-center px-2.5 py-0.5 rounded-sm text-sm font-medium',
            props.pnl > 0 ? 'bg-green-100' : 'bg-red-100'
          )}
        >
          {props.pnl > 0 ? (
            <TrendingUpIcon
              className={classNames(
                '-ml-0.5 mr-1.5 h-5 w-5',
                props.pnl > 0 ? 'text-green-700' : 'text-red-700'
              )}
            />
          ) : (
            <TrendingDownIcon
              className={classNames(
                '-ml-0.5 mr-1.5 h-5 w-5',
                props.pnl > 0 ? 'text-green-500' : 'text-red-500'
              )}
            />
          )}
          $ {formatAmount(props.pnl, 30, 0, true)}
        </span>
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
        <span className="text-gray-900 font-medium">
          $ {formatAmount(props.exitPrice, 30, 2, true)}
        </span>
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
        <time dateTime={props.openDate}>{toNiceDateYear(props.openDate)}</time>
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
        <A className="" href={`https://arbiscan.io/tx/${props.txHash}`}>
          {getSmallAddress(props.txHash, 8)}
        </A>
      </td>
    </tr>
  );
}
