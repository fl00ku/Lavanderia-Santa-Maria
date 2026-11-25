export interface LaundryService {
  id: string;
  index: string;
  title: string;
  category: 'casa' | 'social' | 'diario';
  categoryLabel: string;
  description: string;
}

export interface LaundryPackage {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  accentColor: 'blue' | 'pink';
}

export interface LaundryAdvantage {
  index: string;
  title: string;
  description: string;
}

export interface GoogleReview {
  id: string;
  author: string;
  context: string;
  quote: string;
}

export interface StorePhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const BUSINESS_INFO = {
  name: 'Lavanderia Santa Maria',
  shortTagline: 'Lavanderia Delivery em São Bernardo do Campo',
  yearsActive: 7,
  whatsappNumber: '5511979826257',
  whatsappDisplay: '(11) 97982-6257',
  whatsappBaseUrl: 'https://wa.me/5511979826257',
  whatsappSecondaryNumber: '5511987686470',
  whatsappSecondaryDisplay: '(11) 98768-6470',
  whatsappSecondaryBaseUrl: 'https://wa.me/5511987686470',
  email: 'pmauriceia@yahoo.com.br',
  address: 'R. Nossa Sra. de Fátima, 221 - Vila Alves Dias, São Bernardo do Campo - SP, 09851-580',
  streetLine: 'R. Nossa Sra. de Fátima, 221 — Vila Alves Dias',
  cityLine: 'São Bernardo do Campo, SP · CEP 09851-580',
  googleRating: '4,8',
  googleRatingMax: '5',
  hours: [
    { day: 'Segunda a sexta', time: '08h às 18h' },
    { day: 'Sábado', time: '09h às 13h' },
    { day: 'Domingo', time: 'Fechado' },
  ],
  assets: {
    logo: '/assets/aistudio/IMG_2841_1e1aba6e.jpeg',
    heroBanner: '/assets/aistudio/146794389_1795576243654066_469f894e.jpeg',
    receptionPhoto: '/assets/aistudio/IMG_2843_0959c4ee.jpeg',
    storefrontPhoto: '/assets/aistudio/IMG_2852_bc897fd7.jpeg',
    deliveryCarPhoto: '/assets/aistudio/IMG_2851_900f55af.jpeg',
    packagedHangingPhoto: '/assets/aistudio/IMG_2848_b2361b7c.jpeg',
    beddingPhoto: '/assets/aistudio/IMG_2855_c9b70305.jpeg',
    suitsShirtsPhoto: '/assets/aistudio/IMG_2850_0a2516ca.jpeg',
  },
} as const;

export const LAUNDRY_SERVICES: LaundryService[] = [
  {
    id: 'edredons',
    index: '01',
    title: 'Lavagem de edredons',
    category: 'casa',
    categoryLabel: 'Cama e Casa',
    description:
      'Higienização profunda para solteiro, casal, queen e king, preservando volume e maciez.',
  },
  {
    id: 'camisas-sociais',
    index: '02',
    title: 'Camisas sociais',
    category: 'social',
    categoryLabel: 'Linha Social',
    description:
      'Cuidado com golas, punhos e remoção de manchas, com passadoria alinhada.',
  },
  {
    id: 'ternos',
    index: '03',
    title: 'Ternos',
    category: 'social',
    categoryLabel: 'Linha Social',
    description:
      'Tratamento delicado que preserva a estrutura dos ombros e o caimento do tecido.',
  },
  {
    id: 'cobertores',
    index: '04',
    title: 'Cobertores',
    category: 'casa',
    categoryLabel: 'Cama e Casa',
    description:
      'Lavagem completa e secagem controlada para devolver frescor às peças de frio.',
  },
  {
    id: 'cortinas',
    index: '05',
    title: 'Cortinas',
    category: 'casa',
    categoryLabel: 'Cama e Casa',
    description:
      'Limpeza de tecidos leves e pesados sem danificar a trama original.',
  },
  {
    id: 'jeans',
    index: '06',
    title: 'Jeans',
    category: 'diario',
    categoryLabel: 'Dia a Dia',
    description:
      'Lavagem adequada para calças e jaquetas em denim, mantendo cor e durabilidade.',
  },
  {
    id: 'camisetas',
    index: '07',
    title: 'Camisetas',
    category: 'diario',
    categoryLabel: 'Dia a Dia',
    description:
      'Separação criteriosa por cores para evitar desgaste e preservar estampas.',
  },
  {
    id: 'tenis',
    index: '08',
    title: 'Tênis',
    category: 'diario',
    categoryLabel: 'Dia a Dia',
    description:
      'Limpeza técnica de cabedal, solado e cadarços com secagem segura.',
  },
  {
    id: 'roupas-geral',
    index: '09',
    title: 'Lavagem de roupas em geral',
    category: 'diario',
    categoryLabel: 'Dia a Dia',
    description:
      'Roupas do dia a dia lavadas, cheirosas, dobradas e prontas para guardar.',
  },
];

export const LAUNDRY_PACKAGES: LaundryPackage[] = [
  {
    id: 'mensal',
    index: '01',
    title: 'Plano Mensal',
    subtitle: 'Rotina individual e profissional',
    description:
      'Para quem busca praticidade contínua com frequência semanal ou quinzenal de roupas comuns e camisas sociais.',
    highlights: [
      'Frequência flexível de coleta e entrega',
      'Combinação personalizada de peças',
    ],
    accentColor: 'blue',
  },
  {
    id: 'familia',
    index: '02',
    title: 'Plano Família',
    subtitle: 'Residências com maior volume',
    description:
      'Pensado para atender toda a casa, reunindo vestuário diário, toalhas e roupas de cama em um único fluxo.',
    highlights: [
      'Agendamento programado de delivery',
      'Peças separadas e dobradas por ambiente',
    ],
    accentColor: 'pink',
  },
  {
    id: 'corporativo',
    index: '03',
    title: 'Plano Corporativo',
    subtitle: 'Empresas, clínicas e escritórios',
    description:
      'Atendimento dedicado para uniformes, jalecos e enxovais profissionais em São Bernardo do Campo.',
    highlights: [
      'Prazos alinhados à rotina da equipe',
      'Proposta sob medida conforme demanda',
    ],
    accentColor: 'blue',
  },
];

export const LAUNDRY_ADVANTAGES: LaundryAdvantage[] = [
  {
    index: '01',
    title: 'Qualidade',
    description:
      'Produtos selecionados e processo adequado a cada fibra para limpar sem agredir os tecidos.',
  },
  {
    index: '02',
    title: 'Agilidade',
    description:
      'Prazos claros e fluxo organizado para devolver suas peças no tempo combinado.',
  },
  {
    index: '03',
    title: 'Disponibilidade',
    description:
      'Atendimento de segunda a sexta (08h às 18h) e sábado (09h às 13h) via WhatsApp.',
  },
  {
    index: '04',
    title: 'Atendimento personalizado',
    description:
      'Atenção individual a manchas delicadas, tecidos especiais e preferências de cuidado.',
  },
  {
    index: '05',
    title: 'Delivery',
    description:
      'Coleta e entrega práticas em São Bernardo do Campo para mais conforto na sua rotina.',
  },
];

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'cristiane-almeida',
    author: 'Cristiane Almeida',
    context: 'Google · Edredons e cobertas',
    quote:
      'Acho que nunca vi minhas cobertas tão limpas e cheirosas. O edredom parece até novo!',
  },
  {
    id: 'elaine-morais',
    author: 'Elaine Morais',
    context: 'Google · Atendimento e toalhas',
    quote:
      'Minhas toalhas sempre voltam maravilhosas. Atendimento carinhoso e preço justo.',
  },
  {
    id: 'gabriella-panisso',
    author: 'Gabriella Ramos Panisso',
    context: 'Google · Coleta e entrega',
    quote:
      'Ótimo atendimento. Coletaram e entregaram sem custo adicional. Preço justo.',
  },
  {
    id: 'elaine-carvalho',
    author: 'Elaine Carvalho',
    context: 'Google · Remoção de manchas',
    quote:
      'Minhas blusinhas sociais com manchas de desodorante voltaram limpas, perfeitas e impecáveis.',
  },
  {
    id: 'erika-prado',
    author: 'Érika do Prado',
    context: 'Google · Qualidade e perfume',
    quote:
      'Top demais, caprichosos, trabalho com qualidade, perfumado demais, fiquei super satisfeita.',
  },
  {
    id: 'erica-prin',
    author: 'Érica Prin',
    context: 'Google · Atendimento e qualidade',
    quote:
      'Ótimo atendimento, serviço de ótima qualidade, super indico.',
  },
  {
    id: 'monica-santos',
    author: 'Monica Santos',
    context: 'Google · Ambiente e equipe',
    quote:
      'Um lugar agradável, com pessoas competentes.',
  },
];

export const STORE_GALLERY: StorePhoto[] = [
  {
    id: 'recepcao',
    src: BUSINESS_INFO.assets.receptionPhoto,
    alt: 'Recepção da Lavanderia Santa Maria na Vila Alves Dias em São Bernardo do Campo',
    caption: 'Recepção e atendimento na Vila Alves Dias',
  },
  {
    id: 'frente-loja',
    src: BUSINESS_INFO.assets.storefrontPhoto,
    alt: 'Fachada e entrada da Lavanderia Santa Maria na Rua Nossa Senhora de Fátima, 221',
    caption: 'Frente da loja · R. Nossa Sra. de Fátima, 221',
  },
  {
    id: 'carro-delivery',
    src: BUSINESS_INFO.assets.deliveryCarPhoto,
    alt: 'Veículo oficial de coleta e entrega delivery da Lavanderia Santa Maria',
    caption: 'Veículo próprio para coleta e entrega delivery',
  },
  {
    id: 'pecas-embaladas',
    src: BUSINESS_INFO.assets.packagedHangingPhoto,
    alt: 'Peças higienizadas, embaladas e identificadas em cabides e pacotes na Lavanderia Santa Maria',
    caption: 'Peças embaladas e identificadas por cliente',
  },
  {
    id: 'edredons-embalados',
    src: BUSINESS_INFO.assets.beddingPhoto,
    alt: 'Edredons e cobertores higienizados, embalados e etiquetados por cliente na Lavanderia Santa Maria',
    caption: 'Edredons e cobertores higienizados e etiquetados',
  },
  {
    id: 'ternos-camisas',
    src: BUSINESS_INFO.assets.suitsShirtsPhoto,
    alt: 'Ternos, blazers e camisas sociais protegidos em capas plásticas na Lavanderia Santa Maria',
    caption: 'Ternos e camisas sociais prontos para retirada',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-delivery',
    question: 'Como funciona o delivery em São Bernardo do Campo?',
    answer:
      'Você envia sua lista de peças pelo WhatsApp e combinamos o melhor horário para coleta e entrega no seu endereço, dentro do nosso horário de atendimento.',
  },
  {
    id: 'faq-valores',
    question: 'Como consulto os valores e o prazo de entrega?',
    answer:
      'Como cada peça tem tamanho, tecido e necessidade específica, passamos o orçamento e o prazo exato rapidamente pelo WhatsApp assim que você informa os itens.',
  },
  {
    id: 'faq-pecas',
    question: 'Vocês lavam edredons, cortinas, ternos e tênis?',
    answer:
      'Sim. Atendemos edredons, cobertores, cortinas, ternos, camisas sociais, jeans, camisetas, tênis e roupas do dia a dia com processos adequados a cada material.',
  },
  {
    id: 'faq-garantia',
    question: 'Como funciona a garantia de cuidado com as roupas?',
    answer:
      'Todas as peças passam por conferência individual na entrada e na entrega. Caso alguma mancha ou acabamento precise de atenção extra, reavaliamos o cuidado sem custo.',
  },
  {
    id: 'faq-pacotes',
    question: 'Como contratar os pacotes Mensal, Família ou Corporativo?',
    answer:
      'Os pacotes são montados sob consulta conforme sua frequência e volume de peças. Basta chamar no WhatsApp para receber uma proposta personalizada.',
  },
];
