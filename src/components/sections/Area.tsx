import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function Area() {
  const [proof, setProof] = useState<1 | 2 | 3>(1);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [isPlaying, setIsPlaying] = useState(false);

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
        return Math.min(100, prev + deltaTime * 0.015);
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

  // Reset when changing proof
  useEffect(() => {
    setStep(0);
  }, [proof]);

  const setStep = (val: number) => {
    setProgress(val);
    setIsPlaying(false);
  }

  // Derived progress (0 to 1)
  const p = progress / 100;

  // --- Proof 1: Pizza Slices ---
  const numSlices = 12;
  const sliceAngle = 360 / numSlices;
  const r = 40;
  // Center of circle
  const cx = 100;
  const cy = 45;
  
  // Rectangle dims
  const rectBase = Math.PI * r; // ~ 125.6
  const rectStartX = 100 - rectBase / 2; // ~ 37.2

  // --- Proof 2: Onion Rings ---
  const numRings = 10;
  const maxR = 40;

  // --- Proof 3: Polygons ---
  // Starts at triangle (n=3), goes to n=50 as p goes from 0 to 1
  const numSides = Math.floor(3 + p * 47);
  // Polygon area vs Circle area
  const circleArea = Math.PI * r * r;
  const polyArea = 0.5 * numSides * r * r * Math.sin((2 * Math.PI) / numSides);
  const areaPercent = (polyArea / circleArea) * 100;

  const polyPoints = Array.from({ length: numSides }).map((_, i) => {
    const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full px-4 sm:px-12 py-8 flex-grow flex flex-col justify-center pb-24"
    >
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-4 text-slate-900">
          El <span className="text-purple-600">Área</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          ¿Cómo sabemos que es <code className="text-purple-600 font-mono bg-purple-50 px-2 py-1 rounded">π · r²</code>? 
          Descubre tres formas de demostrarlo sin saltos, pura fluidez matemática.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
        
        {/* Visualizer container */}
        <div className="flex flex-col gap-6">
          {/* Tabs for proof type */}
          <div className="flex flex-wrap gap-2 p-1 bg-white border border-slate-200 shadow-sm rounded-xl w-fit">
            <button 
              onClick={() => setProof(1)}
              className={`px-4 py-3 rounded-lg font-bold transition-colors ${proof === 1 ? 'bg-purple-100 text-purple-700 shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
            >
              1. Pizza
            </button>
            <button 
              onClick={() => setProof(2)}
              className={`px-4 py-3 rounded-lg font-bold transition-colors ${proof === 2 ? 'bg-orange-100 text-orange-700 shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
            >
              2. Anillos
            </button>
            <button 
              onClick={() => setProof(3)}
              className={`px-4 py-3 rounded-lg font-bold transition-colors ${proof === 3 ? 'bg-emerald-100 text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
            >
              3. Polígonos
            </button>
          </div>

          <div className="relative aspect-video w-full bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-center items-center shadow-md overflow-hidden">
            
            <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
              {proof === 1 && (
                <g>
                  {/* Pizza Proof */}
                  {Array.from({ length: numSlices }).map((_, i) => {
                    const startRot = i * sliceAngle;
                    const isEven = i % 2 === 0;
                    const sliceBaseWidth = rectBase / (numSlices / 2);
                    const pairIndex = Math.floor(i / 2);
                    
                    // Fixed interlocking logic
                    // Odd slices point DOWN (arc at top) -> vertex at BOTTOM (cy + r/2)
                    // Even slices point UP (arc at bottom) -> vertex at TOP (cy - r/2)
                    const rectY = isEven ? cy - r/2 : cy + r/2;
                    const endRot = isEven ? 180 : 0;
                    
                    const rectX = rectStartX + pairIndex * sliceBaseWidth + (isEven ? sliceBaseWidth : sliceBaseWidth / 2);

                    let currentX = cx;
                    let currentY = cy;
                    let currentRot = startRot;

                    if (p < 0.2) {
                       // Do nothing
                    } else if (p < 0.5) {
                       const explodeP = (p - 0.2) / 0.3;
                       currentX += Math.cos((startRot - 90) * Math.PI / 180) * 20 * explodeP;
                       currentY += Math.sin((startRot - 90) * Math.PI / 180) * 20 * explodeP;
                    } else {
                       const moveP = (p - 0.5) / 0.5;
                       const explodedX = cx + Math.cos((startRot - 90) * Math.PI / 180) * 20;
                       const explodedY = cy + Math.sin((startRot - 90) * Math.PI / 180) * 20;
                       
                       currentX = explodedX + (rectX - explodedX) * moveP;
                       currentY = explodedY + (rectY - explodedY) * moveP;
                       
                       let targetR = endRot;
                       if (startRot > 270 && targetR === 0) targetR = 360; 
                       currentRot = startRot + (targetR - startRot) * moveP;
                    }

                    return (
                      <g key={i} transform={`translate(${currentX}, ${currentY}) rotate(${currentRot})`}>
                        <path 
                          d={`M 0 0 L ${r * Math.cos((-90 - sliceAngle/2) * Math.PI/180)} ${r * Math.sin((-90 - sliceAngle/2) * Math.PI/180)} A ${r} ${r} 0 0 1 ${r * Math.cos((-90 + sliceAngle/2) * Math.PI/180)} ${r * Math.sin((-90 + sliceAngle/2) * Math.PI/180)} Z`}
                          fill="#a855f7" stroke="#ffffff" strokeWidth="0.5"
                          opacity={0.8}
                        />
                      </g>
                    )
                  })}

                  <text x="100" y="98" fontSize="6" fill="#64748b" textAnchor="middle" fontWeight="bold">
                    {p < 0.2 ? 'Dividimos el círculo' : p < 0.8 ? 'Reacomodamos los sectores' : 'Se forma un rectángulo de base π·r y altura r'}
                  </text>
                  
                  {p > 0.8 && (
                     <g opacity={(p - 0.8) / 0.2}>
                       <line x1={rectStartX} y1={cy + r/2 + 5} x2={rectStartX + rectBase} y2={cy + r/2 + 5} stroke="#1e293b" strokeWidth="1" />
                       <text x="100" y={cy + r/2 + 12} fontSize="5" fill="#1e293b" textAnchor="middle" fontWeight="bold">Base = π·r</text>
                       
                       <line x1={rectStartX - 5} y1={cy - r/2} x2={rectStartX - 5} y2={cy + r/2} stroke="#1e293b" strokeWidth="1" />
                       <text x={rectStartX - 8} y={cy + 2} fontSize="5" fill="#1e293b" textAnchor="end" fontWeight="bold">r</text>
                     </g>
                  )}
                </g>
              )}

              {proof === 2 && (
                <g>
                  {/* Onion Rings Proof */}
                  {Array.from({ length: numRings }).map((_, i) => {
                    const ringR = maxR * ((i + 1) / numRings);
                    const ringWidth = maxR / numRings;
                    const lineLen = 2 * Math.PI * ringR;
                    
                    let unrollP = 0;
                    if (p > 0.1) {
                      unrollP = Math.min(1, (p - 0.1) / 0.7);
                    }

                    // Fix: 360 degree arc bug
                    const currentAngleDeg = 360 * (1 - unrollP);
                    const safeAngleDeg = currentAngleDeg >= 360 ? 359.99 : currentAngleDeg;
                    const currentAngleRad = safeAngleDeg * Math.PI / 180;
                    
                    const dropY = p > 0.8 ? (p - 0.8) / 0.2 * (maxR - ringR) : 0;
                    
                    // Center the unrolled shape and scale to fit viewBox
                    const maxLineLen = 2 * Math.PI * maxR;
                    const scaleFactor = 0.7;
                    const startX = 100 - (maxLineLen * unrollP * scaleFactor) / 2;

                    return (
                      <g key={i} transform={`translate(${startX}, ${cy + dropY}) scale(${scaleFactor})`}>
                        {unrollP < 1 && (
                          <path 
                            d={`M 0 ${-ringR} A ${ringR} ${ringR} 0 ${safeAngleDeg > 180 ? 1 : 0} 0 ${ringR * Math.cos(-Math.PI/2 - currentAngleRad)} ${ringR * Math.sin(-Math.PI/2 - currentAngleRad)}`}
                            fill="none" stroke="#f97316" strokeWidth={ringWidth - 0.5}
                            opacity={0.8}
                          />
                        )}
                        {unrollP > 0 && (
                          <line 
                            x1={ringR * Math.cos(-Math.PI/2 - currentAngleRad)} 
                            y1={ringR * Math.sin(-Math.PI/2 - currentAngleRad)}
                            x2={ringR * Math.cos(-Math.PI/2 - currentAngleRad) + lineLen * unrollP}
                            y2={ringR * Math.sin(-Math.PI/2 - currentAngleRad)}
                            stroke="#f97316" strokeWidth={ringWidth - 0.5}
                            opacity={0.8}
                          />
                        )}
                      </g>
                    )
                  })}

                  <text x="100" y="98" fontSize="6" fill="#64748b" textAnchor="middle" fontWeight="bold">
                    {p < 0.1 ? 'Círculo concéntrico' : p < 0.8 ? 'Desenrollando los anillos...' : 'Forman un triángulo de base 2πr y altura r'}
                  </text>
                  
                  {p > 0.8 && (
                     <g opacity={(p - 0.8) / 0.2}>
                       <line 
                         x1={100 - (2 * Math.PI * maxR * 0.7)/2} 
                         y1={cy + maxR * 0.7 + 5} 
                         x2={100 + (2 * Math.PI * maxR * 0.7)/2} 
                         y2={cy + maxR * 0.7 + 5} 
                         stroke="#1e293b" strokeWidth="1" 
                       />
                       <text x="100" y={cy + maxR * 0.7 + 12} fontSize="5" fill="#1e293b" textAnchor="middle" fontWeight="bold">Base = 2·π·r</text>
                     </g>
                  )}
                </g>
              )}

              {proof === 3 && (
                <g>
                  {/* Exhaustion Proof */}
                  <g transform="translate(-30, 0)">
                    <circle cx={cx} cy={cy} r={r} fill="none" stroke="#cbd5e1" strokeWidth="2" />
                    
                    <polygon 
                      points={polyPoints} 
                      fill="#10b981" 
                      stroke="#059669" 
                      strokeWidth="1"
                      opacity={0.8}
                    />

                    {numSides <= 12 && Array.from({ length: numSides }).map((_, i) => {
                      const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2;
                      return (
                        <line 
                          key={i}
                          x1={cx} y1={cy} 
                          x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)} 
                          stroke="#059669" strokeWidth="0.5" opacity={0.5}
                        />
                      )
                    })}
                  </g>

                  {/* Formula Counter Panel */}
                  <g transform="translate(130, 20)">
                    <rect x="0" y="0" width="75" height="55" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                    <text x="37.5" y="10" fontSize="5" fill="#334155" textAnchor="middle" fontWeight="bold">Lados (n): {numSides}</text>
                    
                    <text x="5" y="20" fontSize="4" fill="#64748b">Apotema (a): {(r * Math.cos(Math.PI/numSides)).toFixed(1)}</text>
                    <text x="5" y="28" fontSize="4" fill="#64748b">Perímetro (P): {(numSides * 2 * r * Math.sin(Math.PI/numSides)).toFixed(1)}</text>
                    
                    <line x1="5" y1="32" x2="70" y2="32" stroke="#e2e8f0" strokeWidth="0.5" />
                    
                    <text x="37.5" y="40" fontSize="4.5" fill="#10b981" textAnchor="middle" fontWeight="bold">Área = (P × a) / 2</text>
                    <text x="37.5" y="48" fontSize="6" fill="#059669" textAnchor="middle" fontWeight="bold">
                      {areaPercent.toFixed(2)}% del Círculo
                    </text>
                  </g>

                  <text x="100" y="98" fontSize="6" fill="#64748b" textAnchor="middle" fontWeight="bold">
                    El polígono se aproxima al círculo a medida que n → ∞
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Controls */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <button 
              onClick={togglePlay}
              className={`p-3 text-white rounded-xl shadow-sm transition-colors ${proof === 1 ? 'bg-purple-600 hover:bg-purple-500' : proof === 2 ? 'bg-orange-500 hover:bg-orange-400' : 'bg-emerald-600 hover:bg-emerald-500'}`}
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
              className={`flex-grow h-2 bg-slate-200 rounded-lg cursor-pointer appearance-none outline-none focus:ring-2 ${proof === 1 ? 'accent-purple-600 focus:ring-purple-500/50' : proof === 2 ? 'accent-orange-500 focus:ring-orange-500/50' : 'accent-emerald-600 focus:ring-emerald-500/50'}`}
            />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
            <h3 className="text-lg text-slate-500 mb-2 uppercase tracking-widest font-bold">La Fórmula Maestra</h3>
            <div className="text-6xl font-black text-slate-800 mb-6 font-mono tracking-tighter">
              A = <span className={proof === 1 ? 'text-purple-600' : proof === 2 ? 'text-orange-500' : 'text-emerald-600'}>π</span> · <span className="text-pink-500">r²</span>
            </div>
            
            <div className="text-slate-600 leading-relaxed text-lg space-y-4">
              {proof === 1 && (
                <p>Al dividir el círculo en infinitas "rebanadas de pizza" y reordenarlas, formamos un rectángulo perfecto. La base es la mitad del perímetro (<code className="font-bold">π·r</code>) y la altura es el radio (<code className="font-bold">r</code>). Multiplicando: <code className="font-bold text-purple-600">π·r × r = π·r²</code>.</p>
              )}
              {proof === 2 && (
                <p>Al "desenrollar" los anillos concéntricos del círculo, formamos un triángulo rectángulo. La base es la longitud del anillo exterior (<code className="font-bold">2·π·r</code>) y la altura es el radio (<code className="font-bold">r</code>). Área del triángulo = <code className="font-bold text-orange-600">(b·h)/2 = (2πr·r)/2 = π·r²</code>.</p>
              )}
              {proof === 3 && (
                <p><strong>El Método de Exhaución de Arquímedes.</strong> Si inscribimos un polígono regular y aumentamos el número de lados hasta el infinito, su área se igualará exactamente a la del círculo. El perímetro del polígono se vuelve la circunferencia (<code className="font-bold">2πr</code>) y su apotema se vuelve el radio (<code className="font-bold">r</code>).</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
