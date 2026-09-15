export interface Wallet {
  id: string;
  name: string;
  type: "bank" | "e-wallet" | "cash";
  balance: number;
  color: string;
}
