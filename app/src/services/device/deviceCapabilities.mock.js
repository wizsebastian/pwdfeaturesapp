export function createMockDeviceCapabilities() {
  return {
    async testAllCapabilities() {
      await wait(120)

      return {
        capabilities: {
          camera: { status: 'ready', detail: 'Permiso concedido' },
          microphone: { status: 'active', detail: 'Nivel: -12.4 dB' },
          location: { status: 'granted', detail: 'GPS locked' },
          motion: { status: 'supported', detail: 'Pitch/Roll/Yaw en vivo' },
          battery: { status: 'active', detail: '85% cargando' },
          files: { status: 'ready', detail: 'Disponible' },
          share: { status: 'ready', detail: 'Disponible' },
          vibration: { status: 'ready', detail: 'Disponible' },
          print: { status: 'ready', detail: 'Disponible' },
          webxr: { status: 'restricted', detail: 'Requiere dispositivo compatible' },
        },
        systemInfo: {
          network: 'online',
          serviceWorker: 'running',
          cacheStorage: '14.2 MB used',
        },
        location: {
          latitude: '40.7128° N',
          longitude: '74.0060° W',
          city: 'New York City',
        },
        motion: {
          pitch: '24.5°',
          roll: '-12.2°',
          yaw: '184°',
          accelX: '0.02',
          accelY: '9.81',
          accelZ: '-0.14',
        },
        battery: {
          level: '85%',
          charging: true,
          remaining: '1h 42m',
        },
      }
    },
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
