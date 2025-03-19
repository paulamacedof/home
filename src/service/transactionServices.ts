import { TransactionRequest } from "@/models/transaction";
import api from "./axios";

const baseURL = "/account ";

export const addTransaction = async (
  token: string,
  transaction: TransactionRequest
) => {
  try {
    const request = await api.post(
      `${baseURL}/transaction`,
      { transaction },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return request.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};
