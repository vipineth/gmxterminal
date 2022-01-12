import {
  ChartBarIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  ReceiptTaxIcon,
  ScaleIcon
} from '@heroicons/react/outline';
import { CurrencyDollarIcon } from '@heroicons/react/solid';

import useTotalData from 'hooks/useTotalData';
import { Fragment, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false
});

const stats = [
  {
    name: 'Total Trading Volume',
    icon: ChartBarIcon,
    amount: '$30,659.45',
    tooltip: 'Total trading volume on the exchange'
  },
  {
    name: 'Assets Under Management',
    icon: LockClosedIcon,
    amount: '$309,525,100',
    tooltip: 'Total value controlled by the protocol (GLP pool)'
  },
  {
    name: 'Total Revenue',
    icon: ReceiptTaxIcon,
    amount: '$30,659.45',
    tooltip: 'Total revenue of the GMX platform'
  }
];

export default function Overview() {
  let { tvl, volume, fees, feesDelta } = useTotalData();

  let data = [volume, tvl, fees].map((d, i) => {
    return { ...stats[i], amount: d };
  });

  return (
    <Fragment>
      <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card */}
        {data.map((card, i) => (
          <div
            key={card.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <card.icon
                    className="h-8 w-8 text-gray-700"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <div className="inline-flex items-center pb-2">
                      <dt className="text-md font-medium text-gray-700 truncate">
                        {card.name}
                      </dt>

                      <QuestionMarkCircleIcon
                        data-tip
                        data-for={card.name}
                        className="w-4 h-4 ml-2"
                      />

                      <ReactTooltip lace="right" id={card.name} effect="solid">
                        <span>{card.tooltip}</span>
                      </ReactTooltip>
                    </div>
                    <dd>
                      <div className="text-lg font-boldya text-gray-900 inline-flex items-center">
                        <CurrencyDollarIcon className="w-6 h-6 mr-1 text-green-500" />{' '}
                        {card.amount}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                {/* <a className="font-medium text-cyan-700 hover:text-cyan-900">
                  View all
                </a> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
