import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function Perimetro() {
  const [progress, setProgress] = useState(0); // 0 to 100
  const [isPlaying, setIsPlaying] = useState(false);
  
  // r = 15. d = 30. P = 30 * PI ≈ 94.24
  const radius = 15;
  const diameter = radius * 2;
  const circumference = Math.PI * diameter;

  useEffect(() => {
    let animationFrame: number;
    let lastTime: number;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      setProgress((prev) => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 100;
        }
        // Total duration: ~10 seconds. 100 units in 10000ms => 0.01 units/ms
        return Math.min(100, prev + deltaTime * 0.015); // Slightly faster
      });

      if (isPlaying) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (isPlaying) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying]);

  const togglePlay = () => {
    if (progress >= 100) setProgress(0);
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  // Derived progress values
  const unrollProgress = Math.min(1, Math.max(0, progress / 40));
  const d1Progress = Math.min(1, Math.max(0, (progress - 45) / 10));
  const d2Progress = Math.min(1, Math.max(0, (progress - 55) / 10));
  const d3Progress = Math.min(1, Math.max(0, (progress - 65) / 10));
  const remProgress = Math.min(1, Math.max(0, (progress - 75) / 10));
  const eqProgress = Math.min(1, Math.max(0, (progress - 85) / 10));

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto p-4 sm:p-8 w-full flex-grow flex flex-col justify-center pb-24"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
          El <span className="text-emerald-600">Perímetro</span> (Circunferencia)
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Es la longitud del borde. Si "desenrollaras" el círculo, ¿cuántas veces cabría su diámetro en esa línea?
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_350px] gap-12 items-start">
        {/* Visualizer */}
        <div className="flex flex-col gap-6">
          <div className="relative aspect-video w-full bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-center items-center shadow-md overflow-hidden">
            
            <svg viewBox="0 0 160 80" className="w-full h-full overflow-visible">
              {/* Ground line */}
              <line x1="10" y1="50" x2="150" y2="50" stroke="#cbd5e1" strokeWidth="0.5" />
              
              {/* The unwrapped line - grows as the circle rolls */}
              <line 
                x1="20" y1="50" 
                x2={20 + circumference * unrollProgress} y2="50"
                stroke="#10b981" strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* The rolling Circle */}
              <motion.g
                style={{ 
                  x: circumference * unrollProgress,
                  originX: '20px', 
                  originY: `${50 - radius}px` 
                }}
                animate={{
                  rotate: 360 * unrollProgress,
                  opacity: progress > 45 ? 0 : 1
                }}
                transition={{ duration: 0 }}
              >
                <circle cx="20" cy={50 - radius} r={radius} fill="none" stroke="#6366f1" strokeWidth="1.5" />
                
                {/* 4 Spokes to make it look like a wheel */}
                <line x1="20" y1={50 - radius * 0.8} x2="20" y2={50 - radius + radius * 0.8} stroke="#cbd5e1" strokeWidth="1" />
                <line x1={20 - radius * 0.8} y1={50 - radius} x2={20 + radius * 0.8} y2={50 - radius} stroke="#cbd5e1" strokeWidth="1" />
                
                {/* Highlight spoke that was initially touching the ground */}
                <line x1="20" y1={50 - radius} x2="20" y2="50" stroke="#ec4899" strokeWidth="2" />
                <circle cx="20" cy="50" r="2" fill="#ec4899" />
                <circle cx="20" cy={50 - radius} r="1.5" fill="#6366f1" />
                
                {/* Scissors icon (simplified) that appears at start */}
                {progress > 0 && progress < 5 && (
                  <g opacity={1 - progress/5}>
                    <path d="M18 52 L22 48 M18 48 L22 52" stroke="#475569" strokeWidth="1" />
                    <circle cx="17" cy="53" r="1" stroke="#475569" fill="none" strokeWidth="0.5"/>
                    <circle cx="17" cy="47" r="1" stroke="#475569" fill="none" strokeWidth="0.5"/>
                  </g>
                )}
              </motion.g>

              {/* Diameters fitting into the circumference */}
              {/* Diameter 1 */}
              {d1Progress > 0 && (
                <g opacity={d1Progress} transform={`translate(0, ${(1 - d1Progress) * -5})`}>
                  <line x1="20" y1="46" x2={20 + diameter} y2="46" stroke="#6366f1" strokeWidth="2" />
                  <text x={20 + diameter/2} y="44" fontSize="4" fill="#4f46e5" textAnchor="middle" fontWeight="bold">1 d</text>
                  <line x1="20" y1="45" x2="20" y2="47" stroke="#6366f1" strokeWidth="0.5" />
                  <line x1={20 + diameter} y1="45" x2={20 + diameter} y2="47" stroke="#6366f1" strokeWidth="0.5" />
                </g>
              )}

              {/* Diameter 2 */}
              {d2Progress > 0 && (
                <g opacity={d2Progress} transform={`translate(0, ${(1 - d2Progress) * -5})`}>
                  <line x1={20 + diameter} y1="46" x2={20 + diameter*2} y2="46" stroke="#ec4899" strokeWidth="2" />
                  <text x={20 + diameter*1.5} y="44" fontSize="4" fill="#db2777" textAnchor="middle" fontWeight="bold">2 d</text>
                  <line x1={20 + diameter*2} y1="45" x2={20 + diameter*2} y2="47" stroke="#ec4899" strokeWidth="0.5" />
                </g>
              )}

              {/* Diameter 3 */}
              {d3Progress > 0 && (
                <g opacity={d3Progress} transform={`translate(0, ${(1 - d3Progress) * -5})`}>
                  <line x1={20 + diameter*2} y1="46" x2={20 + diameter*3} y2="46" stroke="#f59e0b" strokeWidth="2" />
                  <text x={20 + diameter*2.5} y="44" fontSize="4" fill="#d97706" textAnchor="middle" fontWeight="bold">3 d</text>
                  <line x1={20 + diameter*3} y1="45" x2={20 + diameter*3} y2="47" stroke="#f59e0b" strokeWidth="0.5" />
                </g>
              )}

              {/* Remainder ≈ 0.14 d */}
              {remProgress > 0 && (
                <g opacity={remProgress}>
                  <line x1={20 + diameter*3} y1="46" x2={20 + circumference} y2="46" stroke="#ef4444" strokeWidth="2" />
                  <text x={20 + diameter*3 + (circumference - diameter*3)/2} y="43" fontSize="3" fill="#dc2626" textAnchor="middle" fontWeight="bold">0.14 d</text>
                  <line x1={20 + circumference} y1="45" x2={20 + circumference} y2="47" stroke="#ef4444" strokeWidth="0.5" />
                </g>
              )}

              {/* Conclusion Equation */}
              {eqProgress > 0 && (
                <g opacity={eqProgress}>
                  <path d={`M 20 54 L 20 56 L ${20 + circumference} 56 L ${20 + circumference} 54`} fill="none" stroke="#64748b" strokeWidth="0.5" />
                  <text x={20 + circumference/2} y="64" fontSize="6" fill="#334155" textAnchor="middle" fontWeight="bold">Perímetro = 3.14159... × d</text>
                  <text x={20 + circumference/2} y="72" fontSize="7" fill="#10b981" textAnchor="middle" fontWeight="bold">P = π · d</text>
                </g>
              )}

            </svg>
          </div>

          {/* Controls */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <button 
              onClick={togglePlay}
              className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-sm transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
            </button>
            <button 
              onClick={reset}
              className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <input 
              type="range" 
              min="0" max="100" 
              value={progress}
              onChange={(e) => {
                setProgress(Number(e.target.value));
                setIsPlaying(false);
              }}
              className="flex-grow accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
            <h3 className="text-lg text-slate-500 mb-2 uppercase tracking-widest font-bold">Relación con Pi</h3>
            
            <div className="h-24 flex flex-col justify-center mb-6">
              <AnimatePresence mode="wait">
                {progress < 85 ? (
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
              <li className="flex gap-4 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                <span className="text-slate-500 text-lg">💡</span>
                <span>No importa el tamaño del círculo, el diámetro siempre cabrá 3 veces y un poquito más (0.14159...).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

