import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Dumbbell } from 'lucide-react';
import { ejercicios } from '../../data/ejercicios';

export function Ejercicios() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto p-4 sm:p-8 w-full flex-grow flex flex-col"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4 text-slate-900">
          <Dumbbell className="w-10 h-10 text-emerald-600" />
          <span className="text-emerald-600">Ejercicios</span> Rápidos
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          20 problemas resueltos paso a paso para dominar el cálculo de áreas y perímetros.
        </p>
      </div>

      <div className="space-y-4">
        {ejercicios.map((ej) => {
          const isOpen = openId === ej.id;
          return (
            <div 
              key={ej.id} 
              className={`border transition-colors duration-300 rounded-2xl overflow-hidden shadow-sm ${
                isOpen ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <button 
                onClick={() => toggle(ej.id)}
                className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-emerald-600 mb-1 uppercase tracking-wider">
                    Ejercicio {ej.id}: {ej.title}
                  </div>
                  <div className="text-lg text-slate-800 pr-4">
                    {ej.question}
                  </div>
                </div>
                <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="px-5 pb-5 pt-2 border-t border-emerald-200/50 bg-white/50">
                      <h4 className="text-sm font-bold text-slate-500 mb-3">Revisión Paso a Paso:</h4>
                      <ul className="space-y-2 mb-4">
                        {ej.steps.map((step, idx) => (
                          <li key={idx} className="flex gap-3 text-slate-600 text-sm">
                            <span className="font-mono text-emerald-600">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                        <span className="text-sm font-bold text-emerald-600 uppercase">Respuesta Final:</span>
                        <span className="text-lg font-mono text-slate-900">{ej.answer}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
