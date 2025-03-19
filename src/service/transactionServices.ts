import { TransactionRequest } from "@/models/transaction";
import api from "./axios";

const baseUrl = "/account";

export const addTransaction = async (
  token: string,
  transaction: TransactionRequest
) => {
  try {
    const request = await api.post(`${baseUrl}/transaction`, transaction, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request.data.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};
