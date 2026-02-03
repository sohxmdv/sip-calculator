export const getWealthInsight = (results, years, mode) => {
  const multiplier = (results.totalMaturityValue / results.totalInvested).toFixed(1);
  
  if (mode === 'Step-Up') {
    return `By increasing your contribution annually, your wealth grows to ${multiplier}x your total investment in ${years} years. This is the power of aggressive compounding!`;
  }
  
  return `In ${years} years, your money could grow by ${multiplier} times. The green section of the chart shows your profit, while the blue is what you put in.`;
};