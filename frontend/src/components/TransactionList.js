export default function TransactionList({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return <p className="text-steel">No transactions yet.</p>;
  }

  return (
    <div className="divide-y divide-slate/10 rounded-2xl bg-white/80 shadow-md">
      {transactions.map((tx) => (
        <div key={tx.id} className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm font-medium text-navy">{tx.senderAccountId} → {tx.receiverAccountId}</p>
            <p className="text-xs text-steel">{new Date(tx.timestamp).toLocaleString()}</p>
            {tx.fraudFlag && (
              <p className="text-xs text-red-600">Flagged: {tx.reason || "Review"}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-navy">${Number(tx.amount).toFixed(2)}</p>
            <p className="text-xs text-steel">{tx.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
