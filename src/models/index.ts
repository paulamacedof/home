export type TransactionType = "credit" | "debit" | "expense";

export interface TransactionBody {
  accountId: string;
  type: TransactionType;
  value: number;
  from: string;
  to: string;
  anexo: string;
}
