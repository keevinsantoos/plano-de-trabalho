import React, { useState } from 'react';
import { X, BookOpen, Layers, Cpu, Award, Globe, Leaf, Users } from 'lucide-react';

interface CurriculumGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurriculumGuideModal: React.FC<CurriculumGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'principles' | 'axes' | 'labs' | 'modalities'>('principles');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#013780] text-white p-4 flex items-center justify-between border-b border-[#012b66]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg border border-white/20">
              <BookOpen className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                Referencial Curricular de Computação do Pará
              </h3>
              <p className="text-[11px] text-white/80">
                Diretrizes DCE-PA, PEDIP-PA e BNCC Computação
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

        {/* Tab Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 px-5 pt-3 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('principles')}
            className={`pb-2.5 px-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'principles'
                ? 'border-[#013780] text-[#013780] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Princípios Curriculares
          </button>
          <button
            onClick={() => setActiveTab('axes')}
            className={`pb-2.5 px-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'axes'
                ? 'border-[#013780] text-[#013780] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Eixos BNCC Computação
          </button>
          <button
            onClick={() => setActiveTab('labs')}
            className={`pb-2.5 px-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'labs'
                ? 'border-[#013780] text-[#013780] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Salas Tecnológicas CISEB
          </button>
          <button
            onClick={() => setActiveTab('modalities')}
            className={`pb-2.5 px-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'modalities'
                ? 'border-[#013780] text-[#013780] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Modalidades Diversas
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs text-slate-700 leading-relaxed">
          {activeTab === 'principles' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <h4 className="font-bold text-emerald-950 text-sm mb-1 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  1. Respeito às Culturas Amazônicas
                </h4>
                <p>
                  Valorização dos saberes ancestrais, povos da floresta, águas e campos, utilizando a computação como meio de fortalecimento das identidades locais e enfrentamento das desigualdades regionais.
                </p>
              </div>

              <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
                <h4 className="font-bold text-teal-950 text-sm mb-1 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-teal-600" />
                  2. Educação para a Sustentabilidade
                </h4>
                <p>
                  Promoção da reflexão crítica e ação transformadora voltada para soluções tecnológicas sustentáveis, economia circular, conservação do bioma amazônico e ODS.
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <h4 className="font-bold text-amber-950 text-sm mb-1 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-600" />
                  3. Interdisciplinaridade & Design Thinking
                </h4>
                <p>
                  Articulação dos saberes computacionais com as diversas áreas do conhecimento através de projetos práticos e investigação científica (Design Thinking: Empatia, Tempestade de Ideias e Prototipagem).
                </p>
              </div>
            </div>
          )}

          {activeTab === 'axes' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  1. Pensamento Computacional
                </h4>
                <p className="mb-2">
                  Capacidade de criar e utilizar modelos para solucionar problemas usando conceitos como decomposição, reconhecimento de padrões, abstração e algoritmos.
                </p>
                <div className="bg-white p-2.5 rounded border border-slate-200 text-[11px] font-mono text-slate-600">
                  Exemplo: Algoritmos para estações de reciclagem, automação com robótica e lógica de programação em blocos.
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  2. Mundo Digital
                </h4>
                <p className="mb-2">
                  Compreensão dos componentes físicos (hardware), redes de comunicação, arquitetura de computadores, internet das coisas e armazenamento de dados.
                </p>
                <div className="bg-white p-2.5 rounded border border-slate-200 text-[11px] font-mono text-slate-600">
                  Exemplo: Funcionamento dos Chromebooks, conectividade Starlink, sensores IoT de clima e rede de computadores.
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  3. Cultura Digital
                </h4>
                <p className="mb-2">
                  Uso ético, crítico e autoral das tecnologias da informação para comunicação, expressão, autoria de mídias e exercício pleno da cidadania.
                </p>
                <div className="bg-white p-2.5 rounded border border-slate-200 text-[11px] font-mono text-slate-600">
                  Exemplo: Campanhas antirracistas no Canva Edu, segurança em redes sociais, e-books e podcasting comunitário.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'labs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-emerald-900 block text-xs">1. Sala Maker</span>
                <p className="text-[11px] text-slate-600">
                  Ferramentas manuais, eletrônica básica, sucata reciclável e montagem física.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-emerald-900 block text-xs">2. Sala RV/RA</span>
                <p className="text-[11px] text-slate-600">
                  Óculos de Realidade Virtual, tours 3D amazônicos e modelagem de ambientes imersivos.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-emerald-900 block text-xs">3. Sala de Programação</span>
                <p className="text-[11px] text-slate-600">
                  Chromebooks, Scratch, Python, HTML/CSS e desenvolvimento de jogos/apps.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-emerald-900 block text-xs">4. Sala de Robótica</span>
                <p className="text-[11px] text-slate-600">
                  Kits Micro:bit, Arduino, atuadores, servomotores e automação ambiental.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-emerald-900 block text-xs">5. Fabricação Digital</span>
                <p className="text-[11px] text-slate-600">
                  Impressoras 3D, Cortadoras a Laser e prototipagem em MDF/filamento biodegradável.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-emerald-900 block text-xs">6. Sala de Inteligência Artificial</span>
                <p className="text-[11px] text-slate-600">
                  Visão computacional, Teachable Machine, prompts éticos e processamento de dados.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'modalities' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block text-xs">EJA (Educação de Jovens e Adultos)</span>
                <p className="text-[11px] font-normal text-slate-600">
                  Inclusão digital voltada para autonomia no mercado de trabalho e letramento no ecossistema de serviços do cidadão.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block text-xs">Educação Especial</span>
                <p className="text-[11px] font-normal text-slate-600">
                  Uso de tecnologias assistivas (teclados adaptados, leitores de tela e comunicação alternativa) promovendo acessibilidade.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block text-xs">Educação do Campo, das Águas e Florestas (ECAF)</span>
                <p className="text-[11px] font-normal text-slate-600">
                  Soluções desconectadas (desplugadas) ou resilientes para rios e marés, acervos e mídias comunitárias.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block text-xs">Educação Indígena e Quilombola</span>
                <p className="text-[11px] font-normal text-slate-600">
                  Registros em línguas maternas, fortalecimento intercultural, pedagogia antirracista e preservação do patrimônio imaterial.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs transition-colors"
          >
            Fechar Guia
          </button>
        </div>
      </div>
    </div>
  );
};
