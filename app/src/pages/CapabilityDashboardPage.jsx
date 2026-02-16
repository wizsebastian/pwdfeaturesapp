import { CapabilityCard } from '../components/capability/CapabilityCard.jsx'

export function CapabilityDashboardPage({ capabilities, systemInfo, onTestAll }) {
  return (
    <section className="page">
      <div className="section-header">
        <h2>Capability Dashboard</h2>
        <button type="button" onClick={onTestAll}>TEST ALL CAPABILITIES</button>
      </div>

      <div className="grid">
        {Object.values(capabilities).map((capability) => (
          <CapabilityCard
            key={capability.id}
            label={capability.label}
            status={capability.status}
            detail={capability.detail}
          />
        ))}
      </div>

      <div className="system-info">
        <h3>System Info</h3>
        <p>Network: {systemInfo.network}</p>
        <p>Service Worker: {systemInfo.serviceWorker}</p>
        <p>Cache: {systemInfo.cacheStorage}</p>
      </div>
    </section>
  )
}
