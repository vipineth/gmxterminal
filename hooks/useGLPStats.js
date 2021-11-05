import { gmxStatsFetcher } from "./fetcher";
import useSWRImmutable from "swr/immutable";
import { getGlpStats } from "utils/query";
import { bigNumberify } from "utils/dates";

export default function useGLPStats() {
  let { data: glpStats } = useSWRImmutable(getGlpStats, gmxStatsFetcher);
  if (glpStats) {
    var tvl = glpStats?.hourlyGlpStats[0].aumInUsdg;
    var glpSupply = glpStats?.hourlyGlpStats[0].glpSupply;
    var price = glpStats && bigNumberify(tvl).dividedBy(glpSupply);
  }
  return {
    glpSupply,
    tvl,
    price,
  };
}
