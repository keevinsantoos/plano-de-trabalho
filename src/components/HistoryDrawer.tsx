import React, { useState } from 'react';
import { CisebSessionPlan } from '../types';
import {
  X,
  History,
  Trash2,
  Copy,
  FileText,
  Search,
  Upload,
  Download,
  Calendar,
  Building2,
  UserCheck
} from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedPlans: CisebSessionPlan[];
  onLoadPlan: (plan: CisebSessionPlan) => void;
  onDeletePlan: (planId: string) => void;
  onImportPlans: (imported: CisebSessionPlan[]) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  savedPlans,
  onLoadPlan,
  onDeletePlan,
  onImportPlans,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredPlans = savedPlans.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      (p.tituloSuporte || '').toLowerCase().includes(term) ||
      (p.unidadeCiseb || '').toLowerCase().includes(term) ||
      (p.professorFormador || '').toLowerCase().includes(term) ||
      (p.temaImersao || '').toLowerCase().includes(term)
    );
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        const arrayToImport = Array.isArray(parsed) ? parsed : [parsed];
        onImportPlans(arrayToImport);
      } catch (err) {
        alert('Erro ao importar arquivo JSON. Certifique-se de ser um arquivo válido do CISEB.');
      }
    };
    reader.readAsText(file);
  };

  const handleExportAll = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedPlans, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `CISEB_Planos_Salvos_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 md:w-[440px] bg-white shadow-2xl border-l border-slate-200 flex flex-col">
      {/* Header */}
      <div className="bg-[#013780] text-white p-4 flex items-center justify-between border-b border-[#012b66]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-white/10 rounded-lg border border-white/20">
            <History className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Meus Planos Salvos</h3>
            <p className="text-[11px] text-white/80">
              {savedPlans.length} {savedPlans.length === 1 ? 'registro' : 'registros'} no histórico
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Toolbar (Search & Import/Export) */}
      <div className="p-3 bg-slate-100 border-b border-slate-200 space-y-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por título, unidade ou formador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#013780]"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center justify-between text-xs gap-2 pt-1">
          <label className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded font-medium cursor-pointer flex items-center gap-1.5 text-[11px]">
            <Upload className="w-3 h-3" />
            Importar JSON
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>

          {savedPlans.length > 0 && (
            <button
              onClick={handleExportAll}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded font-medium cursor-pointer flex items-center gap-1.5 text-[11px]"
            >
              <Download className="w-3 h-3" />
              Exportar Todos
            </button>
          )}
        </div>
      </div>

      {/* Plan Cards List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-lg p-3.5 border border-slate-200 shadow-sm space-y-2 hover:border-[#013780]/30 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold uppercase bg-blue-100 text-[#013780] px-2 py-0.5 rounded">
                  {plan.temaImersao || 'Geral'}
                </span>

                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(plan.updatedAt).toLocaleDateString('pt-BR')}
                </span>
              </div>

              <h4 className="font-bold text-xs text-slate-900 leading-snug">
                {plan.tituloSuporte || 'Plano sem título'}
              </h4>

              <div className="space-y-1 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5 truncate">
                  <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{plan.unidadeCiseb || 'Unidade não definida'}</span>
                </div>

                <div className="flex items-center gap-1.5 truncate">
                  <UserCheck className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{plan.professorFormador || 'Formador não definido'}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => {
                    onLoadPlan(plan);
                    onClose();
                  }}
                  className="px-2.5 py-1 bg-[#013780] hover:bg-[#012b66] text-white font-semibold rounded text-[11px] transition-colors cursor-pointer"
                >
                  Carregar / Editar
                </button>

                <button
                  onClick={() => onDeletePlan(plan.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                  title="Excluir do histórico"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-xs text-slate-400 space-y-2">
            <FileText className="w-8 h-8 mx-auto text-slate-300" />
            <p>Nenhum plano encontrado no histórico local.</p>
          </div>
        )}
      </div>
    </div>
  );
};
