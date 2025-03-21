import { TransactionRequest, TransactionResponse } from "./models/transaction";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "sonner";
import { AddTransactionForm } from "./components/AddTransactionForm";
import { Button } from "./components/Button";
import { LastTransactions } from "./components/LastTransactions";
import { Modal } from "./components/Modal";
import {
  addTransaction,
  getLastTransactions,
} from "./service/transactionServices";
import { formatCurrency } from "./utils/formatCurrency";
import { useEffect, useState } from "react";
import { AccountResponse } from "./models/account";

interface AppProps {
  account: AccountResponse;
  setAccount: (token: string) => void;
}

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

const dataFormatada = new Date().toLocaleDateString("pt-BR", options);

function App({ account, setAccount }: AppProps | any) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") as string);

  const [loading, setLoading] = useState(true);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastTransactions, setLastTransactions] = useState<
    TransactionResponse[]
  >([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  useEffect(() => {
    const handleLastTransactions = async () => {
      if (!account?.id) return;

      try {
        const lastTransactions = await getLastTransactions(
          token as string,
          account?.id
        );
        setLastTransactions(lastTransactions);
      } catch (error) {
        toast.error("Falha ao buscar transações.");
      } finally {
        setLoading(false);
      }
    };

    handleLastTransactions();
  }, [account?.id, token]);

  const handleAddTransaction = async (transaction: TransactionRequest) => {
    const result = await addTransaction(token as string, {
      type: transaction.type,
      value: transaction.value,
      accountId: account?.id,
    });
    const newArray = lastTransactions;
    newArray.unshift(result);
    newArray.pop();
    setAccount(token);

    setLastTransactions(newArray);

    toast.success("Transação criada com sucesso!");
    closeModal();
  };

  return (
    <section className="flex flex-col lg:flex-row lg:max-h-[500px] gap-6 w-full max-w-7xl">
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
            {loading ? (
              <p className="text-gray-400">Carregando saldo...</p>
            ) : (
              <p className="font-roboto-mono text-2xl md:text-3xl md:pr-16">
                {isBalanceVisible
                  ? formatCurrency(account?.balance)
                  : "R$ ******"}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <Button onClick={openModal}>Nova transação</Button>
        </div>
      </section>

      <LastTransactions
        loading={loading}
        transactions={lastTransactions as TransactionResponse[]}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddTransactionForm
          onSubmit={(transaction) => handleAddTransaction(transaction)}
        />
      </Modal>
    </section>
  );
}

export default App;
