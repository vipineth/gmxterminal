import AvatarGenerator from 'components/common/AvatarGenerator';
import { gmxVaultFetcher } from 'hooks/fetcher';
import useSWRImmutable from 'swr/immutable';
import { getSmallAddress } from 'utils/dates';
import { formatAmount } from 'utils/format';
import { getTopTraders } from 'utils/query';
import Link from 'next/link';
import A from 'components/common/A';

export default function AddressbookList({ data }) {
  if (!data) {
    return '';
  }
  return (
    <div className="mt-16 md:mt-32">
      <div class="mx-auto text-left md:max-w-lg lg:max-w-2xl md:text-center">
        <h3 class="text-2xl text-center font-bold leading-tight text-black md:text-4xl lg:leading-tight">
          {'Addresses you are' + ' '}
          <span class="relative inline-block">
            <span class="absolute inline-block w-full h-2 bg-pink-300 bottom-1.5"></span>
            <span class="relative"> watching! </span>
          </span>
        </h3>
      </div>
      <section className="mt-12 block sm:grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((address) => (
          <Card key={address} address={address} />
        ))}
      </section>
    </div>
  );
}

function Card({ address }) {
  return (
    <div className="mt-5 bg-white rounded-xl sm:mt-0 relative">
      <div className="px-6 py-8">
        <div className="flex items-start">
          <AvatarGenerator seed={address} className="rounded-full" />

          <div className="ml-5">
            <Link href={`/account/${address}`}>
              <a className="underline cursor-pointer">
                <h3 className="text-lg font-bold text-gray-900 break-words">
                  {getSmallAddress(address, 8)}
                </h3>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
