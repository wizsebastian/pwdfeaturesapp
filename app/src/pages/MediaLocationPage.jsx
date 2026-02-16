export function MediaLocationPage({ location, capabilities }) {
  return (
    <section className="page">
      <h2>Media & Location</h2>
      <p>Camera: {capabilities.camera.status}</p>
      <p>Microphone: {capabilities.microphone.status}</p>
      <p>Location: {capabilities.location.status}</p>

      <div className="system-info">
        <h3>Coordinates</h3>
        <p>Latitude: {location.latitude}</p>
        <p>Longitude: {location.longitude}</p>
        <p>City: {location.city}</p>
      </div>
    </section>
  )
}
