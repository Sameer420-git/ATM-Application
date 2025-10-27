
export enum ScreenView {
  Login,
  MainMenu,
  Balance,
  Withdraw,
  Deposit,
  History,
}

export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  amount: number;
  date: string;
}
