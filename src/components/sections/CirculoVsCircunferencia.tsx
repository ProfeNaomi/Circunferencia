import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { BookOpen, Target, Sparkles } from 'lucide-react';

export function CirculoVsCircunferencia() {
  const [showFill, setShowFill] = useState(false);
  const [activeHistory, setActiveHistory] = useState<number | null>(null);

  const historyData = [
    {
      id: 1,
      icon: Target,
      title: 'La Cuadratura del Círculo',
      content: 'Un antiguo problema griego que consistía en intentar construir un cuadrado con exactamente la misma área que un círculo dado, usando solo regla y compás. Aunque en el siglo XIX se demostró que es imposible, este enigma impulsó siglos de descubrimientos geométricos.'
    },
    {
      id: 2,
      icon: Sparkles,
      title: 'El Método de Exhaución',
      content: 'Ideado por Eudoxo y perfeccionado por Arquímedes. Consistía en dibujar polígonos regulares dentro y fuera del círculo, aumentando el número de lados (¡Arquímedes usó hasta 96 lados!). Al hacerlo, el área de los polígonos se acercaba ("exhaustaba") al área real del círculo, permitiendo calcular un valor muy preciso para π.'
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto p-4 sm:p-8 w-full flex-grow flex flex-col gap-12 pb-20"
    >
      <div className="text-center mt-4">
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
        <div className="space-y-6">
          <div className={`p-6 rounded-2xl border transition-colors duration-500 ${!showFill ? 'bg-indigo-50 border-indigo-200 shadow-sm scale-[1.02]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className={`text-2xl font-bold mb-3 ${!showFill ? 'text-indigo-700' : 'text-slate-800'}`}>La Circunferencia</h2>
            <p className="text-slate-600 leading-relaxed">
              Es la <strong>línea curva cerrada</strong> donde todos sus puntos están a la misma distancia de un punto central. Es el <em>contorno</em> o el borde. Piensa en ella como un anillo o un aro de hula-hula.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-colors duration-500 ${showFill ? 'bg-pink-50 border-pink-200 shadow-sm scale-[1.02]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className={`text-2xl font-bold mb-3 ${showFill ? 'text-pink-600' : 'text-slate-800'}`}>El Círculo</h2>
            <p className="text-slate-600 leading-relaxed">
              Es la <strong>superficie plana</strong> delimitada por la circunferencia. Incluye todo el interior más el borde. Piensa en él como una moneda, un plato o una pizza.
            </p>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="mt-12 pt-12 border-t border-slate-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 bg-amber-50 text-amber-700 px-4 py-2 rounded-full border border-amber-200 font-medium mb-4">
            <BookOpen className="w-5 h-5" />
            <span>Un poco de historia</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">El enigma de la antigüedad</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {historyData.map((item) => {
            const Icon = item.icon;
            const isActive = activeHistory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveHistory(isActive ? null : item.id)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
                  isActive 
                    ? 'bg-amber-50 border-amber-300 shadow-md ring-2 ring-amber-500/20 scale-[1.01]' 
                    : 'bg-white border-slate-200 hover:border-amber-200 hover:bg-amber-50/50 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${isActive ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-xl font-bold ${isActive ? 'text-amber-900' : 'text-slate-800'}`}>
                    {item.title}
                  </h3>
                </div>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-600 leading-relaxed pt-2">
                        {item.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!isActive && (
                  <p className="text-sm text-slate-400 font-medium mt-2">Haz clic para leer más...</p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
