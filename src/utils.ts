
import { User } from './types';

export const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const getWeekNumber = (d: Date): string => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() ? d.getUTCDay() : 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-${weekNo}`;
};

export const calculateCalories = (user: User): number => {
  const tmb = 10 * user.weight + 6.25 * (user.height * 100) - 5 * user.age + (user.gender === 'masculino' ? 5 : -161);
  let calories = tmb * 1.55; // Moderate activity multiplier
  if (user.objective === 'Ganhar Massa') calories += 400;
  if (user.objective === 'Perder Gordura') calories -= 400;
  return Math.round(calories);
};
