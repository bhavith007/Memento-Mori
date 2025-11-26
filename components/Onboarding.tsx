import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: (date: Date) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [dateStr, setDateStr] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dateStr) {
      onComplete(new Date(dateStr));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[#050505] text-white animate-fade-in">
      
      <div className="mb-12 opacity-80">
        <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tight">
          Memento Mori
        </h1>
        <div className="h-px w-32 bg-zinc-800 mx-auto"></div>
      </div>
      
      <p className="text-zinc-400 max-w-lg mb-16 text-lg md:text-xl font-light leading-relaxed">
        Your time is finite. <br/>
        <span className="text-zinc-600 block mt-2">Visualize your existence in months.</span>
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md gap-8">
        <div className="w-full relative group">
          <label className="block text-xs uppercase tracking-[0.2em] text-zinc-600 mb-4 text-center transition-colors group-hover:text-zinc-400">
            Date of Birth
          </label>
          <input
            type="date"
            required
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="w-full bg-transparent border-b border-zinc-800 text-white text-3xl md:text-4xl py-4 focus:outline-none focus:border-white transition-colors text-center font-serif placeholder-zinc-800"
          />
        </div>

        <button
          type="submit"
          disabled={!dateStr}
          className="group relative px-10 py-5 bg-white text-black font-bold text-sm tracking-[0.2em] uppercase hover:bg-zinc-200 transition-all disabled:opacity-0 disabled:translate-y-4 duration-500 ease-out mt-8"
        >
          Reveal My Time
        </button>
      </form>
    </div>
  );
};