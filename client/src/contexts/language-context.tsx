import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pt' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Navigation
    'nav.inicio': 'Início',
    'nav.sobre': 'Sobre',
    'nav.programas': 'Programas',
    'nav.mensalidades': 'Mensalidades',
    'nav.tour': 'Tour Virtual',
    'nav.contato': 'Contato',
    'nav.agendar': 'Agendar Visita',
    'nav.calculadora': 'Calculadora',
    'nav.idioma': 'Idioma',
    'nav.tema': 'Alternar tema',
    
    // Hero Section
    'hero.title': 'Escola Fenda da Tundavala',
    'hero.subtitle': 'Conectando Angola e China através da educação de excelência',
    'hero.agendar_visita': 'Agendar Visita',
    'hero.calculadora': 'Calculadora',
    'hero.tour_virtual': 'Tour Virtual',
    
    // About Section
    'about.title': 'Sobre a Escola',
    'about.subtitle': 'Construindo pontes entre culturas através da educação de qualidade',
    'about.description': 'A Escola Fenda da Tundavala é uma instituição pioneira que conecta estudantes angolanos e chineses através de programas educacionais inovadores, promovendo intercâmbio cultural e excelência acadêmica.',
    'about.missao': 'Nossa Missão',
    'about.missao_desc': 'Formar cidadãos globais preparados para os desafios do século XXI através de uma educação bilíngue e multicultural.',
    'about.intercambio': 'Intercâmbio Cultural',
    'about.intercambio_desc': 'Programa único de intercâmbio que conecta estudantes angolanos e chineses, promovendo compreensão cultural e colaboração internacional.',
    'about.excelencia': 'Excelência Acadêmica',
    'about.excelencia_desc': 'Currículo internacional reconhecido, preparando estudantes para universidades de prestígio em Angola, China e no mundo.',
    'about.comunidade': 'Comunidade Diversa',
    'about.comunidade_desc': 'Ambiente inclusivo que celebra a diversidade cultural e promove o desenvolvimento integral dos nossos estudantes.',
    
    // Programs Section
    'programs.title': 'Nossos Programas',
    'programs.subtitle': 'Programas educacionais de excelência para todas as idades',
    'programs.primario': 'Ensino Primário',
    'programs.primario_desc': 'Base sólida com educação bilíngue português-chinês e metodologias modernas.',
    'programs.secundario': 'Ensino Secundário',
    'programs.secundario_desc': 'Preparação para o ensino superior com foco em ciências, tecnologia e humanidades.',
    'programs.intercambio': 'Programa de Intercâmbio',
    'programs.intercambio_desc': 'Oportunidades exclusivas de estudo na China e intercâmbio cultural.',
    
    // Contact
    'contact.title': 'Entre em Contato',
    'contact.subtitle': 'Estamos aqui para ajudar com suas dúvidas e informações',
    'contact.nome': 'Nome',
    'contact.email': 'Email',
    'contact.telefone': 'Telefone',
    'contact.mensagem': 'Mensagem',
    'contact.enviar': 'Enviar Mensagem',
    
    // Footer
    'footer.descricao': 'Conectando Angola e China através da educação de excelência.',
    'footer.links_rapidos': 'Links Rápidos',
    'footer.contato': 'Contato',
    'footer.seguir': 'Siga-nos',
    'footer.direitos': 'Todos os direitos reservados.',
    
    // Stats
    'stats.estudantes': 'Estudantes',
    'stats.professores': 'Professores',
    'stats.programas': 'Programas',
    'stats.parceiros': 'Parceiros',
    
    // Virtual Tour
    'tour.title': 'Tour Virtual',
    'tour.subtitle': 'Explore nossas instalações modernas',
    'tour.classroom': 'Sala de Aula Principal',
    'tour.laboratory': 'Laboratório de Ciências',
    'tour.library': 'Biblioteca Central',
    'tour.sports': 'Centro Desportivo',
    'tour.visit': 'Começar Tour',
    
    // Gallery
    'gallery.title': 'Galeria',
    'gallery.subtitle': 'Momentos especiais da nossa comunidade escolar',
    'gallery.ver_mais': 'Ver Mais',
    
    // News
    'news.title': 'Notícias',
    'news.subtitle': 'Fique por dentro das novidades da escola',
    'news.ler_mais': 'Ler Mais',
    'news.intercambio': 'Intercâmbio',
    'news.educacao': 'Educação',
    'news.eventos': 'Eventos',
    
    // Tuition Calculator
    'tuition.title': 'Calculadora de Mensalidades',
    'tuition.subtitle': 'Calcule o valor das mensalidades para seu plano educacional',
    'tuition.nivel': 'Nível de Ensino',
    'tuition.primario': 'Ensino Primário',
    'tuition.secundario': 'Ensino Secundário',
    'tuition.intercambio': 'Programa de Intercâmbio',
    'tuition.estudantes': 'Número de Estudantes',
    'tuition.pagamento': 'Modalidade de Pagamento',
    'tuition.mensal': 'Mensal',
    'tuition.trimestral': 'Trimestral',
    'tuition.semestral': 'Semestral',
    'tuition.anual': 'Anual',
    'tuition.desconto': 'Desconto por Pagamento Antecipado',
    'tuition.calcular': 'Calcular',
    'tuition.resultado': 'Resultado do Cálculo',
    'tuition.valor_base': 'Valor Base',
    'tuition.desconto_total': 'Desconto Total',
    'tuition.valor_final': 'Valor Final',
    
    // Visit Scheduler
    'visit.title': 'Agendar Visita',
    'visit.subtitle': 'Venha conhecer nossa escola pessoalmente',
    'visit.nome': 'Nome Completo',
    'visit.email': 'Email',
    'visit.telefone': 'Telefone',
    'visit.data': 'Data da Visita',
    'visit.horario': 'Horário',
    'visit.tipo': 'Tipo de Visita',
    'visit.tour_instalacoes': 'Tour pelas Instalações',
    'visit.reuniao_direcao': 'Reunião com a Direção',
    'visit.processo_matricula': 'Processo de Matrícula',
    'visit.tamanho_grupo': 'Tamanho do Grupo',
    'visit.observacoes': 'Observações Especiais',
    'visit.agendar': 'Agendar Visita',
    'visit.sucesso': 'Visita Agendada!',
    'visit.erro': 'Erro ao Agendar',
    
    // Contact Form Additional
    'contact.assunto': 'Assunto',
    'contact.admissao': 'Admissão',
    'contact.informacoes': 'Informações Gerais',
    'contact.outro': 'Outro',
    'contact.localizacao': 'Localização',
    'contact.horario': 'Horário de Funcionamento',
    'contact.horario_desc': 'Segunda - Sexta: 7:00 - 17:00',
    'contact.sabado': 'Sábado: 8:00 - 12:00',
    
    // Virtual Tour Buttons
    'tour.salas_aula': 'Salas de Aula',
    'tour.laboratorios': 'Laboratórios',
    'tour.biblioteca': 'Biblioteca',
    'tour.desportos': 'Desportos',
    'tour.iniciar': 'Iniciar Tour Virtual',
    
    // News Articles
    'news.btn_ler_mais': 'Ler mais',
  },
  zh: {
    // Navigation
    'nav.inicio': '首页',
    'nav.sobre': '关于我们',
    'nav.programas': '课程项目',
    'nav.mensalidades': '学费计算',
    'nav.tour': '虚拟参观',
    'nav.contato': '联系我们',
    'nav.agendar': '预约参观',
    'nav.calculadora': '计算器',
    'nav.idioma': '语言',
    'nav.tema': '切换主题',
    
    // Hero Section
    'hero.title': '东达拉裂缝学校',
    'hero.subtitle': '通过优质教育连接安哥拉和中国',
    'hero.agendar_visita': '预约参观',
    'hero.calculadora': '计算器',
    'hero.tour_virtual': '虚拟参观',
    
    // About Section
    'about.title': '关于学校',
    'about.subtitle': '通过优质教育搭建文化桥梁',
    'about.description': '东达拉裂缝学校是一所先进的教育机构，通过创新的教育项目连接安哥拉和中国学生，促进文化交流和学术卓越。',
    'about.missao': '我们的使命',
    'about.missao_desc': '通过双语和多元文化教育，培养准备好应对21世纪挑战的全球公民。',
    'about.intercambio': '文化交流',
    'about.intercambio_desc': '独特的交流项目连接安哥拉和中国学生，促进文化理解和国际合作。',
    'about.excelencia': '学术卓越',
    'about.excelencia_desc': '国际认可的课程，为学生进入安哥拉、中国和世界各地的知名大学做准备。',
    'about.comunidade': '多元社区',
    'about.comunidade_desc': '包容的环境，庆祝文化多样性，促进学生的全面发展。',
    
    // Programs Section
    'programs.title': '我们的课程',
    'programs.subtitle': '面向所有年龄段的优质教育项目',
    'programs.primario': '小学教育',
    'programs.primario_desc': '采用现代教学法的葡萄牙语-中文双语教育，奠定坚实基础。',
    'programs.secundario': '中学教育',
    'programs.secundario_desc': '专注于科学、技术和人文学科的高等教育预备课程。',
    'programs.intercambio': '交流项目',
    'programs.intercambio_desc': '在中国学习和文化交流的独特机会。',
    
    // Contact
    'contact.title': '联系我们',
    'contact.subtitle': '我们随时为您的问题和咨询提供帮助',
    'contact.nome': '姓名',
    'contact.email': '电子邮件',
    'contact.telefone': '电话',
    'contact.mensagem': '留言',
    'contact.enviar': '发送消息',
    
    // Footer
    'footer.descricao': '通过优质教育连接安哥拉和中国。',
    'footer.links_rapidos': '快速链接',
    'footer.contato': '联系方式',
    'footer.seguir': '关注我们',
    'footer.direitos': '版权所有。',
    
    // Stats
    'stats.estudantes': '学生',
    'stats.professores': '教师',
    'stats.programas': '项目',
    'stats.parceiros': '合作伙伴',
    
    // Virtual Tour
    'tour.title': '虚拟参观',
    'tour.subtitle': '探索我们的现代化设施',
    'tour.classroom': '主教室',
    'tour.laboratory': '科学实验室',
    'tour.library': '中央图书馆',
    'tour.sports': '体育中心',
    'tour.visit': '开始参观',
    
    // Gallery
    'gallery.title': '图片库',
    'gallery.subtitle': '我们学校社区的特殊时刻',
    'gallery.ver_mais': '查看更多',
    
    // News
    'news.title': '新闻',
    'news.subtitle': '了解学校最新动态',
    'news.ler_mais': '阅读更多',
    'news.intercambio': '交流项目',
    'news.educacao': '教育',
    'news.eventos': '活动',
    
    // Tuition Calculator
    'tuition.title': '学费计算器',
    'tuition.subtitle': '计算您教育计划的学费金额',
    'tuition.nivel': '教育级别',
    'tuition.primario': '小学教育',
    'tuition.secundario': '中学教育',
    'tuition.intercambio': '交流项目',
    'tuition.estudantes': '学生人数',
    'tuition.pagamento': '付款方式',
    'tuition.mensal': '月付',
    'tuition.trimestral': '季付',
    'tuition.semestral': '半年付',
    'tuition.anual': '年付',
    'tuition.desconto': '提前付款折扣',
    'tuition.calcular': '计算',
    'tuition.resultado': '计算结果',
    'tuition.valor_base': '基础价值',
    'tuition.desconto_total': '总折扣',
    'tuition.valor_final': '最终价值',
    
    // Visit Scheduler
    'visit.title': '预约参观',
    'visit.subtitle': '欢迎亲自了解我们的学校',
    'visit.nome': '全名',
    'visit.email': '电子邮件',
    'visit.telefone': '电话',
    'visit.data': '参观日期',
    'visit.horario': '时间',
    'visit.tipo': '参观类型',
    'visit.tour_instalacoes': '设施参观',
    'visit.reuniao_direcao': '与管理层会面',
    'visit.processo_matricula': '报名流程',
    'visit.tamanho_grupo': '团体规模',
    'visit.observacoes': '特殊要求',
    'visit.agendar': '预约参观',
    'visit.sucesso': '参观已预约！',
    'visit.erro': '预约错误',
    
    // Contact Form Additional
    'contact.assunto': '主题',
    'contact.admissao': '入学',
    'contact.informacoes': '一般信息',
    'contact.outro': '其他',
    'contact.localizacao': '位置',
    'contact.horario': '营业时间',
    'contact.horario_desc': '周一至周五：7:00 - 17:00',
    'contact.sabado': '周六：8:00 - 12:00',
    
    // Virtual Tour Buttons
    'tour.salas_aula': '教室',
    'tour.laboratorios': '实验室',
    'tour.biblioteca': '图书馆',
    'tour.desportos': '体育',
    'tour.iniciar': '开始虚拟参观',
    
    // News Articles
    'news.btn_ler_mais': '阅读更多',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['pt', 'zh'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}