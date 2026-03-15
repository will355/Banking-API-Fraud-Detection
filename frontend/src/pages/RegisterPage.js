import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/banking.js";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    accountType: "CHECKING"
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await register(form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="app-shell flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl bg-white/90 p-8 shadow-xl">
        <h2 className="text-2xl font-semibold text-navy">Create your account</h2>
        <p className="text-sm text-steel">Open a digital banking profile in minutes.</p>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-6 space-y-4">
          <input
            name="fullName"
            type="text"
            placeholder="Full name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate/20 px-4 py-3"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate/20 px-4 py-3"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password (min 8 chars)"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate/20 px-4 py-3"
            required
          />
          <select
            name="accountType"
            value={form.accountType}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate/20 px-4 py-3"
          >
            <option value="CHECKING">Checking</option>
            <option value="SAVINGS">Savings</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-navy px-4 py-3 text-sand hover:bg-slate"
        >
          Create account
        </button>

        <p className="mt-4 text-sm text-steel">
          Already have an account? <Link to="/login" className="text-navy underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
