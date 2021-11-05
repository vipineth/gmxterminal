import request from "graphql-request";

export let fetcher = (...args) => fetch(...args).then((res) => res.json());

export function gmxStatsFetcher(query, variables) {
  return request(
    `https://api.thegraph.com/subgraphs/name/gmx-io/gmx-stats`,
    query,
    variables
  );
}

export function gmxTerminalFetcher(query, variables) {
  return request(
    `https://api.thegraph.com/subgraphs/name/vipineth/gmx-terminal`,
    query,
    variables
  );
}
export function uniswapFetcher(query, variables) {
  return request(
    `https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-minimal`,
    query,
    variables
  );
}
