
import { GoogleGenAI } from "@google/genai";
import { User, WorkoutHistory } from '../types';

const MODEL_NAME = 'gemini-2.5-flash';

// This is a placeholder for the API key. 
// In a real production environment, this should be handled securely.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will be mocked.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const generateWeeklyChallenge = async (user: User, history: WorkoutHistory): Promise<string> => {
  const fallbackChallenge = `Complete todos os seus treinos esta semana e concentre-se na forma!`;

  if (!ai) {
    return fallbackChallenge;
  }
  
  const totalPrs = Object.keys(history.personal_records).length;
  
  const prompt = `
    Você é um coach de fitness motivacional chamado Golden Coach.
    Com base no perfil do usuário, gere um desafio de fitness semanal curto, empolgante e específico em português do Brasil.
    O desafio deve ser uma única frase concisa e inspiradora.

    Perfil do Usuário:
    - Objetivo: ${user.objective}
    - Gênero: ${user.gender}
    - Total de Recordes Pessoais: ${totalPrs}

    Exemplos de desafios:
    - "Supere seu recorde pessoal no Agachamento em 2.5kg esta semana!"
    - "Complete todos os 5 treinos agendados sem pular uma única série."
    - "Aumente a carga em todos os exercícios de peito nesta semana."

    Agora, crie um novo desafio para este usuário.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 100,
        thinkingConfig: { thinkingBudget: 0 }
      },
    });
    const text = response.text.trim();
    return text || fallbackChallenge;
  } catch (error) {
    console.error("Error generating challenge with Gemini:", error);
    return fallbackChallenge; // Return a fallback on error
  }
};
