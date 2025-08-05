import { useState, useEffect } from "react";
import { GraduationCap, Menu, X, Calendar, Home, Info, BookOpen, Calculator, Camera, Mail, User, Search, ChevronDown, Globe, Sun, Moon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import StudentPortalModal from "@/components/student-portal-modal";

// Navigation Button Component
const NavButton = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-angola-blue dark:hover:text-china-yellow hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 font-medium"
  >
    <Icon className="h-4 w-4" />
    <span className="text-sm">{label}</span>
  </motion.button>
);

// Mobile Navigation Button Component
const MobileNavButton = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-angola-blue dark:hover:text-china-yellow hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 font-medium"
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </motion.button>
);

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl border-b border-gray-200/20 dark:border-gray-700/20' 
          : 'bg-white dark:bg-gray-900 shadow-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link href="/" className="flex items-center group">
              <div className="relative mr-3 sm:mr-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-angola-blue via-blue-600 to-china-yellow rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  <GraduationCap className="text-white" size={20} />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-china-yellow rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight truncate">
                  Escola Fenda da Tundavala
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                    Angola
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    China
                  </span>
                </div>
                <div className="sm:hidden text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Angola • China
                </div>
              </div>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation with Collapse Toggle */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* Navigation Toggle Button */}
            <motion.button
              onClick={() => setIsNavCollapsed(!isNavCollapsed)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mr-2"
              title={isNavCollapsed ? "Mostrar navegação" : "Ocultar navegação"}
            >
              <motion.div
                animate={{ rotate: isNavCollapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isNavCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </motion.div>
            </motion.button>

            {/* Navigation Links */}
            <AnimatePresence>
              {!isNavCollapsed && (
                <motion.div 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex items-center space-x-2 overflow-hidden"
                >
                  {location === "/" ? (
                    <>
                      <NavButton icon={Home} label={t('nav.inicio')} onClick={() => scrollToSection("home")} />
                      <NavButton icon={Info} label={t('nav.sobre')} onClick={() => scrollToSection("about")} />
                      <NavButton icon={BookOpen} label={t('nav.programas')} onClick={() => scrollToSection("programs")} />
                      <NavButton icon={Calculator} label={t('nav.mensalidades')} onClick={() => scrollToSection("calculator")} />
                      <NavButton icon={Camera} label={t('nav.tour')} onClick={() => scrollToSection("tour")} />
                      <NavButton icon={Mail} label={t('nav.contato')} onClick={() => scrollToSection("contact")} />
                    </>
                  ) : (
                    <Link href="/">
                      <NavButton icon={Home} label={`← ${t('nav.inicio')}`} />
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Compact Navigation (when collapsed) - Show only icons */}
            {isNavCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-1"
              >
                {location === "/" ? (
                  <>
                    <motion.button
                      onClick={() => scrollToSection("home")}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-angola-blue dark:hover:text-china-yellow hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                      title={t('nav.inicio')}
                    >
                      <Home className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => scrollToSection("about")}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-angola-blue dark:hover:text-china-yellow hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                      title={t('nav.sobre')}
                    >
                      <Info className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => scrollToSection("programs")}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-angola-blue dark:hover:text-china-yellow hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                      title={t('nav.programas')}
                    >
                      <BookOpen className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => scrollToSection("calculator")}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-angola-blue dark:hover:text-china-yellow hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                      title={t('nav.mensalidades')}
                    >
                      <Calculator className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => scrollToSection("tour")}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-angola-blue dark:hover:text-china-yellow hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                      title={t('nav.tour')}
                    >
                      <Camera className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => scrollToSection("contact")}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-angola-blue dark:hover:text-china-yellow hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                      title={t('nav.contato')}
                    >
                      <Mail className="h-4 w-4" />
                    </motion.button>
                  </>
                ) : (
                  <Link href="/">
                    <motion.button
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-angola-blue dark:hover:text-china-yellow hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                      title={`← ${t('nav.inicio')}`}
                    >
                      <Home className="h-4 w-4" />
                    </motion.button>
                  </Link>
                )}
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/agendar-visita">
                <Button className="bg-gradient-to-r from-angola-blue to-china-yellow text-white hover:from-blue-700 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl rounded-full px-6 py-2.5 font-semibold">
                  <Calendar className="mr-2 h-4 w-4" />
                  {t('nav.agendar')}
                </Button>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={() => setIsPortalModalOpen(true)}
                variant="outline"
                className="border-2 border-angola-blue text-angola-blue hover:bg-angola-blue hover:text-white transition-all duration-300 rounded-full px-6 py-2.5 font-semibold"
              >
                <User className="mr-2 h-4 w-4" />
                Portal
              </Button>
            </motion.div>

            {/* Additional Action Buttons */}
            <div className="flex items-center space-x-2 ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Pesquisar"
              >
                <Search className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setLanguage(language === 'pt' ? 'zh' : 'pt')}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
                title={t('nav.idioma')}
              >
                <Globe className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                <span className="absolute -top-1 -right-1 text-xs font-bold text-gray-700 dark:text-gray-300 bg-china-yellow rounded-full w-4 h-4 flex items-center justify-center">
                  {language === 'pt' ? '中' : 'PT'}
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title={t('nav.tema')}
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Moon className="h-4 w-4 text-gray-600" />
                )}
              </motion.button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/20 dark:border-gray-700/20 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {location === "/" ? (
                <>
                  <MobileNavButton icon={Home} label="Início" onClick={() => scrollToSection("home")} />
                  <MobileNavButton icon={Info} label="Sobre" onClick={() => scrollToSection("about")} />
                  <MobileNavButton icon={BookOpen} label="Programas" onClick={() => scrollToSection("programs")} />
                  <MobileNavButton icon={Calculator} label="Mensalidades" onClick={() => scrollToSection("calculator")} />
                  <MobileNavButton icon={Camera} label="Tour Virtual" onClick={() => scrollToSection("tour")} />
                  <MobileNavButton icon={Mail} label="Contato" onClick={() => scrollToSection("contact")} />
                </>
              ) : (
                <Link href="/">
                  <MobileNavButton icon={Home} label="← Voltar ao Início" />
                </Link>
              )}
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <Link href="/agendar-visita">
                  <motion.button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-angola-blue to-china-yellow text-white rounded-xl font-semibold shadow-lg"
                  >
                    <Calendar className="h-5 w-5" />
                    Agendar Visita
                  </motion.button>
                </Link>
                
                <motion.button 
                  onClick={() => {
                    setIsPortalModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-4 py-3 mt-3 border-2 border-angola-blue text-angola-blue rounded-xl font-semibold hover:bg-angola-blue hover:text-white transition-colors"
                >
                  <User className="h-5 w-5" />
                  Portal
                </motion.button>
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex justify-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  title="Pesquisar"
                >
                  <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLanguage(language === 'pt' ? 'zh' : 'pt')}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
                  title={t('nav.idioma')}
                >
                  <Globe className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span className="absolute -top-1 -right-1 text-xs font-bold text-gray-700 dark:text-gray-300 bg-china-yellow rounded-full w-4 h-4 flex items-center justify-center">
                    {language === 'pt' ? '中' : 'PT'}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  title={t('nav.tema')}
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-600" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <StudentPortalModal 
        isOpen={isPortalModalOpen} 
        onClose={() => setIsPortalModalOpen(false)} 
      />
    </motion.nav>
  );
}
