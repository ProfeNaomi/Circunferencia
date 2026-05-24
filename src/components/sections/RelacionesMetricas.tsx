import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Angle, Segment } from 'lucide-react'; 

export function RelacionesMetricas() {
  const [activeTab, setActiveTab] = useState<'angulos' | 'segmentos'>('angulos');
  
  // Interactive states for angles
  const [centralAngle, setCentralAngle] = useState(80);
  const [activeAngleTheorem, setActiveAngleTheorem] = useState<'central' | 'multiples' | 'tales'>('central');

  // Interactive states for segments
  const [activeTheorem, setActiveTheorem] = useState<'cuerdas' | 'cuerda_diametro' | 'secantes' | 'tangente' | 'tangente_tangente' | 'radio_tangente'>('cuerdas');

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-full mx-auto px-4 sm:px-12 py-8 flex-grow flex flex-col justify-start pb-24"
    >
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
          Relaciones <span className="text-blue-600">Métricas</span> y Angulares
        </h1>
        <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          Explora los teoremas fundamentales que relacionan los ángulos y las longitudes dentro y fuera de la circunferencia.
        </p>
      </div>

      <div className="flex justify-center gap-6 mb-12">
        <button
          onClick={() => setActiveTab('angulos')}
          className={`px-8 py-4 rounded-2xl font-bold text-2xl transition-all ${
            activeTab === 'angulos' ? 'bg-blue-600 text-white shadow-xl scale-105' : 'bg-white text-slate-600 hover:bg-blue-50 border-2 border-slate-200'
          }`}
        >
          Ángulos en la Circunferencia
        </button>
        <button
          onClick={() => setActiveTab('segmentos')}
          className={`px-8 py-4 rounded-2xl font-bold text-2xl transition-all ${
            activeTab === 'segmentos' ? 'bg-indigo-600 text-white shadow-xl scale-105' : 'bg-white text-slate-600 hover:bg-indigo-50 border-2 border-slate-200'
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
            className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start max-w-7xl mx-auto w-full"
          >
            {/* Visualizer */}
            <div className="bg-white border-2 border-slate-200 p-10 rounded-[3rem] shadow-lg flex flex-col items-center sticky top-24">
              <svg viewBox="0 0 200 200" className="w-full max-w-[400px] aspect-square overflow-visible">
                <circle cx="100" cy="100" r="80" stroke="#cbd5e1" strokeWidth="3" fill="none" />
                <circle cx="100" cy="100" r="4" fill="#334155" />
                
                <AnimatePresence mode="wait">
                  {activeAngleTheorem === 'central' && (
                    <motion.g key="central" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {/* Points A and B for the arc */}
                      <g stroke="#3b82f6" strokeWidth="3">
                        <line x1="100" y1="100" x2={100 + 80 * Math.cos(centralAngle * Math.PI / 180)} y2={100 - 80 * Math.sin(centralAngle * Math.PI / 180)} />
                        <line x1="100" y1="100" x2={100 + 80 * Math.cos(0)} y2={100 - 80 * Math.sin(0)} />
                      </g>

                      {/* Point P for inscribed angle */}
                      <g stroke="#ec4899" strokeWidth="3" strokeDasharray="6 6">
                        <line x1="20" y1="100" x2={100 + 80 * Math.cos(centralAngle * Math.PI / 180)} y2={100 - 80 * Math.sin(centralAngle * Math.PI / 180)} />
                        <line x1="20" y1="100" x2={180} y2={100} />
                      </g>

                      {/* The arc */}
                      <path 
                        d={`M 180 100 A 80 80 0 0 0 ${100 + 80 * Math.cos(centralAngle * Math.PI / 180)} ${100 - 80 * Math.sin(centralAngle * Math.PI / 180)}`} 
                        stroke="#3b82f6" strokeWidth="6" fill="none" 
                      />

                      <text x="110" y="105" fontSize="14" fill="#3b82f6" fontWeight="bold">{centralAngle}°</text>
                      <text x="25" y="95" fontSize="14" fill="#ec4899" fontWeight="bold">{centralAngle / 2}°</text>
                      
                      <circle cx={100 + 80 * Math.cos(centralAngle * Math.PI / 180)} cy={100 - 80 * Math.sin(centralAngle * Math.PI / 180)} r="4" fill="#3b82f6" />
                      <circle cx="180" cy="100" r="4" fill="#3b82f6" />
                      <circle cx="20" cy="100" r="4" fill="#ec4899" />
                    </motion.g>
                  )}

                  {activeAngleTheorem === 'multiples' && (
                    <motion.g key="multiples" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {/* The arc */}
                      <path 
                        d={`M 180 100 A 80 80 0 0 0 ${100 + 80 * Math.cos(centralAngle * Math.PI / 180)} ${100 - 80 * Math.sin(centralAngle * Math.PI / 180)}`} 
                        stroke="#3b82f6" strokeWidth="6" fill="none" 
                      />

                      {/* 3 inscribed angles */}
                      {[150, 190, 230].map((pAngle, i) => {
                        const px = 100 + 80 * Math.cos(pAngle * Math.PI / 180);
                        const py = 100 - 80 * Math.sin(pAngle * Math.PI / 180);
                        const colors = ['#ec4899', '#8b5cf6', '#10b981'];
                        return (
                          <g key={i}>
                            <line x1={px} y1={py} x2={100 + 80 * Math.cos(centralAngle * Math.PI / 180)} y2={100 - 80 * Math.sin(centralAngle * Math.PI / 180)} stroke={colors[i]} strokeWidth="2" strokeDasharray="4 4" />
                            <line x1={px} y1={py} x2={180} y2={100} stroke={colors[i]} strokeWidth="2" strokeDasharray="4 4" />
                            <circle cx={px} cy={py} r="4" fill={colors[i]} />
                            <text x={px + (px > 100 ? 10 : -20)} y={py + (py > 100 ? 15 : -5)} fontSize="12" fill={colors[i]} fontWeight="bold">{centralAngle / 2}°</text>
                          </g>
                        );
                      })}
                      
                      <circle cx={100 + 80 * Math.cos(centralAngle * Math.PI / 180)} cy={100 - 80 * Math.sin(centralAngle * Math.PI / 180)} r="4" fill="#3b82f6" />
                      <circle cx="180" cy="100" r="4" fill="#3b82f6" />
                    </motion.g>
                  )}

                  {activeAngleTheorem === 'tales' && (
                    <motion.g key="tales" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {/* Diameter */}
                      <line x1="20" y1="100" x2="180" y2="100" stroke="#f59e0b" strokeWidth="4" />
                      <circle cx="20" cy="100" r="4" fill="#f59e0b" />
                      <circle cx="180" cy="100" r="4" fill="#f59e0b" />
                      <text x="100" y="115" fontSize="14" fill="#f59e0b" fontWeight="bold">Diámetro</text>

                      {/* Moving point on top half (using centralAngle to sweep it) */}
                      {(() => {
                        // constrain angle to upper half for visual clarity (20 to 160)
                        const angle = Math.max(20, Math.min(160, centralAngle));
                        const px = 100 + 80 * Math.cos(angle * Math.PI / 180);
                        const py = 100 - 80 * Math.sin(angle * Math.PI / 180);
                        
                        return (
                          <g>
                            <line x1="20" y1="100" x2={px} y2={py} stroke="#db2777" strokeWidth="3" />
                            <line x1="180" y1="100" x2={px} y2={py} stroke="#db2777" strokeWidth="3" />
                            <circle cx={px} cy={py} r="5" fill="#db2777" />
                            
                            {/* 90 deg symbol */}
                            <path d={`M ${px} ${py} ...`} /> {/* We'll just write 90° for simplicity */}
                            <text x={px} y={py - 10} fontSize="16" fill="#db2777" fontWeight="bold" textAnchor="middle">90°</text>
                          </g>
                        );
                      })()}
                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>

              <div className="mt-12 w-full">
                <label className="block text-lg font-bold text-slate-700 mb-4 text-center">
                  {activeAngleTheorem === 'tales' ? 'Mover el vértice por la semicircunferencia' : `Ajustar Arco: ${centralAngle}°`}
                </label>
                <input 
                  type="range" 
                  min="20" max="160" step="2"
                  value={centralAngle}
                  onChange={(e) => setCentralAngle(Number(e.target.value))}
                  className="w-full accent-blue-600 h-3 bg-slate-200 rounded-lg appearance-none outline-none focus:ring-4 focus:ring-blue-500/30 transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* Content Controls */}
            <div className="flex flex-col gap-6">
              <button 
                onClick={() => setActiveAngleTheorem('central')}
                className={`p-8 rounded-[2rem] text-left transition-all border-2 ${activeAngleTheorem === 'central' ? 'bg-blue-50 border-blue-300 shadow-lg scale-[1.02]' : 'bg-white hover:bg-slate-50 border-slate-200'}`}
              >
                <h3 className="font-black text-3xl text-blue-900 mb-3">Ángulo Central e Inscrito</h3>
                <p className="text-xl text-blue-800 leading-relaxed mb-6">
                  El <strong>ángulo central</strong> tiene su vértice en el centro. El <strong>ángulo inscrito</strong> tiene su vértice en cualquier punto del borde y abarca el mismo arco.
                </p>
                <div className="bg-white p-6 rounded-2xl border-2 border-blue-200 text-center shadow-sm">
                  <span className="text-3xl font-mono font-bold text-slate-800">
                    <span className="text-pink-500">Inscrito</span> = <span className="text-blue-600">Central</span> / 2
                  </span>
                </div>
              </button>

              <button 
                onClick={() => setActiveAngleTheorem('multiples')}
                className={`p-8 rounded-[2rem] text-left transition-all border-2 ${activeAngleTheorem === 'multiples' ? 'bg-purple-50 border-purple-300 shadow-lg scale-[1.02]' : 'bg-white hover:bg-slate-50 border-slate-200'}`}
              >
                <h3 className="font-black text-3xl text-purple-900 mb-3">Ángulos Inscritos Múltiples</h3>
                <p className="text-xl text-purple-800 leading-relaxed">
                  Si dibujamos <strong>varios ángulos inscritos</strong> en diferentes posiciones, pero todos "atrapan" o abarcan el mismo arco... ¡Todos miden exactamente lo mismo!
                </p>
              </button>

              <button 
                onClick={() => setActiveAngleTheorem('tales')}
                className={`p-8 rounded-[2rem] text-left transition-all border-2 ${activeAngleTheorem === 'tales' ? 'bg-orange-50 border-orange-300 shadow-lg scale-[1.02]' : 'bg-white hover:bg-slate-50 border-slate-200'}`}
              >
                <h3 className="font-black text-3xl text-orange-900 mb-3">Teorema de Tales (Semicircunferencia)</h3>
                <p className="text-xl text-orange-800 leading-relaxed">
                  Cualquier triángulo que dibujes usando el <strong>diámetro</strong> como hipotenusa y el tercer vértice en la circunferencia, será un <strong>triángulo rectángulo (90°)</strong>.
                </p>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="segmentos"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start max-w-7xl mx-auto w-full"
          >
            {/* Visualizer */}
            <div className="bg-white border-2 border-slate-200 p-10 rounded-[3rem] shadow-lg flex items-center justify-center aspect-square sticky top-24">
              <svg viewBox="0 0 200 200" className="w-full max-w-[400px] overflow-visible">
                <circle cx="100" cy="100" r="70" stroke="#cbd5e1" strokeWidth="3" fill="none" />
                
                <AnimatePresence mode="wait">
                  {activeTheorem === 'cuerdas' && (
                    <motion.g key="cuerdas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <line x1="40" y1="65" x2="160" y2="135" stroke="#4f46e5" strokeWidth="4" />
                      <line x1="50" y1="150" x2="135" y2="40" stroke="#db2777" strokeWidth="4" />
                      <circle cx="95" cy="98" r="4" fill="#1e293b" />
                      
                      <text x="60" y="70" fontSize="14" fill="#4f46e5" fontWeight="bold">a</text>
                      <text x="135" y="130" fontSize="14" fill="#4f46e5" fontWeight="bold">b</text>
                      <text x="65" y="135" fontSize="14" fill="#db2777" fontWeight="bold">c</text>
                      <text x="120" y="70" fontSize="14" fill="#db2777" fontWeight="bold">d</text>
                    </motion.g>
                  )}

                  {activeTheorem === 'cuerda_diametro' && (
                    <motion.g key="cuerda_diametro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {/* Diameter */}
                      <line x1="100" y1="30" x2="100" y2="170" stroke="#f59e0b" strokeWidth="4" />
                      <circle cx="100" cy="100" r="4" fill="#334155" />
                      <text x="105" y="40" fontSize="12" fill="#f59e0b" fontWeight="bold">Diámetro</text>

                      {/* Perpendicular Chord */}
                      <line x1="40" y1="135" x2="160" y2="135" stroke="#4f46e5" strokeWidth="4" />
                      <circle cx="100" cy="135" r="4" fill="#1e293b" />
                      
                      {/* 90 deg symbol */}
                      <rect x="100" y="125" width="10" height="10" fill="none" stroke="#334155" strokeWidth="2" />

                      <text x="65" y="150" fontSize="14" fill="#4f46e5" fontWeight="bold">x</text>
                      <text x="130" y="150" fontSize="14" fill="#4f46e5" fontWeight="bold">x</text>
                    </motion.g>
                  )}

                  {activeTheorem === 'secantes' && (
                    <motion.g key="secantes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <circle cx="-20" cy="100" r="4" fill="#1e293b" />
                      <text x="-35" y="100" fontSize="14" fontWeight="bold">P</text>

                      {/* Secant 1 */}
                      <line x1="-20" y1="100" x2="163" y2="69.5" stroke="#4f46e5" strokeWidth="4" />
                      <circle cx="30.5" cy="91.5" r="4" fill="#4f46e5" />
                      <circle cx="163" cy="69.5" r="4" fill="#4f46e5" />
                      <text x="25" y="85" fontSize="14" fill="#4f46e5" fontWeight="bold">A</text>
                      <text x="170" y="65" fontSize="14" fill="#4f46e5" fontWeight="bold">B</text>

                      {/* Secant 2 */}
                      <line x1="-20" y1="100" x2="163" y2="130.5" stroke="#db2777" strokeWidth="4" />
                      <circle cx="30.5" cy="108.5" r="4" fill="#db2777" />
                      <circle cx="163" cy="130.5" r="4" fill="#db2777" />
                      <text x="25" y="125" fontSize="14" fill="#db2777" fontWeight="bold">C</text>
                      <text x="170" y="140" fontSize="14" fill="#db2777" fontWeight="bold">D</text>
                    </motion.g>
                  )}

                  {activeTheorem === 'tangente' && (
                    <motion.g key="tangente" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <circle cx="-20" cy="100" r="4" fill="#1e293b" />
                      <text x="-35" y="100" fontSize="14" fontWeight="bold">P</text>

                      {/* Tangent */}
                      <line x1="-20" y1="100" x2="59.1" y2="43.1" stroke="#f59e0b" strokeWidth="4" />
                      <circle cx="59.1" cy="43.1" r="4" fill="#f59e0b" />
                      <text x="65" y="35" fontSize="14" fill="#f59e0b" fontWeight="bold">T</text>
                      <path d="M 5 65 Q 15 55 25 80" fill="none" stroke="#f59e0b" strokeWidth="2" />
                      <text x="0" y="60" fontSize="16" fill="#f59e0b" fontWeight="bold">T</text>

                      {/* Secant */}
                      <line x1="-20" y1="100" x2="163" y2="130.5" stroke="#db2777" strokeWidth="4" />
                      <circle cx="30.5" cy="108.5" r="4" fill="#db2777" />
                      <circle cx="163" cy="130.5" r="4" fill="#db2777" />
                      <text x="25" y="125" fontSize="14" fill="#db2777" fontWeight="bold">A</text>
                      <text x="170" y="140" fontSize="14" fill="#db2777" fontWeight="bold">B</text>
                      <text x="100" y="115" fontSize="16" fill="#db2777" fontWeight="bold">S</text>
                      <text x="0" y="118" fontSize="14" fill="#be185d" fontWeight="bold">E</text>

                    </motion.g>
                  )}

                  {activeTheorem === 'tangente_tangente' && (
                    <motion.g key="tangente_tangente" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <circle cx="-20" cy="100" r="4" fill="#1e293b" />
                      <text x="-35" y="100" fontSize="14" fontWeight="bold">P</text>

                      {/* Top Tangent */}
                      <line x1="-20" y1="100" x2="59.1" y2="43.1" stroke="#f59e0b" strokeWidth="4" />
                      <circle cx="59.1" cy="43.1" r="4" fill="#f59e0b" />
                      <text x="65" y="35" fontSize="14" fill="#f59e0b" fontWeight="bold">A</text>
                      <text x="15" y="60" fontSize="16" fill="#f59e0b" fontWeight="bold">x</text>

                      {/* Bottom Tangent */}
                      <line x1="-20" y1="100" x2="59.1" y2="156.9" stroke="#f59e0b" strokeWidth="4" />
                      <circle cx="59.1" cy="156.9" r="4" fill="#f59e0b" />
                      <text x="65" y="170" fontSize="14" fill="#f59e0b" fontWeight="bold">B</text>
                      <text x="15" y="145" fontSize="16" fill="#f59e0b" fontWeight="bold">x</text>
                    </motion.g>
                  )}

                  {activeTheorem === 'radio_tangente' && (
                    <motion.g key="radio_tangente" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <circle cx="100" cy="100" r="4" fill="#334155" />
                      <text x="105" y="105" fontSize="14" fill="#334155" fontWeight="bold">O</text>

                      {/* Tangent line at bottom */}
                      <line x1="20" y1="170" x2="180" y2="170" stroke="#f59e0b" strokeWidth="4" />
                      <text x="160" y="185" fontSize="12" fill="#f59e0b" fontWeight="bold">Tangente</text>
                      
                      {/* Radius */}
                      <line x1="100" y1="100" x2="100" y2="170" stroke="#4f46e5" strokeWidth="4" strokeDasharray="4 4"/>
                      <circle cx="100" cy="170" r="4" fill="#ef4444" />
                      <text x="110" y="140" fontSize="14" fill="#4f46e5" fontWeight="bold">Radio</text>

                      {/* 90 deg symbol */}
                      <rect x="100" y="160" width="10" height="10" fill="none" stroke="#1e293b" strokeWidth="2" />
                      <text x="80" y="165" fontSize="14" fill="#1e293b" fontWeight="bold">90°</text>

                    </motion.g>
                  )}

                </AnimatePresence>
              </svg>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] pr-4 pb-12">
              <button 
                onClick={() => setActiveTheorem('cuerdas')}
                className={`p-6 rounded-2xl text-left transition-all border-2 ${activeTheorem === 'cuerdas' ? 'bg-indigo-50 border-indigo-300 shadow-md' : 'bg-white hover:bg-slate-50 border-slate-200'}`}
              >
                <h3 className="font-bold text-2xl text-indigo-900 mb-2">1. Teorema de las Cuerdas</h3>
                <p className="text-lg text-slate-600">Si dos cuerdas se cortan en el interior, el producto de los segmentos de una es igual al producto de los segmentos de la otra.</p>
                {activeTheorem === 'cuerdas' && (
                  <div className="mt-4 text-2xl font-mono text-center font-bold bg-white p-3 rounded-xl border border-indigo-100">
                    a · b = c · d
                  </div>
                )}
              </button>

              <button 
                onClick={() => setActiveTheorem('cuerda_diametro')}
                className={`p-6 rounded-2xl text-left transition-all border-2 ${activeTheorem === 'cuerda_diametro' ? 'bg-indigo-50 border-indigo-300 shadow-md' : 'bg-white hover:bg-slate-50 border-slate-200'}`}
              >
                <h3 className="font-bold text-2xl text-indigo-900 mb-2">1.1. Diámetro Perpendicular a Cuerda</h3>
                <p className="text-lg text-slate-600">Todo diámetro (o radio) perpendicular a una cuerda, biseca a la cuerda (la divide en dos segmentos exactamente iguales).</p>
                {activeTheorem === 'cuerda_diametro' && (
                  <div className="mt-4 text-2xl font-mono text-center font-bold bg-white p-3 rounded-xl border border-indigo-100">
                    Segmentos miden "x"
                  </div>
                )}
              </button>

              <button 
                onClick={() => setActiveTheorem('secantes')}
                className={`p-6 rounded-2xl text-left transition-all border-2 ${activeTheorem === 'secantes' ? 'bg-indigo-50 border-indigo-300 shadow-md' : 'bg-white hover:bg-slate-50 border-slate-200'}`}
              >
                <h3 className="font-bold text-2xl text-indigo-900 mb-2">2. Teorema de las Secantes</h3>
                <p className="text-lg text-slate-600">Si desde un punto exterior se trazan dos secantes, el producto de una secante por su parte externa es igual al de la otra secante.</p>
                {activeTheorem === 'secantes' && (
                  <div className="mt-4 text-2xl font-mono text-center font-bold bg-white p-3 rounded-xl border border-indigo-100">
                    PA · PB = PC · PD
                  </div>
                )}
              </button>

              <button 
                onClick={() => setActiveTheorem('tangente')}
                className={`p-6 rounded-2xl text-left transition-all border-2 ${activeTheorem === 'tangente' ? 'bg-indigo-50 border-indigo-300 shadow-md' : 'bg-white hover:bg-slate-50 border-slate-200'}`}
              >
                <h3 className="font-bold text-2xl text-indigo-900 mb-2">3. Teorema de Secante y Tangente</h3>
                <p className="text-lg text-slate-600">El cuadrado de la tangente (T) es igual al producto de la secante completa (S) por su parte externa (E).</p>
                {activeTheorem === 'tangente' && (
                  <div className="mt-4 text-2xl font-mono text-center font-bold bg-white p-3 rounded-xl border border-indigo-100">
                    T² = S · E
                  </div>
                )}
              </button>

              <button 
                onClick={() => setActiveTheorem('tangente_tangente')}
                className={`p-6 rounded-2xl text-left transition-all border-2 ${activeTheorem === 'tangente_tangente' ? 'bg-indigo-50 border-indigo-300 shadow-md' : 'bg-white hover:bg-slate-50 border-slate-200'}`}
              >
                <h3 className="font-bold text-2xl text-indigo-900 mb-2">4. Teorema de Tangentes</h3>
                <p className="text-lg text-slate-600">Si desde un punto exterior se trazan dos tangentes a una circunferencia, los segmentos desde el punto de origen hasta los puntos de tangencia miden lo mismo.</p>
                {activeTheorem === 'tangente_tangente' && (
                  <div className="mt-4 text-2xl font-mono text-center font-bold bg-white p-3 rounded-xl border border-indigo-100">
                    PA = PB
                  </div>
                )}
              </button>

              <button 
                onClick={() => setActiveTheorem('radio_tangente')}
                className={`p-6 rounded-2xl text-left transition-all border-2 ${activeTheorem === 'radio_tangente' ? 'bg-indigo-50 border-indigo-300 shadow-md' : 'bg-white hover:bg-slate-50 border-slate-200'}`}
              >
                <h3 className="font-bold text-2xl text-indigo-900 mb-2">5. Radio y Recta Tangente</h3>
                <p className="text-lg text-slate-600">Toda recta tangente es perpendicular (forma un ángulo de 90 grados) al radio en el punto de tangencia.</p>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
