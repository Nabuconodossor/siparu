import type { ReactNode } from "react"
import BackgroundVectors from "../BackgroundVectors"

type Props = { children: ReactNode }

export function StartLayout({ children }: Props) {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-r from-orange-400 to-teal-500 text-white p-5">
        <BackgroundVectors />
        <main className="relative z-10 flex-1 flex items-center justify-center">
              {children}
        </main>
    </div>
  )
}
