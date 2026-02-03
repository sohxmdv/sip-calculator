import { useState, useMemo } from 'react';
import { calculateResults } from '../utils/calculations';

export const useSIP = () => {
  const [mode, setMode] = useState('SIP'); 
  const [amount, setAmount] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [stepUp, setStepUp] = useState(10);

  const results = useMemo(() => calculateResults({
    monthlyAmount: mode === 'Lumpsum' ? 0 : amount,
    expectedReturn: rate,
    duration: years,
    isStepUp: mode === 'Step-Up',
    stepUpPercentage: stepUp,
    lumpsumAmount: mode === 'Lumpsum' ? amount : 0
  }), [amount, rate, years, mode, stepUp]);

  return { mode, setMode, amount, setAmount, rate, setRate, years, setYears, stepUp, setStepUp, results };
};