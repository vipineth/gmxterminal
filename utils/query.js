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
