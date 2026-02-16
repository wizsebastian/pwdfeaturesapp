export function MotionBatteryPage({ motion, battery, capabilities }) {
  return (
    <section className="page">
      <h2>Motion & Battery</h2>
      <p>Motion: {capabilities.motion.status}</p>
      <p>Battery: {capabilities.battery.status}</p>

      <div className="system-info">
        <h3>Motion</h3>
        <p>Pitch: {motion.pitch}</p>
        <p>Roll: {motion.roll}</p>
        <p>Yaw: {motion.yaw}</p>
      </div>

      <div className="system-info">
        <h3>Battery</h3>
        <p>Level: {battery.level}</p>
        <p>Charging: {battery.charging ? 'Yes' : 'No'}</p>
        <p>Remaining: {battery.remaining}</p>
      </div>
    </section>
  )
}
