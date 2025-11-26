import React, { useState, useEffect } from 'react';
import { Onboarding } from './components/Onboarding';
import { LifeGrid } from './components/LifeGrid';
import { calculateLifeStats, formatDate, LifeStats } from './utils/time';
import { generateLifeQuote } from './services/gemini';
import { RotateCcw } from 'lucide-react';

export default function App() {
  const [dob, setDob] = useState<Date | null>(null);
  const [stats, setStats] = useState<LifeStats | null>(null);
  const [quote, setQuote] = useState<string>('');
  const [loadingQuote, setLoadingQuote] = useState(false);

  useEffect(() => {
    if (dob) {
      const newStats = calculateLifeStats(dob);
      setStats(newStats);
      
      // Fetch quote
      setLoadingQuote(true);
      generateLifeQuote(newStats.monthsLived, newStats.monthsRemaining)
        .then(setQuote)
        .finally(() => setLoadingQuote(false));
    }
  }, [dob]);

  const handleReset = () => {
    setDob(null);
    setStats(null);
    setQuote('');
  };

  if (!dob || !stats) {
    return <Onboarding onComplete={setDob} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col font-sans selection:bg-white selection:text-black">
      
      {/* Elegant Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference pointer-events-none">
        <h1 className="font-serif text-lg md:text-xl tracking-widest uppercase text-white/80 pointer-events-auto">Memento Mori</h1>
        <button 
          onClick={handleReset}
          className="pointer-events-auto group flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
        >
          <span>Reset</span>
          <RotateCcw className="w-3 h-3 group-hover:-rotate-180 transition-transform duration-500" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full pt-24 pb-12 px-4 animate-fade-in">
        
        {/* Quote Section - Dramatic Typography */}
        <div className="max-w-4xl text-center px-4 mb-16 min-h-[160px] flex flex-col items-center justify-center">
          {loadingQuote ? (
            <div className="animate-pulse space-y-3">
              <div className="h-px w-24 bg-zinc-800 mx-auto"></div>
              <p className="text-xs font-serif italic text-zinc-600">Consulting the fates...</p>
            </div>
          ) : (
            <div className="animate-fade-in flex flex-col items-center gap-6">
              <p className="text-2xl md:text-5xl font-serif leading-snug text-white font-light">
                {quote}
              </p>
              <div className="h-px w-16 bg-zinc-800"></div>
            </div>
          )}
        </div>

        {/* Statistics - Large & Stark */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mb-12 text-center w-full max-w-5xl">
            <div className="group">
              <span className="block text-4xl md:text-6xl font-thin text-white mb-2 group-hover:scale-105 transition-transform duration-500">{stats.yearsLived}</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">Years Gone</span>
            </div>
            <div className="group">
              <span className="block text-4xl md:text-6xl font-thin text-zinc-400 mb-2 group-hover:text-zinc-200 transition-colors duration-500">{stats.monthsLived.toLocaleString()}</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">Months Spent</span>
            </div>
            <div className="group">
              <span className="block text-4xl md:text-6xl font-thin text-white mb-2 group-hover:scale-105 transition-transform duration-500">{stats.monthsRemaining.toLocaleString()}</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">Months Left</span>
            </div>
             <div className="group">
              <span className="block text-4xl md:text-6xl font-thin text-zinc-400 mb-2 group-hover:text-zinc-200 transition-colors duration-500">{stats.percentageLived.toFixed(1)}%</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">Complete</span>
            </div>
        </div>

        {/* Legend - Minimalist */}
        <div className="flex gap-8 mb-8 text-[10px] uppercase tracking-[0.15em] text-zinc-500">
            <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-sm bg-zinc-400"></div>
                <span>Lived</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_white]"></div>
                <span>Now</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-sm border border-zinc-800 bg-zinc-900/50"></div>
                <span>Remaining</span>
            </div>
        </div>

        {/* The Grid */}
        <LifeGrid monthsLived={stats.monthsLived} />

        {/* Footer info */}
        <div className="mb-16 mt-8 text-center space-y-2 opacity-30 hover:opacity-100 transition-opacity duration-500">
            <p className="text-zinc-500 text-xs font-mono">
                {formatDate(dob)} — {formatDate(new Date())}
            </p>
        </div>

      </main>
    </div>
  );
}