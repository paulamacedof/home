import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { Button } from "./Button";
import { TransactionRequest, TransactionType } from "@/models/transaction";

interface AddTransactionFormProps {
  initialType?: TransactionType | "";
  initialAmount?: number;
  onSubmit: (transaction: TransactionRequest) => void;
  title?: string;
  buttonText?: string;
  loading?: boolean;
}

export function AddTransactionForm({
  initialType = "",
  initialAmount = 0,
  onSubmit,
  title = "Adicionar Nova Transação",
  buttonText = "Criar Transação",
  loading = false,
}: AddTransactionFormProps) {
  const [type, setType] = useState<TransactionType | "">(initialType);
  const [amount, setAmount] = useState<string>(initialAmount.toString());
  const isDisabled = parseFloat(amount) <= 0 || type === "";

  const handleSubmit = () => {
    onSubmit({
      type,
      value: Number(amount),
      accountId: "",
    });
  };

  useEffect(() => {
    setType(initialType);
    setAmount(initialAmount.toString());
  }, [initialType, initialAmount]);

  return (
    <>
      <h2 className="mb-8 ">{title}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          className="w-full p-4 border border-[#004D61] rounded-lg mb-8 appearance-none bg-select-arrow bg-no-repeat bg-right"
          title="Selecione o tipo de transação"
        >
          <option value="" defaultValue="" disabled>
            Selecione o tipo de transação
          </option>
          <option value="Debit">Despesa</option>
          <option value="Credit">Crédito</option>
        </select>

        <div className="mb-8">
          <label htmlFor="amount" className="block mb-1">
            Valor
          </label>
          <NumericFormat
            id="amount"
            value={amount}
            onValueChange={(values) => setAmount(values.value)}
            prefix="R$ "
            decimalSeparator=","
            thousandSeparator="."
            decimalScale={2}
            allowLeadingZeros={false}
            allowNegative={false}
            fixedDecimalScale
            className="w-full p-4 border border-[#004D61] rounded-lg"
            placeholder="R$ 0,00"
            required
          />
        </div>

        <Button
          variant="secondary"
          onClick={handleSubmit}
          disabled={isDisabled || loading}
        >
          {loading ? "Aguarde" : buttonText}
        </Button>
      </form>
    </>
  );
}
