export function CapabilityCard({ label, status, detail }) {
  return (
    <article className="capability-card">
      <h3>{label}</h3>
      <p className="status">{status}</p>
      <p className="detail">{detail}</p>
    </article>
  )
}
