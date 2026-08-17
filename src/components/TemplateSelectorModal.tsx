import React from 'react';
import { TEMPLATE_PLANS } from '../data/templates';
import { CisebSessionPlan } from '../types';
import { X, FolderOpen, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface TemplateSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Partial<CisebSessionPlan>) => void;
}

export const TemplateSelectorModal: React.FC<TemplateSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#013780] text-white p-4 flex items-center justify-between border-b border-[#012b66]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg border border-white/20">
              <FolderOpen className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                Modelos de Atendimento CISEB
              </h3>
              <p className="text-[11px] text-white/80">
                Selecione um projeto de referência para carregar e adaptar
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

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TEMPLATE_PLANS.map((template, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-[#013780]/30 rounded-xl transition-all space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase bg-blue-100 text-[#013780] px-2 py-0.5 rounded">
                      {template.temaImersao}
                    </span>
                    <span className="text-[10px] font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      {template.modalidade}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-slate-900 leading-snug">
                    {template.tituloSuporte}
                  </h4>

                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {template.fase1Empatia}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-medium truncate max-w-[180px]">
                    {template.unidadeCiseb}
                  </span>

                  <button
                    onClick={() => {
                      onSelectTemplate(template);
                      onClose();
                    }}
                    className="px-2.5 py-1 bg-[#013780] hover:bg-[#012b66] text-white font-semibold rounded shadow-sm text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    Usar Este <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl text-xs transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
