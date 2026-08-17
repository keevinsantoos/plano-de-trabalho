import React, { useState } from 'react';
import { CisebSessionPlan } from '../types';
import { CisebLogo } from './CisebLogo';
import {
  Printer,
  Copy,
  Check,
  Download,
  Edit3,
  FileCheck,
  Building2,
  UserCheck,
  Sparkles,
  Share2
} from 'lucide-react';

interface ReportViewProps {
  plan: CisebSessionPlan;
  onEdit: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ plan, onEdit }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const generateMarkdownReport = () => {
    return `# FICHA DE REGISTRO OFICIAL DE ATENDIMENTO E SUPORTE DE PROTOTIPAGEM
**SEDUC - PARÁ | CISEB - CENTRO DE INOVAÇÃO E SUSTENTABILIDADE DA EDUCAÇÃO BÁSICA**

---

### 1. IDENTIFICAÇÃO DO ATENDIMENTO
- **Modalidade de Atendimento:** ${plan.modalidade || 'Não informada'}
- **Unidade CISEB:** ${plan.unidadeCiseb || 'Não informada'}
- **Professor(a) Formador(a):** ${plan.professorFormador || 'Não informado'}

---

### 2. INFORMAÇÕES GERAIS E TEMA DE IMERSÃO
- **Tema de Imersão:** ${plan.temaImersao || 'Não informado'}
- **Título do Suporte de Prototipagem:** ${plan.tituloSuporte || 'Não informado'}
- **Quantidade de Aulas Previstas (Carga Horária):** ${plan.cargaHorariaAulas || 'Não informada'}
- **Turma Participante:** ${plan.turmaParticipante || 'Não informada'}

---

### 3. ALINHAMENTO PEDAGÓGICO E CURRICULAR (BNCC & ODS)
- **Competências BNCC Computação:** ${
      plan.bnccCompetencias?.length ? plan.bnccCompetencias.join('; ') : 'Não selecionadas'
    }
- **Eixos/Habilidades BNCC:** ${
      plan.bnccHabilidadesEixo?.length ? plan.bnccHabilidadesEixo.join('; ') : 'Não selecionados'
    }
- **ODS Aplicada:** ${plan.odsAplicada?.length ? plan.odsAplicada.join('; ') : 'Não selecionadas'}
- **Trilha das Imersões (Contexto Amazônico):** ${plan.trilhaImersao || 'Não informada'}

---

### 4. ETAPAS METODOLÓGICAS (DESIGN THINKING FRAMEWORK)
- **Fase 1: Empatia (Contexto e Investigação):**
${plan.fase1Empatia || 'Sem registro'}

- **Fase 2: Tempestade de Ideias (Ideação e Refinamento):**
${plan.fase2TempestadeIdeias || 'Sem registro'}

- **Fase 3: Prototipagem da Solução (Construção Maker):**
${plan.fase3PrototipagemSolucao || 'Sem registro'}

---

### 5. DETALHES DE EXECUÇÃO TÉCNICA E APRENDIZAGEM
- **Tipo de Protótipo / Produto Final:** ${plan.tipoPrototipo || 'Não informado'}
- **Recursos Didáticos e Tecnológicos:** ${plan.recursosDidaticosTecnologicos || 'Não informados'}
- **Roteiro Pedagógico (Passo a Passo):**
${plan.roteiroPedagógico || 'Sem registro'}

- **Expectativa de Aprendizagem:**
${plan.expectativaAprendizagem || 'Sem registro'}

---

*Documento gerado digitalmente pelo Sistema de Planejamento e Gestão Pedagógica do CISEB Pará em ${new Date().toLocaleDateString('pt-BR')}.*
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(plan, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Plano_CISEB_${plan.tituloSuporte.replace(/\s+/g, '_') || 'Sem_Titulo'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-4xl mx-auto py-5 px-3 sm:px-4 space-y-4">
      {/* Top Action Controls (hidden when printing) */}
      <div className="print:hidden bg-gradient-to-r from-[#005BAC] to-[#013780] text-white p-3 sm:p-3.5 rounded-xl shadow-md flex flex-wrap items-center justify-between gap-2.5 border border-[#012b66]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/10 rounded-lg border border-white/20">
            <FileCheck className="w-4 h-4 text-amber-300" />
          </div>
          <span className="text-xs font-black uppercase tracking-tight">Relatório Oficial de Atendimento</span>
        </div>

        <div className="flex items-center flex-wrap gap-2 text-xs">
          <button
            onClick={onEdit}
            className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold uppercase rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border border-white/15"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Editar Formulário
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold uppercase rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border border-white/15"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copiado!' : 'Copiar Texto'}
          </button>

          <button
            onClick={handleExportJson}
            className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold uppercase rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border border-white/15"
          >
            <Download className="w-3.5 h-3.5" />
            JSON
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-[#78BC61] hover:bg-green-600 text-white font-black uppercase rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            IMPRIMIR / PDF
          </button>
        </div>
      </div>

      {/* OFFICIAL PAPER DOCUMENT CONTAINER */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sm:p-8 text-slate-900 print:shadow-none print:border-none print:p-0 print:m-0 print:rounded-none text-xs">
        
        {/* Official Header Badge */}
        <div className="border-b-2 border-black pb-4 mb-6 text-center space-y-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            <div className="h-16 sm:h-18 w-auto shrink-0 flex items-center justify-center">
              <CisebLogo className="h-16 sm:h-18 w-auto" variant="dark" />
            </div>
            <div className="text-center sm:text-right">
              <h1 className="text-base font-black tracking-tight text-black uppercase">
                Governo do Estado do Pará
              </h1>
              <h2 className="text-xs font-bold text-black uppercase tracking-wide">
                Secretaria de Estado de Educação - SEDUC/PA
              </h2>
              <h3 className="text-xs font-extrabold text-black uppercase mt-0.5">
                DINOV - DIRETORIA DE INOVAÇÃO
              </h3>
              <h4 className="text-xs font-black text-black uppercase tracking-wider mt-0.5">
                SISTEMA DE MONITORAMENTO
              </h4>
            </div>
          </div>
        </div>

        {/* SECTION 1: Identificação */}
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 space-y-2">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-[#005BAC] border-b border-slate-200 pb-1">
              1. Identificação do Atendimento
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block font-bold uppercase text-[9px]">Modalidade:</span>
                <span className="font-bold text-slate-800">{plan.modalidade || 'Não informada'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold uppercase text-[9px]">Unidade CISEB:</span>
                <span className="font-bold text-slate-800">{plan.unidadeCiseb || 'Não informada'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold uppercase text-[9px]">Professor(a) Formador(a):</span>
                <span className="font-bold text-slate-800">{plan.professorFormador || 'Não informado'}</span>
              </div>
            </div>
          </div>

          {/* SECTION 2: Informações Gerais & Tema */}
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 space-y-2">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-[#005BAC] border-b border-slate-200 pb-1">
              2. Informações Gerais & Tema
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block font-bold uppercase text-[9px]">Tema de Imersão:</span>
                <span className="font-bold text-slate-800">{plan.temaImersao || 'Não informado'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold uppercase text-[9px]">Título do Suporte:</span>
                <span className="font-bold text-slate-800">{plan.tituloSuporte || 'Não informado'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold uppercase text-[9px]">Carga Horária Prevista:</span>
                <span className="font-bold text-slate-800">{plan.cargaHorariaAulas || 'Não informada'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold uppercase text-[9px]">Turma Participante:</span>
                <span className="font-bold text-slate-800">{plan.turmaParticipante || 'Não informada'}</span>
              </div>
            </div>
          </div>

          {/* SECTION 3: Alinhamento Pedagógico */}
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 space-y-2">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-[#005BAC] border-b border-slate-200 pb-1">
              3. Alinhamento Pedagógico (BNCC Computação, ODS & Trilhas)
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[9px]">Competências BNCC Computação:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {plan.bnccCompetencias?.length ? (
                    plan.bnccCompetencias.map((c) => (
                      <span key={c} className="bg-[#005BAC] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                        {c}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 italic">Não selecionadas</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-200">
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[9px]">Eixo BNCC:</span>
                  <span className="font-bold text-slate-800">
                    {plan.bnccHabilidadesEixo?.length ? plan.bnccHabilidadesEixo.join(', ') : 'Não informado'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[9px]">ODS Aplicada:</span>
                  <span className="font-bold text-slate-800">
                    {plan.odsAplicada?.length ? plan.odsAplicada.join(', ') : 'Não informada'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[9px]">Trilha de Imersão:</span>
                  <span className="font-bold text-slate-800">{plan.trilhaImersao || 'Não informada'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: Passos Metodológicos - Design Thinking */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-[#005BAC] border-b border-slate-200 pb-1">
              4. Passos Metodológicos (Design Thinking Framework)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="font-black text-[#005BAC] uppercase text-[10px] block border-b border-slate-200 pb-0.5">
                  Fase 1: Empatia
                </span>
                <p className="text-slate-700 leading-snug whitespace-pre-line text-[11px]">
                  {plan.fase1Empatia || 'Sem registro.'}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="font-black text-[#005BAC] uppercase text-[10px] block border-b border-slate-200 pb-0.5">
                  Fase 2: Ideação
                </span>
                <p className="text-slate-700 leading-snug whitespace-pre-line text-[11px]">
                  {plan.fase2TempestadeIdeias || 'Sem registro.'}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="font-black text-[#005BAC] uppercase text-[10px] block border-b border-slate-200 pb-0.5">
                  Fase 3: Protótipo
                </span>
                <p className="text-slate-700 leading-snug whitespace-pre-line text-[11px]">
                  {plan.fase3PrototipagemSolucao || 'Sem registro.'}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 5: Detalhes Técnicos & Expectativa */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-[#005BAC] border-b border-slate-200 pb-1">
              5. Detalhes de Execução Técnica e Aprendizagem
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-400 font-bold block uppercase text-[9px]">Tipo de Protótipo:</span>
                <span className="font-black text-[#005BAC] uppercase">{plan.tipoPrototipo || 'Não informado'}</span>
              </div>

              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-400 font-bold block uppercase text-[9px]">Recursos Didáticos / Tecnológicos:</span>
                <span className="font-bold text-slate-800">{plan.recursosDidaticosTecnologicos || 'Não informados'}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-1">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-0.5">
                <span className="text-slate-400 font-bold block uppercase text-[9px]">Roteiro Pedagógico (Passo a Passo):</span>
                <p className="text-slate-700 leading-snug whitespace-pre-line text-[11px]">
                  {plan.roteiroPedagógico || 'Sem registro.'}
                </p>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-0.5">
                <span className="text-slate-400 font-bold block uppercase text-[9px]">Expectativa de Aprendizagem:</span>
                <p className="text-slate-700 leading-snug whitespace-pre-line text-[11px]">
                  {plan.expectativaAprendizagem || 'Sem registro.'}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 text-[9px] text-slate-400 border-t border-slate-100 uppercase tracking-widest">
            Documento gerado digitalmente pelo Sistema de Planejamento e Gestão Pedagógica do CISEB Pará em {new Date().toLocaleDateString('pt-BR')}.
          </div>
        </div>
      </div>
    </div>
  );
};
