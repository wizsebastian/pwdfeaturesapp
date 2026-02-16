export const capabilityIds = [
  'camera',
  'microphone',
  'location',
  'files',
  'motion',
  'battery',
  'share',
  'vibration',
  'print',
  'webxr',
]

export function createInitialCapabilities() {
  return {
    camera: { id: 'camera', label: 'Camera', status: 'idle', detail: 'Sin test' },
    microphone: { id: 'microphone', label: 'Microphone', status: 'idle', detail: 'Sin test' },
    location: { id: 'location', label: 'Location', status: 'idle', detail: 'Sin test' },
    files: { id: 'files', label: 'Files', status: 'ready', detail: 'Disponible' },
    motion: { id: 'motion', label: 'Motion', status: 'idle', detail: 'Sin test' },
    battery: { id: 'battery', label: 'Battery', status: 'idle', detail: 'Sin test' },
    share: { id: 'share', label: 'Share', status: 'ready', detail: 'Listo' },
    vibration: { id: 'vibration', label: 'Vibration', status: 'ready', detail: 'Listo' },
    print: { id: 'print', label: 'Print', status: 'ready', detail: 'Listo' },
    webxr: { id: 'webxr', label: 'WebXR', status: 'restricted', detail: 'Restringido' },
  }
}
