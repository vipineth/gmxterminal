import { useFetch } from "./useFetch";
import tokenList from "utils/tokenList.json";
import extraTokens from "utils/extraTokens";
import { bigNumberify } from "utils/dates";
import { expandDecimals } from "utils/format";

const { TOKENS_URL } = require("./urls");

export const DEFAULT_MAX_USDG_AMOUNT = expandDecimals(100 * 1000 * 1000, 18);
export const BASIS_POINTS_DIVISOR = 10000;

function useTokens() {
  const [tokens, loading] = useFetch(TOKENS_URL, [], (url) =>
    fetch(url)
      .then((res) => res.json())
      .then((tokens) => {
        return tokens.map(({ data: token }) => {
          let utilization = bigNumberify(0);
          if (
            token &&
            token.reservedAmount &&
            token.poolAmount &&
            Number(token.poolAmount) > 0
          ) {
            utilization = bigNumberify(token.reservedAmount)
              .multipliedBy(BASIS_POINTS_DIVISOR)
              .dividedBy(token.poolAmount)
              .toString();
          }
          return {
            ...token,
            utilization,
            icon:
              extraTokens[token.symbol]?.logoURI ||
              tokenList.tokens.find(
                (t) => t.symbol.toLowerCase() === token.symbol.toLowerCase()
              )?.logoURI,
          };
        });
      })
  );

  return [tokens, loading];
}

export default useTokens;
