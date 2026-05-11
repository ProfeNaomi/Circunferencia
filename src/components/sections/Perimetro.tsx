import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Perimetro() {
  const [step, setStep] = useState<number>(0);
  
  // r = 15. d = 30. P = 30 * PI ≈ 94.24
  const radius = 15;
  const diameter = radius * 2;
  const circumference = Math.PI * diameter;

  // Step 0: Initial
  // Step 1: Unrolling (takes 4s)
  // Step 2: Diameter 1 (1s)
  // Step 3: Diameter 2 (1s)
  // Step 4: Diameter 3 (1s)
  // Step 5: Remainder + Equation (2s)
  
  useEffect(() => {
    if (step === 0) return;
    
    let timer: NodeJS.Timeout;
    if (step === 1) timer = setTimeout(() => setStep(2), 4000);
    else if (step === 2) timer = setTimeout(() => setStep(3), 1000);
    else if (step === 3) timer = setTimeout(() => setStep(4), 1000);
    else if (step === 4) timer = setTimeout(() => setStep(5), 1500);
    else if (step === 5) timer = setTimeout(() => setStep(0), 6000); // Reset after showing equation
    
    return () => clearTimeout(timer);
  }, [step]);

  const startAnimation = () => {
    if (step === 0) setStep(1);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto p-8 w-full flex-grow flex flex-col justify-center"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
          El <span className="text-emerald-600">Perímetro</span> (Circunferencia)
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Es la longitud del borde. Si "desenrollaras" el círculo, ¿cuántas veces cabría su diámetro en esa línea?
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_350px] gap-12 items-center">
        {/* Visualizer */}
        <div className="relative aspect-video w-full bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-center items-center shadow-sm overflow-hidden">
          
          <svg viewBox="0 0 160 80" className="w-full h-full overflow-visible">
            {/* Ground line */}
            <line x1="10" y1="50" x2="150" y2="50" stroke="#cbd5e1" strokeWidth="0.5" />
            
            {/* The unwrapped line - grows as the circle rolls */}
            <motion.line 
              x1="20" y1="50" 
              x2="20" y2="50"
              stroke="#10b981" strokeWidth="2"
              animate={{ 
                x2: step >= 1 ? 20 + circumference : 20,
                opacity: step >= 1 ? 1 : 0
              }}
              transition={{ duration: 4, ease: "linear" }}
            />

            {/* The rolling Circle */}
            <AnimatePresence>
              {step <= 1 && (
                <motion.g
                  animate={{ 
                    x: step === 1 ? circumference : 0,
                    rotate: step === 1 ? 360 : 0,
                    opacity: step > 1 ? 0 : 1
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 4, ease: "linear" }}
                  style={{ originX: '20px', originY: `${50 - radius}px` }} // Rotate around its center
                >
                  <circle cx="20" cy={50 - radius} r={radius} fill="none" stroke="#6366f1" strokeWidth="1.5" />
                  <line x1="20" y1={50 - radius} x2="20" y2="50" stroke="#ec4899" strokeWidth="1" />
                  <circle cx="20" cy="50" r="1.5" fill="#ec4899" />
                  
                  {/* Scissors icon (simplified) that appears at start of step 1 */}
                  {step === 1 && (
                    <motion.g initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                      <path d="M18 52 L22 48 M18 48 L22 52" stroke="#475569" strokeWidth="1" />
                      <circle cx="17" cy="53" r="1" stroke="#475569" fill="none" strokeWidth="0.5"/>
                      <circle cx="17" cy="47" r="1" stroke="#475569" fill="none" strokeWidth="0.5"/>
                    </motion.g>
                  )}
                </motion.g>
              )}
            </AnimatePresence>

            {/* Diameters fitting into the circumference */}
            {step >= 2 && (
              <motion.g initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                {/* Diameter 1 */}
                <line x1="20" y1="46" x2={20 + diameter} y2="46" stroke="#6366f1" strokeWidth="2" />
                <text x={20 + diameter/2} y="44" fontSize="4" fill="#4f46e5" textAnchor="middle">1 d</text>
                <line x1="20" y1="45" x2="20" y2="47" stroke="#6366f1" strokeWidth="0.5" />
                <line x1={20 + diameter} y1="45" x2={20 + diameter} y2="47" stroke="#6366f1" strokeWidth="0.5" />
              </motion.g>
            )}

            {step >= 3 && (
              <motion.g initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                {/* Diameter 2 */}
                <line x1={20 + diameter} y1="46" x2={20 + diameter*2} y2="46" stroke="#ec4899" strokeWidth="2" />
                <text x={20 + diameter*1.5} y="44" fontSize="4" fill="#db2777" textAnchor="middle">2 d</text>
                <line x1={20 + diameter*2} y1="45" x2={20 + diameter*2} y2="47" stroke="#ec4899" strokeWidth="0.5" />
              </motion.g>
            )}

            {step >= 4 && (
              <motion.g initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                {/* Diameter 3 */}
                <line x1={20 + diameter*2} y1="46" x2={20 + diameter*3} y2="46" stroke="#f59e0b" strokeWidth="2" />
                <text x={20 + diameter*2.5} y="44" fontSize="4" fill="#d97706" textAnchor="middle">3 d</text>
                <line x1={20 + diameter*3} y1="45" x2={20 + diameter*3} y2="47" stroke="#f59e0b" strokeWidth="0.5" />
              </motion.g>
            )}

            {step >= 5 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Remainder ≈ 0.14 d */}
                <line x1={20 + diameter*3} y1="46" x2={20 + circumference} y2="46" stroke="#ef4444" strokeWidth="2" />
                <text x={20 + diameter*3 + (circumference - diameter*3)/2} y="44" fontSize="3" fill="#dc2626" textAnchor="middle">0.14 d</text>
                <line x1={20 + circumference} y1="45" x2={20 + circumference} y2="47" stroke="#ef4444" strokeWidth="0.5" />
                
                {/* Conclusion Bracket */}
                <path d={`M 20 54 L 20 56 L ${20 + circumference} 56 L ${20 + circumference} 54`} fill="none" stroke="#64748b" strokeWidth="0.5" />
                <text x={20 + circumference/2} y="62" fontSize="5" fill="#334155" textAnchor="middle" fontWeight="bold">Perímetro = 3.14159... × d</text>
                <text x={20 + circumference/2} y="68" fontSize="5" fill="#10b981" textAnchor="middle" fontWeight="bold">P = π · d</text>
              </motion.g>
            )}

          </svg>

          {step === 0 && (
            <button 
              onClick={startAnimation}
              className="absolute bottom-6 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors shadow-md"
            >
              Ver Demostración Animada
            </button>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
            <h3 className="text-lg text-slate-500 mb-2 uppercase tracking-widest font-bold">Relación con Pi</h3>
            
            <div className="h-24 flex flex-col justify-center mb-6">
              <AnimatePresence mode="wait">
                {step < 5 ? (
                  <motion.div 
                    key="waiting"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-4xl font-mono text-slate-300"
                  >
                    P / d = ?
                  </motion.div>
                ) : (
                  <motion.div 
                    key="done"
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col gap-2"
                  >
                    <div className="text-4xl font-mono text-slate-800">
                      P / d = <span className="text-emerald-600">π</span>
                    </div>
                    <div className="text-2xl font-mono text-emerald-600 font-bold">
                      P = π · d
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <ul className="space-y-4 text-slate-600">
              <li className="flex gap-4">
                <span className="font-bold text-indigo-500">d</span>
                <span>El <strong>Diámetro</strong> (la línea que cruza de lado a lado).</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-emerald-600">π</span>
                <span><strong>Pi</strong> (~3.14). Es exactamente la cantidad de veces que el diámetro cabe en el perímetro.</span>
              </li>
              <li className="flex gap-4 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-slate-500">💡</span>
                <span>No importa el tamaño del círculo, el diámetro siempre cabrá 3 veces y un poquito más (0.14159...).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

