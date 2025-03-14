import { TransactionBody } from "@/models";
import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}/account`;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const addTransaction = async (transaction: TransactionBody) => {
  try {
    const response = await api.post("/transaction", transaction);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar post:", error);
    throw error;
  }
};
