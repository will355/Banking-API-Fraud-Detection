export default function AlertBanner({ title, message }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
      <p className="font-semibold">{title}</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}
