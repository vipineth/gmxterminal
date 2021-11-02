import request from "graphql-request";

export let fetcher = (...args) => fetch(...args).then((res) => res.json());
export function GMXStatsFetcher(query, variables) {
  return request(
    `https://api.thegraph.com/subgraphs/name/gmx-io/gmx-stats`,
    query,
    variables
  );
}
