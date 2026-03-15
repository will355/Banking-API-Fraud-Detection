import { useState } from "react";
import { transfer } from "../services/banking.js";
import AlertBanner from "../components/AlertBanner.js";

export default function TransferPage() {
  const [form, setForm] = useState({ receiverAccountNumber: "", amount: "" });
  const [message, setMessage] = useState("");
  const [flagged, setFlagged] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setFlagged(false);

    try {
      const data = await transfer({
        receiverAccountNumber: form.receiverAccountNumber,
        amount: Number(form.amount)
      });

      setMessage(`Transfer submitted. Status: ${data.status}`);
      setFlagged(data.status === "UNDER_REVIEW");
      setForm({ receiverAccountNumber: "", amount: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Transfer failed");
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-navy">Transfer funds</h2>
      <p className="text-sm text-steel">Send money securely between accounts.</p>

      {message && (
        <div className="mt-4">
          {flagged ? (
            <AlertBanner title="Transfer under review" message={message} />
          ) : (
            <p className="text-sm text-steel">{message}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
        <input
          name="receiverAccountNumber"
          type="text"
          placeholder="Receiver account number"
          value={form.receiverAccountNumber}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate/20 px-4 py-3"
          required
        />
        <input
          name="amount"
          type="number"
          min="1"
          step="0.01"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate/20 px-4 py-3"
          required
        />
        <button type="submit" className="rounded-xl bg-navy px-4 py-3 text-sand hover:bg-slate">
          Send transfer
        </button>
      </form>
    </div>
  );
}
