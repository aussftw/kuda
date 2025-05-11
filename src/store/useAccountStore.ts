import { create } from "zustand";

export type AccountData = {
  bankName: string;
  accountNo: string;
  balance: number;
  type: string;
  dateAdded: string;
  currency: string;
  availableBalance: number;
  transactions: Array<any>;
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
