import { useState } from 'react';
import { motion } from 'motion/react';

type ElementType = 'centro' | 'radio' | 'diametro' | 'cuerda' | 'arco' | 'tangente' | 'secante' | null;

const elementosDef = {
  centro: { title: 'Centro', text: 'El punto interior equidistante a todos los puntos de la circunferencia.' },
  radio: { title: 'Radio', text: 'Segmento que une el centro con cualquier punto de la circunferencia.' },
  diametro: { title: 'Diámetro', text: 'Segmento que une dos puntos de la circunferencia pasando por el centro. Es el doble del radio.' },
  cuerda: { title: 'Cuerda', text: 'Segmento que une dos puntos de la circunferencia sin pasar necesariamente por el centro.' },
  arco: { title: 'Arco', text: 'Cada una de las partes en que una cuerda divide a la circunferencia.' },
  tangente: { title: 'Tangente', text: 'Línea recta que toca a la circunferencia en un único punto exterior.' },
  secante: { title: 'Secante', text: 'Línea recta que corta a la circunferencia en dos puntos.' },
};

export function Elementos() {
  const [activeElement, setActiveElement] = useState<ElementType>(null);

  const isActive = (el: ElementType) => activeElement === el || activeElement === null;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto p-8 w-full flex-grow flex flex-col justify-center"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
          Elementos del <span className="text-indigo-600">Círculo</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Pasa el cursor sobre los botones para aislar cada elemento.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
        
        {/* Interactive Viewer */}
        <div className="relative aspect-square w-full max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 flex items-center justify-center shadow-md">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            {/* Base Circunferencia */}
            <circle cx="50" cy="50" r="40" stroke="#cbd5e1" strokeWidth="2" fill="transparent" />
            
            {/* Centro */}
            <motion.circle 
              cx="50" cy="50" r="2" 
              fill="#334155"
              animate={{ opacity: isActive('centro') ? 1 : 0.2, scale: activeElement === 'centro' ? 1.5 : 1 }} 
            />
            
            {/* Radio */}
            <motion.line 
              x1="50" y1="50" x2="90" y2="50" 
              stroke="#ec4899" strokeWidth="3"
              strokeLinecap="round"
              animate={{ opacity: activeElement === 'radio' ? 1 : 0 }} 
            />
            
            {/* Diámetro */}
            <motion.line 
              x1="10" y1="50" x2="90" y2="50" 
              stroke="#8b5cf6" strokeWidth="3"
              strokeLinecap="round"
              animate={{ opacity: activeElement === 'diametro' ? 1 : 0 }} 
            />
            
            {/* Cuerda */}
            <motion.line 
              x1="21.7" y1="21.7" x2="84.6" y2="70" 
              stroke="#10b981" strokeWidth="3"
              strokeLinecap="round"
              animate={{ opacity: activeElement === 'cuerda' ? 1 : 0 }} 
            />
            
            {/* Arco */}
            <motion.path 
              d="M 50 10 A 40 40 0 0 1 90 50" 
              stroke="#f59e0b" strokeWidth="5" fill="transparent"
              strokeLinecap="round"
              animate={{ opacity: activeElement === 'arco' ? 1 : 0 }} 
            />
            
            {/* Tangente (toca en 50, 90) */}
            <motion.line 
              x1="20" y1="90" x2="80" y2="90" 
              stroke="#3b82f6" strokeWidth="3"
              strokeLinecap="round"
              animate={{ opacity: activeElement === 'tangente' ? 1 : 0 }} 
            />
            <motion.circle cx="50" cy="90" r="1.5" fill="#3b82f6" animate={{ opacity: activeElement === 'tangente' ? 1 : 0 }} />

            {/* Secante */}
            <motion.line 
              x1="10" y1="30" x2="90" y2="70" 
              stroke="#ef4444" strokeWidth="3"
              strokeLinecap="round"
              animate={{ opacity: activeElement === 'secante' ? 1 : 0 }} 
            />
          </svg>
        </div>

        {/* Controls & Definitions */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(elementosDef) as ElementType[]).filter(Boolean).map((key) => {
              const k = key!;
              return (
                <button
                  key={k}
                  onMouseEnter={() => setActiveElement(k)}
                  onMouseLeave={() => setActiveElement(null)}
                  onClick={() => setActiveElement(k)}
                  className={`p-3 rounded-xl border text-left font-medium transition-all ${
                    activeElement === k 
                      ? 'bg-indigo-50 border-indigo-200 shadow-md scale-105 z-10 text-indigo-700' 
                      : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {elementosDef[k].title}
                </button>
              );
            })}
          </div>

          <div className="mt-8 p-6 bg-white border border-slate-200 shadow-sm rounded-2xl min-h-[160px]">
            {activeElement ? (
              <motion.div
                key={activeElement}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{elementosDef[activeElement].title}</h3>
                <p className="text-slate-600 leading-relaxed">{elementosDef[activeElement].text}</p>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 italic">
                Selecciona un elemento de la lista
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.section>
  );
}
