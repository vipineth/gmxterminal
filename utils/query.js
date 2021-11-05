import { gql } from "graphql-request";

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
