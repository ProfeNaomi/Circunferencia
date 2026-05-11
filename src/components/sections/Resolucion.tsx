import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { motion } from 'motion/react';
import { RetroHero } from '../RetroHero';

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 15, 10]} 
        intensity={2.5} 
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      {/* Fill light */}
      <pointLight position={[-10, 0, -10]} intensity={1.5} color="#4f46e5" />
      <pointLight position={[5, -5, 10]} intensity={1.2} color="#ec4899" />
    </>
  );
}

export function Resolucion() {
  const [year, setYear] = useState(2026);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 w-full h-full text-white overflow-hidden"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }} shadows>
          <color attach="background" args={['#f8fafc']} />
          
          <SceneLighting />
          
          <RetroHero year={year} />
          
          <OrbitControls 
            enablePan={false}
            minDistance={3.5}
            maxDistance={35}
            zoomSpeed={0.8}
            rotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-4 sm:p-8 overflow-y-auto">
        <div className="flex-grow flex flex-col justify-between gap-8 h-full max-w-7xl mx-auto w-full">
            {/* Header */}
            <header className="pointer-events-auto max-w-xl">
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-slate-900">
                La Ilusión de la <span className="font-bold text-pink-500">Resolución</span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed bg-white/80 border border-slate-200 p-3 rounded-xl shadow-sm">
                En la programación, no existen los círculos perfectos, solo polígonos con muchos lados. A lo lejos, la ilusión de redondez nos engaña. A medida que te acercas a la verdad, descubres que la redondez nunca existió: el círculo es solo un límite inalcanzable.
              </p>
              <div className="mt-6 bg-white/90 border border-slate-200 p-5 rounded-2xl backdrop-blur-md shadow-sm space-y-2">
                <p className="text-sm text-pink-500 font-bold uppercase tracking-wider mb-2">Comprueba la teoría (El Secreto de Pi):</p>
                <ul className="text-sm text-slate-600 list-none space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-pink-100 p-1.5 rounded text-pink-500">🕵️</div>
                    <span><strong className="text-slate-900">Rompe la ilusión:</strong> Usa la rueda del ratón (scroll) para <strong>acercarte y revelar la realidad.</strong> De cerca todo es plano y expone la simulación (Wireframes).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-indigo-100 p-1.5 rounded text-indigo-500">🔄</div>
                    <span><strong className="text-slate-900">Observa desde todos los ángulos:</strong> Haz clic y arrastra para rotar la cámara.</span>
                  </li>
                </ul>
              </div>
            </header>

            {/* Time Control */}
            <footer className="pointer-events-auto max-w-2xl w-full mx-auto backdrop-blur-xl bg-white/90 p-6 rounded-3xl border border-slate-200 shadow-lg mt-auto sticky bottom-4">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium uppercase tracking-widest text-slate-500">
                    Año de Lanzamiento (Densidad Poligonal)
                  </label>
                  <span className="text-3xl font-mono text-pink-500 font-bold drop-shadow-sm">
                    {year}
                  </span>
                </div>
                
                <input 
                  type="range" 
                  min="1990" 
                  max="2026" 
                  step="1" 
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none outline-none focus:ring-2 focus:ring-pink-500/50"
                />
                
                <div className="flex justify-between text-xs text-slate-400 font-bold tracking-wider">
                  <span>1990 (Pocos Lados)</span>
                  <span>2026 (Ilusión Redonda)</span>
                </div>
                
                <p className="text-sm text-slate-500 mt-2 text-center max-w-lg mx-auto">
                  A lo largo del tiempo, las computadoras han agregado más y más caras a los polígonos para simular el círculo de manera convincente. Es el equivalente computacional de acercarnos al valor real de Pi.
                </p>
              </div>
            </footer>
        </div>
      </div>
    </motion.section>
  );
}
