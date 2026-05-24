import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type ElementType = 'centro' | 'radio' | 'diametro' | 'cuerda' | 'arco' | 'tangente' | 'secante' | null;

const elementosDef = {
  centro: { 
    title: 'Centro (O)', 
    text: 'El punto interior equidistante a todos los puntos de la circunferencia. Matemáticamente, d(O, P) = r.' 
  },
  radio: { 
    title: 'Radio (r)', 
    text: 'Segmento de recta que conecta el centro con cualquier punto de la circunferencia.' 
  },
  diametro: { 
    title: 'Diámetro (d)', 
    text: 'La cuerda de máxima longitud que pasa por el centro. Su longitud es exactamente el doble del radio: d = 2r.' 
  },
  cuerda: { 
    title: 'Cuerda', 
    text: 'Segmento rectilíneo cuyos extremos son dos puntos cualesquiera sobre la circunferencia.' 
  },
  arco: { 
    title: 'Arco', 
    text: 'Una porción continua de la circunferencia limitada por dos puntos.' 
  },
  tangente: { 
    title: 'Tangente', 
    text: 'Recta coplanar que interseca a la circunferencia en un único punto común, llamado punto de tangencia. Es perpendicular al radio en dicho punto.' 
  },
  secante: { 
    title: 'Secante', 
    text: 'Recta coplanar que interseca a la circunferencia en exactamente dos puntos distintos.' 
  },
};

export function Elementos() {
  const [activeElement, setActiveElement] = useState<ElementType>(null);

  const getOpacity = (el: ElementType) => {
    if (activeElement === null) return 0.25;
    if (activeElement === el) return 1;
    return 0.1;
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full px-4 sm:px-12 py-8 flex-grow flex flex-col justify-center pb-12"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
          Elementos del <span className="text-indigo-600">Círculo</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Haz clic en cada botón para explorar y revelar las definiciones matemáticas formales.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-start h-full">
        
        {/* Left Side: Controls and Info */}
        <div className="flex flex-col gap-6 h-full">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {(Object.keys(elementosDef) as ElementType[]).filter(Boolean).map((key) => {
              const k = key!;
              const isActive = activeElement === k;
              return (
                <button
                  key={k}
                  onClick={() => setActiveElement(k)}
                  className={`p-3 rounded-xl border text-center font-bold text-sm sm:text-base transition-all duration-300 ${
                    isActive 
                      ? 'bg-indigo-600 border-indigo-700 text-white shadow-md scale-105 z-10' 
                      : 'bg-white border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 shadow-sm'
                  }`}
                >
                  {elementosDef[k].title.split(' ')[0]}
                </button>
              );
            })}
          </div>

          <div className="w-full flex-grow flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeElement ? (
                <motion.div
                  key={activeElement}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                  className="w-full bg-white border-2 border-indigo-100 shadow-xl rounded-[2rem] p-8"
                >
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight text-indigo-900">
                    {elementosDef[activeElement].title}
                  </h3>
                  <p className="text-lg text-slate-700 leading-relaxed font-medium">
                    {elementosDef[activeElement].text}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full bg-slate-100/50 border-2 border-dashed border-slate-300 rounded-[2rem] p-12 flex items-center justify-center text-slate-400 italic text-lg text-center"
                >
                  Selecciona un elemento de la cuadrícula superior para ver su definición formal.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Interactive Viewer */}
        <div className="relative aspect-square w-full max-w-lg mx-auto bg-white border-2 border-slate-200 rounded-[3rem] p-8 flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible transition-opacity duration-500">
            {/* Base Circunferencia */}
            <circle cx="50" cy="50" r="40" stroke="#cbd5e1" strokeWidth="1.5" fill="transparent" />
            
            {/* Centro */}
            <motion.circle 
              cx="50" cy="50" r="2.5" 
              fill="#334155"
              animate={{ opacity: getOpacity('centro'), scale: activeElement === 'centro' ? 1.5 : 1 }} 
              transition={{ duration: 0.3 }}
            />
            
            {/* Radio */}
            <motion.line 
              x1="50" y1="50" x2="90" y2="50" 
              stroke="#ec4899" strokeWidth="2.5"
              strokeLinecap="round"
              animate={{ opacity: getOpacity('radio') }} 
              transition={{ duration: 0.3 }}
            />
            
            {/* Diámetro */}
            <motion.line 
              x1="10" y1="50" x2="90" y2="50" 
              stroke="#8b5cf6" strokeWidth="2.5"
              strokeLinecap="round"
              animate={{ opacity: getOpacity('diametro') }} 
              transition={{ duration: 0.3 }}
            />
            
            {/* Cuerda */}
            <motion.line 
              x1="21.7" y1="21.7" x2="84.6" y2="70" 
              stroke="#10b981" strokeWidth="2.5"
              strokeLinecap="round"
              animate={{ opacity: getOpacity('cuerda') }} 
              transition={{ duration: 0.3 }}
            />
            
            {/* Arco */}
            <motion.path 
              d="M 50 10 A 40 40 0 0 1 90 50" 
              stroke="#f59e0b" strokeWidth="4" fill="transparent"
              strokeLinecap="round"
              animate={{ opacity: getOpacity('arco') }} 
              transition={{ duration: 0.3 }}
            />
            
            {/* Tangente (toca en 50, 90) */}
            <motion.g animate={{ opacity: getOpacity('tangente') }} transition={{ duration: 0.3 }}>
              <line x1="15" y1="90" x2="85" y2="90" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="50" cy="90" r="1.5" fill="#3b82f6" />
            </motion.g>

            {/* Secante */}
            <motion.line 
              x1="5" y1="25" x2="95" y2="75" 
              stroke="#ef4444" strokeWidth="2.5"
              strokeLinecap="round"
              animate={{ opacity: getOpacity('secante') }} 
              transition={{ duration: 0.3 }}
            />
          </svg>
        </div>

      </div>

    </motion.section>
  );
}
