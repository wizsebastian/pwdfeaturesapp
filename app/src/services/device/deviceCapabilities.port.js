// Contrato de referencia para adaptadores de capacidades.
export function createDeviceCapabilitiesPort() {
  return {
    testAllCapabilities: async () => {
      throw new Error('Implementar testAllCapabilities en el adaptador')
    },
  }
}
