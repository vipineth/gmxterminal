import AvatarGenerator from 'components/common/AvatarGenerator';
import { gmxVaultFetcher } from 'hooks/fetcher';
import useSWRImmutable from 'swr/immutable';
import { getSmallAddress } from 'utils/dates';
import { formatAmount } from 'utils/format';
import { getTopTraders } from 'utils/query';
import Link from 'next/link';

export default function AddressList() {
  let { data } = useSWRImmutable(getTopTraders, gmxVaultFetcher);

  if (!data?.accountAggregations) {
    return '';
  }
  return (
    <div className="mt-16 md:mt-32">
      <div class="mx-auto text-left md:max-w-lg lg:max-w-2xl md:text-center">
        <h3 class="text-2xl text-center font-bold leading-tight text-black md:text-4xl lg:leading-tight">
          Check out the most
          <span class="relative inline-block">
            <span class="absolute inline-block w-full h-2 bg-pink-300 bottom-1.5"></span>
            <span class="relative">profitable traders of all time! </span>
          </span>
        </h3>
      </div>
      <section className="mt-12 block sm:grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.accountAggregations.map((trader, index) => (
          <Card key={trader.id} {...trader} rank={index + 1} />
        ))}
      </section>
    </div>
  );
}

function Card({ id, totalRealisedPnl, rank }) {
  return (
    <div className="mt-5 bg-white rounded-xl sm:mt-0 relative">
      <div className="px-6 py-8">
        <div className="flex items-start">
          <span className="w-10 h-10 rounded-full bg-gray-900 inline-flex justify-center items-center text-md text-white">
            {rank}
          </span>
          <div className="ml-5">
            <Link href={`/account/${id}`}>
              <a className="underline cursor-pointer">
                <h3 className="text-lg font-bold text-gray-900 font-pj">
                  {getSmallAddress(id, 8)}
                </h3>
              </a>
            </Link>

            <p className="mt-3 text-base text-gray-900 font-pj border py-1 px-2">
              Total Profit: $ {formatAmount(totalRealisedPnl, 30, 2, true)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
