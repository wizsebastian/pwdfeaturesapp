import { CapabilityCard } from '../components/capability/CapabilityCard.jsx'

export function CapabilityDashboardPage({ capabilities, systemInfo, onTestAll, pwaInstall }) {
  const {
    platform,
    isInstalled,
    canPromptInstall,
    guideOpen,
    setGuideOpen,
    stepIndex,
    setStepIndex,
    steps,
    manualStepsDone,
    toggleManualStep,
    statusMessage,
    triggerInstall,
    verifyInstalled,
  } = pwaInstall

  const currentStep = steps[stepIndex]

  return (
    <section className="page">
      <div className="section-header">
        <h2>Capability Dashboard</h2>
        <div className="header-actions">
          <button type="button" onClick={triggerInstall}>
            {isInstalled ? 'APP INSTALADA' : 'DESCARGAR APP'}
          </button>
          <button type="button" onClick={onTestAll}>TEST ALL CAPABILITIES</button>
        </div>
      </div>

      <div className="install-summary">
        <p>
          Plataforma detectada: <strong>{platform}</strong>
        </p>
        <p>
          Estado instalacion: <strong>{isInstalled ? 'completada' : 'pendiente'}</strong>
        </p>
        {!isInstalled && (
          <button type="button" className="ghost-btn" onClick={() => setGuideOpen((open) => !open)}>
            {guideOpen ? 'Ocultar guia' : 'Ver guia interactiva'}
          </button>
        )}
      </div>

      {guideOpen && !isInstalled && (
        <div className="install-guide" role="dialog" aria-label="Guia de instalacion">
          <h3>Guia interactiva de instalacion</h3>
          <p className="guide-hint">
            {canPromptInstall
              ? 'Tu navegador permite instalacion directa con el boton Descargar app.'
              : 'Sigue estos pasos manuales para terminar con la app instalada.'}
          </p>

          <p className="guide-step-label">
            Paso {stepIndex + 1} de {steps.length}
          </p>
          <p className="guide-step">{currentStep}</p>

          <label className="step-check">
            <input
              type="checkbox"
              checked={manualStepsDone.includes(stepIndex)}
              onChange={() => toggleManualStep(stepIndex)}
            />
            Marcar paso como completado
          </label>

          <div className="guide-actions">
            <button type="button" className="ghost-btn" onClick={() => setStepIndex((s) => Math.max(0, s - 1))}>
              Anterior
            </button>
            <button
              type="button"
              className="ghost-btn"
              onClick={() => setStepIndex((s) => Math.min(steps.length - 1, s + 1))}
            >
              Siguiente
            </button>
            <button type="button" onClick={verifyInstalled}>
              Verificar instalacion
            </button>
          </div>
        </div>
      )}

      {statusMessage && <p className="install-status">{statusMessage}</p>}

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
