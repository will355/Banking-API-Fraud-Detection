import api from "./api.js";

export async function register(payload) {
  const { data } = await api.post("/register", payload);
  return data;
}

export async function login(payload) {
  const { data } = await api.post("/login", payload);
  return data;
}

export async function getAccount() {
  const { data } = await api.get("/account");
  return data;
}

export async function getTransactions() {
  const { data } = await api.get("/transactions");
  return data;
}

export async function getTransaction(id) {
  const { data } = await api.get(`/transactions/${id}`);
  return data;
}

export async function transfer(payload) {
  const { data } = await api.post("/transfer", payload);
  return data;
}

export async function getFraudTransactions() {
  const { data } = await api.get("/admin/fraud-transactions");
  return data;
}

export async function reviewTransaction(transactionId, action) {
  const { data } = await api.patch(`/admin/review/${transactionId}`, { action });
  return data;
}
