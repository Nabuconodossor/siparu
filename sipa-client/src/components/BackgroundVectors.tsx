// src/components/BackgroundVectors.tsx
import Vector4 from '../assets/images/Vector 4.svg'
import Vector5 from '../assets/images/Vector 5.svg'
import Vector6 from '../assets/images/Vector 6.svg'

export default function BackgroundVectors() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Vector 4 arriba */}
      <img
        src={Vector4}
        alt="Vector 4"
        className="absolute top-0 right-0 -translate-x-1/2 opacity-50"
      />
      {/* Vector 5 al centro */}
      <img
        src={Vector5}
        alt="Vector 5"
        className="absolute top-1/2 right-0 -translate-y-1/2 opacity-50"
      />
      {/* Vector 6 abajo */}
      <img
        src={Vector6}
        alt="Vector 6"
        className="absolute bottom-80 right-0 opacity-50"
      />
    </div>
  )
}
