
export interface User {
  name: string;
  gender: 'masculino' | 'feminino';
  age: number;
  height: number;
  weight: number;
  objective: 'Ganhar Massa' | 'Perder Gordura' | 'Manter o Peso';
  avatar: string | null;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: number;
  tip: string;
  gifUrl: string;
}

export interface Workout {
  day: string;
  name: string;
  motivation: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  workouts: Workout[];
}

export interface AllWorkouts {
  feminino: WorkoutPlan;
  masculino: WorkoutPlan;
}

export interface EvolutionData {
  labels: string[];
  data: number[];
}

export interface WorkoutHistory {
  personal_records: { [exerciseName: string]: number };
  evolution: { [exerciseName: string]: EvolutionData };
  completed_workouts: number;
  weekly_calories: { [weekKey: string]: number };
}

export interface AppState {
  user: User | null;
  currentWorkout: Workout | null;
  workoutHistory: WorkoutHistory;
  hydration: {
    date: string;
    amount: number;
  };
}

export interface ExecState {
  workout: Workout;
  currentExerciseIndex: number;
  completedSets: boolean[][];
  exerciseWeights: number[];
  startTime: Date;
}

export interface ResumoData {
  duration: number;
  volume: number;
  calories: number;
}

export enum Screen {
  Cadastro,
  Dashboard,
  Execucao,
  Resumo,
  Perfil,
  Progresso,
}