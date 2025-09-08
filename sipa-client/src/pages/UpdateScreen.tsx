import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../assets/icons/enami-logo.svg"
import { StartLayout } from "../components/layouts/Layout"

type VersionInfo = {
  current: string
  latest: string
  notes: string[]
  needsUpdate: boolean
}

function mockCheckUpdate(): Promise<VersionInfo> {
  return new Promise(res =>
    setTimeout(() => res({
      current: "1.0.0",
      latest: "1.0.5",
      notes: ["Correcciones menores", "Mejoras de rendimiento", "Deps actualizadas"],
      needsUpdate: true,
    }), 600)
  )
}
function mockApplyUpdate(onProgress: (p: number, msg: string) => void) {
  let p = 0
  const id = setInterval(() => {
    p = Math.min(100, p + 5)
    onProgress(p, p < 100 ? `Descargando… ${p}%` : "Actualización completa")
    if (p >= 100) clearInterval(id)
  }, 120)
}

export default function UpdateScreen() {
  const nav = useNavigate()
  const [info, setInfo] = useState<VersionInfo | null>(null)
  const [msg, setMsg] = useState("Verificando actualización…")
  const [pct, setPct] = useState(0)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    let mounted = true
      ; (async () => {
        const v = await mockCheckUpdate()
        if (!mounted) return
        setInfo(v)
        setMsg(v.needsUpdate ? `Nueva versión ${v.latest} disponible` : "Sin actualizaciones")
        if (!v.needsUpdate) setTimeout(() => nav("/login", { replace: true }), 700)
      })()
    return () => { mounted = false }
  }, [nav])

  const start = () => {
    setUpdating(true)
    setMsg("Iniciando actualización…")
    mockApplyUpdate((p, m) => {
      setPct(p); setMsg(m)
      if (p >= 100) setTimeout(() => nav("/login", { replace: true }), 400)
    })
  }

  const skip = () => nav("/login", { replace: true })

  return (
    <StartLayout>
      <div className="relative z-10 bg-white text-gray-900 rounded-2xl shadow-xl w-full max-w-[800px] p-8 md:p-10">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="ENAMI" className="h-8" />
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold">Actualización disponible</h1>
        <p className="text-gray-500 mt-1">
          {info ? `Actual: v${info.current} · Última: v${info.latest}` : "Verificando versión…"}
        </p>

        {info?.notes?.length ? (
          <ul className="mt-4 space-y-1 text-sm text-gray-600 list-disc list-inside">
            {info.notes.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
        ) : null}

        {/* Progreso */}
        <div className="mt-6">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${updating ? "bg-teal-500" : "bg-gray-300"} transition-[width] duration-200`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="text-sm text-gray-500 mt-2">{msg}{updating ? ` (${pct}%)` : ""}</div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={start}
            disabled={updating || !info?.needsUpdate}
            className="flex-1 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-medium rounded-xl py-3 transition-colors text-sm px-1 md:px-0 md:text-md"
          >
            {updating ? "Actualizando…" : "Actualizar e ingresar"}
          </button>
          <button
            onClick={skip}
            disabled={updating}
            className="px-4 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm md:text-md"
          >
            Omitir por ahora
          </button>
        </div>
      </div>
    </StartLayout>
  )
}
