import { gql } from 'graphql-request';

export function getDailyFees() {
  return gql`
    query GetDailyFeeStats($to: Int!) {
      feeStats(
        first: 1000
        orderBy: id
        orderDirection: desc
        where: { period: daily, id_gte: 1630348200, id_lte: $to }
      ) {
        id
        margin
        marginAndLiquidation
        swap
        mint
        burn
      }
    }
  `;
}

export function getHourlyFees() {
  return gql`
    query HourlyFees {
      f1: hourlyFees(first: 1000, orderBy: id, orderDirection: desc) {
        id
        margin
        liquidation
        swap
        mint
        burn
      }
      f2: hourlyFees(
        first: 1000
        skip: 1000
        orderBy: id
        orderDirection: desc
      ) {
        id
        margin
        liquidation
        swap
        mint
        burn
      }
    }
  `;
}

export function getTVL() {
  return gql`
    query getTVL {
      hourlyGlpStats(first: 1, orderBy: id, orderDirection: desc) {
        id
        aumInUsdg
        glpSupply
      }
    }
  `;
}
export function getTopTraders() {
  return gql`
    query TopTraders {
      accountAggregations(
        first: 21
        orderBy: totalRealisedPnl
        orderDirection: desc
      ) {
        id
        totalRealisedPnl
      }
    }
  `;
}

export const getGmxPrice = gql`
  query getGmxPriceFromUniswap($address: String!) {
    pools(where: { id: $address }) {
      token1 {
        derivedETH
        decimals
        name
        symbol
      }
    }
  }
`;
export const getGlpStats = gql`
  query getStats($first: Int = 1) {
    hourlyGlpStats(orderBy: id, orderDirection: desc, first: $first) {
      id
      aumInUsdg
      glpSupply
    }
  }
`;
export const getOpenPositions = gql`
  query OpenPositions($account: String!) {
    aggregatedTradeOpens(where: { account: $account }) {
      id
      account
      decreaseList {
        id
        account
        collateralDelta
        collateralToken
        fee
        indexToken
        indexedAt
        isLong
        key
        price
        sizeDelta
      }
      increaseList {
        account
        collateralDelta
        id
        fee
        collateralToken
        sizeDelta
        price
        key
        isLong
        indexedAt
        indexToken
      }
      initialPosition {
        account
        id
        isLong
        price
        collateralDelta
        collateralToken
        fee
        indexToken
        indexedAt
        key
        sizeDelta
      }
      updateList {
        size
        collateral
        averagePrice
        entryFundingRate
        id
        indexedAt
        key
        realisedPnl
        reserveAmount
      }
    }
  }
`;
export const getUserPositions = gql`
  query AllPositions($account: String!) {
    accountAggregation(id: $account) {
      aggregatedTradeCloseds {
        account
        decreaseList {
          account
          collateralDelta
          collateralToken
          fee
          id
          indexToken
          indexedAt
          isLong
          key
          price
          sizeDelta
        }
        id
        increaseList {
          account
          collateralDelta
          collateralToken
          fee
          id
          indexToken
          indexedAt
          isLong
          key
          price
          sizeDelta
        }
        initialPosition {
          account
          collateralDelta
          collateralToken
          fee
          id
          indexToken
          indexedAt
          isLong
          key
          price
          sizeDelta
        }
        initialPositionBlockTimestamp
        settledPosition {
          averagePrice
          collateral
          entryFundingRate
          id
          indexedAt
          key
          realisedPnl
          reserveAmount
          size
        }
        updateList {
          averagePrice
          collateral
          entryFundingRate
          id
          indexedAt
          key
          realisedPnl
          reserveAmount
          size
        }
      }
      aggregatedTradeLiquidateds {
        account
        decreaseList {
          account
          collateralDelta
          collateralToken
          fee
          id
          indexToken
          indexedAt
          isLong
          key
          price
          sizeDelta
        }
        increaseList {
          account
          collateralDelta
          collateralToken
          fee
          id
          indexToken
          indexedAt
          isLong
          key
          price
          sizeDelta
        }
        indexedAt
        initialPosition {
          account
          collateralDelta
          collateralToken
          fee
          id
          indexToken
          indexedAt
          isLong
          key
          price
          sizeDelta
        }
        settledPosition {
          account
          collateral
          collateralToken
          id
          indexToken
          indexedAt
          isLong
          key
          markPrice
          realisedPnl
          reserveAmount
          size
        }
        updateList {
          averagePrice
          collateral
          entryFundingRate
          id
          indexedAt
          key
          realisedPnl
          reserveAmount
          size
        }
      }
      aggregatedTradeOpens {
        account
        decreaseList {
          account
          collateralDelta
          collateralToken
          fee
          id
          indexToken
          indexedAt
          isLong
          key
          price
          sizeDelta
        }
        increaseList {
          account
          collateralDelta
          collateralToken
          fee
          id
          indexToken
          indexedAt
          isLong
          key
          price
          sizeDelta
        }
        initialPosition {
          account
          collateralDelta
          collateralToken
          fee
          id
          indexToken
          indexedAt
          isLong
          key
          price
          sizeDelta
        }
        updateList {
          averagePrice
          collateral
          entryFundingRate
          id
          indexedAt
          key
          realisedPnl
          reserveAmount
          size
        }
      }
      indexedAt
      totalRealisedPnl
      id
    }
  }
`;

export function getTotalFees() {
  return gql`
    query TotalFees {
      feeStats(where: { period: total }) {
        burn
        id
        liquidation
        margin
        marginAndLiquidation
        mint
        period
        swap
      }
    }
  `;
}
