
import { AllWorkouts } from './types';

export const NAV_ITEMS = [
  { id: 'dashboard', icon: 'fa-house', label: 'Início' },
  { id: 'progresso', icon: 'fa-chart-simple', label: 'Progresso' },
  { id: 'perfil', icon: 'fa-user', label: 'Perfil' },
];

export const DAY_NAMES = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

export const ALL_WORKOUTS: AllWorkouts = {
  "feminino": {
    "workouts": [
      {
        "day": "A",
        "name": "Posterior & Glúteos",
        "motivation": "Construa a base para a sua força.",
        "exercises": [
          {
            "name": "Aquecimento - Elíptico",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Mantenha um ritmo moderado para aquecer.",
            "gifUrl": "gifs/Elliptical Machine Walk.gif"
          },
          {
            "name": "Stiff com Barra",
            "sets": 4,
            "reps": "12",
            "rest": 60,
            "tip": "Mantenha a coluna reta, sinta o posterior.",
            "gifUrl": "gifs/Barbell Stiff Legged Deadlift.gif"
          },
          {
            "name": "Mesa Flexora",
            "sets": 4,
            "reps": "10",
            "rest": 60,
            "tip": "Controle a fase de volta do movimento.",
            "gifUrl": "gifs/Lying Leg Curl (machine).gif"
          },
          {
            "name": "Cadeira Abdutora",
            "sets": 4,
            "reps": "15",
            "rest": 45,
            "tip": "Incline o tronco para frente para focar no glúteo.",
            "gifUrl": "gifs/Lever Seated Hip Abduction.gif"
          },
          {
            "name": "Elevação Pélvica",
            "sets": 4,
            "reps": "12",
            "rest": 60,
            "tip": "Contraia o glúteo no topo do movimento.",
            "gifUrl": "gifs/Barbell Glute Bridge.gif"
          },
          {
            "name": "Panturrilha na Máquina",
            "sets": 4,
            "reps": "20",
            "rest": 45,
            "tip": "Alongue bem na parte de baixo.",
            "gifUrl": "gifs/Lever Seated Calf Raise.gif"
          },
          {
            "name": "Abdominal Supra",
            "sets": 3,
            "reps": "20",
            "rest": 45,
            "tip": "Concentre a força no abdômen, não no pescoço.",
            "gifUrl": "gifs/abdominal supra.gif"
          },
          {
            "name": "Cardio - Esteira HIIT",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Alterne 1 min de corrida com 1 min de caminhada.",
            "gifUrl": "gifs/cardio-esteira.gif"
          }
        ]
      },
      {
        "day": "B",
        "name": "Peito, Ombros & Tríceps",
        "motivation": "A força superior que te impulsiona.",
        "exercises": [
          {
            "name": "Aquecimento - Elíptico",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Mantenha um ritmo moderado para aquecer.",
            "gifUrl": "gifs/Elliptical Machine Walk.gif"
          },
          {
            "name": "Supino Inclinado com Halteres",
            "sets": 4,
            "reps": "12",
            "rest": 60,
            "tip": "Foque na parte superior do peitoral.",
            "gifUrl": "gifs/supino-inclinado-com-halteres.gif"
          },
          {
            "name": "Crucifixo na Máquina",
            "sets": 4,
            "reps": "15",
            "rest": 45,
            "tip": "Sinta o peitoral se alongar e contrair.",
            "gifUrl": "gifs/Pec Deck Fly.gif"
          },
          {
            "name": "Elevação Lateral",
            "sets": 4,
            "reps": "15",
            "rest": 45,
            "tip": "Não ultrapasse a linha dos ombros.",
            "gifUrl": "gifs/Dumbbell Lateral Raise.gif"
          },
          {
            "name": "Desenvolvimento Máquina",
            "sets": 3,
            "reps": "12",
            "rest": 60,
            "tip": "Mantenha os cotovelos levemente à frente do corpo.",
            "gifUrl": "gifs/Desenvolvimento Maquina.gif"
          },
          {
            "name": "Tríceps Corda",
            "sets": 4,
            "reps": "12",
            "rest": 45,
            "tip": "Afaste as mãos no final do movimento.",
            "gifUrl": "gifs/triceps-pulley-com-corda.gif"
          },
          {
            "name": "Prancha",
            "sets": 3,
            "reps": "1 min",
            "rest": 60,
            "tip": "Mantenha o corpo como uma linha reta.",
            "gifUrl": "gifs/prancha-com-apoio-no-antebraco.gif"
          },
          {
            "name": "Cardio - Esteira HIIT",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Alterne 1 min de corrida com 1 min de caminhada.",
            "gifUrl": "gifs/cardio-esteira.gif"
          }
        ]
      },
      {
        "day": "C",
        "name": "Quadríceps & Glúteos",
        "motivation": "Supere seus limites a cada agachamento.",
        "exercises": [
          {
            "name": "Aquecimento - Elíptico",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Mantenha um ritmo moderado para aquecer.",
            "gifUrl": "gifs/Elliptical Machine Walk.gif"
          },
          {
            "name": "Agachamento Livre",
            "sets": 4,
            "reps": "12",
            "rest": 60,
            "tip": "Mantenha a coluna ereta e desça até 90 graus.",
            "gifUrl": "gifs/agachamento-com-barra.gif"
          },
          {
            "name": "Leg Press 45°",
            "sets": 4,
            "reps": "10",
            "rest": 60,
            "tip": "Posicione os pés mais altos para focar quadríceps.",
            "gifUrl": "gifs/Lever Leg Press (machine).gif"
          },
          {
            "name": "Cadeira Extensora",
            "sets": 3,
            "reps": "15",
            "rest": 45,
            "tip": "Segure 1 segundo no pico da contração.",
            "gifUrl": "gifs/Cadeira-extensora.gif"
          },
          {
            "name": "Afundo com Halteres",
            "sets": 3,
            "reps": "12",
            "rest": 60,
            "tip": "Dê um passo largo e desça o joelho de trás.",
            "gifUrl": "gifs/Dumbbell Lunge.gif"
          },
          {
            "name": "Glúteo na Polia",
            "sets": 4,
            "reps": "15",
            "rest": 45,
            "tip": "Concentre a força para levantar a perna.",
            "gifUrl": "gifs/coice-com-polia-no-cross.gif"
          },
          {
            "name": "Panturrilha Sentada",
            "sets": 4,
            "reps": "20",
            "rest": 45,
            "tip": "Alongue bem na parte de baixo.",
            "gifUrl": "gifs/Lever Seated Calf Raise.gif"
          },
          {
            "name": "Abdominal Infra",
            "sets": 3,
            "reps": "20",
            "rest": 45,
            "tip": "Tire o quadril do chão com a força do abdômen.",
            "gifUrl": "gifs/abdominal-infra.gif"
          },
          {
            "name": "Cardio - Esteira HIIT",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Alterne 1 min de corrida com 1 min de caminhada.",
            "gifUrl": "gifs/cardio-esteira.gif"
          }
        ]
      },
      {
        "day": "D",
        "name": "Dorsal & Bíceps",
        "motivation": "A disciplina é a ponte entre metas e realizações.",
        "exercises": [
          {
            "name": "Aquecimento - Elíptico",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Mantenha um ritmo moderado para aquecer.",
            "gifUrl": "gifs/Elliptical Machine Walk.gif"
          },
          {
            "name": "Puxada Frontal",
            "sets": 4,
            "reps": "12",
            "rest": 60,
            "tip": "Estufe o peito e puxe a barra em direção a ele.",
            "gifUrl": "gifs/puxada-vertical-com-pegada-aberta-no-pulley.gif"
          },
          {
            "name": "Remada Curvada",
            "sets": 4,
            "reps": "10",
            "rest": 60,
            "tip": "Puxe com as costas, não com os braços.",
            "gifUrl": "gifs/remada-curvada.gif"
          },
          {
            "name": "Remada Baixa",
            "sets": 3,
            "reps": "12",
            "rest": 60,
            "tip": "Mantenha a postura e puxe os cotovelos para trás.",
            "gifUrl": "gifs/remada-baixa-com-triangulo.gif"
          },
          {
            "name": "Pulldown na Polia",
            "sets": 3,
            "reps": "15",
            "rest": 45,
            "tip": "Mantenha os braços estendidos e puxe com as costas.",
            "gifUrl": "gifs/pulldown.gif"
          },
          {
            "name": "Crucifixo Invertido Máquina",
            "sets": 3,
            "reps": "15",
            "rest": 45,
            "tip": "Foque na parte de trás dos ombros.",
            "gifUrl": "gifs/crucifixo-invertido-na-maquina.gif"
          },
          {
            "name": "Rosca Direta com Barra",
            "sets": 4,
            "reps": "12",
            "rest": 60,
            "tip": "Não balance o corpo para levantar o peso.",
            "gifUrl": "gifs/rosca-direta-com-barra.gif"
          },
          {
            "name": "Prancha",
            "sets": 3,
            "reps": "1 min",
            "rest": 60,
            "tip": "Mantenha o corpo como uma linha reta.",
            "gifUrl": "gifs/prancha-com-apoio-no-antebraco.gif"
          },
          {
            "name": "Cardio - Esteira HIIT",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Alterne 1 min de corrida com 1 min de caminhada.",
            "gifUrl": "gifs/cardio-esteira.gif"
          }
        ]
      },
      {
        "day": "E",
        "name": "Foco: Glúteos & Posterior",
        "motivation": "Finalizando a semana com foco total.",
        "exercises": [
          {
            "name": "Aquecimento - Elíptico",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Mantenha um ritmo moderado para aquecer.",
            "gifUrl": "gifs/Elliptical Machine Walk.gif"
          },
          {
            "name": "Levantamento Terra Sumô",
            "sets": 4,
            "reps": "10",
            "rest": 75,
            "tip": "Mantenha a barra próxima ao corpo.",
            "gifUrl": "gifs/agachamento-sumo.gif"
          },
          {
            "name": "Stiff com Halteres",
            "sets": 4,
            "reps": "12",
            "rest": 60,
            "tip": "Sinta o posterior da coxa alongar.",
            "gifUrl": "gifs/Dumbbell Stiff Leg Deadlift.gif"
          },
          {
            "name": "Mesa Flexora",
            "sets": 3,
            "reps": "15",
            "rest": 45,
            "tip": "Controle a fase de volta do movimento.",
            "gifUrl": "gifs/Lying Leg Curl (machine).gif"
          },
          {
            "name": "Elevação Pélvica na Máquina",
            "sets": 4,
            "reps": "12",
            "rest": 60,
            "tip": "Contraia o glúteo no topo.",
            "gifUrl": "gifs/Lever Hip Thrust (machine).gif"
          },
          {
            "name": "Glúteo 4 Apoios com Caneleira",
            "sets": 3,
            "reps": "15",
            "rest": 45,
            "tip": "Mantenha o abdômen contraído para não forçar a lombar.",
            "gifUrl": "gifs/extensao-de-quadril-com-perna-flexionada.gif"
          },
          {
            "name": "Panturrilha na Máquina",
            "sets": 4,
            "reps": "20",
            "rest": 45,
            "tip": "Amplitude máxima no movimento.",
            "gifUrl": "gifs/Lever Seated Calf Raise.gif"
          },
          {
            "name": "Abdominal Remador",
            "sets": 3,
            "reps": "20",
            "rest": 45,
            "tip": "Movimento completo, alongando e contraindo.",
            "gifUrl": "gifs/abdominal-remador.gif"
          },
          {
            "name": "Cardio - Esteira HIIT",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Alterne 1 min de corrida com 1 min de caminhada.",
            "gifUrl": "gifs/cardio-esteira.gif"
          }
        ]
      }
    ]
  },
  "masculino": {
    "workouts": [
      {
        "day": "A",
        "name": "Pernas: Foco Posterior",
        "motivation": "Pernas fortes, base sólida.",
        "exercises": [
          {
            "name": "Aquecimento - Elíptico",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Mantenha um ritmo moderado para aquecer.",
            "gifUrl": "gifs/Elliptical Machine Walk.gif"
          },
          {
            "name": "Stiff com Barra",
            "sets": 4,
            "reps": "10",
            "rest": 60,
            "tip": "Mantenha a coluna reta, sinta o posterior.",
            "gifUrl": "gifs/Barbell Stiff Legged Deadlift.gif"
          },
          {
            "name": "Mesa Flexora",
            "sets": 4,
            "reps": "12",
            "rest": 60,
            "tip": "Controle a fase de volta do movimento.",
            "gifUrl": "gifs/Lying Leg Curl (machine).gif"
          },
          {
            "name": "Flexora em Pé",
            "sets": 3,
            "reps": "15",
            "rest": 45,
            "tip": "Concentre em uma perna de cada vez.",
            "gifUrl": "gifs/Standing single leg curl.gif"
          },
          {
            "name": "Cadeira Extensora",
            "sets": 4,
            "reps": "12",
            "rest": 45,
            "tip": "Segure 1 segundo no pico da contração.",
            "gifUrl": "gifs/Cadeira-extensora.gif"
          },
          {
            "name": "Leg Press 45°",
            "sets": 4,
            "reps": "10",
            "rest": 75,
            "tip": "Mantenha os calcanhares sempre apoiados.",
            "gifUrl": "gifs/Lever Leg Press (machine).gif"
          },
          {
            "name": "Panturrilha na Máquina",
            "sets": 4,
            "reps": "15",
            "rest": 45,
            "tip": "Amplitude máxima no movimento.",
            "gifUrl": "gifs/Lever Seated Calf Raise.gif"
          },
          {
            "name": "Abdominal na Máquina",
            "sets": 4,
            "reps": "15",
            "rest": 45,
            "tip": "Use a força do abdômen, não do tronco.",
            "gifUrl": "gifs/abdominal-na-maquina.gif"
          },
          {
            "name": "Cardio - Esteira HIIT",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Alterne 1 min de corrida com 1 min de caminhada.",
            "gifUrl": "gifs/cardio-esteira.gif"
          }
        ]
      },
      {
        "day": "B",
        "name": "Peito, Ombros & Tríceps",
        "motivation": "Construa um físico imponente.",
        "exercises": [
          {
            "name": "Aquecimento - Elíptico",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Mantenha um ritmo moderado para aquecer.",
            "gifUrl": "gifs/Elliptical Machine Walk.gif"
          },
          {
            "name": "Supino Reto com Halteres",
            "sets": 4,
            "reps": "8-10",
            "rest": 75,
            "tip": "Desça os halteres até a linha do peito.",
            "gifUrl": "gifs/supino-reto-com-halteres.gif"
          },
          {
            "name": "Supino Inclinado Halter",
            "sets": 4,
            "reps": "10",
            "rest": 60,
            "tip": "Foque na parte superior do peito.",
            "gifUrl": "gifs/supino-inclinado-com-halteres.gif"
          },
          {
            "name": "Crucifixo Inclinado",
            "sets": 3,
            "reps": "12",
            "rest": 45,
            "tip": "Alongue bem o peitoral na descida.",
            "gifUrl": "gifs/crucifixo-inclinado-com-halteres.gif"
          },
          {
            "name": "Desenvolvimento com Halteres",
            "sets": 4,
            "reps": "10",
            "rest": 75,
            "tip": "Não deixe os halteres se tocarem no topo.",
            "gifUrl": "gifs/desenvolvimento-com-halteres.gif"
          },
          {
            "name": "Elevação Lateral",
            "sets": 3,
            "reps": "15",
            "rest": 45,
            "tip": "Não balance o corpo.",
            "gifUrl": "gifs/Dumbbell Lateral Raise.gif"
          },
          {
            "name": "Tríceps Testa",
            "sets": 4,
            "reps": "12",
            "rest": 60,
            "tip": "Mantenha os cotovelos parados.",
            "gifUrl": "gifs/Dumbbell Skull Crusher.gif"
          },
          {
            "name": "Tríceps Corda",
            "sets": 3,
            "reps": "15",
            "rest": 45,
            "tip": "Afaste as mãos no final do movimento.",
            "gifUrl": "gifs/triceps-pulley-com-corda.gif"
          },
          {
            "name": "Prancha",
            "sets": 3,
            "reps": "1 min",
            "rest": 60,
            "tip": "Mantenha o corpo como uma linha reta.",
            "gifUrl": "gifs/prancha-com-apoio-no-antebraco.gif"
          },
          {
            "name": "Cardio - Esteira HIIT",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Alterne 1 min de corrida com 1 min de caminhada.",
            "gifUrl": "gifs/cardio-esteira.gif"
          }
        ]
      },
      {
        "day": "C",
        "name": "Pernas: Foco Quadríceps",
        "motivation": "Hoje é dia de perna. Sem desculpas.",
        "exercises": [
          {
            "name": "Aquecimento - Elíptico",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Mantenha um ritmo moderado para aquecer.",
            "gifUrl": "gifs/Elliptical Machine Walk.gif"
          },
          {
            "name": "Agachamento Livre",
            "sets": 4,
            "reps": "10",
            "rest": 75,
            "tip": "Profundidade é mais importante que carga.",
            "gifUrl": "gifs/agachamento-com-barra.gif"
          },
          {
            "name": "Leg Press 45°",
            "sets": 4,
            "reps": "12",
            "rest": 60,
            "tip": "Mantenha os calcanhares sempre apoiados.",
            "gifUrl": "gifs/Lever Leg Press (machine).gif"
          },
          {
            "name": "Afundo no Smith",
            "sets": 3,
            "reps": "12",
            "rest": 60,
            "tip": "Foque na perna da frente para subir.",
            "gifUrl": "gifs/agachamento-no-smith.gif"
          },
          {
            "name": "Stiff",
            "sets": 4,
            "reps": "10",
            "rest": 60,
            "tip": "Sinta o posterior da coxa alongar.",
            "gifUrl": "gifs/Barbell Stiff Legged Deadlift.gif"
          },
          {
            "name": "Mesa Flexora",
            "sets": 3,
            "reps": "15",
            "rest": 45,
            "tip": "Controle a fase de volta do movimento.",
            "gifUrl": "gifs/Lying Leg Curl (machine).gif"
          },
          {
            "name": "Panturrilha Sentada",
            "sets": 4,
            "reps": "15",
            "rest": 45,
            "tip": "Amplitude máxima no movimento.",
            "gifUrl": "gifs/Lever Seated Calf Raise.gif"
          },
          {
            "name": "Abdominal Infra",
            "sets": 4,
            "reps": "15",
            "rest": 45,
            "tip": "Tire o quadril do chão com a força do abdômen.",
            "gifUrl": "gifs/abdominal-infra.gif"
          },
          {
            "name": "Cardio - Esteira HIIT",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Alterne 1 min de corrida com 1 min de caminhada.",
            "gifUrl": "gifs/cardio-esteira.gif"
          }
        ]
      },
      {
        "day": "D",
        "name": "Dorsal & Bíceps",
        "motivation": "Costas largas, problemas pequenos.",
        "exercises": [
          {
            "name": "Aquecimento - Elíptico",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Mantenha um ritmo moderado para aquecer.",
            "gifUrl": "gifs/Elliptical Machine Walk.gif"
          },
          {
            "name": "Barra Fixa",
            "sets": 4,
            "reps": "Máximo",
            "rest": 75,
            "tip": "Use o graviton se precisar de ajuda.",
            "gifUrl": "gifs/barra-fixa.gif"
          },
          {
            "name": "Remada Curvada",
            "sets": 4,
            "reps": "10",
            "rest": 60,
            "tip": "Puxe com as costas, não com os braços.",
            "gifUrl": "gifs/remada-curvada.gif"
          },
          {
            "name": "Puxada Frontal",
            "sets": 3,
            "reps": "12",
            "rest": 60,
            "tip": "Estufe o peito e puxe a barra em direção a ele.",
            "gifUrl": "gifs/puxada-vertical-com-pegada-aberta-no-pulley.gif"
          },
          {
            "name": "Serrote com Halter",
            "sets": 3,
            "reps": "12",
            "rest": 45,
            "tip": "Puxe o peso em direção ao quadril.",
            "gifUrl": "gifs/remada-serrote-com-halteres-e-apoio-no-banco.gif"
          },
          {
            "name": "Pulldown na Polia",
            "sets": 3,
            "reps": "15",
            "rest": 45,
            "tip": "Mantenha os braços estendidos e puxe com as costas.",
            "gifUrl": "gifs/pulldown.gif"
          },
          {
            "name": "Rosca Scott",
            "sets": 4,
            "reps": "12",
            "rest": 60,
            "tip": "Isola o bíceps, não descanse o braço embaixo.",
            "gifUrl": "gifs/rosca-scott-com-barra.gif"
          },
          {
            "name": "Rosca Martelo",
            "sets": 3,
            "reps": "12",
            "rest": 45,
            "tip": "Foque no antebraço e braquial.",
            "gifUrl": "gifs/rosca-martelo.gif"
          },
          {
            "name": "Prancha",
            "sets": 3,
            "reps": "1 min",
            "rest": 60,
            "tip": "Mantenha o corpo como uma linha reta.",
            "gifUrl": "gifs/prancha-com-apoio-no-antebraco.gif"
          },
          {
            "name": "Cardio - Esteira HIIT",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Alterne 1 min de corrida com 1 min de caminhada.",
            "gifUrl": "gifs/cardio-esteira.gif"
          }
        ]
      },
      {
        "day": "E",
        "name": "Pernas: Ênfase Total",
        "motivation": "O corpo alcança o que a mente acredita.",
        "exercises": [
          {
            "name": "Aquecimento - Elíptico",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Mantenha um ritmo moderado para aquecer.",
            "gifUrl": "gifs/Elliptical Machine Walk.gif"
          },
          {
            "name": "Cadeira Flexora",
            "sets": 4,
            "reps": "12",
            "rest": 60,
            "tip": "Concentre na contração do posterior.",
            "gifUrl": "gifs/Lever Seated Leg Curl.gif"
          },
          {
            "name": "Stiff com Halteres",
            "sets": 4,
            "reps": "12",
            "rest": 60,
            "tip": "Sinta o posterior da coxa alongar.",
            "gifUrl": "gifs/Dumbbell Stiff Leg Deadlift.gif"
          },
          {
            "name": "Mesa Flexora",
            "sets": 3,
            "reps": "15",
            "rest": 45,
            "tip": "Controle a fase de volta do movimento.",
            "gifUrl": "gifs/Lying Leg Curl (machine).gif"
          },
          {
            "name": "Agachamento Hack",
            "sets": 4,
            "reps": "10",
            "rest": 75,
            "tip": "Mantenha os pés firmes na plataforma.",
            "gifUrl": "gifs/agachamento-hack.gif"
          },
          {
            "name": "Agachamento Sumô com Halter",
            "sets": 3,
            "reps": "15",
            "rest": 45,
            "tip": "Mantenha os pés bem afastados e apontados para fora.",
            "gifUrl": "gifs/agachamento-sumo.gif"
          },
          {
            "name": "Panturrilha Sentada",
            "sets": 4,
            "reps": "20",
            "rest": 45,
            "tip": "Amplitude máxima no movimento.",
            "gifUrl": "gifs/Lever Seated Calf Raise.gif"
          },
          {
            "name": "Abdominal Elevação de Pernas",
            "sets": 4,
            "reps": "15",
            "rest": 45,
            "tip": "Não deixe os pés tocarem o chão.",
            "gifUrl": "gifs/abdominal-infra.gif"
          },
          {
            "name": "Cardio - Esteira HIIT",
            "sets": 1,
            "reps": "10 min",
            "rest": 0,
            "tip": "Alterne 1 min de corrida com 1 min de caminhada.",
            "gifUrl": "gifs/cardio-esteira.gif"
          }
        ]
      }
    ]
  }
};
