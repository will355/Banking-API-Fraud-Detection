export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl bg-white/80 p-5 shadow-md border border-slate/10">
      <p className="text-xs uppercase tracking-widest text-steel">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-navy">{value}</p>
      {subtitle && <p className="mt-1 text-xs text-steel">{subtitle}</p>}
    </div>
  );
}
