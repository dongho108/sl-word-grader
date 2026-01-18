import { create } from 'zustand';
import { GradingResult } from '../types';

interface GradingResultState {
  result: GradingResult | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setResult: (result: GradingResult) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearResult: () => void;
}

export const useGradingResultStore = create<GradingResultState>((set) => ({
  result: null,
  isLoading: false,
  error: null,

  setResult: (result) => {
    set({ result, isLoading: false, error: null });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error, isLoading: false });
  },

  clearResult: () => {
    set({ result: null, isLoading: false, error: null });
  },
}));
