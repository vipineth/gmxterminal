import {
  ChartBarIcon,
  ChartPieIcon,
  ScaleIcon,
} from '@heroicons/react/outline';
import AddTitle from 'components/common/AddTitle';
import { formatAmount } from 'utils/format';

export default function Overview({ data }) {
  return (
    <AddTitle title="Overview">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          label="Total Traded Volume"
          value={data.totalVolume}
          icon={ChartBarIcon}
        />
        <Card label="Total PnL" value={data.totalPnl} icon={ScaleIcon} />
        <Card
          label="Total Fee Paid"
          value={data.totalFees}
          icon={ChartPieIcon}
        />
      </div>
    </AddTitle>
  );
}

function Card(props) {
  return (
    <div className="overflow-hidden shadow rounded-lg bg-white">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <props.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {props.label}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  $ {formatAmount(props.value, 30, 2, true)}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          {/* <a
            href={'#'}
            className="font-medium text-cyan-700 hover:text-cyan-900"
          >
            View all
          </a> */}
        </div>
      </div>
    </div>
  );
}
