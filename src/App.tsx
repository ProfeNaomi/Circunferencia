import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { CirculoVsCircunferencia } from './components/sections/CirculoVsCircunferencia';
import { Elementos } from './components/sections/Elementos';
import { Perimetro } from './components/sections/Perimetro';
import { Area } from './components/sections/Area';
import { RelacionesMetricas } from './components/sections/RelacionesMetricas';
import { Ejercicios } from './components/sections/Ejercicios';
import { Resolucion } from './components/sections/Resolucion';

export default function App() {
  const [activeTab, setActiveTab] = useState('conceptos');

  return (
    <div className="h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-500/30">
       <header className="bg-slate-900 text-white py-4 px-6 shadow-md z-50 flex flex-col items-center justify-center relative">
         <h1 className="text-2xl md:text-3xl font-bold tracking-tight">La Circunferencia y el Círculo</h1>
         <div className="mt-2 bg-indigo-500/20 text-indigo-200 text-xs md:text-sm font-semibold px-3 py-1 rounded-full border border-indigo-500/30 backdrop-blur-sm">
           Profesora Naomi
         </div>
       </header>
       <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
       <main className="flex-grow relative overflow-y-auto overflow-x-hidden flex flex-col">
          <AnimatePresence mode="popLayout">
            {activeTab === 'conceptos' && <CirculoVsCircunferencia key="conceptos" />}
            {activeTab === 'elementos' && <Elementos key="elementos" />}
            {activeTab === 'perimetro' && <Perimetro key="perimetro" />}
            {activeTab === 'area' && <Area key="area" />}
            {activeTab === 'relaciones' && <RelacionesMetricas key="relaciones" />}
            {activeTab === 'ejercicios' && <Ejercicios key="ejercicios" />}
            {activeTab === 'resolucion' && <Resolucion key="resolucion" />}
          </AnimatePresence>
       </main>
    </div>
  );
}
