import { chain, sortBy, sumBy } from 'lodash';
import { useMemo } from 'react';
import useSWR from 'swr';
import { getDailyFees } from 'utils/query';
import { gmxStatsFetcher } from './fetcher';

const NOW_TS = parseInt(Date.now() / 1000);
const FIRST_DATE_TS = parseInt(+new Date(2021, 7, 31) / 1000);
const MOVING_AVERAGE_DAYS = 7;
const MOVING_AVERAGE_PERIOD = 86400 * MOVING_AVERAGE_DAYS;

export function useFeesData({ from = FIRST_DATE_TS, to = NOW_TS } = {}) {
  const PROPS = 'margin liquidation swap mint burn'.split(' ');

  let { data: feesData, error } = useSWR(
    [getDailyFees(), { to: NOW_TS }],
    (q, v) => gmxStatsFetcher(q, v)
  );

  const feesChartData = useMemo(() => {
    if (!feesData) {
      return null;
    }

    let chartData = sortBy(feesData.feeStats, 'id').map(item => {
      const ret = { timestamp: item.timestamp || item.id };

      PROPS.forEach(prop => {
        if (item[prop]) {
          ret[prop] = item[prop] / 1e30;
        }
      });

      ret.liquidation = item.marginAndLiquidation / 1e30 - item.margin / 1e30;
      ret.all = PROPS.reduce((memo, prop) => memo + ret[prop], 0);
      return ret;
    });

    let cumulative = 0;
    const cumulativeByTs = {};
    return chain(chartData)
      .groupBy(item => item.timestamp)
      .map((values, timestamp) => {
        const all = sumBy(values, 'all');
        cumulative += all;

        let movingAverageAll;
        const movingAverageTs = timestamp - MOVING_AVERAGE_PERIOD;
        if (movingAverageTs in cumulativeByTs) {
          movingAverageAll =
            (cumulative - cumulativeByTs[movingAverageTs]) /
            MOVING_AVERAGE_DAYS;
        }

        const ret = {
          timestamp: Number(timestamp),
          all,
          cumulative,
          movingAverageAll
        };
        PROPS.forEach(prop => {
          ret[prop] = sumBy(values, prop);
        });
        cumulativeByTs[timestamp] = cumulative;
        return ret;
      })
      .value()
      .filter(item => item.timestamp >= from);
  }, [feesData]);

  return [feesChartData, !error && !feesData, error];
}
