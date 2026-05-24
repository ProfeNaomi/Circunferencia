import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Dumbbell, Target, CheckCircle2, XCircle, ArrowRight, RotateCcw, BookOpen } from 'lucide-react';
import { ejercicios } from '../../data/ejercicios';

const quizQuestions = [
  {
    id: 1,
    question: 'Calcula el área de un círculo que tiene un radio de 5 cm.',
    options: ['31.41 cm²', '78.54 cm²', '15.70 cm²', '25.00 cm²'],
    correctIndex: 1,
    steps: ejercicios[0].steps,
    answer: ejercicios[0].answer
  },
  {
    id: 2,
    question: 'Calcula el perímetro de un círculo con diámetro de 10 m.',
    options: ['31.416 m', '78.54 m', '15.708 m', '314.16 m'],
    correctIndex: 0,
    steps: ejercicios[1].steps,
    answer: ejercicios[1].answer
  },
  {
    id: 3,
    question: 'Si el área de un círculo es 50.2656 cm², ¿cuál es su radio?',
    options: ['16 cm', '8 cm', '4 cm', '2 cm'],
    correctIndex: 2,
    steps: ejercicios[3].steps,
    answer: ejercicios[3].answer
  },
  {
    id: 4,
    question: 'Una rueda mide 60 cm de diámetro. ¿Cuántos metros avanza por vuelta?',
    options: ['0.60 m', '1.88 m', '3.76 m', '18.84 m'],
    correctIndex: 1,
    steps: ejercicios[5].steps,
    answer: ejercicios[5].answer
  },
  {
    id: 5,
    question: '¿Qué tiene más área: Una pizza familiar de 40 cm de diámetro, o dos medianas de 25 cm?',
    options: ['La pizza familiar', 'Las dos medianas', 'Misma área', 'Faltan datos'],
    correctIndex: 0,
    steps: ejercicios[6].steps,
    answer: ejercicios[6].answer
  }
];

export function Ejercicios() {
  const [mode, setMode] = useState<'quiz' | 'list'>('quiz');
  
  // List Mode State
  const [openId, setOpenId] = useState<number | null>(null);

  // Quiz Mode State
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const toggle = (id: number) => setOpenId(openId === id ? null : id);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === quizQuestions[currentQ].correctIndex) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCurrentQ(currentQ + 1); // move to results
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
  };

  const isQuizComplete = currentQ >= quizQuestions.length;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full px-4 sm:px-12 py-8 flex-grow flex flex-col pb-24"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4 text-slate-900">
          <Dumbbell className="w-10 h-10 text-emerald-600" />
          <span className="text-emerald-600">Ejercicios</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Pon a prueba tus conocimientos o revisa los 20 problemas resueltos paso a paso.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setMode('quiz')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            mode === 'quiz' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200'
          }`}
        >
          <Target className="w-5 h-5" /> Tu Turno (Quiz)
        </button>
        <button
          onClick={() => setMode('list')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            mode === 'list' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-indigo-50 border border-slate-200'
          }`}
        >
          <BookOpen className="w-5 h-5" /> Guía Resuelta
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'quiz' ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full"
          >
            {isQuizComplete ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-md">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-12 h-12 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">¡Cuestionario Completado!</h2>
                <p className="text-xl text-slate-600 mb-8">
                  Acertaste <strong className="text-emerald-600 text-3xl">{score}</strong> de <strong className="text-slate-800 text-3xl">{quizQuestions.length}</strong>
                </p>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={resetQuiz}
                    className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-colors shadow-sm"
                  >
                    <RotateCcw className="w-5 h-5" /> Intentar de nuevo
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <div className="bg-emerald-50 px-8 py-4 border-b border-emerald-100 flex justify-between items-center">
                  <span className="font-bold text-emerald-800">Pregunta {currentQ + 1} de {quizQuestions.length}</span>
                  <span className="font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full text-sm">Puntos: {score}</span>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-8">
                    {quizQuestions[currentQ].question}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {quizQuestions[currentQ].options.map((opt, idx) => {
                      const isCorrect = idx === quizQuestions[currentQ].correctIndex;
                      const isSelected = selectedOption === idx;
                      
                      let btnClass = "bg-white border-2 border-slate-200 hover:border-emerald-300 hover:bg-slate-50 text-slate-700";
                      
                      if (isAnswered) {
                        if (isCorrect) btnClass = "bg-emerald-50 border-2 border-emerald-500 text-emerald-800 font-bold shadow-sm";
                        else if (isSelected) btnClass = "bg-red-50 border-2 border-red-500 text-red-800 opacity-80";
                        else btnClass = "bg-white border-2 border-slate-100 text-slate-400 opacity-50";
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleOptionClick(idx)}
                          className={`p-5 rounded-xl text-lg transition-all flex items-center justify-between ${btnClass}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                          {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {isAnswered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="overflow-hidden"
                      >
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-6">
                          <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-indigo-500" /> Resolución paso a paso:
                          </h4>
                          <ul className="space-y-2">
                            {quizQuestions[currentQ].steps.map((step, sIdx) => (
                              <li key={sIdx} className="flex gap-3 text-slate-600">
                                <span className="font-mono text-indigo-500 font-bold">{sIdx + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex justify-end">
                          <button 
                            onClick={nextQuestion}
                            className="flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors shadow-sm"
                          >
                            Siguiente <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {ejercicios.map((ej) => {
              const isOpen = openId === ej.id;
              return (
                <div 
                  key={ej.id} 
                  className={`border transition-colors duration-300 rounded-2xl overflow-hidden shadow-sm ${
                    isOpen ? 'bg-indigo-50 border-indigo-300' : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button 
                    onClick={() => toggle(ej.id)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-indigo-600 mb-1 uppercase tracking-wider">
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
                        <div className="px-5 pb-5 pt-2 border-t border-indigo-200/50 bg-white/50">
                          <h4 className="text-sm font-bold text-slate-500 mb-3">Revisión Paso a Paso:</h4>
                          <ul className="space-y-2 mb-4">
                            {ej.steps.map((step, idx) => (
                              <li key={idx} className="flex gap-3 text-slate-600 text-sm">
                                <span className="font-mono text-indigo-600">{idx + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between">
                            <span className="text-sm font-bold text-indigo-600 uppercase">Respuesta Final:</span>
                            <span className="text-lg font-mono text-slate-900">{ej.answer}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
