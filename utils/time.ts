export const LIFE_EXPECTANCY_YEARS = 80;
export const TOTAL_MONTHS = LIFE_EXPECTANCY_YEARS * 12;

export interface LifeStats {
  monthsLived: number;
  monthsRemaining: number;
  percentageLived: number;
  yearsLived: number;
}

export const calculateLifeStats = (dob: Date): LifeStats => {
  const now = new Date();
  
  // Calculate difference in months
  let months = (now.getFullYear() - dob.getFullYear()) * 12;
  months -= dob.getMonth();
  months += now.getMonth();

  // Correction for days (if current day is before DOB day, subtracting a month isn't strictly necessary for visual approximation, but let's keep it simple)
  // We will treat the current month as the "current dot"
  
  // Clamp values
  const lived = Math.max(0, Math.min(months, TOTAL_MONTHS));
  const remaining = Math.max(0, TOTAL_MONTHS - lived);
  
  return {
    monthsLived: lived,
    monthsRemaining: remaining,
    percentageLived: (lived / TOTAL_MONTHS) * 100,
    yearsLived: now.getFullYear() - dob.getFullYear(),
  };
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
};