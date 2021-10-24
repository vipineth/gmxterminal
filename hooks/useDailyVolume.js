import { useMemo } from "react";
import { useRequest } from "./useFetch";

export function useDailyVolume() {
  const PROPS = "margin liquidation swap mint burn".split(" ");
  const [data, loading] = useRequest(
    "https://gmx-server-mainnet.uw.r.appspot.com/daily_volume",
    null,
    async (url) => {
      let after;
      const ret = [];
      while (true) {
        const res = await (
          await fetch(url + (after ? `?after=${after}` : ""))
        ).json();
        if (res.length === 0) return ret;
        ret.push(...res);
        after = res[res.length - 1].id;
      }
    }
  );

  const ret = useMemo(() => {
    if (!data) {
      return null;
    }

    const tmp = data.reduce((memo, item) => {
      let type;
      if (item.data.action === "Swap") {
        type = "swap";
      } else if (item.data.action === "SellUSDG") {
        type = "burn";
      } else if (item.data.action === "BuyUSDG") {
        type = "mint";
      } else if (item.data.action.includes("LiquidatePosition")) {
        type = "liquidation";
      } else {
        type = "margin";
      }
      const volume = Number(item.data.volume) / 1e30;
      const timestamp = item.data.timestamp;
      memo[timestamp] = memo[timestamp] || {};
      memo[timestamp][type] = memo[timestamp][type] || 0;
      memo[timestamp][type] += volume;
      return memo;
    }, {});

    let cumulative = 0;
    return Object.keys(tmp)
      .sort()
      .map((timestamp) => {
        const item = tmp[timestamp];
        let all = 0;
        PROPS.forEach((prop) => {
          if (item[prop]) all += item[prop];
        });
        cumulative += all;
        return {
          timestamp,
          all,
          cumulative,
          ...item,
        };
      });
  }, [data]);

  return [ret, loading];
}
