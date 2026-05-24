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

      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 items-start h-full">
        {/* Left column: Visualizer and definitions */}
        <div className="flex flex-col gap-6">
          <div className="relative aspect-square w-full bg-white border-2 border-slate-200 rounded-[2rem] overflow-hidden flex flex-col justify-center items-center shadow-lg">
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
              
              <div className="absolute bottom-4 flex gap-2 bg-white/90 p-2 rounded-2xl backdrop-blur-md border border-slate-200 shadow-sm">
                <button 
                  onClick={() => setShowFill(false)}
                  className={`px-4 py-2 rounded-xl font-bold transition-all ${!showFill ? 'bg-indigo-600 text-white shadow-md scale-105' : 'text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'}`}
                >
                  Circunferencia
                </button>
                <button 
                  onClick={() => setShowFill(true)}
                  className={`px-4 py-2 rounded-xl font-bold transition-all ${showFill ? 'bg-pink-500 text-white shadow-md scale-105' : 'text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'}`}
                >
                  Círculo
                </button>
              </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-5 rounded-2xl border-2 transition-all duration-300 ${!showFill ? 'bg-indigo-50 border-indigo-300 shadow-md' : 'bg-white border-slate-200'}`}>
              <h2 className={`text-lg font-black mb-2 ${!showFill ? 'text-indigo-800' : 'text-slate-700'}`}>La Circunferencia</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                La <strong>línea curva cerrada</strong> (el borde).
              </p>
            </div>
            <div className={`p-5 rounded-2xl border-2 transition-all duration-300 ${showFill ? 'bg-pink-50 border-pink-300 shadow-md' : 'bg-white border-slate-200'}`}>
              <h2 className={`text-lg font-black mb-2 ${showFill ? 'text-pink-700' : 'text-slate-700'}`}>El Círculo</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                La <strong>superficie plana</strong> delimitada (el interior).
              </p>
            </div>
          </div>
        </div>

        {/* Right column: History Poster */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-[2rem] p-8 shadow-lg flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-200 p-3 rounded-xl text-amber-700">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-amber-900 leading-tight">El enigma de la antigüedad</h2>
          </div>
          
          <div className="flex-grow flex flex-col gap-6 justify-center">
            {historyData.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="bg-white border-2 border-amber-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-3 rounded-xl text-amber-600 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-amber-900 mb-2">{item.title}</h3>
                      <p className="text-amber-800/80 leading-relaxed text-sm">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
