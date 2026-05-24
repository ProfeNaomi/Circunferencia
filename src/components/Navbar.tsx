import { motion } from 'motion/react';
import { Circle, Ruler, Disc, Box, Dumbbell, MonitorPlay, Navigation } from 'lucide-react';

const tabs = [
  { id: 'conceptos', label: 'Conceptos', icon: Circle },
  { id: 'elementos', label: 'Elementos', icon: Disc },
  { id: 'perimetro', label: 'Perímetro', icon: Ruler },
  { id: 'area', label: 'Área', icon: Box },
  { id: 'relaciones', label: 'Métricas', icon: Navigation },
  { id: 'ejercicios', label: 'Ejercicios', icon: Dumbbell },
  { id: 'resolucion', label: 'La Ilusión (3D)', icon: MonitorPlay },
];

interface NavbarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 p-4 shadow-sm w-full">
      <div className="w-full px-2 sm:px-8">
        <ul className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id} className="relative">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive ? 'text-indigo-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 bg-indigo-50 border border-indigo-200 rounded-full"
                      initial={false}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
