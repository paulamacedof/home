import { TransactionRequest } from "@/models/Transaction";
import { api } from "./axios";

const baseURL = "bff/account";

export const addTransaction = async (transaction: TransactionRequest) => {
  try {
    //const request = await api.post(`${baseURL}/transaction`, { transaction });
    //return request.data;

    return {
      id: "string",
      accountId: "string",
      type: "string",
      value: 0,
      date: "2025-03-18T13:49:55.889Z",
    };
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};
