import { TransactionResponse } from "./models/transaction";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "sonner";
import { AddTransactionForm } from "./components/AddTransactionForm";
import { Button } from "./components/Button";
import { LastTransactions } from "./components/LastTransactions";
import { Modal } from "./components/Modal";
import { addTransaction } from "./service/transactionServices";
import { formatCurrency } from "./utils/formatCurrency";
import { AccountResponse } from "./models/account";
import { useState } from "react";

interface AppProps {
  account: AccountResponse;
  transactionStore: {
    transactions: TransactionResponse[];
    addTransaction: (transaction: TransactionResponse) => void;
    getTransactions: (transactions: TransactionResponse[]) => void;
  };
}

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

const dataFormatada = new Date().toLocaleDateString("pt-BR", options);

function App({ account, transactionStore }: AppProps | any) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") as string);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  console.log(transactionStore.transactions, "transactionStore.transactions");

  return (
    <section className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl">
      <section className="flex flex-col bg-[#004D61] w-full rounded-lg p-10 md:p-6">
        <div className="text-white text-center md:text-left">
          <h2 className="mb-6 text-[25px]">
            Olá, {user && user.username.split(" ")[0]}! :)
          </h2>
          <p className="text-sm capitalize">{dataFormatada}</p>
        </div>

        <div className="grow text-white my-10 md:ml-auto md:w-1/2">
          <div className="flex items-center gap-6 border-b-2 border-b-orange-600 pb-4 mb-4">
            <h3>Saldo</h3>
            {!isBalanceVisible ? (
              <FaEye
                size={20}
                className="text-orange-600"
                role="button"
                onClick={handleBalanceVisibility}
              />
            ) : (
              <FaEyeSlash
                size={20}
                className="text-orange-600"
                role="button"
                onClick={handleBalanceVisibility}
              >
                coisa
              </FaEyeSlash>
            )}
          </div>
          <div>
            <p className="pb-2">Conta Corrente</p>
            <p className="font-roboto-mono text-2xl md:text-3xl md:pr-16">
              {isBalanceVisible ? formatCurrency(3000) : "R$ ******"}
            </p>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <Button onClick={openModal}>Nova transação</Button>
        </div>
      </section>

      <LastTransactions
        transactions={transactionStore?.transactions as TransactionResponse[]}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddTransactionForm
          onSubmit={(transaction) => {
            addTransaction(token as string, {
              type: transaction.type,
              value: transaction.amount,
              accountId: "67d5cb96f273c147ae3b0269", //TODO: tirar mock account.id,
            });
            toast.success("Transação criada com sucesso!");
            closeModal();
          }}
        />
      </Modal>
    </section>
  );
}

export default App;
