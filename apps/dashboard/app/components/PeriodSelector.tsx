'use client';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { setPeriod } from '../store/slices/dashboardSlice';

const periods = [
  { label: 'Mensal', value: 'monthly' },
  { label: 'Trimestral', value: 'quarterly' },
  { label: 'Anual', value: 'yearly' },
] as const;

export default function PeriodSelector() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedPeriod = useSelector(
    (state: RootState) => state.dashboard.selectedPeriod
  );

  return (
    <div className="flex gap-2">
      {periods.map((period) => {
        const isActive = selectedPeriod === period.value;

        return (
          <button
            key={period.value}
            onClick={() => dispatch(setPeriod(period.value))}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition
              ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            {period.label}
          </button>
        );
      })}
    </div>
  );
}
