import { useEffect, useState } from "react";
import { getTransactions } from "../services/banking.js";
import TransactionList from "../components/TransactionList.js";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getTransactions();
      setTransactions(data.transactions);
    }
    load();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-navy">Transaction history</h2>
      <p className="text-sm text-steel">Full ledger of your transfers.</p>

      <div className="mt-6">
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}
