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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto p-4 sm:p-8 w-full flex-grow flex flex-col pb-24"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-start h-full min-h-[600px]">
        {/* UI Overlay - Left Side */}
        <div className="flex flex-col justify-between h-full space-y-8">
            <header className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-slate-900">
                La Ilusión de la <span className="font-bold text-pink-500">Resolución</span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed bg-white/80 border border-slate-200 p-5 rounded-2xl shadow-sm mb-6">
                En la programación, no existen los círculos perfectos, solo polígonos con muchos lados. A lo lejos, la ilusión de redondez nos engaña. A medida que te acercas a la verdad, descubres que la redondez nunca existió: el círculo es solo un límite inalcanzable.
              </p>
              
              <div className="bg-white/90 border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
                <p className="text-sm text-pink-500 font-bold uppercase tracking-wider">Comprueba la teoría (El Secreto de Pi):</p>
                <ul className="text-sm text-slate-600 list-none space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="bg-pink-100 p-2 rounded-lg text-pink-500 text-xl">🕵️</div>
                    <span className="leading-relaxed"><strong className="text-slate-900">Rompe la ilusión:</strong> Usa la rueda del ratón (scroll) para <strong>acercarte y revelar la realidad.</strong> De cerca todo es plano y expone la simulación (Wireframes).</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-indigo-100 p-2 rounded-lg text-indigo-500 text-xl">🔄</div>
                    <span className="leading-relaxed"><strong className="text-slate-900">Observa desde todos los ángulos:</strong> Haz clic y arrastra para rotar la cámara.</span>
                  </li>
                </ul>
              </div>
            </header>

            {/* Time Control */}
            <footer className="w-full bg-white border border-slate-200 p-6 rounded-3xl shadow-sm mt-auto">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium uppercase tracking-widest text-slate-500">
                    Año (Densidad Poligonal)
                  </label>
                  <span className="text-4xl font-mono text-pink-500 font-bold drop-shadow-sm">
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
                  className="w-full accent-pink-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none outline-none focus:ring-2 focus:ring-pink-500/50 my-2"
                />
                
                <div className="flex justify-between text-xs text-slate-400 font-bold tracking-wider">
                  <span>1990 (Pocos Lados)</span>
                  <span>2026 (Ilusión Redonda)</span>
                </div>
                
                <p className="text-sm text-slate-500 mt-2">
                  A lo largo del tiempo, las computadoras han agregado más y más caras a los polígonos para simular el círculo de manera convincente. Es el equivalente computacional de acercarnos al valor real de Pi.
                </p>
              </div>
            </footer>
        </div>

        {/* 3D Canvas - Right Side */}
        <div className="relative w-full h-[500px] lg:h-full bg-slate-100 border border-slate-200 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }} shadows>
            <color attach="background" args={['#f1f5f9']} />
            
            <SceneLighting />
            <RetroHero year={year} />
            <OrbitControls 
              enablePan={false}
              minDistance={3.5}
              maxDistance={25}
              zoomSpeed={0.8}
              rotateSpeed={0.5}
            />
          </Canvas>
          
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-400 border border-slate-200 pointer-events-none">
            Interactable 3D
          </div>
        </div>
      </div>
    </motion.section>
  );
}
