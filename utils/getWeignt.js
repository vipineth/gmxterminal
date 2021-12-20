export function getWeightText(tokenInfo) {
  if (
    !tokenInfo.weight ||
    !tokenInfo.usdgAmount ||
    !usdgSupply ||
    !totalTokenWeights
  ) {
    return '...';
  }

  const currentWeightBps = tokenInfo.usdgAmount
    .mul(BASIS_POINTS_DIVISOR)
    .div(usdgSupply);
  const targetWeightBps = tokenInfo.weight
    .mul(BASIS_POINTS_DIVISOR)
    .div(totalTokenWeights);

  const weightText = `${formatAmount(
    currentWeightBps,
    2,
    2,
    false
  )}% / ${formatAmount(targetWeightBps, 2, 2, false)}%`;

  return (
    <Tooltip handle={weightText} position="right-bottom">
      Current Weight: {formatAmount(currentWeightBps, 2, 2, false)}%<br />
      Target Weight: {formatAmount(targetWeightBps, 2, 2, false)}%<br />
      <br />
      {currentWeightBps.lt(targetWeightBps) && (
        <div>
          {tokenInfo.symbol} is below its target weight.
          <br />
          <br />
          Get lower fees to{' '}
          <Link to="/buy_glp" target="_blank" rel="noopener noreferrer">
            buy GLP
          </Link>{' '}
          with {tokenInfo.symbol},&nbsp; and to{' '}
          <Link to="/trade" target="_blank" rel="noopener noreferrer">
            swap
          </Link>{' '}
          {tokenInfo.symbol} for other tokens.
        </div>
      )}
      {currentWeightBps.gt(targetWeightBps) && (
        <div>
          {tokenInfo.symbol} is above its target weight.
          <br />
          <br />
          Get lower fees to{' '}
          <Link to="/trade" target="_blank" rel="noopener noreferrer">
            swap
          </Link>{' '}
          tokens for {tokenInfo.symbol}.
        </div>
      )}
      <br />
      <div>
        <a
          href="https://gmxio.gitbook.io/gmx/glp"
          target="_blank"
          rel="noopener noreferrer"
        >
          More Info
        </a>
      </div>
    </Tooltip>
  );
}
