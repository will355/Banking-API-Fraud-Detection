import { useEffect, useState } from "react";
import { getAccount, getTransactions } from "../services/banking.js";
import StatCard from "../components/StatCard.js";
import TransactionList from "../components/TransactionList.js";

export default function DashboardPage() {
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function load() {
      const accountData = await getAccount();
      const txData = await getTransactions();
      setAccount(accountData);
      setTransactions(txData.transactions.slice(0, 5));
    }
    load();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-navy">Account snapshot</h2>
      <p className="text-sm text-steel">Balance and activity overview.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard title="Account" value={account?.accountNumber || "-"} subtitle={account?.accountType} />
        <StatCard title="Balance" value={`$${Number(account?.balance || 0).toFixed(2)}`} subtitle="Available" />
        <StatCard title="Recent Activity" value={transactions.length} subtitle="Latest transfers" />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-navy">Recent transactions</h3>
        <div className="mt-4">
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
