import React, { useState } from 'react';
import {
  CisebSessionPlan,
  MODALIDADES_OPTIONS,
  UNIDADES_CISEB_OPTIONS,
  PROFESSORES_FORMADORES_OPTIONS,
  TEMAS_IMERSAO_OPTIONS,
  TURMA_PARTICIPANTE_OPTIONS,
  BNCC_COMPETENCIAS_OPTIONS,
  BNCC_EIXOS_HABILIDADES_OPTIONS,
  ODS_OPTIONS,
  TRILHAS_IMERSAO_OPTIONS,
  TIPO_PROTOTIPO_OPTIONS,
} from '../types';
import {
  Sparkles,
  Building2,
  UserCheck,
  BookMarked,
  Clock,
  Compass,
  Lightbulb,
  Cpu,
  CheckCircle2,
  ListChecks,
  Wrench,
  Search,
  ChevronDown,
  Bot
} from 'lucide-react';

interface SessionFormProps {
  plan: CisebSessionPlan;
  onChange: (updated: CisebSessionPlan) => void;
  onAiAutoFillSection: (sectionKey: string) => void;
  isAiLoading: boolean;
  onSave: () => void;
  onGenerateReport: () => void;
  onOpenAiDrawer?: () => void;
}

export const SessionForm: React.FC<SessionFormProps> = ({
  plan,
  onChange,
  onAiAutoFillSection,
  isAiLoading,
  onSave,
  onGenerateReport,
  onOpenAiDrawer,
}) => {
  const [unitSearch, setUnitSearch] = useState('');
  const [teacherSearch, setTeacherSearch] = useState('');
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [showTeacherDropdown, setShowTeacherDropdown] = useState(false);

  // Helper to check completion of Options 1, 2 and 3
  const isOption1Filled = Boolean(plan.unidadeCiseb || plan.modalidade || plan.professorFormador);
  const isOption2Filled = Boolean(plan.temaImersao || plan.tituloSuporte || plan.turmaParticipante);
  const isOption3Filled = Boolean(
    (plan.bnccCompetencias && plan.bnccCompetencias.length > 0) ||
    (plan.bnccHabilidadesEixo && plan.bnccHabilidadesEixo.length > 0) ||
    (plan.odsAplicada && plan.odsAplicada.length > 0) ||
    plan.trilhaImersao
  );
  const areOptions123Ready = isOption1Filled && isOption2Filled && isOption3Filled;

  // Helper to handle text/select changes
  const handleChange = (field: keyof CisebSessionPlan, value: any) => {
    onChange({
      ...plan,
      [field]: value,
      updatedAt: new Date().toISOString(),
    });
  };

  // Helper for multi-select array fields
  const handleToggleArrayItem = (field: 'bnccCompetencias' | 'bnccHabilidadesEixo' | 'odsAplicada', item: string) => {
    const current = plan[field] || [];
    const updated = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
    handleChange(field, updated);
  };

  // Filtered lists for units and teachers search
  const filteredUnits = UNIDADES_CISEB_OPTIONS.filter((u) =>
    u.toLowerCase().includes(unitSearch.toLowerCase())
  );

  const filteredTeachers = PROFESSORES_FORMADORES_OPTIONS.filter((t) =>
    t.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-5 px-3 sm:px-4 space-y-4">
      {/* Intro Header Card - High Density */}
      <div className="bg-gradient-to-r from-[#005BAC] to-[#013780] rounded-xl p-4 sm:p-5 text-white shadow-md border border-[#013780] flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-[10px] px-2.5 py-0.5 rounded uppercase font-bold tracking-wider shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-300" />
            CISEB • SEDUC/PA
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight">
            SISTEMA DE MONITORAMENTO
          </h2>
          <p className="text-white/85 text-xs max-w-2xl leading-snug">
            Ficha de Atendimento & Prototipagem Maker. Registre e monitore os parâmetros educacionais, investigação científica e os eixos da BNCC Computação para a rede estadual de ensino.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            onClick={onSave}
            className="px-3.5 py-2 bg-sky-400 hover:bg-sky-300 text-[#012b66] font-bold rounded-lg text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Salvar Rascunho
          </button>
        </div>
      </div>

      {/* SECTION 1: Identificação Oficial */}
      <section className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
          <h2 className="text-xs font-black text-[#005BAC] uppercase flex items-center gap-1.5 tracking-wide">
            <Building2 className="w-4 h-4 text-[#005BAC]" />
            1. Identificação do Atendimento & Unidade
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* 1. Modalidade de Atendimento */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
              1. Modalidade de Atendimento *
            </label>
            <select
              value={plan.modalidade}
              onChange={(e) => handleChange('modalidade', e.target.value)}
              className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#005BAC] focus:bg-white transition-all"
            >
              <option value="">Selecione a modalidade...</option>
              {MODALIDADES_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Unidade CISEB */}
          <div className="relative">
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5 flex justify-between">
              <span>2. Unidade CISEB *</span>
              <span className="text-[9px] text-[#005BAC] font-bold bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">15 UNIDADES</span>
            </label>

            <div className="relative">
              <input
                type="text"
                placeholder="Buscar unidade..."
                value={unitSearch || plan.unidadeCiseb}
                onChange={(e) => {
                  setUnitSearch(e.target.value);
                  handleChange('unidadeCiseb', e.target.value);
                  setShowUnitDropdown(true);
                }}
                onFocus={() => setShowUnitDropdown(true)}
                className="w-full p-1.5 pl-7 pr-7 bg-slate-50 border border-slate-200 rounded text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#005BAC] focus:bg-white transition-all"
              />
              <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2 cursor-pointer" onClick={() => setShowUnitDropdown(!showUnitDropdown)} />
            </div>

            {showUnitDropdown && (
              <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                {filteredUnits.length > 0 ? (
                  filteredUnits.map((unit) => (
                    <div
                      key={unit}
                      onClick={() => {
                        handleChange('unidadeCiseb', unit);
                        setUnitSearch(unit);
                        setShowUnitDropdown(false);
                      }}
                      className={`p-2 text-xs font-medium cursor-pointer hover:bg-blue-50 hover:text-[#005BAC] ${
                        plan.unidadeCiseb === unit ? 'bg-blue-100/80 text-[#005BAC] font-bold' : 'text-slate-700'
                      }`}
                    >
                      {unit}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-xs text-slate-400 text-center">Nenhuma unidade encontrada</div>
                )}
              </div>
            )}
          </div>

          {/* 3. Professor(a) Formador(a) */}
          <div className="relative">
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5 flex justify-between">
              <span>3. Professor(a) Formador(a) *</span>
              <span className="text-[9px] text-[#005BAC] font-bold bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">30 FORMADORES</span>
            </label>

            <div className="relative">
              <input
                type="text"
                placeholder="Buscar formador(a)..."
                value={teacherSearch || plan.professorFormador}
                onChange={(e) => {
                  setTeacherSearch(e.target.value);
                  handleChange('professorFormador', e.target.value);
                  setShowTeacherDropdown(true);
                }}
                onFocus={() => setShowTeacherDropdown(true)}
                className="w-full p-1.5 pl-7 pr-7 bg-slate-50 border border-slate-200 rounded text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#005BAC] focus:bg-white transition-all"
              />
              <UserCheck className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2 cursor-pointer" onClick={() => setShowTeacherDropdown(!showTeacherDropdown)} />
            </div>

            {showTeacherDropdown && (
              <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher) => (
                    <div
                      key={teacher}
                      onClick={() => {
                        handleChange('professorFormador', teacher);
                        setTeacherSearch(teacher);
                        setShowTeacherDropdown(false);
                      }}
                      className={`p-2 text-xs font-medium cursor-pointer hover:bg-blue-50 hover:text-[#005BAC] ${
                        plan.professorFormador === teacher ? 'bg-blue-100/80 text-[#005BAC] font-bold' : 'text-slate-700'
                      }`}
                    >
                      {teacher}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-xs text-slate-400 text-center">Nenhum formador encontrado</div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: Informações Gerais & Tema */}
      <section className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
          <h2 className="text-xs font-black text-[#005BAC] uppercase flex items-center gap-1.5 tracking-wide">
            <BookMarked className="w-4 h-4 text-[#005BAC]" />
            2. Planejamento do Suporte & Tema
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Tema de Imersão */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
              4. Tema de Imersão *
            </label>
            <select
              value={plan.temaImersao}
              onChange={(e) => handleChange('temaImersao', e.target.value)}
              className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#005BAC] focus:bg-white transition-all"
            >
              <option value="">Selecione tema...</option>
              {TEMAS_IMERSAO_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Título do Suporte de Prototipagem */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
              5. Título do Suporte *
            </label>
            <input
              type="text"
              placeholder="Ex: Irrigação com Arduino..."
              value={plan.tituloSuporte}
              onChange={(e) => handleChange('tituloSuporte', e.target.value)}
              className="w-full p-1.5 bg-slate-100 border border-slate-200 rounded text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#005BAC] transition-all"
            />
          </div>

          {/* Carga Horária / Aulas Previstas */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
              Carga Horária / Aulas *
            </label>
            <input
              type="text"
              placeholder="Ex: 04 Horas-Aula..."
              value={plan.cargaHorariaAulas}
              onChange={(e) => handleChange('cargaHorariaAulas', e.target.value)}
              className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#005BAC] transition-all"
            />
          </div>

          {/* Turma Participante */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
              Turma / Público *
            </label>
            <select
              value={plan.turmaParticipante}
              onChange={(e) => handleChange('turmaParticipante', e.target.value)}
              className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#005BAC] transition-all"
            >
              <option value="">Selecione turma...</option>
              {TURMA_PARTICIPANTE_OPTIONS.map((tp) => (
                <option key={tp} value={tp}>
                  {tp}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* SECTION 3: Alinhamento Pedagógico (BNCC, ODS & Trilhas) */}
      <section className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
          <h2 className="text-xs font-black text-[#005BAC] uppercase flex items-center gap-1.5 tracking-wide">
            <Cpu className="w-4 h-4 text-[#005BAC]" />
            3. Alinhamento Pedagógico (BNCC & ODS)
          </h2>

          <button
            onClick={() => onAiAutoFillSection('pedagogical')}
            disabled={isAiLoading}
            className="text-[10px] font-bold uppercase text-[#005BAC] hover:text-[#013780] bg-blue-50 hover:bg-blue-100/70 border border-blue-200 px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            Sugerir Alinhamento
          </button>
        </div>

        <div className="space-y-3">
          {/* BNCC Computação - Competências */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Competências BNCC Computação
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {BNCC_COMPETENCIAS_OPTIONS.map((comp) => {
                const isSelected = (plan.bnccCompetencias || []).includes(comp);
                return (
                  <button
                    key={comp}
                    type="button"
                    onClick={() => handleToggleArrayItem('bnccCompetencias', comp)}
                    className={`p-2 rounded-lg border text-[11px] font-medium text-left transition-all flex items-start gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[#005BAC] text-white border-[#013780] shadow-sm font-semibold'
                        : 'bg-blue-50/40 text-slate-700 border-blue-100/80 hover:bg-blue-100/50'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded border mt-0.5 shrink-0 flex items-center justify-center ${
                        isSelected ? 'bg-[#78BC61] border-[#78BC61]' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <span className="leading-tight">{comp}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BNCC Computação - Eixos / Habilidades */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Eixo de Habilidade BNCC Computação
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {BNCC_EIXOS_HABILIDADES_OPTIONS.map((eixo) => {
                const isSelected = (plan.bnccHabilidadesEixo || []).includes(eixo);
                return (
                  <button
                    key={eixo}
                    type="button"
                    onClick={() => handleToggleArrayItem('bnccHabilidadesEixo', eixo)}
                    className={`p-2 rounded-lg border text-[11px] font-medium text-left transition-all flex items-start gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[#005BAC] text-white border-[#013780] shadow-sm font-semibold'
                        : 'bg-blue-50/40 text-blue-950 border-blue-100/80 hover:bg-blue-100/50'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded border mt-0.5 shrink-0 flex items-center justify-center ${
                        isSelected ? 'bg-[#78BC61] border-[#78BC61]' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <span className="leading-tight">{eixo}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ODS e Trilha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {/* ODS Aplicada */}
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                ODS Aplicada (Objetivos de Desenvolvimento Sustentável)
              </label>
              <div className="space-y-1.5">
                {ODS_OPTIONS.map((ods) => {
                  const isSelected = (plan.odsAplicada || []).includes(ods);
                  return (
                    <button
                      key={ods}
                      type="button"
                      onClick={() => handleToggleArrayItem('odsAplicada', ods)}
                      className={`w-full p-2 rounded-lg border text-[11px] font-medium text-left transition-all flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-orange-800 text-white border-orange-700 font-bold'
                          : 'bg-orange-50/60 text-slate-800 border-orange-100 hover:bg-orange-100/60'
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded border shrink-0 flex items-center justify-center ${
                          isSelected ? 'bg-amber-400 border-amber-400' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-slate-950" />}
                      </div>
                      <span className="leading-snug">{ods}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trilha das Imersões */}
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Trilha das Imersões (Contexto Amazônia)
              </label>
              <div className="space-y-1.5">
                {TRILHAS_IMERSAO_OPTIONS.map((trilha) => {
                  const isSelected = plan.trilhaImersao === trilha;
                  return (
                    <button
                      key={trilha}
                      type="button"
                      onClick={() => handleChange('trilhaImersao', trilha)}
                      className={`w-full p-2 rounded-lg border text-[11px] font-medium text-left transition-all flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#013780] text-white border-[#012b66] font-bold shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center ${
                          isSelected ? 'bg-[#78BC61] border-[#78BC61]' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="leading-snug">{trilha}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Design Thinking Framework (Metodologia - High Density Columns) */}
      <section className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-slate-200/80 space-y-3">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-1.5 gap-2">
          <h2 className="text-xs font-black text-[#005BAC] uppercase flex items-center gap-1.5 tracking-wide">
            <Compass className="w-4 h-4 text-[#005BAC]" />
            4. Design Thinking Framework (Metodologia)
          </h2>

          <div className="flex items-center gap-2">
            {onOpenAiDrawer && (
              <button
                type="button"
                onClick={onOpenAiDrawer}
                className="text-[10px] font-bold uppercase text-[#005BAC] hover:text-[#013780] bg-blue-50 hover:bg-blue-100/70 border border-blue-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                title="Abrir mentoria da MAG para ver alternativas"
              >
                <Bot className="w-3.5 h-3.5 text-[#005BAC]" />
                Ver Alternativas com a MAG
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Context Banner for Options 1, 2 and 3 */}
        {areOptions123Ready ? (
          <div className="bg-gradient-to-r from-blue-50/90 to-sky-50/90 border border-blue-200 rounded-lg p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#78BC61] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase flex items-center gap-1 shadow-xs">
                  <CheckCircle2 className="w-3 h-3" /> Opções 1, 2 e 3 Carregadas
                </span>
                <span className="text-[11px] font-bold text-[#005BAC]">Pronto para construir as Fases com alternativas da MAG</span>
              </div>
              <p className="text-xs text-slate-700 leading-snug">
                A MAG utilizará como âncora a <strong>{plan.unidadeCiseb || 'Unidade CISEB'}</strong>, o tema <strong>{plan.temaImersao || plan.tituloSuporte || 'definido'}</strong> ({plan.turmaParticipante || 'Turma'}), articulando com <strong>{plan.odsAplicada?.[0] || 'ODS'}</strong> e <strong>{plan.bnccHabilidadesEixo?.[0] || 'BNCC'}</strong> para sugerir caminhos e alternativas pedagógicas.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {onOpenAiDrawer && (
                <button
                  type="button"
                  onClick={onOpenAiDrawer}
                  className="px-3 py-1.5 bg-[#005BAC] hover:bg-[#013780] text-white font-black text-[11px] uppercase rounded-lg flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-white" />
                  Orientar Fases 1, 2 e 3
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-amber-50/90 border border-amber-200 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-amber-900">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Preencha as Opções 1, 2 e 3 para a MAG orientar e apresentar alternativas</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-tight">
                Para que a MAG sugira alternativas personalizadas para a Fase 1 (Empatia), Fase 2 (Ideação) e Fase 3 (Prototipagem), preencha:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${isOption1Filled ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-white/80 text-amber-800 border border-amber-300'}`}>
                  {isOption1Filled ? '✓' : '○'} 1. Identificação / Unidade
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${isOption2Filled ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-white/80 text-amber-800 border border-amber-300'}`}>
                  {isOption2Filled ? '✓' : '○'} 2. Planejamento / Tema
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${isOption3Filled ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-white/80 text-amber-800 border border-amber-300'}`}>
                  {isOption3Filled ? '✓' : '○'} 3. Alinhamento BNCC & ODS
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Fase 1: Empatia */}
          <div className="flex flex-col bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
            <div className="bg-slate-100 px-2.5 py-1.5 border-b border-slate-200 text-center">
              <span className="text-[10px] font-black uppercase text-[#005BAC]">Fase 1: Empatia</span>
            </div>
            <div className="p-2 space-y-1 flex-1 flex flex-col">
              <textarea
                rows={4}
                placeholder="Levantamento de dados, contextualização do problema e investigação de dores da comunidade..."
                value={plan.fase1Empatia}
                onChange={(e) => handleChange('fase1Empatia', e.target.value)}
                className="w-full h-full min-h-[90px] bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005BAC]"
              />
            </div>
          </div>

          {/* Fase 2: Ideação */}
          <div className="flex flex-col bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
            <div className="bg-slate-100 px-2.5 py-1.5 border-b border-slate-200 text-center">
              <span className="text-[10px] font-black uppercase text-[#005BAC]">Fase 2: Ideação</span>
            </div>
            <div className="p-2 space-y-1 flex-1 flex flex-col">
              <textarea
                rows={4}
                placeholder="Brainstorming, definição de componentes, seleção de soluções e refinamento de hipóteses..."
                value={plan.fase2TempestadeIdeias}
                onChange={(e) => handleChange('fase2TempestadeIdeias', e.target.value)}
                className="w-full h-full min-h-[90px] bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005BAC]"
              />
            </div>
          </div>

          {/* Fase 3: Prototipagem */}
          <div className="flex flex-col bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
            <div className="bg-slate-100 px-2.5 py-1.5 border-b border-slate-200 text-center">
              <span className="text-[10px] font-black uppercase text-[#005BAC]">Fase 3: Protótipo</span>
            </div>
            <div className="p-2 space-y-1 flex-1 flex flex-col">
              <textarea
                rows={4}
                placeholder="Montagem física/digital, circuitos eletrônicos, lógica em blocos e teste prático da solução..."
                value={plan.fase3PrototipagemSolucao}
                onChange={(e) => handleChange('fase3PrototipagemSolucao', e.target.value)}
                className="w-full h-full min-h-[90px] bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005BAC]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Detalhes Técnicos & Execução (High Density Card) */}
      <section className="bg-gradient-to-br from-[#005BAC] to-[#013780] rounded-xl p-3.5 sm:p-4 text-white shadow-md space-y-3 border border-[#012b66]">
        <div className="flex items-center justify-between border-b border-white/15 pb-1.5">
          <h2 className="text-xs font-black uppercase text-white flex items-center gap-1.5 tracking-wide">
            <Wrench className="w-4 h-4 text-amber-300" />
            5. Detalhes de Execução Técnica & Roteiro
          </h2>

          <button
            onClick={() => onAiAutoFillSection('execution')}
            disabled={isAiLoading}
            className="text-[10px] font-black uppercase text-[#005BAC] bg-white hover:bg-sky-50 active:bg-sky-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-xs border border-white/40 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#005BAC] fill-[#005BAC]/20" />
            Detalhar Execução
          </button>
        </div>

        <div className="space-y-3 text-xs">
          {/* Tipo de Protótipo */}
          <div>
            <label className="text-[9px] uppercase font-bold text-white/80 block mb-1">
              Tipo de Produto / Protótipo
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TIPO_PROTOTIPO_OPTIONS.map((tipo) => {
                const isSelected = plan.tipoPrototipo === tipo;
                return (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => handleChange('tipoPrototipo', tipo)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center text-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#78BC61] text-white shadow-md ring-2 ring-white/30'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                    }`}
                  >
                    {tipo}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recursos Didáticos e Tecnológicos */}
          <div>
            <label className="text-[9px] uppercase font-bold text-white/80 block mb-0.5">
              Recursos Didáticos e Tecnológicos Utilizados
            </label>
            <input
              type="text"
              placeholder="Ex: Arduino, Sensor HL-69, Jumper Wires, Chromebooks, Protoboard..."
              value={plan.recursosDidaticosTecnologicos}
              onChange={(e) => handleChange('recursosDidaticosTecnologicos', e.target.value)}
              className="w-full p-1.5 bg-white/10 border border-white/20 rounded-lg text-xs text-white placeholder-white/50 focus:outline-none focus:bg-white/20"
            />
          </div>

          {/* Roteiro Pedagógico */}
          <div>
            <label className="text-[9px] uppercase font-bold text-white/80 block mb-0.5">
              Resumo do Roteiro Pedagógico (Passo a Passo)
            </label>
            <textarea
              rows={3}
              placeholder="1. Introdução à eletrônica; 2. Diagramação do circuito; 3. Lógica condicional; 4. Teste em campo real..."
              value={plan.roteiroPedagógico}
              onChange={(e) => handleChange('roteiroPedagógico', e.target.value)}
              className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-xs text-white placeholder-white/50 focus:outline-none focus:bg-white/20"
            />
          </div>

          {/* Expectativa de Aprendizagem */}
          <div>
            <label className="text-[9px] uppercase font-bold text-white/80 block mb-0.5">
              Expectativa de Aprendizagem
            </label>
            <textarea
              rows={2}
              placeholder="Compreender o funcionamento de sensores e atuar na lógica de programação para sustentabilidade..."
              value={plan.expectativaAprendizagem}
              onChange={(e) => handleChange('expectativaAprendizagem', e.target.value)}
              className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-xs text-white placeholder-white/50 focus:outline-none focus:bg-white/20"
            />
          </div>
        </div>
      </section>

      {/* Bottom Floating/Fixed Bar to Generate Report */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3.5 text-slate-800 shadow-sm">
        <div className="space-y-0.5">
          <h4 className="text-xs font-black uppercase text-[#005BAC]">Plano em Elaboração</h4>
          <p className="text-[11px] text-slate-500 font-medium">
            Gere e exporte a documentação oficial formatada para a SEDUC/PA.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSave}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
          >
            Salvar Rascunho
          </button>

          <button
            onClick={onGenerateReport}
            className="px-4 py-1.5 bg-[#005BAC] hover:bg-[#013780] text-white font-bold text-xs uppercase rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            GERAR DOCUMENTAÇÃO
          </button>
        </div>
      </div>
    </div>
  );
};
