import { motion } from "framer-motion";
import { ChevronDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/language-context";

export default function HeroSection() {
  const { t } = useLanguage();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.85), rgba(59, 130, 246, 0.75)), url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&blur=2')`
      }}
    >
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            <span className="text-china-yellow drop-shadow-lg">{t('hero.title')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl opacity-95 drop-shadow-lg">
            {t('hero.subtitle')}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Botão Principal - Agendar Visita */}
          <Link href="/agendar-visita">
            <Button 
              className="bg-gradient-to-r from-angola-blue to-china-yellow text-white hover:from-blue-700 hover:to-yellow-600 px-10 py-4 text-lg font-bold transform hover:scale-105 transition-all shadow-2xl border-2 border-white/20 backdrop-blur-sm flex items-center gap-3"
              size="lg"
            >
              <Calendar className="h-5 w-5" />
              {t('hero.agendar_visita')}
            </Button>
          </Link>
          
          {/* Botões Secundários */}
          <Button 
            onClick={() => scrollToSection("calculator")}
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-2 border-white/60 text-white hover:bg-white/20 hover:border-white px-8 py-4 text-lg font-medium transition-all shadow-lg"
            size="lg"
          >
            {t('hero.calculadora')}
          </Button>
          <Button 
            onClick={() => scrollToSection("tour")}
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-2 border-white/60 text-white hover:bg-white/20 hover:border-white px-8 py-4 text-lg font-medium transition-all shadow-lg"
            size="lg"
          >
            {t('hero.tour_virtual')}
          </Button>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="text-white text-2xl" size={32} />
      </motion.div>
    </section>
  );
}
