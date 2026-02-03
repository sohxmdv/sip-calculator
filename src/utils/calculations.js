export const calculateResults = ({
  monthlyAmount, expectedReturn, duration, isStepUp = false, stepUpPercentage = 0, lumpsumAmount = 0,
}) => {
  const annualRate = expectedReturn / 100;
  const monthlyRate = annualRate / 12;
  const totalMonths = duration * 12;
  const lumpsumMaturity = lumpsumAmount * Math.pow(1 + annualRate, duration);

  let sipMaturity = 0;
  let totalInvestedInSIP = 0;
  let currentMonthlyInvestment = monthlyAmount;

  for (let month = 1; month <= totalMonths; month++) {
    totalInvestedInSIP += currentMonthlyInvestment;
    const monthsRemaining = totalMonths - month + 1;
    sipMaturity += currentMonthlyInvestment * Math.pow(1 + monthlyRate, monthsRemaining);
    if (isStepUp && month % 12 === 0) {
      currentMonthlyInvestment += currentMonthlyInvestment * (stepUpPercentage / 100);
    }
  }

  return {
    totalInvested: Math.round(totalInvestedInSIP + lumpsumAmount),
    estimatedReturns: Math.round((sipMaturity + lumpsumMaturity) - (totalInvestedInSIP + lumpsumAmount)),
    totalMaturityValue: Math.round(sipMaturity + lumpsumMaturity),
  };
};