import { useEffect, useState } from "react";
import { getFraudTransactions, reviewTransaction } from "../services/banking.js";

export default function FraudAlertsPage() {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  async function load() {
    const data = await getFraudTransactions();
    setTransactions(data.transactions);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleReview(id, action) {
    setMessage("");
    try {
      await reviewTransaction(id, action);
      setMessage(`Transaction ${id} marked ${action}`);
      await load();
    } catch (err) {
      setMessage(err.response?.data?.message || "Review failed");
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-navy">Fraud alerts</h2>
      <p className="text-sm text-steel">Admin review of flagged transactions.</p>

      {message && <p className="mt-4 text-sm text-steel">{message}</p>}

      <div className="mt-6 space-y-4">
        {transactions.length === 0 && <p className="text-steel">No flagged transactions.</p>}
        {transactions.map((tx) => (
          <div key={tx.id} className="rounded-2xl bg-white/80 p-4 shadow-md">
            <p className="text-sm text-navy font-semibold">{tx.id}</p>
            <p className="text-xs text-steel">{tx.reason || "No reason"}</p>
            <p className="text-sm text-navy">${Number(tx.amount).toFixed(2)}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleReview(tx.id, "SAFE")}
                className="rounded-full border border-emerald-500 px-3 py-1 text-emerald-600"
              >
                Mark Safe
              </button>
              <button
                onClick={() => handleReview(tx.id, "FRAUD")}
                className="rounded-full border border-red-500 px-3 py-1 text-red-600"
              >
                Mark Fraud
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
