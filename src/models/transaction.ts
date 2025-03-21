export type TransactionType = "Debit" | "Credit";

export interface TransactionRequest {
  accountId: string;
  type: TransactionType | string;
  value: number;
}

export interface TransactionResponse {
  id: string;
  accountId: string;
  type: TransactionType;
  value: number;
  date: Date;
}
