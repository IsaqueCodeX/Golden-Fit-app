
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { AppState, User, Screen, Workout, ExecState, ResumoData, Exercise } from './types';
import { ALL_WORKOUTS, DAY_NAMES } from './constants';
import { generateWeeklyChallenge } from './services/geminiService';
import { BottomNav } from './components/BottomNav';
import { StatCard } from './components/StatCard';
import { ProgressChart } from './components/ProgressChart';
import { RestTimerOverlay } from './components/RestTimerOverlay';

// --- HELPERS & CONTEXT ---

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const getInitialState = (): AppState => {
  try {
    const savedState = localStorage.getItem("goldenFitState");
    if (savedState) {
      const state = JSON.parse(savedState);
      
      if (!state.workoutHistory) {
         state.workoutHistory = { personal_records: {}, evolution: {}, completed_workouts: 0, weekly_calories: {} };
      }
      if(!state.workoutHistory.weekly_calories) {
        state.workoutHistory.weekly_calories = {};
      }

      const today = getTodayDateString();
      if (!state.hydration || state.hydration.date !== today) {
        state.hydration = { date: today, amount: 0 };
      }

      return state;
    }
  } catch (error) {
    console.error("Could not parse saved state:", error);
  }
  return {
    user: null,
    currentWorkout: null,
    workoutHistory: {
      personal_records: {},
      evolution: {},
      completed_workouts: 0,
      weekly_calories: {},
    },
    hydration: {
        date: getTodayDateString(),
        amount: 0,
    }
  };
};

const AppContext = createContext<{
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  navigate: (screen: Screen, data?: any) => void;
  updateUser: (updatedUser: User) => void;
  logout: () => void;
  resetProfile: () => void;
} | null>(null);

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};

// --- FORM & UI COMPONENTS ---

const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="ml-3 mb-1 block text-sm font-medium text-[#a0a0a0]">{label}</label>
    <input id={id} {...props} className="form-input block w-full rounded-lg border-2 border-[#333333] bg-[#121212] py-3 px-5 text-[#f5f5f5] shadow-sm transition-all duration-300 placeholder:text-[#a0a0a0] focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold" />
  </div>
);

const FormSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }> = ({ label, id, children, ...props }) => (
  <div>
    <label htmlFor={id} className="ml-3 mb-1 block text-sm font-medium text-[#a0a0a0]">{label}</label>
    <select id={id} {...props} className="form-select block w-full rounded-lg border-2 border-[#333333] bg-[#121212] py-3 px-5 text-[#f5f5f5] shadow-sm transition-all duration-300 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold">
      {children}
    </select>
  </div>
);

const MainButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
    <button {...props} className={`main-button flex w-full items-center justify-center rounded-xl bg-gold px-4 py-3.5 text-lg font-bold tracking-wider text-[#121212] shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-dark disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-500 disabled:shadow-none ${className}`}>
        {children}
    </button>
);

const Card: React.FC<{ children: React.ReactNode, className?: string, border?: 'gold' | 'default' }> = ({ children, className, border = 'default' }) => (
  <div className={`rounded-2xl border-2 bg-[#1e1e1e] p-6 shadow-lg ${border === 'gold' ? 'border-gold' : 'border-[#333333]'} ${className}`}>
    {children}
  </div>
);


// --- SCREEN COMPONENTS ---

const CadastroScreen: React.FC = () => {
    const { setAppState, navigate } = useApp();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newUser: User = {
            name: formData.get('name') as string,
            gender: formData.get('gender') as 'masculino' | 'feminino',
            age: parseInt(formData.get('age') as string),
            height: parseFloat(formData.get('height') as string),
            weight: parseFloat(formData.get('weight') as string),
            objective: formData.get('objective') as 'Ganhar Massa' | 'Perder Gordura' | 'Manter o Peso',
            avatar: null
        };
        setAppState(prev => ({ ...prev, user: newUser }));
        navigate(Screen.Dashboard);
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card>
                    <h1 className="font-header text-6xl font-bold text-center mb-1 text-gold">GOLDEN FIT</h1>
                    <p className="text-center mb-8 text-lg text-[#a0a0a0]">Crie seu perfil para começar</p>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <FormInput label="Nome" id="name" name="name" type="text" required placeholder="Seu nome completo" defaultValue="Daniel" />
                        </div>
                        <div>
                            <FormSelect label="Gênero" id="gender" name="gender" required>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                            </FormSelect>
                        </div>
                         <div>
                            <FormInput label="Idade" id="age" name="age" type="number" required placeholder="Ex: 28" defaultValue="28" />
                        </div>
                        <div>
                            <FormInput label="Altura (m)" id="height" name="height" type="number" step="0.01" required placeholder="Ex: 1.75" defaultValue="1.75"/>
                        </div>
                        <div>
                             <FormInput label="Peso (kg)" id="weight" name="weight" type="number" step="0.1" required placeholder="Ex: 75.5" defaultValue="75.5"/>
                        </div>
                        <div className="sm:col-span-2">
                            <FormSelect label="Objetivo" id="objective" name="objective" required>
                                <option value="Ganhar Massa">Ganhar Massa</option>
                                <option value="Perder Gordura">Perder Gordura</option>
                                <option value="Manter o Peso">Manter o Peso</option>
                            </FormSelect>
                        </div>
                        <div className="sm:col-span-2 mt-6">
                            <MainButton type="submit">
                                <span>CRIAR PERFIL</span>
                                <i className="fa-solid fa-arrow-right ml-2"></i>
                            </MainButton>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

const DashboardScreen: React.FC = () => {
    const { appState, navigate, setAppState } = useApp();
    const { user, hydration } = appState;
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const WATER_GOAL = 3000;

    useEffect(() => {
        const dayOfWeek = new Date().getDay(); // Sunday = 0, Monday = 1
        const initialIndex = dayOfWeek > 0 && dayOfWeek < 6 ? dayOfWeek - 1 : 0;
        setSelectedDayIndex(initialIndex);
    }, []);
    
    if (!user || !hydration) return null;

    const userPlan = ALL_WORKOUTS[user.gender];
    const selectedWorkout = userPlan.workouts[selectedDayIndex];

    const calculateCalories = (user: User) => {
      const tmb = 10 * user.weight + 6.25 * (user.height * 100) - 5 * user.age + (user.gender === 'masculino' ? 5 : -161);
      let calories = tmb * 1.55; // Moderate activity multiplier
      if (user.objective === 'Ganhar Massa') calories += 400;
      if (user.objective === 'Perder Gordura') calories -= 400;
      return Math.round(calories);
    };
    
    const handleWaterChange = (increment: number) => {
        setAppState(prev => {
            if (!prev.hydration) return prev;
            const newAmount = Math.max(0, prev.hydration.amount + increment);
            return {
                ...prev,
                hydration: { ...prev.hydration, amount: newAmount }
            };
        });
    };

    const handleStartWorkout = (workout: Workout) => {
        setAppState(prev => ({...prev, currentWorkout: workout}));
        navigate(Screen.Execucao);
    };
    
    return (
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow overflow-y-auto p-4" style={{paddingBottom: '84px'}}>
            <header className="mx-auto w-full max-w-lg flex-shrink-0 pt-8 mb-4 text-center">
                <p className="text-lg text-[#a0a0a0]">Bem-vindo(a) de volta,</p>
                <h1 className="font-header text-5xl tracking-wider text-[#f5f5f5]">{user.name.split(" ")[0]}</h1>
            </header>
            <main className="mx-auto w-full max-w-lg space-y-4">
                <h2 className="font-header text-3xl mb-4 text-center text-gold">Qual o treino de hoje?</h2>
                <div className="flex justify-around items-center space-x-1 sm:space-x-2">
                    {userPlan.workouts.map((workout, index) => (
                        <div key={index} onClick={() => setSelectedDayIndex(index)} className={`day-circle flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-full border-2 bg-[#1e1e1e] font-header transition-all duration-300 sm:h-20 sm:w-20 ${selectedDayIndex === index ? 'scale-110 transform border-gold bg-gold' : 'border-[#333333]'}`}>
                            <span className={`day-letter text-3xl font-bold leading-none sm:text-4xl ${selectedDayIndex === index ? 'text-[#121212]' : 'text-[#f5f5f5]'}`}>{workout.day}</span>
                            <span className={`day-name -mt-1 text-xs font-sans font-medium uppercase ${selectedDayIndex === index ? 'text-[#121212]' : 'text-[#a0a0a0]'}`}>{DAY_NAMES[index]}</span>
                        </div>
                    ))}
                </div>
                
                {selectedWorkout && (
                    <>
                        <Card border="gold" className="text-center">
                            <h3 className="font-header text-3xl">{selectedWorkout.name}</h3>
                            <p className="italic text-sm my-2 flex-grow text-[#a0a0a0]">{selectedWorkout.motivation}</p>
                            <MainButton onClick={() => handleStartWorkout(selectedWorkout)} className="mt-4">
                                <i className="fa-solid fa-play mr-2"></i> INICIAR TREINO {selectedWorkout.day}
                            </MainButton>
                        </Card>
                        <Card>
                            <h3 className="font-header text-2xl text-center text-gold">Exercícios de Hoje</h3>
                            <div className="space-y-2 mt-4 text-center">
                                {selectedWorkout.exercises.map(ex => (
                                    <div key={ex.name} className="flex items-center justify-center gap-x-2 rounded-lg border border-[#333333] p-3 text-sm">
                                        <span>{ex.name}</span>
                                        <span className="font-medium text-[#a0a0a0]">{ex.sets} x {ex.reps}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </>
                )}
                 <Card className="border-2 border-blue-500/50 bg-[#1e1e1e]">
                    <h2 className="font-header text-2xl text-center text-blue-400 mb-4">Hidratação Diária</h2>
                    <div className="text-center mb-4">
                        <span className="font-header text-4xl text-white">{hydration.amount}</span>
                        <span className="text-lg text-gray-400"> / {WATER_GOAL} ml</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                        <div 
                            className="bg-blue-500 h-4 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min(100, (hydration.amount / WATER_GOAL) * 100)}%` }}
                        ></div>
                    </div>
                    <div className="flex items-center justify-around gap-4">
                        <button 
                            onClick={() => handleWaterChange(-250)}
                            disabled={hydration.amount === 0}
                            className="h-14 w-14 rounded-full bg-gray-800 text-3xl font-bold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Diminuir 250ml de água"
                        >
                            -
                        </button>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-glass-water text-4xl text-blue-400"></i>
                            <span className="text-sm font-bold mt-1">250 ml</span>
                        </div>
                        <button 
                            onClick={() => handleWaterChange(250)}
                            className="h-14 w-14 rounded-full bg-gray-800 text-3xl font-bold"
                            aria-label="Adicionar 250ml de água"
                        >
                            +
                        </button>
                    </div>
                </Card>
                <Card>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <p className="text-sm text-[#a0a0a0]">Meta Calórica</p>
                            <p className="font-bold text-lg">~{calculateCalories(user)} kcal</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-[#a0a0a0]">Peso Atual</p>
                            <p className="font-bold text-lg">{user.weight} kg</p>
                        </div>
                    </div>
                </Card>
            </main>
          </div>
          <BottomNav activeScreen="dashboard" onNavigate={(screen) => navigate(Screen[screen.charAt(0).toUpperCase() + screen.slice(1) as keyof typeof Screen])} />
        </div>
    );
};

const ExecucaoScreen: React.FC = () => {
    const { appState, setAppState, navigate } = useApp();
    const [execState, setExecState] = useState<ExecState | null>(null);
    const [isResting, setIsResting] = useState(false);
    
    useEffect(() => {
        if (appState.currentWorkout) {
            setExecState({
                workout: appState.currentWorkout,
                currentExerciseIndex: 0,
                completedSets: Array(appState.currentWorkout.exercises.length).fill([]),
                exerciseWeights: Array(appState.currentWorkout.exercises.length).fill(0),
                startTime: new Date(),
            });
        }
    }, [appState.currentWorkout]);
    
    const handleSetToggle = (setIndex: number) => {
        if (!execState) return;

        const newCompletedSets = [...execState.completedSets];
        if (!newCompletedSets[execState.currentExerciseIndex]) {
            newCompletedSets[execState.currentExerciseIndex] = [];
        }
        
        const isDone = newCompletedSets[execState.currentExerciseIndex][setIndex];
        newCompletedSets[execState.currentExerciseIndex][setIndex] = !isDone;
        
        setExecState({ ...execState, completedSets: newCompletedSets });
        
        if (!isDone && currentExercise.rest > 0) {
            setIsResting(true);
        }
    };

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!execState) return;
        const newWeights = [...execState.exerciseWeights];
        newWeights[execState.currentExerciseIndex] = parseFloat(e.target.value) || 0;
        setExecState({ ...execState, exerciseWeights: newWeights });
    };

    const handleWeightAdjustment = (amount: number) => {
       if (!execState) return;
        const newWeights = [...execState.exerciseWeights];
        const currentWeight = newWeights[execState.currentExerciseIndex] || 0;
        newWeights[execState.currentExerciseIndex] = Math.max(0, currentWeight + amount);
        setExecState({ ...execState, exerciseWeights: newWeights });
    }

    const changeExercise = (direction: 1 | -1) => {
        if (!execState) return;
        const newIndex = execState.currentExerciseIndex + direction;
        if (newIndex >= 0 && newIndex < execState.workout.exercises.length) {
            setExecState({ ...execState, currentExerciseIndex: newIndex });
        }
    };
    
    const finishWorkout = () => {
        if (!execState || !appState.user) return;
        
        const endTime = new Date();
        const durationInMinutes = Math.round((endTime.getTime() - execState.startTime.getTime()) / 60000);
        const caloriesBurned = Math.round(durationInMinutes * 7.5);
        let totalVolume = 0;
        const today = new Date().toLocaleDateString('pt-BR');

        const newHistory = JSON.parse(JSON.stringify(appState.workoutHistory));
        newHistory.completed_workouts++;

        const getWeekNumber = (d: Date) => {
            d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() ? d.getUTCDay() : 7));
            const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
            const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
            return `${d.getUTCFullYear()}-${weekNo}`;
        }
        const weekKey = getWeekNumber(new Date());
        newHistory.weekly_calories[weekKey] = (newHistory.weekly_calories[weekKey] || 0) + caloriesBurned;
        
        execState.workout.exercises.forEach((ex, exIndex) => {
            const weightForExercise = execState.exerciseWeights[exIndex] || 0;
            const completedCount = execState.completedSets[exIndex]?.filter(Boolean).length || 0;
            const reps = parseInt(ex.reps) || 10;
            totalVolume += weightForExercise * reps * completedCount;

            if (weightForExercise > 0) {
                if (!newHistory.evolution[ex.name]) {
                    newHistory.evolution[ex.name] = { labels: [], data: [] };
                }
                newHistory.evolution[ex.name].labels.push(today);
                newHistory.evolution[ex.name].data.push(weightForExercise);

                if (!newHistory.personal_records[ex.name] || weightForExercise > newHistory.personal_records[ex.name]) {
                    newHistory.personal_records[ex.name] = weightForExercise;
                }
            }
        });

        setAppState(prev => ({...prev, workoutHistory: newHistory, currentWorkout: null}));
        navigate(Screen.Resumo, { duration: durationInMinutes, volume: totalVolume, calories: caloriesBurned });
    };

    if (!execState) return <div className="flex min-h-screen items-center justify-center">Carregando treino...</div>;

    const { workout, currentExerciseIndex } = execState;
    const currentExercise = workout.exercises[currentExerciseIndex];
    const progress = ((currentExerciseIndex + 1) / workout.exercises.length) * 100;
    
    return (
        <div className="flex h-screen flex-col bg-[#121212]">
             {isResting && (
                <RestTimerOverlay
                    duration={currentExercise.rest}
                    nextExerciseName={workout.exercises[currentExerciseIndex + 1]?.name || "Último exercício!"}
                    onClose={() => setIsResting(false)}
                    onSkip={() => setIsResting(false)}
                />
            )}
            <header className="flex-shrink-0 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="font-header text-2xl text-gold">TREINO {workout.day}</h1>
                    <button onClick={finishWorkout} className="rounded-lg bg-red-600/80 px-3 py-1 text-sm font-semibold text-white">FINALIZAR</button>
                </div>
                <div className="mt-2 h-2.5 w-full rounded-full bg-gray-700">
                    <div className="h-2.5 rounded-full bg-gold transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
            </header>
            <main className="relative flex flex-grow flex-col p-4">
                <div className="flex-grow overflow-y-auto text-center">
                    <p className="text-sm text-[#a0a0a0]">{`Exercício ${currentExerciseIndex + 1} de ${workout.exercises.length}`}</p>
                    <h2 className="font-header my-2 text-4xl sm:text-5xl">{currentExercise.name}</h2>
                    <div className="mx-auto my-4 flex h-56 w-56 flex-shrink-0 items-center justify-center rounded-lg border-2 border-[#333333] bg-[#121212]">
                        <img src={currentExercise.gifUrl} alt={`Animação de ${currentExercise.name}`} className="h-full w-full rounded-lg object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/224x224/1E1E1E/D4AF37?text=GIF+Error'; }} />
                    </div>
                     <div className="mb-2 flex items-center justify-center space-x-4 text-lg text-[#a0a0a0]">
                        <span className="flex items-center"><i className="fa-solid fa-layer-group mr-2 text-gold"></i> {currentExercise.sets} séries x {currentExercise.reps} reps</span>
                    </div>
                     <div className="mx-auto my-4 w-full max-w-sm border-t border-b border-gray-700 py-2">
                        <p className="text-sm italic text-gold"><i className="fa-solid fa-lightbulb mr-1"></i>{currentExercise.tip}</p>
                    </div>
                     <div className="flex justify-center space-x-3">
                        {Array.from({ length: currentExercise.sets }).map((_, i) => {
                            const isDone = execState.completedSets[currentExerciseIndex]?.[i];
                            return (
                                <div key={i} onClick={() => handleSetToggle(i)} className={`set-checkbox flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-300 ${isDone ? 'border-gold bg-gold' : 'border-gold bg-transparent'}`}>
                                    <span className={`set-number font-header text-3xl ${isDone ? 'text-[#121212]' : 'text-gold'}`}>{isDone ? <i className="fa-solid fa-check text-3xl"></i> : i + 1}</span>
                                </div>
                            );
                        })}
                    </div>
                    <p className="mt-2 text-xs italic text-[#a0a0a0]">Toque em um número para iniciar o descanso.</p>
                     <div className="mt-6">
                        <label className="text-[#a0a0a0]">Carga (kg)</label>
                        <div className="mt-1 flex items-center justify-center space-x-2">
                             <button onClick={() => handleWeightAdjustment(-5)} className="weight-button h-10 w-12 rounded-md border border-transparent bg-[#1e1e1e] font-bold text-gold transition-colors hover:border-gold">-5</button>
                            <input type="number" value={execState.exerciseWeights[currentExerciseIndex] || ""} onChange={handleWeightChange} className="w-24 rounded-lg border-2 border-[#333333] bg-[#1e1e1e] p-2 text-center text-2xl text-[#f5f5f5] placeholder:text-[#a0a0a0] focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold" placeholder="0" />
                            <button onClick={() => handleWeightAdjustment(5)} className="weight-button h-10 w-12 rounded-md border border-transparent bg-[#1e1e1e] font-bold text-gold transition-colors hover:border-gold">+5</button>
                        </div>
                    </div>
                </div>
                <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-4">
                    <button onClick={() => changeExercise(-1)} disabled={currentExerciseIndex === 0} className="exec-nav-button pointer-events-auto p-4 text-4xl text-gray-400 transition-colors hover:text-white disabled:opacity-25"><i className="fa-solid fa-chevron-left"></i></button>
                    <button onClick={() => changeExercise(1)} disabled={currentExerciseIndex === workout.exercises.length - 1} className="exec-nav-button pointer-events-auto p-4 text-4xl text-gray-400 transition-colors hover:text-white disabled:opacity-25"><i className="fa-solid fa-chevron-right"></i></button>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
                    <button onClick={() => navigate(Screen.Dashboard)} className="exec-nav-home-button pointer-events-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold text-4xl text-[#121212] shadow-gold"><i className="fa-solid fa-house"></i></button>
                </div>
            </main>
        </div>
    );
};

const ResumoScreen: React.FC<{ data: ResumoData }> = ({ data }) => {
    const { appState, navigate } = useApp();
    const { user } = appState;
    
    return (
        <div className="flex min-h-screen items-center justify-center p-4 text-center">
            <Card className="w-full max-w-md">
                <img src="https://i.postimg.cc/nh3jR2x8/transferir.jpg" alt="Arnold Schwarzenegger" className="mx-auto mb-4 h-32 w-32 rounded-full border-4 border-gold object-cover" />
                <h1 className="font-header text-4xl">Treino Concluído!</h1>
                <p className="mb-6 text-lg text-[#a0a0a0]">Você mandou bem, <span className="font-bold">{user?.name.split(" ")[0]}</span>!</p>
                <div className="my-6 space-y-4">
                    <div className="info-item flex items-center justify-between border-b border-t border-[#4a4a4a] py-4"><span className="info-label text-[#a0a0a0]">Duração</span><span className="info-value font-semibold">{data.duration} min</span></div>
                    <div className="info-item flex items-center justify-between border-b border-[#4a4a4a] py-4"><span className="info-label text-[#a0a0a0]">Volume Total</span><span className="info-value font-semibold">{data.volume.toLocaleString('pt-BR')} kg</span></div>
                    <div className="info-item flex items-center justify-between py-4"><span className="info-label text-[#a0a0a0]">Calorias Queimadas</span><span className="info-value font-semibold">~{data.calories} kcal</span></div>
                </div>
                <MainButton onClick={() => navigate(Screen.Dashboard)} className="mt-6">
                    <i className="fa-solid fa-house mr-2"></i> VOLTAR AO INÍCIO
                </MainButton>
            </Card>
        </div>
    );
};

const PerfilScreen: React.FC = () => {
    const { appState, navigate, updateUser, logout, resetProfile } = useApp();
    const { user } = appState;
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<User | null>(user);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);

    useEffect(() => {
        setEditedUser(user);
    }, [user, isEditing]);

    if (!user || !editedUser) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedUser(prev => prev ? { ...prev, [name]: (e.target.type === 'number' ? parseFloat(value) : value) } : null);
    };

    const handleSave = () => {
        if(editedUser) updateUser(editedUser);
        setIsEditing(false);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (editedUser && event.target?.result) {
                    const updatedUser = {...editedUser, avatar: event.target.result as string};
                    setEditedUser(updatedUser);
                    updateUser(updatedUser);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const calculateStats = (user: User) => {
        const imc = user.weight / (user.height * user.height);
        const tmb = 10 * user.weight + 6.25 * (user.height * 100) - 5 * user.age + (user.gender === 'masculino' ? 5 : -161);
        let targetCalories = tmb * 1.55;
        if (user.objective === 'Ganhar Massa') targetCalories += 400;
        if (user.objective === 'Perder Gordura') targetCalories -= 400;
        return { imc: imc.toFixed(1), tmb: Math.round(tmb), targetCalories: Math.round(targetCalories) };
    };
    
    const handleResetConfirm = () => {
        resetProfile();
    };

    const { imc, tmb, targetCalories } = calculateStats(user);
    const { completed_workouts, personal_records } = appState.workoutHistory;

    return (
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow overflow-y-auto p-4 pb-28">
              <header className="mx-auto w-full max-w-lg pt-8 mb-8 text-center">
                  <div className="group relative inline-block">
                      <label htmlFor="avatarUpload" className="cursor-pointer">
                          <img src={user.avatar || `https://placehold.co/128x128/1E1E1E/D4AF37?text=${user.name.charAt(0).toUpperCase()}`} alt="Foto do Perfil" className="h-32 w-32 rounded-full border-4 border-gold object-cover" />
                           <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                <i className="fa-solid fa-camera text-2xl text-white"></i>
                            </div>
                      </label>
                       <input type="file" id="avatarUpload" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                  </div>
                   <h1 className="font-header mt-4 text-4xl">{user.name.split(" ")[0]}</h1>
                   <div className="mt-2 flex items-center justify-center gap-x-6 text-lg">
                       <div><p className="text-sm text-[#a0a0a0]">Peso Atual</p><p className="font-bold">{user.weight} kg</p></div>
                       <div><p className="text-sm text-[#a0a0a0]">Objetivo</p><p className="font-bold">{user.objective}</p></div>
                   </div>
              </header>
              <main className="mx-auto max-w-lg space-y-6">
                <Card border="gold">
                    <h2 className="font-header text-2xl mb-4 text-center text-gold">Minhas Estatísticas</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard icon="fa-calculator" value={imc} label="IMC" />
                        <StatCard icon="fa-fire-flame-curved" value={tmb} label="TMB (kcal)" />
                        <StatCard icon="fa-bullseye" value={targetCalories} label="Meta (kcal)" />
                        <StatCard icon="fa-dumbbell" value={completed_workouts || 0} label="Treinos Feitos" />
                        <StatCard icon="fa-trophy" value={Object.keys(personal_records).length} label="Recordes Pessoais" className="col-span-2" />
                    </div>
                </Card>

                 <Card border="gold">
                    <h2 className="font-header text-2xl mb-2 text-center text-gold">Minhas Informações</h2>
                    <div className="space-y-1">
                      {isEditing ? (
                        <>
                          <div className="flex justify-between items-center py-4 border-b border-t border-[#4a4a4a]"><span className="text-[#a0a0a0]">Nome</span><input type="text" name="name" value={editedUser.name} onChange={handleInputChange} className="editable-input w-36 border-b-2 border-[#333333] bg-transparent p-1 text-right transition-colors focus:border-gold focus:outline-none" /></div>
                          <div className="flex justify-between items-center py-4 border-b border-[#4a4a4a]"><span className="text-[#a0a0a0]">Idade</span><input type="number" name="age" value={editedUser.age} onChange={handleInputChange} className="editable-input w-24 border-b-2 border-[#333333] bg-transparent p-1 text-right transition-colors focus:border-gold focus:outline-none" /></div>
                          <div className="flex justify-between items-center py-4 border-b border-[#4a4a4a]"><span className="text-[#a0a0a0]">Altura</span><input type="number" step="0.01" name="height" value={editedUser.height} onChange={handleInputChange} className="editable-input w-24 border-b-2 border-[#333333] bg-transparent p-1 text-right transition-colors focus:border-gold focus:outline-none" /></div>
                          <div className="flex justify-between items-center py-4 border-b border-[#4a4a4a]"><span className="text-[#a0a0a0]">Peso</span><input type="number" step="0.1" name="weight" value={editedUser.weight} onChange={handleInputChange} className="editable-input w-24 border-b-2 border-[#333333] bg-transparent p-1 text-right transition-colors focus:border-gold focus:outline-none" /></div>
                           <div className="flex justify-between items-center py-4"><span className="text-[#a0a0a0]">Objetivo</span><select name="objective" value={editedUser.objective} onChange={handleInputChange} className="editable-input !w-auto border-b-2 border-[#333333] bg-transparent p-1 text-right transition-colors focus:border-gold focus:outline-none"><option value="Ganhar Massa">Ganhar Massa</option><option value="Perder Gordura">Perder Gordura</option><option value="Manter o Peso">Manter o Peso</option></select></div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between items-center py-4 border-b border-t border-[#4a4a4a]"><span className="flex items-center text-[#a0a0a0]"><i className="fa-solid fa-user w-6 text-center text-gold"></i> Nome</span><span className="font-semibold">{user.name}</span></div>
                          <div className="flex justify-between items-center py-4 border-b border-[#4a4a4a]"><span className="flex items-center text-[#a0a0a0]"><i className="fa-solid fa-cake-candles w-6 text-center text-gold"></i> Idade</span><span className="font-semibold">{user.age} anos</span></div>
                          <div className="flex justify-between items-center py-4 border-b border-[#4a4a4a]"><span className="flex items-center text-[#a0a0a0]"><i className="fa-solid fa-ruler-vertical w-6 text-center text-gold"></i> Altura</span><span className="font-semibold">{user.height} m</span></div>
                          <div className="flex justify-between items-center py-4"><span className="flex items-center text-[#a0a0a0]"><i className="fa-solid fa-venus-mars w-6 text-center text-gold"></i> Gênero</span><span className="font-semibold capitalize">{user.gender}</span></div>
                        </>
                      )}
                    </div>
                 </Card>

                 <div className="flex gap-4">
                  {isEditing ? (
                    <>
                      <MainButton onClick={() => setIsEditing(false)} className="!bg-gray-600 !text-white flex-1"><i className="fa-solid fa-times mr-2"></i> Cancelar</MainButton>
                      <MainButton onClick={handleSave} className="flex-1"><i className="fa-solid fa-save mr-2"></i> Salvar</MainButton>
                    </>
                  ) : (
                    <MainButton onClick={() => setIsEditing(true)}><i className="fa-solid fa-pencil mr-2"></i> Editar Perfil</MainButton>
                  )}
                </div>
                {!isEditing && (
                  <>
                    <button onClick={() => setIsResetModalOpen(true)} className="mt-4 flex w-full items-center justify-center rounded-xl bg-orange-800/20 py-3 px-4 text-lg font-bold text-orange-400 transition-colors duration-300 hover:bg-orange-800/40">
                      <i className="fa-solid fa-arrows-rotate mr-2"></i> Resetar Progresso
                    </button>
                    <button onClick={logout} className="mt-4 flex w-full items-center justify-center rounded-xl bg-red-500/10 py-3 px-4 text-lg font-bold text-red-500 transition-colors duration-300 hover:bg-red-500/20">
                      <i className="fa-solid fa-right-from-bracket mr-2"></i> Sair (Logoff)
                    </button>
                  </>
                )}
              </main>
          </div>
          <BottomNav activeScreen="perfil" onNavigate={(screen) => navigate(Screen[screen.charAt(0).toUpperCase() + screen.slice(1) as keyof typeof Screen])} />
          {isResetModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-opacity duration-300">
                <Card className="w-full max-w-sm text-center" border="gold">
                    <h2 className="font-header text-3xl text-red-500">Resetar Progresso?</h2>
                    <p className="my-4 text-[#a0a0a0]">
                        Todo o seu histórico de treinos, recordes e progresso serão <strong>apagados permanentemente</strong>.
                        <br/><br/>
                        Suas informações de perfil (nome, peso, etc.) serão mantidas.
                    </p>
                    <p className="mb-6 font-bold text-white">Esta ação não pode ser desfeita.</p>
                    <div className="flex gap-4">
                        <MainButton onClick={() => setIsResetModalOpen(false)} className="!bg-gray-600 !text-white flex-1">
                            <i className="fa-solid fa-times mr-2"></i>
                            Cancelar
                        </MainButton>
                        <MainButton onClick={handleResetConfirm} className="!bg-red-600 !text-white flex-1">
                            <i className="fa-solid fa-trash mr-2"></i>
                            Sim, Resetar
                        </MainButton>
                    </div>
                </Card>
            </div>
          )}
        </div>
    );
};

const ProgressoScreen: React.FC = () => {
    const { appState, navigate } = useApp();
    const { user, workoutHistory } = appState;
    const [selectedExercise, setSelectedExercise] = useState('');
    const [challenge, setChallenge] = useState('');
    const [isChallengeLoading, setIsChallengeLoading] = useState(false);

    useEffect(() => {
        const exercisesWithHistory = Object.keys(workoutHistory.evolution);
        if (exercisesWithHistory.length > 0 && !selectedExercise) {
            setSelectedExercise(exercisesWithHistory[0]);
        }

        const fetchChallenge = async () => {
          if (user) {
            setIsChallengeLoading(true);
            try {
              const newChallenge = await generateWeeklyChallenge(user, workoutHistory);
              setChallenge(newChallenge);
            } catch (error) {
              console.error("Failed to fetch challenge:", error);
              setChallenge("Complete todos os treinos da semana!"); // Fallback
            } finally {
              setIsChallengeLoading(false);
            }
          }
        };

        fetchChallenge();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, workoutHistory]);

    if (!user) return null;
    
    const getWeekNumber = (d: Date) => {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() ? d.getUTCDay() : 7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
        return `${d.getUTCFullYear()}-${weekNo}`;
    }
    
    const weekKey = getWeekNumber(new Date());
    const weeklyCalories = workoutHistory.weekly_calories?.[weekKey] || 0;
    const exercisesWithHistory = Object.keys(workoutHistory.evolution);

    return (
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow overflow-y-auto p-4 pb-28">
             <header className="mx-auto w-full max-w-lg pt-8 mb-8 text-center">
                  <h1 className="font-header text-5xl tracking-wider">Meu Progresso</h1>
                  <p className="text-[#a0a0a0]">Acompanhe sua evolução e supere seus limites.</p>
             </header>
              <main className="mx-auto max-w-lg space-y-6">
                 <Card>
                    <h2 className="font-header text-2xl mb-2 text-gold">Desafio da Semana</h2>
                    <div className="flex items-center gap-4">
                        <i className="fa-solid fa-wand-magic-sparkles text-4xl text-gold"></i>
                        <div>
                          {isChallengeLoading ? (
                            <p className="text-sm text-[#a0a0a0] animate-pulse">Gerando desafio personalizado...</p>
                          ) : (
                            <>
                              <p className="font-semibold">{challenge}</p>
                              <p className="text-sm text-[#a0a0a0]">Gerado pela IA Golden Coach.</p>
                            </>
                          )}
                        </div>
                    </div>
                </Card>
                <Card>
                    <h2 className="font-header text-2xl mb-4 text-gold">Resumo Geral</h2>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <StatCard icon="fa-dumbbell" value={workoutHistory.completed_workouts} label="Treinos Feitos" />
                        <StatCard icon="fa-trophy" value={Object.keys(workoutHistory.personal_records).length} label="Recordes Batidos" />
                        <StatCard icon="fa-fire-alt" value={weeklyCalories} label="Calorias da Semana" className="col-span-2" />
                    </div>
                </Card>
                 {exercisesWithHistory.length > 0 ? (
                    <Card>
                        <h2 className="font-header text-2xl mb-2 text-gold">Evolução de Carga</h2>
                        <FormSelect id="prog-exerciseSelector" value={selectedExercise} onChange={(e) => setSelectedExercise(e.target.value)} label="">
                            {exercisesWithHistory.map(ex => <option key={ex} value={ex}>{ex}</option>)}
                        </FormSelect>
                        {selectedExercise && workoutHistory.evolution[selectedExercise] && (
                            <ProgressChart data={workoutHistory.evolution[selectedExercise]} />
                        )}
                    </Card>
                ) : null}

                <Card>
                    <h2 className="font-header text-2xl mb-2 text-gold">Recordes Pessoais (PR)</h2>
                    {Object.keys(workoutHistory.personal_records).length > 0 ? (
                        <div className="grid grid-cols-1 gap-2">
                            {Object.entries(workoutHistory.personal_records).sort((a,b) => b[1] - a[1]).map(([ex, pr]) => (
                                <div key={ex} className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
                                    <div><p className="font-bold">{ex}</p></div>
                                    <p className="font-header text-3xl text-gold">{pr}<span className="font-sans text-lg"> kg</span></p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-4 text-center text-sm text-gray-500">Complete treinos para ver seus recordes aqui.</p>
                    )}
                </Card>
              </main>
          </div>
          <BottomNav activeScreen="progresso" onNavigate={(screen) => navigate(Screen[screen.charAt(0).toUpperCase() + screen.slice(1) as keyof typeof Screen])} />
        </div>
    );
};


// --- MAIN APP COMPONENT ---

function App() {
  const [appState, setAppState] = useState<AppState>(getInitialState);
  const [currentScreen, setCurrentScreen] = useState<Screen>(appState.user ? Screen.Dashboard : Screen.Cadastro);
  const [screenData, setScreenData] = useState<any>(null);

  useEffect(() => {
    localStorage.setItem("goldenFitState", JSON.stringify(appState));
  }, [appState]);

  const navigate = useCallback((screen: Screen, data: any = null) => {
    setCurrentScreen(screen);
    setScreenData(data);
    window.scrollTo(0, 0);
  }, []);

  const updateUser = (updatedUser: User) => {
    setAppState(prev => ({...prev, user: updatedUser}));
  }

  const logout = () => {
    localStorage.removeItem("goldenFitState");
    setAppState(getInitialState());
    navigate(Screen.Cadastro);
  }

  const resetProfile = () => {
    setAppState(prev => {
        if (!prev.user) return prev;
        return {
            ...prev,
            currentWorkout: null,
            workoutHistory: {
                personal_records: {},
                evolution: {},
                completed_workouts: 0,
                weekly_calories: {},
            },
        };
    });
    navigate(Screen.Dashboard);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Cadastro: return <CadastroScreen />;
      case Screen.Dashboard: return <DashboardScreen />;
      case Screen.Execucao: return <ExecucaoScreen />;
      case Screen.Resumo: return <ResumoScreen data={screenData} />;
      case Screen.Perfil: return <PerfilScreen />;
      case Screen.Progresso: return <ProgressoScreen />;
      default: return <CadastroScreen />;
    }
  };

  return (
    <AppContext.Provider value={{ appState, setAppState, navigate, updateUser, logout, resetProfile }}>
      <div className="bg-[#121212] min-h-screen text-[#f5f5f5]">
        {renderScreen()}
      </div>
    </AppContext.Provider>
  );
}

export default App;