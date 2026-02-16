import { useMemo, useState } from 'react'
import { CapabilityDashboardPage } from '../pages/CapabilityDashboardPage.jsx'
import { MediaLocationPage } from '../pages/MediaLocationPage.jsx'
import { MotionBatteryPage } from '../pages/MotionBatteryPage.jsx'
import { createMockDeviceCapabilities } from '../services/device/deviceCapabilities.mock.js'
import { useCapabilityStore } from '../state/useCapabilityStore.js'

const TABS = {
  dashboard: 'dashboard',
  mediaLocation: 'media-location',
  motionBattery: 'motion-battery',
}

export function AppShell() {
  const [tab, setTab] = useState(TABS.dashboard)
  const deviceApi = useMemo(() => createMockDeviceCapabilities(), [])

  const {
    capabilities,
    systemInfo,
    location,
    motion,
    battery,
    testAllCapabilities,
  } = useCapabilityStore(deviceApi)

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>PWA Capability Tester</h1>
        <p>Modo mock activo, sin backend</p>
      </header>

      <nav className="tab-nav" aria-label="Navegacion principal">
        <button type="button" onClick={() => setTab(TABS.dashboard)}>Dashboard</button>
        <button type="button" onClick={() => setTab(TABS.mediaLocation)}>Media y Location</button>
        <button type="button" onClick={() => setTab(TABS.motionBattery)}>Motion y Battery</button>
      </nav>

      <main>
        {tab === TABS.dashboard && (
          <CapabilityDashboardPage
            capabilities={capabilities}
            systemInfo={systemInfo}
            onTestAll={testAllCapabilities}
          />
        )}

        {tab === TABS.mediaLocation && (
          <MediaLocationPage location={location} capabilities={capabilities} />
        )}

        {tab === TABS.motionBattery && (
          <MotionBatteryPage motion={motion} battery={battery} capabilities={capabilities} />
        )}
      </main>
    </div>
  )
}
