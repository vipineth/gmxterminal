import Hero from 'components/account/Hero';
import Layout from 'components/common/Layout';
import Overview from 'components/account/Overview';
import { useRouter } from 'next/router';
import { getOpenPositions, getUserPositions } from 'utils/query';
import useSWR from 'swr';
import { gmxVaultFetcher } from 'hooks/fetcher';
import OpenTrades from 'components/account/OpenTrades';
import ClosedTrades from 'components/account/ClosedTrades';
import Spinner from 'components/common/Spinner';
import {
  formatClosedTrades,
  formatLiquidatedTrades,
  formatOpenTrades,
  getTradersOverview,
} from 'utils/reformat';

function Account(props) {
  let {
    query: { address },
  } = useRouter();
  let { data: trades } = useSWR(
    [address ? getUserPositions : null, address],
    (q, v) => gmxVaultFetcher(q, { account: v.toLowerCase() })
  );

  if (!trades) {
    return (
      <Layout shadow={false}>
        <Spinner />
      </Layout>
    );
  }
  let {
    aggregatedTradeCloseds,
    aggregatedTradeOpens,
    aggregatedTradeLiquidateds,
    indexedAt,
    totalRealisedPnl,
  } = trades?.accountAggregation;

  let formattedLiquidated = formatLiquidatedTrades(aggregatedTradeLiquidateds);
  let formattedOpen = formatOpenTrades(aggregatedTradeOpens);
  let formattedCloasd = formatClosedTrades(aggregatedTradeCloseds);

  let allClosedTrades = formattedCloasd.concat(formattedLiquidated);
  let allTrades = formattedCloasd
    .concat(formattedLiquidated)
    .concat(formattedOpen);

  let overview = getTradersOverview(allTrades, totalRealisedPnl);
  return (
    <SEO>
      <Layout shadow={false}>
        <Hero address={address} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none max-w-7xl px-4 sm:px-6 md:px-10 py-4 pb-24 mx-auto">
          <Overview data={overview} />
          <OpenTrades data={aggregatedTradeOpens} />
          <ClosedTrades data={allClosedTrades} />
        </main>
      </Layout>
    </SEO>
  );
}

export default Account;
