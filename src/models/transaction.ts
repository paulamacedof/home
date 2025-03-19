export type TransactionType = "deposit" | "transfer" | "expense";

export interface TransactionRequest {
  accountId: string;
  type: TransactionType;
  value: number;
}

export interface TransactionResponse {
  id: string;
  type: TransactionType;
  amount: number;
  date: Date;
  accountId: string;
}
