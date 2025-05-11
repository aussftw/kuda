import { create } from "zustand";

export type Transaction = {
  name: string;
  bank: string;
  time: string;
  amount: number;
};

export type AccountData = {
  bankName: string;
  accountNo: string;
  balance: number;
  type: string;
  dateAdded: string;
  currency: string;
  availableBalance: number;
  transactions: Array<Transaction>;
  accountType: string;
};

type AccountStore = {
  account: AccountData | null;
  setAccount: (data: AccountData) => void;
};

export const useAccountStore = create<AccountStore>((set) => ({
  account: null,
  setAccount: (data) => set({ account: data }),
}));
