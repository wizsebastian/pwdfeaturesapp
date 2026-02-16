import { useCallback, useEffect, useMemo, useState } from 'react'

function detectPlatform() {
  if (typeof window === 'undefined') return 'unknown'

  const ua = window.navigator.userAgent.toLowerCase()
  const isIos = /iphone|ipad|ipod/.test(ua)
  const isAndroid = /android/.test(ua)

  if (isIos) return 'ios'
  if (isAndroid) return 'android'
  return 'other'
}

function detectStandalone() {
  if (typeof window === 'undefined') return false
  const mediaStandalone = window.matchMedia('(display-mode: standalone)').matches
  const navigatorStandalone = window.navigator.standalone === true
  return mediaStandalone || navigatorStandalone
}

export function usePwaInstall() {
  const [platform] = useState(detectPlatform)
  const [isInstalled, setIsInstalled] = useState(detectStandalone)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [guideOpen, setGuideOpen] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [manualStepsDone, setManualStepsDone] = useState([])
  const [statusMessage, setStatusMessage] = useState('')

  const steps = useMemo(() => {
    if (platform === 'ios') {
      return [
        'Abre esta app en Safari (no en navegador interno).',
        'Toca el icono Compartir (cuadro con flecha hacia arriba).',
        'Selecciona "Agregar a pantalla de inicio".',
        'Confirma con "Agregar".',
      ]
    }

    if (platform === 'android') {
      return [
        'Pulsa "Descargar app".',
        'Acepta "Instalar app" en el popup del navegador.',
        'Espera a que termine y abre la app instalada.',
      ]
    }

    return [
      'Pulsa "Descargar app".',
      'Busca "Instalar app" en el menu del navegador.',
      'Confirma la instalacion.',
    ]
  }, [platform])

  useEffect(() => {
    const onBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
      setStatusMessage('Instalacion disponible. Pulsa "Descargar app".')
    }

    const onInstalled = () => {
      setIsInstalled(true)
      setGuideOpen(false)
      setStatusMessage('Instalacion completada.')
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const triggerInstall = useCallback(async () => {
    if (isInstalled) {
      setStatusMessage('La app ya esta instalada.')
      return
    }

    if (deferredPrompt) {
      deferredPrompt.prompt()
      const choiceResult = await deferredPrompt.userChoice
      setDeferredPrompt(null)

      if (choiceResult.outcome === 'accepted') {
        setStatusMessage('Instalacion aceptada. Verifica al finalizar.')
      } else {
        setStatusMessage('Instalacion cancelada. Sigue la guia manual.')
        setGuideOpen(true)
      }

      return
    }

    setGuideOpen(true)
    setStatusMessage('Sigue la guia paso a paso para instalar.')
  }, [deferredPrompt, isInstalled])

  const toggleManualStep = useCallback((index) => {
    setManualStepsDone((current) => {
      if (current.includes(index)) {
        return current.filter((item) => item !== index)
      }
      return [...current, index]
    })
  }, [])

  const verifyInstalled = useCallback(() => {
    const installed = detectStandalone()
    setIsInstalled(installed)
    if (installed) {
      setStatusMessage('Listo, la app esta instalada en tu dispositivo.')
      setGuideOpen(false)
    } else {
      setStatusMessage('Aun no se detecta instalada. Completa los pasos y vuelve a verificar.')
    }
  }, [])

  return {
    platform,
    isInstalled,
    canPromptInstall: Boolean(deferredPrompt),
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
  }
}
