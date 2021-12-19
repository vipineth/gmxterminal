import Layout from 'components/common/Layout';
import { useRouter } from 'next/router';
import { getUserPositions } from 'utils/query';
import useSWR from 'swr';
import { gmxVaultFetcher } from 'hooks/fetcher';
import AddAddress from 'components/address-book/AddAddress';
import SEO from 'components/common/SEO';

function AccountIndex(props) {
  let {
    query: { address },
  } = useRouter();
  let { data: trades } = useSWR(
    [address ? getUserPositions : null, address],
    (q, v) => gmxVaultFetcher(q, { account: v.toLowerCase() })
  );

  return (
    <SEO
      title="Address Book"
      description="Add multiple users to your watchlist."
    >
      <Layout shadow={false}>
        <main className="flex-1 relative overflow-y-auto focus:outline-none max-w-7xl px-4 sm:px-6 md:px-10 py-4 pb-24 mx-auto">
          <AddAddress />
        </main>
      </Layout>
    </SEO>
  );
}

export default AccountIndex;
