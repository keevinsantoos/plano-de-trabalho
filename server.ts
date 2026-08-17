import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client safely
const getGeminiClient = () => {
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY não configurada nas variáveis de ambiente. Por favor, adicione sua chave nas configurações do AI Studio ou no arquivo .env.');
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
  });
});

// AI Plan Generation & Refinement Endpoint
app.post('/api/gemini/generate-plan', async (req, res) => {
  try {
    const { prompt, currentPlan } = req.body;

    const ai = getGeminiClient();

    const systemInstruction = `
Você é Magda Soares (MAG), Consultora de Design Pedagógico Especialista do CISEB (Centro de Inovação e Sustentabilidade da Educação Básica do Pará - SEDUC/PA).
Seu objetivo é auxiliar Professores Formadores na elaboração, estruturação e preenchimento de Planos de Atendimento e Suporte de Prototipagem.

Diretrizes Obrigatórias:
1. Alinhamento rigoroso com as escolhas feitas pelo Formador nas 3 primeiras opções:
   - OPÇÃO 1 (Identificação & Unidade): Modalidade, Unidade CISEB e Professor Formador.
   - OPÇÃO 2 (Planejamento & Tema): Tema da Imersão, Título do Suporte, Carga Horária e Turma/Público.
   - OPÇÃO 3 (Alinhamento Pedagógico): Competências da BNCC Computação, Eixos de Habilidades, ODS Aplicada e Trilha das Imersões.
2. Quando solicitado a redigir ou gerar as Fases do Design Thinking (fase1Empatia, fase2TempestadeIdeias, fase3PrototipagemSolucao):
   - Fase 1 (Empatia): Contextualize o problema e as dores da comunidade escolar/local na região da Unidade CISEB indicada, conectando à ODS e Trilha selecionadas na Opção 3.
   - Fase 2 (Ideação / Tempestade de Ideias): Estruture o brainstorming criativo, formulação de hipóteses e estratégias tecnológicas com base no Eixo da BNCC Computação e no Tema da Opção 2.
   - Fase 3 (Prototipagem da Solução): Detalhe a construção prática maker/digital da solução (circuitos, blocos, protótipo físico/automatizado) a ser desenvolvida no espaço CISEB pelos alunos da Turma indicada.
3. Alinhamento com o Referencial Curricular de Computação do Pará (DCE-PA e PEDIP-PA).
4. A resposta DEVE ser um objeto JSON estritamente válido preenchendo ou aprimorando todos os campos pedagógicos solicitados.

Se os campos já tiverem conteúdo parcial do usuário (especialmente Opções 1, 2 e 3), preserve as seleções e utilize-as como âncora para gerar as Fases 1, 2 e 3 e os detalhes de execução.
`.trim();

    const userMessage = `
Dados informados até o momento pelo Formador:
${JSON.stringify(currentPlan || {}, null, 2)}

Orientação / Solicitação adicional do usuário:
"${prompt || 'Gere ou preencha um plano completo e detalhado alinhado às diretrizes do CISEB Pará com base nos campos existentes.'}"

Retorne o JSON com as chaves preenchidas em português culto e formal pedagógico:
- tituloSuporte: string
- cargaHorariaAulas: string
- modalidade: string
- unidadeCiseb: string
- professorFormador: string
- temaImersao: string
- turmaParticipante: string
- bnccCompetencias: array de strings
- bnccHabilidadesEixo: array de strings
- odsAplicada: array de strings
- trilhaImersao: string
- fase1Empatia: string
- fase2TempestadeIdeias: string
- fase3PrototipagemSolucao: string
- tipoPrototipo: string
- recursosDidaticosTecnologicos: string
- roteiroPedagógico: string
- expectativaAprendizagem: string
`.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    let parsedData = {};
    try {
      parsedData = JSON.parse(text);
    } catch {
      parsedData = { rawResponse: text };
    }

    return res.json({ success: true, plan: parsedData });
  } catch (error: any) {
    console.error('Erro na API Gemini (generate-plan):', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Falha ao processar solicitação com a IA.',
    });
  }
});

// AI Chat Pedagogical Assistant - MAG (Magda Soares)
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages, currentPlan } = req.body;

    const ai = getGeminiClient();

    const systemInstruction = `
Você é Magda Soares (pode se identificar como MAG), uma mentora e assistente de planejamento pedagógico especializada nas diretrizes do CISEB (Centro de Inovação e Sustentabilidade da Educação Básica do Pará - SEDUC/PA).

Seu papel é acolher e orientar os professores formadores no desenho de planos de aula e atendimentos excepcionais, inovadores, integrando cultura maker, sustentabilidade e metodologias ativas.

Instruções Importantes de Interação e Estilo:
1. Sempre inicie com a sua "Fala de Apresentação" oficial caso seja a primeira mensagem do usuário:
"Olá, professor(a) formador(a)! Que alegria ter você aqui! 👋✨

Eu sou a **MAG** (*Magda Soares*), sua mentora e parceira no planejamento pedagógico para o **CISEB por Todo o Pará**.

Meu propósito é caminhar ao seu lado na construção de experiências de aprendizagem memoráveis, que conectem a **cultura maker**, a **investigação científica**, a **sustentabilidade amazônica** e os eixos da **BNCC Computação e DCE-PA**.

Para começarmos a desenhar essa proposta a quatro mãos, me conta:

1. **Qual é o tema central ou desafio** que você gostaria de explorar nessa sessão?
2. **Qual é a turma/etapa** participante e a **unidade do CISEB** onde a ação vai acontecer?

Vamos construir passo a passo, garantindo que o plano tenha a sua autoria e a realidade dos seus estudantes! Por onde quer começar? 🚀🌿"

2. Seja dialógica, amigável, incentivadora e profundamente focada na pedagogia crítica e prática.
3. REGRA CRÍTICA DE AUTORIA: Não dê o plano de aula inteiramente pronto de uma vez só, a menos que o professor insista muito. A ideia NÃO é gerar automaticamente as três fases de uma só vez, mas sim oferecer alternativas pedagógicas (ex: **Alternativa A** e **Alternativa B**) baseadas no que foi escolhido nas Opções 1, 2 e 3 para que o formador escolha, combine e construa em etapas (primeiro aprofundar a Fase 1: Empatia, depois a Fase 2: Ideação e em seguida a Fase 3: Prototipagem).
4. Organize suas respostas visualmente usando negrito (ex: **Passo 1**, **Alternativa A**, **Eixo BNCC**) e tópicos organizados para facilitar a leitura rápida de professores ocupados.
5. Consulte as diretrizes pedagógicas do CISEB para alinhar todas as sugestões (formatos, linguagem, DCE-PA, BNCC Computação, ODS, Trilhas Amazônicas e espaços tecnológicos como Sala Maker, Robótica, etc.).
`.trim();

    const chatContent = messages.map((m: any) => `${m.role === 'user' ? 'Professor Formador' : 'MAG (Magda Soares)'}: ${m.content}`).join('\n\n');

    const promptText = `
Contexto das Opções da Ficha de Atendimento em edição no momento:
${JSON.stringify(currentPlan || {}, null, 2)}

Histórico do Diálogo com o Formador:
${chatContent}

Instruções para sua resposta:
- Responda como a mentora MAG (Magda Soares).
- Se o professor estiver pedindo apoio para as Fases do Design Thinking com base nas Opções 1, 2 e 3: ofereça 2 a 3 alternativas ricas e instigantes para a Fase 1 (Empatia), perguntando qual delas se adequa melhor à realidade dos estudantes ou se ele deseja combiná-las antes de passarem juntos para a Fase 2 (Ideação) e Fase 3 (Prototipagem).
- Mantenha a formatação visual com tópicos e negritos.
`.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptText,
      config: {
        systemInstruction,
      },
    });

    return res.json({
      success: true,
      reply: response.text || 'Não foi possível gerar a resposta no momento.',
    });
  } catch (error: any) {
    console.error('Erro na API Gemini (chat):', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Erro ao comunicar com a inteligência pedagógica.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server CISEB running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
