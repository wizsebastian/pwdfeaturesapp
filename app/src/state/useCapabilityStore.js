import { useCallback, useState } from 'react'
import { createInitialCapabilities } from '../domain/capabilities.js'

const initialSystem = {
  network: 'unknown',
  serviceWorker: 'unknown',
  cacheStorage: 'unknown',
}

const initialLocation = {
  latitude: '--',
  longitude: '--',
  city: '--',
}

const initialMotion = {
  pitch: '--',
  roll: '--',
  yaw: '--',
  accelX: '--',
  accelY: '--',
  accelZ: '--',
}

const initialBattery = {
  level: '--',
  charging: false,
  remaining: '--',
}

export function useCapabilityStore(deviceApi) {
  const [capabilities, setCapabilities] = useState(createInitialCapabilities)
  const [systemInfo, setSystemInfo] = useState(initialSystem)
  const [location, setLocation] = useState(initialLocation)
  const [motion, setMotion] = useState(initialMotion)
  const [battery, setBattery] = useState(initialBattery)

  const testAllCapabilities = useCallback(async () => {
    const result = await deviceApi.testAllCapabilities()

    setCapabilities((prev) => mergeCapabilities(prev, result.capabilities))
    setSystemInfo(result.systemInfo)
    setLocation(result.location)
    setMotion(result.motion)
    setBattery(result.battery)
  }, [deviceApi])

  return {
    capabilities,
    systemInfo,
    location,
    motion,
    battery,
    testAllCapabilities,
  }
}

function mergeCapabilities(current, updates) {
  const next = { ...current }

  Object.entries(updates).forEach(([key, value]) => {
    if (next[key]) {
      next[key] = {
        ...next[key],
        ...value,
      }
    }
  })

  return next
}
