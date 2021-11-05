import { groupBy } from "lodash";
import { useState } from "react";
import useSWR from "swr";
import {
  bigNumberify,
  getSmallAddress,
  getSmallNumber,
  toK,
} from "utils/dates";
import { formatAmount } from "utils/format";
import { getHourlyFees, getTVL } from "utils/query";
import { fetcher, gmxStatsFetcher } from "./fetcher";
import { TOTAL_VOLUME } from "./urls";

function getTotalVolumeSum(volumes) {
  if (!volumes || volumes.length === 0) {
    return;
  }

  let volume = bigNumberify(0);
  for (let i = 0; i < volumes.length; i++) {
    volume = volume.plus(volumes[i].data.volume);
  }

  return volume;
}

export default function useTotalData() {
  let { data: totalVolumeList } = useSWR(TOTAL_VOLUME, fetcher);
  let { data: hourlyFees } = useSWR(getHourlyFees, gmxStatsFetcher);
  let { data: tvl } = useSWR(getTVL, gmxStatsFetcher);

  let initialValue = {
    burn: bigNumberify(0),
    liquidation: bigNumberify(0),
    margin: bigNumberify(0),
    mint: bigNumberify(0),
    swap: bigNumberify(0),
  };
  let totalFees;

  if (hourlyFees) {
    let final = hourlyFees?.f1.concat(hourlyFees.f2).reduce((acc, v) => {
      let keys = Object.keys(v).filter((a) => a !== "id");
      keys.forEach((key) => {
        acc[key] = acc[key]?.plus(v[key]);
      });
      return acc;
    }, initialValue);

    totalFees = Object.values(final).reduce((a, b) => a.plus(b));
  }

  return {
    volume: formatAmount(getTotalVolumeSum(totalVolumeList), 30, 0, true),
    fees: formatAmount(totalFees, 30, 0, true),
    tvl: formatAmount(tvl?.hourlyGlpStats[0]?.aumInUsdg, 18, 0, true),
  };
}
