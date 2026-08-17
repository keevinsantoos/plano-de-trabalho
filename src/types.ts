export interface CisebSessionPlan {
  id: string;
  createdAt: string;
  updatedAt: string;
  
  // 1. Modalidade de Atendimento
  modalidade: string;
  
  // 2. Unidade CISEB
  unidadeCiseb: string;
  
  // 3. Professor(a) Formador(a)
  professorFormador: string;
  
  // 4. Tema de Imersão
  temaImersao: string;
  
  // 5. Informações Gerais
  tituloSuporte: string;
  cargaHorariaAulas: string; // e.g., "4 aulas (4h)"
  turmaParticipante: string; // "Atendimentos", "Fixa", "Itinerância"
  
  // 6. Alinhamento Pedagógico
  bnccCompetencias: string[]; // Competências BNCC Computação
  bnccHabilidadesEixo: string[]; // Eixos BNCC
  odsAplicada: string[]; // ODS
  trilhaImersao: string; // Trilha temática
  
  // 7. Etapas Metodológicas (Design Thinking)
  fase1Empatia: string;
  fase2TempestadeIdeias: string;
  fase3PrototipagemSolucao: string;
  
  // 8. Detalhes de Execução Técnica
  tipoPrototipo: string; // Físico, Digital, 3D, Automatizado, IA, Outros
  recursosDidaticosTecnologicos: string;
  roteiroPedagógico: string; // Passo a passo da construção
  expectativaAprendizagem: string;

  // Additional context / observations
  publicoAlvoDetalhamento?: string;
  observacoes?: string;
}

export const MODALIDADES_OPTIONS = [
  'Imersão para Estudantes',
  'Formação de Professores',
  'Mentoria',
  'Visita Técnica',
  'Itinerância',
  'Turmas Fixas',
] as const;

export const UNIDADES_CISEB_OPTIONS = [
  'CISEB EE ADELIA CARVALHO SODRE',
  'CISEB EE AUGUSTO MEIRA',
  'CISEB EE BARÃO DO RIO BRANCO',
  'CISEB EE CELSO RODRIGUES',
  'CISEB EE CORDEIRO DE FARIAS',
  'CISEB EE DR FÁBIO LUZ - SANTA IZABEL DO PARA',
  'CISEB EE DR GASPAR VIANA - MARABA',
  'CISEB EE IZIDORIO FRANCISCO DE SOUZA - MARACANA',
  'CISEB EE JOSE DE ALENCAR - SANTAREM',
  'CISEB EE MACÁRIO DANTAS - MARABA',
  'CISEB EE MESTRA IDALINA RODRIGUES PEREIRA',
  'CISEB EE O PEQUENO PRINCÍPE',
  'CISEB EE PAULINO DE BRITO - PORTEL/BREVES',
  'CISEB EE PEDRO AMAZONAS PEDROSO',
  'CISEB EE RUY PARANATINGA BARATA',
] as const;

export const PROFESSORES_FORMADORES_OPTIONS = [
  'ALESSANDRA MUHKINA JASTES GONCALVES',
  'ALEXANDRE DE QUEIROZ MENDES',
  'ANNY NAYARA SILVA LOPES',
  'AYVANIA ALVES PINTO',
  'CARLOS ALBERTO BRITO DE SOUZA',
  'CARLOS ALBERTO DA CRUZ VIANA JUNIOR',
  'DILSON DOS SANTOS AIRES',
  'ELIEZER LOPES MENEZES FILHO',
  'FABIO JORGE DE NAZARE FERREIRA',
  'FELIPE DE AVIZ BATISTA',
  'FERNANDO EMANUEL CARDOSO PEREIRA',
  'HERICTON JOAO DA COSTA RAIOL',
  'IONE MARIA CAMARA DA SILVA',
  'IVANESSA SOLON SILVEIRA',
  'JACQUELINE FERNANDES DE SÁ XAVIER',
  'JOHN ALLEF ALVES VIEIRA',
  'JOSUE MOREIRA DE SOUZA',
  'LENNON MARTINS PEREIRA',
  'LUANA FRANÇA CALANDRINI DE AZEVEDO',
  'LUCIANA DA FONSECA',
  'MARCELLE ROLIM DE SOUZA LIMA',
  'MARCELO DE LIMA LOPES',
  'MARCUS VINICIUS MOURA DE OLIVEIRA',
  'MARIA ELIANE DE OLIVEIRA',
  'MARLON PANTOJA CORREA',
  'MONICA LORENA MOREIRA',
  'MONICA SELENE GONÇALVES',
  'SILVIO CHARLES PEREIRA MARINHO',
  'THIAGO MIRANDA COSTA',
  'WANDERSON ALVES MONTEIRO',
] as const;

export const TEMAS_IMERSAO_OPTIONS = [
  'Cultura Digital',
  'Realidade Virtual e Aumentada',
  'Cultura Maker',
  'Inteligência Artificial',
  'Programação Criativa',
  'Prototipagem e Fabricação Digital',
  'Robótica e Modelagem',
] as const;

export const TURMA_PARTICIPANTE_OPTIONS = [
  'Atendimentos',
  'Fixa',
  'Itinerância',
] as const;

export const BNCC_COMPETENCIAS_OPTIONS = [
  'Compreensão do Mundo Digital',
  'Pensamento Computacional',
  'Uso Crítico e Ético da Tecnologia',
  'Criação e Autoria Digital',
  'Cidadania Digital',
] as const;

export const BNCC_EIXOS_HABILIDADES_OPTIONS = [
  'Pensamento Computacional',
  'Mundo Digital',
  'Cultura Digital',
] as const;

export const ODS_OPTIONS = [
  'ODS 04 - Educação de Qualidade',
  'ODS 09 - Indústria e Inovação',
  'ODS 11 - Cidades Sustentáveis',
  'ODS 12 - Consumo Responsável',
  'ODS 13 - Ação Climática',
] as const;

export const TRILHAS_IMERSAO_OPTIONS = [
  'Reciclagem e Resíduos Sólidos',
  'Reflorestamento e Recomposição Vegetação Nativa',
  'Clima e Mudança Climática',
  'Combate à Violência contra a Mulher',
  'Antirracismo',
] as const;

export const TIPO_PROTOTIPO_OPTIONS = [
  'Físico',
  'Digital',
  'Automatizado',
  'Outros',
] as const;

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
