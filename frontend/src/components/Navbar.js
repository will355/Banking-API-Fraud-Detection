import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-navy text-sand shadow-lg">
      <div>
        <h1 className="text-xl font-semibold">Banking API Dashboard</h1>
        <p className="text-sm text-sand/70">Fraud-aware transaction monitoring</p>
      </div>
      <nav className="flex items-center gap-4 text-sm">
        <Link to="/dashboard" className="hover:text-mint">Dashboard</Link>
        <Link to="/transfer" className="hover:text-mint">Transfer</Link>
        <Link to="/transactions" className="hover:text-mint">Transactions</Link>
        <Link to="/fraud" className="hover:text-mint">Fraud Alerts</Link>
        {user ? (
          <button
            onClick={handleLogout}
            className="rounded-full border border-sand/40 px-3 py-1 text-sand hover:bg-sand/10"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:text-mint">Login</Link>
        )}
      </nav>
    </header>
  );
}
