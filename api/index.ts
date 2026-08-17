import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();

app.use(express.json({ limit: '10mb' }));

const getGeminiClient = () => {
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY não configurada nas variáveis de ambiente.');
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

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
  });
});

app.post('/api/gemini/generate-plan', async (req, res) => {
  try {
    const { prompt, currentPlan } = req.body;

    const ai = getGeminiClient();

    const systemInstruction = `
Você é Magda Soares (MAG), Consultora de Design Pedagógico Especialista do CISEB (Centro de Inovação e Sustentabilidade da Educação Básica do Pará - SEDUC/PA).
Seu objetivo é auxiliar Professores Formadores na elaboração, estruturação e preenchimento de Planos de Atendimento e Suporte de Prototipagem.
    `.trim();

    const userMessage = `
Dados informados até o momento pelo Formador:
${JSON.stringify(currentPlan || {}, null, 2)}

Orientação / Solicitação adicional do usuário:
"${prompt || 'Gere ou preencha um plano completo e detalhado alinhado às diretrizes do CISEB Pará com base nos campos existentes.'}"
    `.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tituloSuporte: { type: Type.STRING },
            cargaHorariaAulas: { type: Type.STRING },
            modalidade: { type: Type.STRING },
            unidadeCiseb: { type: Type.STRING },
            professorFormador: { type: Type.STRING },
            temaImersao: { type: Type.STRING },
            turmaParticipante: { type: Type.STRING },
            bnccCompetencias: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            bnccHabilidadesEixo: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            odsAplicada: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            trilhaImersao: { type: Type.STRING },
            fase1Empatia: { type: Type.STRING },
            fase2TempestadeIdeias: { type: Type.STRING },
            fase3PrototipagemSolucao: { type: Type.STRING },
            tipoPrototipo: { type: Type.STRING },
            recursosDidaticosTecnologicos: { type: Type.STRING },
            roteiroPedagógico: { type: Type.STRING },
            expectativaAprendizagem: { type: Type.STRING },
          },
          required: [
            'tituloSuporte',
            'fase1Empatia',
            'fase2TempestadeIdeias',
            'fase3PrototipagemSolucao',
            'roteiroPedagógico',
          ],
        },
      },
    });

    const jsonText = response.text || '{}';
    const parsedData = JSON.parse(jsonText);

    return res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Erro na API Gemini (generate-plan):', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Erro ao gerar o plano de suporte pedagógico com IA.',
    });
  }
});

app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages, currentPlan } = req.body;

    const ai = getGeminiClient();

    const systemInstruction = `
Você é Magda Soares (MAG), Consultora de Design Pedagógico Especialista do CISEB (Centro de Inovação e Sustentabilidade da Educação Básica do Pará - SEDUC/PA).
Responda de forma clara, acolhedora, objetiva e pedagógica aos Professores Formadores.
    `.trim();

    const conversationContext = messages
      ?.map((m: { role: string; content: string }) => `${m.role === 'user' ? 'Formador(a)' : 'MAG'}: ${m.content}`)
      .join('\n\n') || '';

    const finalPrompt = `
[CONTEXTO DO PLANO ATUAL DO CISEB]
${JSON.stringify(currentPlan || {}, null, 2)}

[HISTÓRICO DA CONVERSA]
${conversationContext}
    `.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: finalPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
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

export default app;
