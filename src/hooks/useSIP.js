import { useState, useMemo, useEffect } from 'react';
import { calculateResults } from '../utils/calculations';

export const useSIP = () => {
  // Default Values
  const defaults = { mode: 'SIP', amount: 5000, rate: 12, years: 10, stepUp: 10 };

  const [mode, setMode] = useState(defaults.mode);
  const [amount, setAmount] = useState(defaults.amount);
  const [rate, setRate] = useState(defaults.rate);
  const [years, setYears] = useState(defaults.years);
  const [stepUp, setStepUp] = useState(defaults.stepUp);

  // Reset Function
  const reset = () => {
    setMode(defaults.mode);
    setAmount(defaults.amount);
    setRate(defaults.rate);
    setYears(defaults.years);
    setStepUp(defaults.stepUp);
    window.history.replaceState({}, '', window.location.pathname);
  };

  // Sync with URL Query Params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('amt')) setAmount(Number(params.get('amt')));
    if (params.get('yr')) setYears(Number(params.get('yr')));
    if (params.get('rt')) setRate(Number(params.get('rt')));
  }, []);

  const results = useMemo(() => calculateResults({
    monthlyAmount: mode === 'Lumpsum' ? 0 : amount,
    expectedReturn: rate,
    duration: years,
    isStepUp: mode === 'Step-Up',
    stepUpPercentage: stepUp,
    lumpsumAmount: mode === 'Lumpsum' ? amount : 0
  }), [amount, rate, years, mode, stepUp]);

  return { mode, setMode, amount, setAmount, rate, setRate, years, setYears, stepUp, setStepUp, results, reset };
};