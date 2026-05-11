import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Area() {
  const [proof, setProof] = useState<1 | 2>(1);
  const [step, setStep] = useState(0); // 0 = Circle, 1 = Transforming, 2 = Final shape

  // Handlers for "Siguiente paso" clicking
  const startAnimation = () => setStep(1);

  useEffect(() => {
    if (step === 0) return;
    
    let timer: NodeJS.Timeout;
    if (step === 1) timer = setTimeout(() => setStep(2), 3000);
    else if (step === 2) timer = setTimeout(() => setStep(0), 6000); // Reset after 6s
    
    return () => clearTimeout(timer);
  }, [step]);

  // Reset step when changing proof
  useEffect(() => {
    setStep(0);
  }, [proof]);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto p-8 w-full flex-grow flex flex-col justify-center"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
          El <span className="text-purple-600">Área</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          ¿Cómo sabemos que es <code className="text-purple-600 font-mono bg-purple-50 px-2 py-1 rounded">π · r²</code>? 
          Descubre dos formas visuales de demostrarlo.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start">
        
        {/* Visualizer container */}
        <div className="flex flex-col gap-4">
          {/* Tabs for proof type */}
          <div className="flex gap-2 p-1 bg-white border border-slate-200 shadow-sm rounded-xl w-fit">
            <button 
              onClick={() => setProof(1)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${proof === 1 ? 'bg-purple-100 text-purple-700' : 'text-slate-500 hover:text-slate-800'}`}
            >
              1. Las rebanadas de pizza
            </button>
            <button 
              onClick={() => setProof(2)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${proof === 2 ? 'bg-orange-100 text-orange-700' : 'text-slate-500 hover:text-slate-800'}`}
            >
              2. Los anillos (Cebolla)
            </button>
          </div>

          <div className="relative aspect-video w-full bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-center items-center shadow-sm overflow-hidden">
            
            {proof === 1 && (
              <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                {/* Proof 1: Slices to Rectangle */}
                <AnimatePresence>
                  {step === 0 && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: {duration: 0.5} }}>
                       <circle cx="100" cy="50" r="40" fill="#a855f7" className="opacity-20" />
                       {/* Draw lines slicing it */}
                       {[0, 30, 60, 90, 120, 150].map(angle => (
                         <line key={angle} x1="100" y1="10" x2="100" y2="90" stroke="#a855f7" strokeWidth="1" transform={`rotate(${angle} 100 50)`} />
                       ))}
                       <text x="100" y="98" fontSize="6" fill="#64748b" textAnchor="middle">1. Dividimos el círculo en muchos sectores iguales</text>
                    </motion.g>
                  )}
                  {step === 1 && (
                    <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, transition: {duration: 0.5} }}>
                       {/* Half slices up, half slices down, separating */}
                       <path d="M 60 40 A 40 40 0 0 1 140 40" fill="none" stroke="#a855f7" strokeWidth="4" strokeDasharray="5 5" />
                       <path d="M 60 60 A 40 40 0 0 0 140 60" fill="none" stroke="#a855f7" strokeWidth="4" strokeDasharray="5 5" />
                       <text x="100" y="98" fontSize="6" fill="#64748b" textAnchor="middle">2. Separamos la mitad superior y la inferior</text>
                    </motion.g>
                  )}
                  {step === 2 && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                       {/* Approximate rectangle */}
                       <rect x="40" y="30" width="120" height="40" fill="#a855f7" className="opacity-30" />
                       {/* Zig zag vertical lines inside */}
                       <path d="M40 30 L45 70 L50 30 L55 70 L60 30 L65 70 L70 30 L75 70 L80 30 L85 70 L90 30 L95 70 L100 30 L105 70 L110 30 L115 70 L120 30 L125 70 L130 30 L135 70 L140 30 L145 70 L150 30 L155 70 L160 30" fill="none" stroke="#a855f7" strokeWidth="1" />
                       
                       <text x="100" y="80" fontSize="5" fill="#1e293b" textAnchor="middle" fontWeight="bold">Base ≈ π·r (mitad del perímetro)</text>
                       <text x="32" y="52" fontSize="5" fill="#1e293b" textAnchor="end" transform="rotate(-90 28 50)" fontWeight="bold">Altura ≈ r</text>
                       
                       <text x="100" y="98" fontSize="6" fill="#64748b" textAnchor="middle">3. Al encajarlos, forman un rectángulo de Área = (π·r) × r = π·r²</text>
                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>
            )}

            {proof === 2 && (
              <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                {/* Proof 2: Onion rings to Triangle */}
                <AnimatePresence>
                  {step === 0 && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: {duration: 0.5} }}>
                       {[10, 20, 30, 40].map(r => (
                         <circle key={r} cx="100" cy="50" r={r} fill="none" stroke="#f97316" strokeWidth="4" className="opacity-80" />
                       ))}
                       <text x="100" y="98" fontSize="6" fill="#64748b" textAnchor="middle">1. Imaginamos el círculo hecho de anillos concéntricos</text>
                    </motion.g>
                  )}
                  {step === 1 && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: {duration: 0.5} }}>
                       {/* Rings half unrolled */}
                       <path d="M100 10 Q140 10 140 50" fill="none" stroke="#f97316" strokeWidth="4" />
                       <path d="M100 20 Q130 20 130 50" fill="none" stroke="#f97316" strokeWidth="4" />
                       <path d="M100 30 Q120 30 120 50" fill="none" stroke="#f97316" strokeWidth="4" />
                       <path d="M100 40 Q110 40 110 50" fill="none" stroke="#f97316" strokeWidth="4" />
                       <text x="100" y="98" fontSize="6" fill="#64748b" textAnchor="middle">2. Cortamos y desenrollamos cada anillo</text>
                    </motion.g>
                  )}
                  {step === 2 && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                       {/* Triangle made of lines */}
                       <polygon points="100,10 40,80 160,80" fill="#f97316" className="opacity-20" />
                       <line x1="40" y1="80" x2="160" y2="80" stroke="#f97316" strokeWidth="2" />
                       <line x1="55" y1="62.5" x2="145" y2="62.5" stroke="#f97316" strokeWidth="2" />
                       <line x1="70" y1="45" x2="130" y2="45" stroke="#f97316" strokeWidth="2" />
                       <line x1="85" y1="27.5" x2="115" y2="27.5" stroke="#f97316" strokeWidth="2" />
                       
                       <text x="100" y="90" fontSize="5" fill="#1e293b" textAnchor="middle" fontWeight="bold">Base = 2·π·r (el anillo más grande)</text>
                       <text x="32" y="52" fontSize="5" fill="#1e293b" textAnchor="end" transform="rotate(-90 28 50)" fontWeight="bold">Altura = r</text>
                       
                       <text x="100" y="98" fontSize="6" fill="#64748b" textAnchor="middle">3. Forman un triángulo: Base × Altura / 2 = (2πr × r) / 2 = π·r²</text>
                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>
            )}

            {step === 0 && (
              <button 
                onClick={startAnimation}
                className={`absolute bottom-6 px-8 py-3 text-white font-bold rounded-xl transition-colors shadow-md ${proof === 1 ? 'bg-purple-600 hover:bg-purple-500' : 'bg-orange-500 hover:bg-orange-400'}`}
              >
                Ver Demostración Animada
              </button>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
            <h3 className="text-lg text-slate-500 mb-2 uppercase tracking-widest font-bold">Fórmula Recta</h3>
            <div className="text-5xl font-mono text-slate-800 mb-6">
              A = <span className="text-purple-600">π</span> · <span className="text-pink-500">r²</span>
            </div>
            
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              El área es la cantidad de espacio <strong>dentro</strong> de las fronteras de una figura plana. 
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              En ambos métodos visuales, transformamos algo curvo en polígonos conocidos (rectángulo o triángulo) para probar que rinde la misma fórmula.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
