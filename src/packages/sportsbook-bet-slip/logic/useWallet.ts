import { MOCK_WALLET_BALANCE } from './constants';

export function useWallet() {
  return {
    balance: MOCK_WALLET_BALANCE,
  };
}
