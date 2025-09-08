import { StartLayout } from "../../components/layouts/Layout"
import logo from "../../assets/icons/enami-logo.svg"
import { useState } from "react"

function IconUser() {
  return (
    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="8" r="4" strokeWidth="2"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" strokeWidth="2"/>
    </svg>
  )
}
function IconLock() {
  return (
    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="4" y="10" width="16" height="10" rx="2" strokeWidth="2"/>
      <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeWidth="2"/>
    </svg>
  )
}

export default function Login() {
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: autenticar
    console.log({ user, pass })
  }

  return (
    <StartLayout>
      <div className="w-full max-w-[500px] transition-all ease-in-out duration-100">
      <div className="mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <div className="flex justify-center mb-10">
          <img src={logo} alt="ENAMI" className="h-8" />
        </div>

        <h1 className="text-3xl font-semibold text-gray-900">Iniciar Sesión</h1>
        <p className="text-gray-500 mt-1">
          Ingrese sus credenciales para acceder al sistema
        </p>

        <form onSubmit={submit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuario</label>
            <div className="mt-2 relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <IconUser />
              </span>
              <input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-gray-900 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Ingrese su usuario"
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <div className="mt-2 relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <IconLock />
              </span>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-gray-900 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Ingrese su contraseña"
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-xl py-3 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
    </StartLayout>
  )
}
