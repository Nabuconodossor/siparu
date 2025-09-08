import { useEffect, useState } from "react"
import Logo from "../assets/icons/logo.svg"
import { useNavigate } from "react-router-dom"
import { StartLayout } from "../components/layouts/Layout"

export default function LoadingScreen() {
  const navigate = useNavigate()

  const hasUpdate= true

  const [pct, setPct] = useState(0)
  const [msg, setMsg] = useState("Preparando…")

  useEffect(() => {
    const steps = [
      "Preparando recursos…",
      "Verificando configuración…",
      "Inicializando módulos…",
      "Cargando preferencias…",
      "Listo",
    ]
    let i = 0

    const interval = setInterval(() => {
      setPct((prev) => {
        const next = prev + 20
        if (next >= 100) {
          clearInterval(interval)
          setMsg("Listo")
          setTimeout(() => hasUpdate ? navigate("/update-screen" , { replace: true }) : navigate("/login", { replace: true }) , 800)
          return 100
        }
        setMsg(steps[i] || "Listo")
        i++
        return next
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [navigate])

  return (
    <StartLayout>
      <div className="flex flex-col justify-center gap-4 items-center text-white">
        <img src={Logo} alt="logo" className="w-20 h-20" />      

        {/* Barra de progreso */}
        <div className="w-40 h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="text-sm opacity-90">
          {msg} ({pct}%)
        </div>
      </div>
    </StartLayout>
  )
}
