import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/banking.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await login(form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="app-shell flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl bg-white/90 p-8 shadow-xl">
        <h2 className="text-2xl font-semibold text-navy">Welcome back</h2>
        <p className="text-sm text-steel">Access your secure banking workspace.</p>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-6 space-y-4">
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
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate/20 px-4 py-3"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-navy px-4 py-3 text-sand hover:bg-slate"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-steel">
          New here? <Link to="/register" className="text-navy underline">Create account</Link>
        </p>
      </form>
    </div>
  );
}
