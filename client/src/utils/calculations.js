export const calculateLoanDetails = (
  netWeight,
  purityKarat,
  goldPricePerGram = 7000,
  maxLtv = 75
) => {
  const weight = Number(netWeight);
  const purity = Number(purityKarat);

  if (!weight || weight <= 0) {
    return {
      pureGoldWeight: 0,
      totalGoldValue: 0,
      maximumEligibleLoan: 0,
    };
  }

  const pureGoldWeight =
    weight * (purity / 24);

  const totalGoldValue =
    pureGoldWeight * goldPricePerGram;

  const maximumEligibleLoan =
    totalGoldValue * (maxLtv / 100);

  return {
    pureGoldWeight: Number(pureGoldWeight.toFixed(2)),
    totalGoldValue: Number(totalGoldValue.toFixed(2)),
    maximumEligibleLoan: Number(
      maximumEligibleLoan.toFixed(2)
    ),
  };
};