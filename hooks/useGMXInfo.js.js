import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { bigNumberify, getSmallNumber } from "utils/dates";
import { formatAmount } from "utils/format";
import { getGmxPrice } from "utils/query";
import { fetcher, uniswapFetcher } from "./fetcher";
import { GMX_SUPPLY, TOKENS_URL } from "./urls";

let GMX_ETH_POOL = "0x80a9ae39310abf666a87c743d6ebbd0e8c42158e"; // GMXETH Uniswap Pool

export default function useGMXInfo() {
  let { data: gmxSupply } = useSWRImmutable(GMX_SUPPLY, fetcher);
  let { data: tokens } = useSWRImmutable(TOKENS_URL, fetcher);
  let { data: gmxPrice } = useSWR(
    [tokens ? getGmxPrice : null, GMX_ETH_POOL],
    (q, v) => uniswapFetcher(q, { address: v })
  );

  if (gmxPrice && tokens) {
    let gmxInfo = gmxPrice?.pools[0].token1;
    let ethPrice = tokens.find(({ data }) => data.symbol === "ETH")?.data
      .maxPrice;

    let updatedInfo = {
      ...gmxInfo,
      priceInEth: gmxInfo.derivedETH,
      priceInUSD: bigNumberify(gmxInfo.derivedETH).multipliedBy(ethPrice),
    };
    gmxPrice = updatedInfo;
  }

  return {
    gmxSupply,
    gmxPrice,
    marketCap:
      gmxSupply &&
      gmxPrice &&
      bigNumberify(formatAmount(gmxSupply, 18)).multipliedBy(
        formatAmount(gmxPrice?.priceInUSD, 30)
      ),
  };
}
