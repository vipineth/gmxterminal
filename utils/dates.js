import BigNumber from 'bignumber.js';

import Numeral from 'numeral';
import format from 'date-fns/format';

import fromUnixTime from 'date-fns/fromUnixTime';
import { cloneDeep } from 'lodash';
import { ethers } from 'ethers';

export const toK = (num) => {
  return '$' + Numeral(num).format('0,0.[00]a');
};

export const toKWithoutDollar = (num) => {
  return Numeral(num).format('0,0.[00]a');
};

export const toNiceDateYear = (date) => {
  if (isNaN(Number(date))) {
    return '';
  }
  return format(fromUnixTime(date), 'MMMM dd, yyy');
};
export const toNiceDateHourMinutes = (date) => {
  if (isNaN(Number(date))) {
    return '';
  }
  return format(fromUnixTime(date), 'Pp');
};
export const toNiceDateInWords = (date) => {
  if (isNaN(Number(date))) {
    return '';
  }
  return format(fromUnixTime(date), 'ccc, do MMM - H:m aaa');
};

export const toNiceDate = (date) => {
  if (isNaN(Number(date))) {
    return '';
  }
  return format(fromUnixTime(date), 'd MMM');
};
export const getSmallAddress = (address, width = 5) => {
  if (!address) return;
  return address.slice(0, width) + '...' + address.slice(-width);
};

export function getBigNumber(value) {
  return new BigNumber(value).shiftedBy(18).toString();
}

export function bigNumberify(n) {
  return new BigNumber(n);
}

export function getSmallNumber(value) {
  return new BigNumber(value).shiftedBy(-18).decimalPlaces(2).toNumber();
}

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function percentageDifference(a, b) {
  let difference = 100 * Math.abs((a - b) / ((a + b) / 2));
  if (a > b) {
    return difference;
  } else {
    return -difference;
  }
}

export function numberWithCommas(x) {
  return Number(x)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function calculateStats(stats) {
  if (!stats) return [];
  let copy = cloneDeep(stats);
  let firstWeek = copy.sort(() => -1).splice(1, 7);
  let secondWeek = copy.splice(1, 7);

  let firstWeekData = firstWeek.reduce(
    (acc, cv) => {
      return {
        totalVolume: acc.totalVolume.plus(cv.volumeUSD),
        totalFee: acc.totalFee.plus(cv.feesUSD),
        totalTrades: acc.totalTrades + Number(cv.tradeCount),
      };
    },
    {
      totalVolume: new BigNumber(0),
      totalFee: new BigNumber(0),
      totalTrades: 0,
    }
  );
  let secondWeekData = secondWeek.reduce(
    (acc, cv) => {
      return {
        totalVolume: acc.totalVolume.plus(cv.volumeUSD),
        totalFee: acc.totalFee.plus(cv.feesUSD),
        totalTrades: acc.totalTrades + Number(cv.tradeCount),
      };
    },
    {
      totalVolume: new BigNumber(0),
      totalFee: new BigNumber(0),
      totalTrades: 0,
    }
  );
  let presentWeek = {
    volume: firstWeekData.totalVolume.toNumber() / 7,
    fee: getSmallNumber(firstWeekData.totalFee) / 7,
    trades: Math.floor(firstWeekData.totalTrades / 7),
  };
  let prevWeek = {
    volume: secondWeekData.totalVolume.toNumber() / 7,
    fee: getSmallNumber(secondWeekData.totalFee) / 7,
    trades: Math.floor(secondWeekData.totalTrades / 7),
  };

  let allVolume = BigNumber.sum(...stats.map((t) => t.volumeUSD)).toNumber();

  return [presentWeek, prevWeek, allVolume];
}

export function getUserStatsInfo(userStats) {
  if (userStats) {
    return [
      {
        label: 'Total Trade Volume',
        amount: toK(getSmallNumber(userStats.totalVolume)),
      },
      {
        label: 'Total Number of Trades',
        amount: numberWithCommas(userStats.totalTrades),
      },
      {
        label: 'Total PnL (Excluding Fees)',
        amount: toK(getSmallNumber(userStats.totalPnL)),
      },
    ];
  }
}

export function isAddress(address = '') {
  if (address) {
    let trimmedAddress = address.trim();
    return /^(0x){1}[0-9a-fA-F]{40}$/i.test(trimmedAddress);
  }
}

export function isBrowser() {
  return ![typeof window, typeof document].includes('undefined');
}
export async function addAmmInfo() {
  const response = await fetch(
    `https://metadata.perp.exchange/production.json`
  );
  const {
    layers: { layer2 },
  } = await response.json();

  let names = Object.keys(layer2?.contracts).reduce((acc, cv) => {
    if (cv.endsWith('USDC')) {
      acc[layer2.contracts[cv].address.toLowerCase()] = {
        symbol: cv.replace('USDC', ''),
        address: layer2.contracts[cv].address.toLowerCase(),
      };
      return acc;
    }
    return acc;
  }, {});
  if (isBrowser()) {
    localStorage.setItem('perp-info', JSON.stringify(names));
  }
}

export const usdcIcon =
  'https://assets.trustwalletapp.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png';
