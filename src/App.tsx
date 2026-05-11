import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { CirculoVsCircunferencia } from './components/sections/CirculoVsCircunferencia';
import { Elementos } from './components/sections/Elementos';
import { Perimetro } from './components/sections/Perimetro';
import { Area } from './components/sections/Area';
import { Ejercicios } from './components/sections/Ejercicios';
import { Resolucion } from './components/sections/Resolucion';

export default function App() {
  const [activeTab, setActiveTab] = useState('conceptos');

  return (
    <div className="h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-500/30">
       <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
       <main className="flex-grow relative overflow-y-auto overflow-x-hidden flex flex-col">
          <AnimatePresence mode="popLayout">
            {activeTab === 'conceptos' && <CirculoVsCircunferencia key="conceptos" />}
            {activeTab === 'elementos' && <Elementos key="elementos" />}
            {activeTab === 'perimetro' && <Perimetro key="perimetro" />}
            {activeTab === 'area' && <Area key="area" />}
            {activeTab === 'ejercicios' && <Ejercicios key="ejercicios" />}
            {activeTab === 'resolucion' && <Resolucion key="resolucion" />}
          </AnimatePresence>
       </main>
    </div>
  );
}
