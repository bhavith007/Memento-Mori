import React, { useMemo } from 'react';
import { TOTAL_MONTHS } from '../utils/time';

interface LifeGridProps {
  monthsLived: number;
}

export const LifeGrid: React.FC<LifeGridProps> = ({ monthsLived }) => {
  // We want to render TOTAL_MONTHS dots.
  const gridItems = useMemo(() => {
    return Array.from({ length: TOTAL_MONTHS }, (_, i) => {
      const isLived = i < monthsLived;
      const isCurrent = i === monthsLived;
      return { id: i, isLived, isCurrent };
    });
  }, [monthsLived]);

  return (
    <div className="w-full max-w-7xl mx-auto my-12 px-4">
      {/* 
        Grid Visuals:
        - "Lived": Zinc-300 (Bright visible history)
        - "Current": Glowing White Pulse (immediate present) with dramatic zoom on hover
        - "Remaining": Dark Zinc-900 with subtle border (the void to come)
      */}
      <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
        {gridItems.map((item) => (
          <div
            key={item.id}
            title={item.isCurrent ? "This Month - You are here" : item.isLived ? "Past" : "Future"}
            className={`
              w-2 h-2 md:w-2.5 md:h-2.5 transition-all duration-500 ease-out
              ${item.isLived 
                ? 'bg-zinc-300 hover:bg-white shadow-[0_0_2px_rgba(255,255,255,0.2)] rounded-sm' 
                : 'bg-zinc-900/40 border border-zinc-800 rounded-sm'}
              ${item.isCurrent 
                ? '!bg-white scale-150 hover:scale-[3] shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:shadow-[0_0_60px_rgba(255,255,255,1)] animate-pulse hover:animate-none z-10 hover:z-50 !rounded-full cursor-crosshair' 
                : ''}
            `}
          />
        ))}
      </div>
      
      <div className="flex justify-between text-[10px] md:text-xs text-zinc-600 mt-12 px-4 font-serif uppercase tracking-[0.2em] opacity-60">
        <span>The Beginning</span>
        <span>The End (Statistically)</span>
      </div>
    </div>
  );
};