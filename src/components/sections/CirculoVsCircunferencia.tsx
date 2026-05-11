import { motion } from 'motion/react';
import { useState } from 'react';

export function CirculoVsCircunferencia() {
  const [showFill, setShowFill] = useState(false);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto p-8 w-full flex-grow flex flex-col justify-center"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
          ¿Círculo o <span className="text-indigo-600">Circunferencia</span>?
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Aunque a menudo se usan como sinónimos, en geometría representan conceptos distintos.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square max-w-md mx-auto w-full bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col justify-center items-center shadow-md">
            <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 overflow-visible">
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill={showFill ? '#ec4899' : 'transparent'}
                stroke="#6366f1"
                strokeWidth="4"
                initial={false}
                animate={{
                  fillOpacity: showFill ? 0.3 : 0,
                  strokeWidth: showFill ? 2 : 5
                }}
                transition={{ duration: 0.5 }}
              />
              <circle cx="50" cy="50" r="1.5" fill="white" />
              <line x1="50" y1="50" x2="90" y2="50" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" />
            </svg>
            
            <div className="absolute bottom-6 flex gap-4 bg-white/90 p-2 rounded-2xl backdrop-blur-md border border-slate-200 shadow-sm">
              <button 
                onClick={() => setShowFill(false)}
                className={`px-6 py-2 rounded-xl font-medium transition-colors ${!showFill ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Circunferencia
              </button>
              <button 
                onClick={() => setShowFill(true)}
                className={`px-6 py-2 rounded-xl font-medium transition-colors ${showFill ? 'bg-pink-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Círculo
              </button>
            </div>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div className={`p-6 rounded-2xl border transition-colors duration-500 ${!showFill ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className={`text-2xl font-bold mb-3 ${!showFill ? 'text-indigo-700' : 'text-slate-800'}`}>La Circunferencia</h2>
            <p className="text-slate-600 leading-relaxed">
              Es la <strong>línea curva cerrada</strong> donde todos sus puntos están a la misma distancia de un punto central. Es el <em>contorno</em> o el borde. Piensa en ella como un anillo o un aro de hula-hula.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-colors duration-500 ${showFill ? 'bg-pink-50 border-pink-200 shadow-sm' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className={`text-2xl font-bold mb-3 ${showFill ? 'text-pink-600' : 'text-slate-800'}`}>El Círculo</h2>
            <p className="text-slate-600 leading-relaxed">
              Es la <strong>superficie plana</strong> delimitada por la circunferencia. Incluye todo el interior más el borde. Piensa en él como una moneda, un plato o una pizza.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
