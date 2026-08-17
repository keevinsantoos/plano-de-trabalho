import React, { useState, useEffect } from 'react';
import {
  CisebSessionPlan,
  MODALIDADES_OPTIONS,
  UNIDADES_CISEB_OPTIONS,
  PROFESSORES_FORMADORES_OPTIONS,
  TEMAS_IMERSAO_OPTIONS,
} from './types';
import { Header } from './components/Header';
import { SessionForm } from './components/SessionForm';
import { ReportView } from './components/ReportView';
import { AiCopilotDrawer } from './components/AiCopilotDrawer';
import { CurriculumGuideModal } from './components/CurriculumGuideModal';
import { HistoryDrawer } from './components/HistoryDrawer';

const LOCAL_STORAGE_KEY = 'ciseb_saved_plans_v1';

const createEmptyPlan = (): CisebSessionPlan => ({
  id: Date.now().toString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  modalidade: '',
  unidadeCiseb: '',
  professorFormador: '',
  temaImersao: '',
  tituloSuporte: '',
  cargaHorariaAulas: '',
  turmaParticipante: '',
  bnccCompetencias: [],
  bnccHabilidadesEixo: [],
  odsAplicada: [],
  trilhaImersao: '',
  fase1Empatia: '',
  fase2TempestadeIdeias: '',
  fase3PrototipagemSolucao: '',
  tipoPrototipo: '',
  recursosDidaticosTecnologicos: '',
  roteiroPedagógico: '',
  expectativaAprendizagem: '',
});

export default function App() {
  const [currentPlan, setCurrentPlan] = useState<CisebSessionPlan>(createEmptyPlan());
  const [savedPlans, setSavedPlans] = useState<CisebSessionPlan[]>([]);
  const [activeView, setActiveView] = useState<'edit' | 'report'>('edit');

  // Modals & Drawers state
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Load saved plans from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedPlans(parsed);
        }
      }
    } catch (e) {
      console.error('Erro ao ler historico local:', e);
    }
  }, []);

  // Save current plan to localStorage
  const handleSavePlan = () => {
    const updatedPlan = {
      ...currentPlan,
      updatedAt: new Date().toISOString(),
    };
    setCurrentPlan(updatedPlan);

    setSavedPlans((prev) => {
      const index = prev.findIndex((p) => p.id === updatedPlan.id);
      let updatedList: CisebSessionPlan[];
      if (index >= 0) {
        updatedList = [...prev];
        updatedList[index] = updatedPlan;
      } else {
        updatedList = [updatedPlan, ...prev];
      }
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
      } catch (e) {
        console.error('Erro ao salvar no localStorage:', e);
      }
      return updatedList;
    });
  };

  const handleNewPlan = () => {
    setCurrentPlan(createEmptyPlan());
    setActiveView('edit');
  };

  const handleDeletePlan = (planId: string) => {
    setSavedPlans((prev) => {
      const updated = prev.filter((p) => p.id !== planId);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleImportPlans = (imported: CisebSessionPlan[]) => {
    setSavedPlans((prev) => {
      const merged = [...imported, ...prev];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
      return merged;
    });
    if (imported.length > 0) {
      setCurrentPlan(imported[0]);
    }
  };

  // AI Auto-Fill / Refinement Trigger
  const handleAiAutoFillSection = async (sectionKey: string) => {
    setIsAiLoading(true);
    let prompt = '';

    if (sectionKey === 'all') {
      prompt = 'Completar ou enriquecer com alto rigor pedagógico todos os campos em branco deste plano de atendimento, articulando Design Thinking, Cultura Maker e BNCC Computação.';
    } else if (sectionKey === 'pedagogical') {
      prompt = 'Sugerir as competências BNCC Computação, Eixos, ODS aplicada e Trilha de Imersão mais adequados ao título e tema informados.';
    } else if (sectionKey === 'designThinking') {
      prompt = 'Redigir detalhadamente as três fases de Design Thinking (Fase 1 Empatia, Fase 2 Tempestade de Ideias e Fase 3 Prototipagem da Solução) para este projeto de atendimento CISEB.';
    } else if (sectionKey === 'execution') {
      prompt = 'Sugerir e detalhar os Recursos Didáticos/Tecnológicos do CISEB, Roteiro Pedagógico passo a passo e a Expectativa de Aprendizagem final dos estudantes/professores.';
    }

    try {
      const response = await fetch('/api/gemini/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          currentPlan,
        }),
      });

      const data = await response.json();
      if (data.success && data.plan) {
        setCurrentPlan((prev) => ({
          ...prev,
          ...data.plan,
          // Preserve arrays if valid
          bnccCompetencias: Array.isArray(data.plan.bnccCompetencias) && data.plan.bnccCompetencias.length ? data.plan.bnccCompetencias : prev.bnccCompetencias,
          bnccHabilidadesEixo: Array.isArray(data.plan.bnccHabilidadesEixo) && data.plan.bnccHabilidadesEixo.length ? data.plan.bnccHabilidadesEixo : prev.bnccHabilidadesEixo,
          odsAplicada: Array.isArray(data.plan.odsAplicada) && data.plan.odsAplicada.length ? data.plan.odsAplicada : prev.odsAplicada,
          updatedAt: new Date().toISOString(),
        }));
      } else {
        alert('Não foi possível gerar com a IA no momento. Verifique se a chave GEMINI_API_KEY está configurada.');
      }
    } catch (error) {
      console.error('Erro na chamada da IA:', error);
      alert('Erro de comunicação com a IA. Tente novamente.');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Calculate completion percentage
  const calculateCompletion = () => {
    const fields: (keyof CisebSessionPlan)[] = [
      'modalidade',
      'unidadeCiseb',
      'professorFormador',
      'temaImersao',
      'tituloSuporte',
      'cargaHorariaAulas',
      'turmaParticipante',
      'trilhaImersao',
      'fase1Empatia',
      'fase2TempestadeIdeias',
      'fase3PrototipagemSolucao',
      'tipoPrototipo',
      'recursosDidaticosTecnologicos',
      'roteiroPedagógico',
      'expectativaAprendizagem',
    ];

    let filled = 0;
    fields.forEach((f) => {
      if (typeof currentPlan[f] === 'string' && (currentPlan[f] as string).trim().length > 0) {
        filled += 1;
      }
    });

    if (currentPlan.bnccCompetencias?.length > 0) filled += 1;
    if (currentPlan.bnccHabilidadesEixo?.length > 0) filled += 1;
    if (currentPlan.odsAplicada?.length > 0) filled += 1;

    const total = fields.length + 3;
    return Math.round((filled / total) * 100);
  };

  const completionPercentage = calculateCompletion();

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
      {/* Top Bar Header */}
      <Header
        onNewPlan={handleNewPlan}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onToggleAiDrawer={() => setIsAiDrawerOpen(!isAiDrawerOpen)}
        onOpenPrint={() => setActiveView('report')}
        activeView={activeView}
        setActiveView={setActiveView}
        savedCount={savedPlans.length}
        completionPercentage={completionPercentage}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeView === 'edit' ? (
          <SessionForm
            plan={currentPlan}
            onChange={setCurrentPlan}
            onAiAutoFillSection={handleAiAutoFillSection}
            isAiLoading={isAiLoading}
            onSave={handleSavePlan}
            onGenerateReport={() => {
              handleSavePlan();
              setActiveView('report');
            }}
            onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
          />
        ) : (
          <ReportView
            plan={currentPlan}
            onEdit={() => setActiveView('edit')}
          />
        )}
      </main>

      {/* Modals and Drawers */}
      <AiCopilotDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        plan={currentPlan}
        onApplyPlanUpdate={(partial) => {
          setCurrentPlan((prev) => ({ ...prev, ...partial }));
        }}
      />

      <CurriculumGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedPlans={savedPlans}
        onLoadPlan={(plan) => {
          setCurrentPlan(plan);
          setActiveView('edit');
        }}
        onDeletePlan={handleDeletePlan}
        onImportPlans={handleImportPlans}
      />
    </div>
  );
}
