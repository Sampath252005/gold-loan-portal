export const calculateLoanDetails = (
  netWeightGrams,
  purityKarat,
  goldPricePerGram,
  maxLtv = 75
) => {
  const pureGoldWeight =
    Number(netWeightGrams) * (Number(purityKarat) / 24);

  const totalGoldValue =
    pureGoldWeight * Number(goldPricePerGram);

  const maximumEligibleLoan =
    totalGoldValue * (Number(maxLtv) / 100);

  return {
    pureGoldWeight: Number(pureGoldWeight.toFixed(2)),
    totalGoldValue: Number(totalGoldValue.toFixed(2)),
    maximumEligibleLoan: Number(maximumEligibleLoan.toFixed(2)),
  };
};