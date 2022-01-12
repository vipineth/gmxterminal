import { groupBy } from 'lodash';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import {
  bigNumberify,
  getSmallAddress,
  getSmallNumber,
  toK
} from 'utils/dates';
import { formatAmount } from 'utils/format';
import { getHourlyFees, getTotalFees, getTVL } from 'utils/query';
import { fetcher, gmxStatsFetcher } from './fetcher';
import { TOTAL_VOLUME } from './urls';
import { useFeesData } from './useFeesData';

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
  //   let { data: fees } = useSWR(getTotalFees, gmxStatsFetcher);
  let { data: tvl } = useSWR(getTVL, gmxStatsFetcher);
  const [feesData, feesLoading] = useFeesData();
  const [totalFees, totalFeesDelta] = useMemo(() => {
    if (!feesData) {
      return [];
    }
    const total = feesData[feesData.length - 1]?.cumulative;
    const delta = total - feesData[feesData.length - 2]?.cumulative;
    return [total, delta];
  }, [feesData]);
  console.log({ totalFees });

  return {
    volume: formatAmount(getTotalVolumeSum(totalVolumeList), 30, 0, true),
    fees: formatAmount(totalFees, 0, 0, true),
    feesDelta: formatAmount(totalFeesDelta, 0, 0, true),
    tvl: formatAmount(tvl?.hourlyGlpStats[0]?.aumInUsdg, 18, 0, true)
  };
}
