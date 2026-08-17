import React from 'react';
import { CisebLogo } from './CisebLogo';
import {
  Sparkles,
  FileText,
  BookOpen,
  History,
  PlusCircle,
  Download,
  Printer
} from 'lucide-react';

interface HeaderProps {
  onNewPlan: () => void;
  onOpenGuide: () => void;
  onOpenHistory: () => void;
  onToggleAiDrawer: () => void;
  onOpenPrint: () => void;
  activeView: 'edit' | 'report';
  setActiveView: (view: 'edit' | 'report') => void;
  savedCount: number;
  completionPercentage: number;
}

export const Header: React.FC<HeaderProps> = ({
  onNewPlan,
  onOpenGuide,
  onOpenHistory,
  onToggleAiDrawer,
  onOpenPrint,
  activeView,
  setActiveView,
  savedCount,
  completionPercentage,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-[#005BAC] via-[#004e96] to-[#013780] text-white border-b border-[#012b66] shadow-md">
      {/* Top Banner with Official CISEB / SEDUC PA Branding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        {/* Brand identity */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div
            className="h-11 sm:h-13 md:h-14 w-auto shrink-0 flex items-center justify-center transition-all hover:scale-102"
            title="CISEB - Centro de Inovação e Sustentabilidade da Educação Básica"
          >
            <CisebLogo className="h-11 sm:h-13 md:h-14 w-auto drop-shadow-md" variant="light" />
          </div>

          <div className="hidden sm:block border-l border-white/20 pl-3.5 py-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-white/95 bg-white/20 px-2 py-0.5 rounded border border-white/30 shadow-xs">
                SEDUC - PARÁ
              </span>
              <span className="text-[11px] text-white/90 uppercase font-semibold">
                CISEB POR TODO PARÁ
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black uppercase tracking-tight text-white leading-none mt-1">
              SISTEMA DE MONITORAMENTO
            </h1>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* View Toggle */}
          <div className="bg-black/25 p-1 rounded-lg border border-white/15 flex items-center">
            <button
              onClick={() => setActiveView('edit')}
              className={`px-2.5 py-1 rounded text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'edit'
                  ? 'bg-white text-[#005BAC] shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Formulário
            </button>
            <button
              onClick={() => setActiveView('report')}
              className={`px-2.5 py-1 rounded text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'report'
                  ? 'bg-white text-[#005BAC] shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              Relatório
            </button>
          </div>

          {/* Quick Actions */}
          <button
            onClick={onToggleAiDrawer}
            className="px-3 py-1.5 rounded-lg bg-white text-[#005BAC] hover:bg-blue-50 font-black text-xs uppercase shadow-sm transition-all flex items-center gap-1.5 cursor-pointer border border-white/80"
            title="MAG - Co-Piloto Pedagógico com Inteligência Artificial"
          >
            <Sparkles className="w-3.5 h-3.5 fill-[#005BAC]" />
            <span>MAG</span>
          </button>

          <button
            onClick={onOpenGuide}
            className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Consultar Referencial Curricular de Computação do Pará"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Referencial</span> Pará
          </button>

          <button
            onClick={onOpenHistory}
            className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase transition-colors flex items-center gap-1.5 relative cursor-pointer"
            title="Ver planos salvos"
          >
            <History className="w-3.5 h-3.5" />
            Salvos
            {savedCount > 0 && (
              <span className="bg-sky-400 text-[#013780] text-[10px] font-black px-1.5 py-0.2 rounded-full shadow-xs">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onNewPlan}
            className="px-3 py-1.5 rounded-lg bg-sky-400 hover:bg-sky-300 text-[#012b66] font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            title="Iniciar novo plano"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Novo
          </button>
        </div>
      </div>

      {/* Progress sub-bar for form completeness */}
      {activeView === 'edit' && (
        <div className="bg-[#012b66] border-t border-[#013780] px-4 sm:px-6 py-1 text-xs flex items-center justify-between text-white/90">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="font-bold uppercase text-white/85">
              Preenchimento de Parâmetros:
            </span>
            <span className="font-black text-[#78BC61]">{completionPercentage}%</span>
          </div>
          <div className="w-28 sm:w-44 bg-black/30 rounded-full h-1.5 overflow-hidden border border-white/10">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                completionPercentage === 100
                  ? 'bg-[#78BC61]'
                  : completionPercentage > 60
                  ? 'bg-amber-400'
                  : 'bg-blue-300'
              }`}
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      )}
    </header>
  );
};
