import { TransactionResponse } from "@/models/transaction";
import { formatCurrency } from "../utils/formatCurrency";

interface Props {
  transactions: TransactionResponse[];
  loading: boolean;
}

function getMonthName(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR", { month: "long" });
}

function getTransactionName(transaction: string) {
  const transactionMap = new Map([
    ["Debit", "despesa"],
    ["Credit", "crédito"],
  ]);
  return transactionMap.get(transaction);
}

export function LastTransactions({ transactions, loading }: Props) {
  return (
    <section className="bg-white rounded-lg p-6 lg:min-w-[300px]">
      <h2 className="font-bold pb-6">Últimas Transações</h2>
      {loading ? (
        <p className="text-center text-gray-500">
          Carregando últimas transações...
        </p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhuma transação cadastrada.
        </p>
      ) : (
        <ul className="grid md:grid-cols-2 md:gap-x-10 lg:grid-cols-1">
          {transactions.map((t, index) => (
            <li
              key={index}
              className={`flex flex-col gap-2 border-b-2 border-dashed border-[#84cc16] py-4 ${
                index === 0 ? "pt-0" : ""
              }`}
            >
              <span className="text-[#84cc16] text-sm font-semibold capitalize">
                {getMonthName(t.date.toString())}
              </span>
              <p className="flex justify-between items-center capitalize">
                {getTransactionName(t.type)}
                <span className="text-gray-400 text-sm">
                  {new Date(t.date).toLocaleDateString("pt-BR")}
                </span>
              </p>
              <p className="font-roboto-mono font-semibold">
                {["transfer", "expense"].includes(t.type) && "- "}
                {formatCurrency(t.value)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
