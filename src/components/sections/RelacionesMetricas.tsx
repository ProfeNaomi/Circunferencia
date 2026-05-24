import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Angle, Segment } from 'lucide-react'; // Wait, let's use standard lucide icons: PenTool, Navigation

export function RelacionesMetricas() {
  const [activeTab, setActiveTab] = useState<'angulos' | 'segmentos'>('angulos');
  
  // Interactive states for angles
  const [centralAngle, setCentralAngle] = useState(60);

  // For the secant/tangent theorems, we can show static interactive SVGs
  const [activeTheorem, setActiveTheorem] = useState<'cuerdas' | 'secantes' | 'tangente'>('cuerdas');

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto p-4 sm:p-8 w-full flex-grow flex flex-col justify-center pb-24"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
          Relaciones <span className="text-blue-600">Métricas</span> y Angulares
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Explora los teoremas fundamentales que relacionan los ángulos y las longitudes dentro y fuera de la circunferencia.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('angulos')}
          className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
            activeTab === 'angulos' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-blue-50 border border-slate-200'
          }`}
        >
          Ángulos en la Circunferencia
        </button>
        <button
          onClick={() => setActiveTab('segmentos')}
          className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
            activeTab === 'segmentos' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-indigo-50 border border-slate-200'
          }`}
        >
          Teoremas de Segmentos
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'angulos' ? (
          <motion.div
            key="angulos"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid lg:grid-cols-2 gap-8 items-start"
          >
            {/* Visualizer */}
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm flex flex-col items-center">
              <svg viewBox="0 0 200 200" className="w-full max-w-[300px] aspect-square overflow-visible">
                <circle cx="100" cy="100" r="80" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                <circle cx="100" cy="100" r="3" fill="#334155" />
                
                {/* Points A and B for the arc */}
                <g stroke="#3b82f6" strokeWidth="2">
                  <line x1="100" y1="100" x2={100 + 80 * Math.cos(centralAngle * Math.PI / 180)} y2={100 - 80 * Math.sin(centralAngle * Math.PI / 180)} />
                  <line x1="100" y1="100" x2={100 + 80 * Math.cos(0)} y2={100 - 80 * Math.sin(0)} />
                </g>

                {/* Point P for inscribed angle (always at 180 degrees) */}
                <g stroke="#ec4899" strokeWidth="2" strokeDasharray="4 4">
                  <line x1="20" y1="100" x2={100 + 80 * Math.cos(centralAngle * Math.PI / 180)} y2={100 - 80 * Math.sin(centralAngle * Math.PI / 180)} />
                  <line x1="20" y1="100" x2={180} y2={100} />
                </g>

                {/* The arc */}
                <path 
                  d={`M 180 100 A 80 80 0 0 0 ${100 + 80 * Math.cos(centralAngle * Math.PI / 180)} ${100 - 80 * Math.sin(centralAngle * Math.PI / 180)}`} 
                  stroke="#3b82f6" strokeWidth="4" fill="none" 
                />

                <text x="110" y="105" fontSize="10" fill="#3b82f6" fontWeight="bold">{centralAngle}°</text>
                <text x="35" y="98" fontSize="10" fill="#ec4899" fontWeight="bold">{centralAngle / 2}°</text>
              </svg>

              <div className="mt-8 w-full">
                <label className="block text-sm font-medium text-slate-700 mb-2">Ajustar Arco (Ángulo Central): {centralAngle}°</label>
                <input 
                  type="range" 
                  min="20" max="160" step="2"
                  value={centralAngle}
                  onChange={(e) => setCentralAngle(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Ángulo Central e Inscrito</h3>
                <p className="text-blue-800 leading-relaxed mb-4">
                  El <strong>ángulo central</strong> (azul) tiene su vértice en el centro. El <strong>ángulo inscrito</strong> (rosa) tiene su vértice en cualquier punto de la circunferencia y abarca el mismo arco.
                </p>
                <div className="bg-white p-4 rounded-xl border border-blue-200 text-center shadow-sm">
                  <span className="text-2xl font-mono font-bold text-slate-800">
                    <span className="text-pink-500">Inscrito</span> = <span className="text-blue-600">Central</span> / 2
                  </span>
                </div>
              </div>
              <p className="text-slate-600">
                ¡Mueve el deslizador y observa! No importa cuánto crezca el arco, el ángulo inscrito que abarca ese mismo arco siempre medirá exactamente la mitad que el ángulo central.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="segmentos"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid lg:grid-cols-2 gap-8 items-start"
          >
            {/* Controls */}
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => setActiveTheorem('cuerdas')}
                className={`p-5 rounded-2xl text-left transition-all border ${activeTheorem === 'cuerdas' ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-white hover:bg-slate-50'}`}
              >
                <h3 className="font-bold text-lg text-indigo-900 mb-1">Teorema de las Cuerdas</h3>
                <p className="text-sm text-slate-600">Si dos cuerdas se cortan en el interior de un círculo, el producto de los segmentos de una es igual al producto de los segmentos de la otra.</p>
                {activeTheorem === 'cuerdas' && (
                  <div className="mt-3 text-xl font-mono text-center font-bold bg-white p-2 rounded-lg border border-indigo-100">
                    a · b = c · d
                  </div>
                )}
              </button>

              <button 
                onClick={() => setActiveTheorem('secantes')}
                className={`p-5 rounded-2xl text-left transition-all border ${activeTheorem === 'secantes' ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-white hover:bg-slate-50'}`}
              >
                <h3 className="font-bold text-lg text-indigo-900 mb-1">Teorema de las Secantes</h3>
                <p className="text-sm text-slate-600">Si desde un punto exterior se trazan dos secantes, el producto de una secante por su parte externa es igual al producto de la otra secante por su parte externa.</p>
                {activeTheorem === 'secantes' && (
                  <div className="mt-3 text-xl font-mono text-center font-bold bg-white p-2 rounded-lg border border-indigo-100">
                    PA · PB = PC · PD
                  </div>
                )}
              </button>

              <button 
                onClick={() => setActiveTheorem('tangente')}
                className={`p-5 rounded-2xl text-left transition-all border ${activeTheorem === 'tangente' ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-white hover:bg-slate-50'}`}
              >
                <h3 className="font-bold text-lg text-indigo-900 mb-1">Teorema de Secante y Tangente</h3>
                <p className="text-sm text-slate-600">El cuadrado del segmento tangente es igual al producto del segmento secante completo por su parte externa.</p>
                {activeTheorem === 'tangente' && (
                  <div className="mt-3 text-xl font-mono text-center font-bold bg-white p-2 rounded-lg border border-indigo-100">
                    T² = S · E
                  </div>
                )}
              </button>
            </div>

            {/* Visualizer */}
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm flex items-center justify-center aspect-square">
              <svg viewBox="0 0 200 200" className="w-full max-w-[300px] overflow-visible">
                <circle cx="100" cy="100" r="70" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                
                <AnimatePresence mode="wait">
                  {activeTheorem === 'cuerdas' && (
                    <motion.g key="cuerdas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <line x1="40" y1="65" x2="160" y2="135" stroke="#4f46e5" strokeWidth="3" />
                      <line x1="50" y1="150" x2="135" y2="40" stroke="#db2777" strokeWidth="3" />
                      <circle cx="95" cy="98" r="3" fill="#1e293b" />
                      
                      <text x="60" y="70" fontSize="10" fill="#4f46e5" fontWeight="bold">a</text>
                      <text x="135" y="130" fontSize="10" fill="#4f46e5" fontWeight="bold">b</text>
                      <text x="65" y="135" fontSize="10" fill="#db2777" fontWeight="bold">c</text>
                      <text x="120" y="70" fontSize="10" fill="#db2777" fontWeight="bold">d</text>
                    </motion.g>
                  )}

                  {activeTheorem === 'secantes' && (
                    <motion.g key="secantes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <circle cx="10" cy="100" r="3" fill="#1e293b" />
                      <text x="0" y="100" fontSize="10" fontWeight="bold">P</text>

                      {/* Secant 1 */}
                      <line x1="10" y1="100" x2="165" y2="75" stroke="#4f46e5" strokeWidth="3" />
                      <circle cx="50" cy="93" r="3" fill="#4f46e5" />
                      <circle cx="165" cy="75" r="3" fill="#4f46e5" />
                      <text x="45" y="85" fontSize="10" fill="#4f46e5" fontWeight="bold">A</text>
                      <text x="170" y="70" fontSize="10" fill="#4f46e5" fontWeight="bold">B</text>

                      {/* Secant 2 */}
                      <line x1="10" y1="100" x2="165" y2="125" stroke="#db2777" strokeWidth="3" />
                      <circle cx="50" cy="107" r="3" fill="#db2777" />
                      <circle cx="165" cy="125" r="3" fill="#db2777" />
                      <text x="45" y="125" fontSize="10" fill="#db2777" fontWeight="bold">C</text>
                      <text x="170" y="135" fontSize="10" fill="#db2777" fontWeight="bold">D</text>
                    </motion.g>
                  )}

                  {activeTheorem === 'tangente' && (
                    <motion.g key="tangente" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <circle cx="10" cy="100" r="3" fill="#1e293b" />
                      <text x="-5" y="100" fontSize="10" fontWeight="bold">P</text>

                      {/* Tangent */}
                      <line x1="10" y1="100" x2="100" y2="30" stroke="#f59e0b" strokeWidth="3" />
                      <circle cx="100" cy="30" r="3" fill="#f59e0b" />
                      <text x="100" y="20" fontSize="10" fill="#f59e0b" fontWeight="bold">T</text>
                      <path d="M 50 60 Q 55 55 60 70" fill="none" stroke="#f59e0b" strokeWidth="1" />
                      <text x="40" y="55" fontSize="12" fill="#f59e0b" fontWeight="bold">T</text>

                      {/* Secant */}
                      <line x1="10" y1="100" x2="165" y2="125" stroke="#db2777" strokeWidth="3" />
                      <circle cx="50" cy="107" r="3" fill="#db2777" />
                      <circle cx="165" cy="125" r="3" fill="#db2777" />
                      <text x="45" y="125" fontSize="10" fill="#db2777" fontWeight="bold">A</text>
                      <text x="170" y="135" fontSize="10" fill="#db2777" fontWeight="bold">B</text>
                      <text x="120" y="110" fontSize="12" fill="#db2777" fontWeight="bold">S</text>
                      <text x="30" y="118" fontSize="10" fill="#be185d" fontWeight="bold">E</text>

                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
