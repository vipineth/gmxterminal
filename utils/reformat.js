import BigNumber from 'bignumber.js';
import { sortWithKey } from './format';

export function formatClosedTrades(trades = []) {
  return trades.map((trade) => {
    let {
      decreaseList,
      increaseList,
      account,
      initialPosition,
      initialPositionBlockTimestamp,
      settledPosition,
      updateList,
      id,
    } = trade;

    let fee = increaseList
      .concat(decreaseList)
      .map((t) => t.fee)
      .reduce((a, b) => new BigNumber(a).plus(b))
      .toNumber();

    return {
      id,
      account,
      indexToken: initialPosition.indexToken,
      entryPrice: initialPosition.price,
      exitPrice: initialPosition.isLong
        ? sortWithKey(decreaseList, 'indexedAt')[0].price
        : sortWithKey(decreaseList, 'indexedAt')[0].price,
      pnl: new BigNumber(settledPosition.realisedPnl).minus(fee),
      volume: settledPosition.size,
      openDate: initialPosition.indexedAt,
      closedDate: settledPosition.indexedAt,
      txHash: initialPosition.id.split('-')[1],
      isLong: initialPosition.isLong,
      type: 'Closed',
      fee: fee,
    };
  });
}
export function formatLiquidatedTrades(trades = []) {
  return trades.map((trade) => {
    let {
      decreaseList,
      increaseList,
      account,
      initialPosition,
      initialPositionBlockTimestamp,
      settledPosition,
      updateList,
    } = trade;
    return {
      id: initialPosition.id.split('-')[1],
      account,
      indexToken: initialPosition.indexToken,
      entryPrice: initialPosition.price,
      exitPrice: settledPosition.markPrice,
      pnl: `-${settledPosition.collateral}`,
      volume: settledPosition.size,
      openDate: initialPosition.indexedAt,
      closedDate: settledPosition.indexedAt,
      txHash: initialPosition.id.split('-')[1],
      isLong: initialPosition.isLong,
      type: 'Liquidated',
      fee: increaseList
        .concat(decreaseList)
        .map((t) => t.fee)
        .reduce((a, b) => new BigNumber(a).plus(b)),
    };
  });
}
export function formatOpenTrades(trades = []) {
  return trades.map((trade) => {
    let {
      decreaseList,
      increaseList,
      account,
      initialPosition,
      settledPosition,
      updateList,
    } = trade;
    return {
      id: initialPosition.id.split('-')[1],
      account,
      indexToken: initialPosition.indexToken,
      entryPrice: initialPosition.price,
      volume: sortWithKey(updateList, 'indexedAt')[0]?.size,
      openDate: initialPosition.indexedAt,
      txHash: initialPosition.id.split('-')[1],
      isLong: initialPosition.isLong,
      type: 'Open',
      fee: increaseList
        .concat(decreaseList)
        .map((t) => t.fee)
        .reduce((a, b) => new BigNumber(a).plus(b)),
    };
  });
}

export function getTradersOverview(trades, pnl) {
  return {
    totalPnl: new BigNumber(pnl).toNumber(),
    totalVolume: BigNumber.sum(...trades.map((t) => t.volume)).toNumber(),
    totalFees: BigNumber.sum(...trades.map((t) => t.fee)).toNumber(),
  };
}
