# TODO - Implementacion React sin Backend

## Objetivo

Convertir los 3 prototipos HTML en una app React mantenible y totalmente testeable sin backend ni permisos reales de dispositivo.

## Estado actual

- [x] Proyecto React creado en `app/`
- [x] Estructura inicial por capas (`pages`, `components`, `services`, `state`, `domain`)
- [x] Mock de capacidades de dispositivo (`src/services/device/deviceCapabilities.mock.js`)
- [x] Dashboard y pantallas base funcionando

## Fase 1 - Base de producto

- [ ] Reemplazar navegacion por tabs con router real (`react-router-dom`) cuando haya red
- [ ] Crear layout movil tipo PWA (header sticky, footer nav)
- [ ] Migrar estilos a un sistema consistente (Tailwind o CSS Modules)
- [ ] Incorporar assets visuales (iconos, estados, placeholders)

## Fase 2 - Capa de dominio y contratos

- [ ] Tipar contrato de capacidades con TypeScript (`Capability`, `CapabilityStatus`, `SystemInfo`)
- [ ] Definir `deviceCapabilities.port.ts` con metodos:
  - `testAllCapabilities`
  - `requestPermission`
  - `getLocation`
  - `getMotionSample`
  - `getBatteryInfo`
- [ ] Implementar `deviceCapabilities.browser.ts` (real) separado de mock
- [ ] Seleccionar adaptador por flag de entorno (`VITE_USE_REAL_DEVICE_APIS`)

## Fase 3 - Features por pantalla

### Dashboard
- [ ] Tarjetas de capacidades con estados y severidades visuales
- [ ] Boton "TEST ALL CAPABILITIES" con loading/error
- [ ] Seccion de system info (network/sw/cache)

### Media & Location
- [ ] Preview de camara (mock + real)
- [ ] Medidor de microfono con stream simulado
- [ ] Coordenadas en vivo (mock)
- [ ] Estados de permisos (granted/denied/prompt)

### Motion & Battery
- [ ] Indicadores pitch/roll/yaw en tiempo real
- [ ] Bloque de acelerometro y giroscopio
- [ ] Tarjeta de bateria con carga/restante
- [ ] Accion de vibracion mockeable

## Fase 4 - Testing (sin backend)

- [ ] Instalar y configurar `vitest` + `@testing-library/react` + `jsdom`
- [ ] Tests unitarios de dominio (mappers, normalizadores, errores)
- [ ] Tests de integracion de paginas (render + flujos de boton)
- [ ] Fixtures en `src/test/fixtures/*`
- [ ] Cobertura minima objetivo: 80%

## Fase 5 - E2E

- [ ] Configurar Playwright
- [ ] Escenario `baseline`
- [ ] Escenario `deniedPermissions`
- [ ] Escenario `offlineMode`
- [ ] Ejecutar E2E contra modo mock sin red

## Fase 6 - Hardening

- [ ] Manejo consistente de errores por capacidad
- [ ] Estados vacios y skeletons
- [ ] Accesibilidad base (roles, labels, foco)
- [ ] Performance: evitar renders innecesarios

## Definicion de terminado

- [ ] Las 3 pantallas replican el comportamiento esperado
- [ ] Toda la app funciona en modo mock sin backend
- [ ] Tests unitarios/integracion/E2E en verde
- [ ] Documentacion de ejecucion y escenarios mock actualizada

## Comandos previstos (cuando haya red)

```bash
npm i react-router-dom
npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom playwright
```

## Comandos actuales

```bash
npm run dev
npm run build
npm run lint
```
