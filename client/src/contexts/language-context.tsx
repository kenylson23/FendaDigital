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