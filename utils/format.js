import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { bigNumberify } from './dates';
import cloneDeep from 'lodash/cloneDeep';

export function numberWithCommas(x) {
  if (!x) {
    return '...';
  }
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export const limitDecimals = (amount, maxDecimals) => {
  let amountStr = amount.toString();
  if (maxDecimals === undefined) {
    return amountStr;
  }
  if (maxDecimals === 0) {
    return amountStr.split('.')[0];
  }
  const dotIndex = amountStr.indexOf('.');
  if (dotIndex !== -1) {
    let decimals = amountStr.length - dotIndex - 1;
    if (decimals > maxDecimals) {
      amountStr = amountStr.substr(
        0,
        amountStr.length - (decimals - maxDecimals)
      );
    }
  }
  return amountStr;
};
export const padDecimals = (amount, minDecimals) => {
  let amountStr = amount.toString();
  const dotIndex = amountStr.indexOf('.');
  if (dotIndex !== -1) {
    const decimals = amountStr.length - dotIndex - 1;
    if (decimals < minDecimals) {
      amountStr = amountStr.padEnd(
        amountStr.length + (minDecimals - decimals),
        '0'
      );
    }
  } else {
    amountStr = amountStr + '.00';
  }
  return amountStr;
};

export function expandDecimals(n, decimals) {
  return bigNumberify(n).multipliedBy(bigNumberify(10).pow(decimals));
}

export const formatAmount = (
  amount,
  tokenDecimals,
  displayDecimals = 2,
  useCommas,
  defaultValue
) => {
  if (!defaultValue) {
    defaultValue = '...';
  }
  if (amount === undefined || amount.toString().length === 0) {
    return defaultValue;
  }

  let amountStr = new BigNumber(amount)
    .shiftedBy(-tokenDecimals)
    .decimalPlaces(displayDecimals)
    .toString();
  amountStr = limitDecimals(amountStr, displayDecimals);
  if (displayDecimals !== 0) {
    amountStr = padDecimals(amountStr, 2);
  }
  if (useCommas) {
    return numberWithCommas(amountStr);
  }
  return amountStr;
};

export function compareTwoStrings(a, b) {
  return String(a).toLowerCase() === String(b).toLowerCase();
}
export function sortWithKey(data, key) {
  return cloneDeep(data).sort((a, b) => b[key] - a[key]);
}
