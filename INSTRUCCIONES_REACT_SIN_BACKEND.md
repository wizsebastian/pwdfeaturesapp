# Instrucciones para Implementar en React (100% testeable sin backend)

## 1. Contexto actual (base analizada)

El repositorio contiene 3 prototipos HTML estáticos:

- `pwa_capability_dashboard/code.html`
- `media_&_location_tools/code.html`
- `motion_&_battery_sensors/code.html`

Estos prototipos ya definen los módulos funcionales clave:

- Dashboard de capacidades PWA
- Herramientas de cámara/micrófono/geolocalización
- Sensores de movimiento y batería

No hay backend real ni capa de datos persistente.

## 2. Objetivo técnico

Construir una app React que:

- replique estas pantallas como componentes reutilizables,
- funcione sin backend,
- y sea totalmente verificable en pruebas unitarias, integración y E2E.

## 3. Stack recomendado

- `React + TypeScript + Vite`
- `React Router`
- `Vitest + Testing Library`
- `Playwright` (E2E)
- `MSW` (opcional si luego simulan APIs HTTP locales)
- `Zod` (opcional para validar contratos de datos mock)

## 4. Estructura de carpetas propuesta

```txt
src/
  app/
    router.tsx
    providers.tsx
  pages/
    CapabilityDashboardPage.tsx
    MediaLocationPage.tsx
    MotionBatteryPage.tsx
  components/
    capability/
      CapabilityCard.tsx
      CapabilityGrid.tsx
    media/
      CameraPanel.tsx
      AudioWaveform.tsx
    location/
      MapPanel.tsx
      LocationStats.tsx
    sensors/
      MotionCube.tsx
      BatteryCard.tsx
  domain/
    capability.types.ts
    capability.mappers.ts
  services/
    device/
      deviceCapabilities.port.ts
      deviceCapabilities.browser.ts
      deviceCapabilities.mock.ts
    telemetry/
      telemetry.store.ts
  state/
    useCapabilityStore.ts
  mocks/
    scenarios/
      baseline.ts
      deniedPermissions.ts
      offlineMode.ts
      noSensorSupport.ts
  test/
    setup.ts
    fixtures/
      fakeMediaStream.ts
      fakeGeolocation.ts
      fakeSensorEvents.ts
```

## 5. Regla clave: diseño orientado a puertos (sin acoplar a `window`)

No consumas APIs del navegador directamente en los componentes.

Define un puerto (contrato), por ejemplo:

- `getCameraStatus()`
- `getMicrophoneLevel()`
- `getLocation()`
- `getMotionSample()`
- `getBatteryInfo()`
- `requestPermission(type)`

Luego implementa dos adaptadores:

- `deviceCapabilities.browser.ts` (real)
- `deviceCapabilities.mock.ts` (tests/dev)

Con esto puedes correr la app completa en modo mock sin backend ni hardware real.

## 6. Modelo de datos recomendado

Estado unificado para capacidad:

```ts
type CapabilityStatus = 'ready' | 'active' | 'granted' | 'idle' | 'unsupported' | 'restricted' | 'denied';

type Capability = {
  id: 'camera' | 'microphone' | 'location' | 'files' | 'motion' | 'battery' | 'share' | 'vibration' | 'print' | 'webxr';
  label: string;
  status: CapabilityStatus;
  detail?: string;
  lastUpdatedAt?: string;
};
```

Mantén datos de UI separados de datos de dispositivo:

- `domain/*`: tipos y reglas
- `services/*`: acceso a APIs/mock
- `components/*`: render puro

## 7. Flujos principales a implementar

1. Dashboard (`/`)
- Mostrar grid de capacidades con estado.
- Botón `TEST ALL CAPABILITIES` ejecuta un barrido del puerto y refresca estado.

2. Media & Location (`/media-location`)
- Simular preview de cámara (placeholder + estado).
- Simular nivel de micrófono en tiempo real (interval con datos mock).
- Mostrar ubicación mock (lat/lng) y estado de permiso.

3. Motion & Battery (`/motion-battery`)
- Renderizar valores pitch/roll/yaw desde stream mock.
- Mostrar estado de batería (nivel/cargando/tiempo estimado).
- Acción `Vibrate` delegada al puerto (mockeable).

## 8. Estrategia de desarrollo por fases

Fase 1: Base React
- Crear proyecto Vite + TypeScript.
- Configurar router y layout base.
- Migrar HTML a componentes sin lógica compleja.

Fase 2: Capa de dominio y puertos
- Definir tipos, puertos e implementación mock inicial.
- Inyectar adaptador por provider (context).

Fase 3: Estado y casos de uso
- `useCapabilityStore` para estado global (puede ser Zustand o useReducer).
- Implementar `testAllCapabilities()`.

Fase 4: Pruebas
- Unitarias de mappers/formatters/use cases.
- Integración de páginas con Testing Library.
- E2E con Playwright usando escenario mock.

## 9. Cómo asegurar que todo funcione sin backend

- Toda la app debe depender de `deviceCapabilities.port.ts`.
- En `dev` por defecto usar `deviceCapabilities.mock.ts`.
- Activar modo real solo con flag explícita (`VITE_USE_REAL_DEVICE_APIS=true`).
- Ningún test debe requerir red ni permisos reales del navegador.

## 10. Matriz mínima de pruebas

Unit tests (`vitest`):
- Mapeo de estados de capacidad.
- Manejo de errores de permisos denegados.
- Cálculo/normalización de métricas (audio, batería, motion).

Integration tests (`@testing-library/react`):
- Dashboard renderiza tarjetas correctas según escenario mock.
- `TEST ALL CAPABILITIES` cambia estados esperados.
- Navegación entre páginas conserva/actualiza estado.

E2E (`playwright`):
- Escenario baseline: todo soportado excepto `webxr` restringido.
- Escenario permisos denegados: cámara y ubicación en `denied`.
- Escenario offline: network `offline`, service worker `running` simulado.

## 11. Escenarios mock recomendados

- `baseline.ts`: estados similares a tus HTML actuales.
- `deniedPermissions.ts`: cámara/mic/location denegados.
- `noSensorSupport.ts`: motion/battery/share no soportados.
- `offlineMode.ts`: red caída + cache disponible.

Cada escenario debe ser seleccionable por query param en dev/test:

- `/?scenario=baseline`
- `/?scenario=deniedPermissions`

## 12. Criterios de aceptación (Definition of Done)

- Las 3 pantallas existen en React y mantienen la UX base.
- Existe puerto de capacidades + adaptador mock + adaptador real.
- `npm test` pasa sin backend ni red.
- `npx playwright test` pasa con escenarios mock.
- Se puede correr demo local completa con `npm run dev` sin permisos reales.

## 13. Comandos sugeridos

```bash
npm create vite@latest pwa-capability-react -- --template react-ts
cd pwa-capability-react
npm i react-router-dom
npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom playwright
```

Opcionales:

```bash
npm i zod
npm i -D msw
```

## 14. Checklist operativo

- [ ] Crear app base y rutas para 3 páginas
- [ ] Extraer componentes reutilizables desde los prototipos HTML
- [ ] Definir `deviceCapabilities.port.ts`
- [ ] Implementar `deviceCapabilities.mock.ts` con escenarios
- [ ] Conectar store/casos de uso
- [ ] Agregar tests unitarios
- [ ] Agregar tests de integración
- [ ] Agregar E2E Playwright
- [ ] Validar ejecución completa sin backend

---

Si quieres, en el siguiente paso te preparo el esqueleto inicial del proyecto React (carpetas, puertos, mocks y tests base) ya creado dentro de este repo.
