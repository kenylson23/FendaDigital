import { motion } from "framer-motion";
import { ChevronDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
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
            Escola <span className="text-china-yellow drop-shadow-lg">Fenda da Tundavala</span>
          </h1>
          
          <p className="text-xl md:text-2xl opacity-95 drop-shadow-lg">
            Conectando Angola e China através da educação de excelência
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            onClick={() => scrollToSection("calculator")}
            className="bg-china-yellow/90 backdrop-blur-sm text-gray-900 hover:bg-china-yellow px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all shadow-xl border border-yellow-400/20"
            size="lg"
          >
            Calculadora de Mensalidades
          </Button>
          <Link href="/agendar-visita">
            <Button 
              className="bg-white/10 backdrop-blur-sm border-2 border-china-yellow/80 text-china-yellow hover:bg-china-yellow hover:text-gray-900 px-8 py-4 text-lg font-semibold transition-all flex items-center gap-2 shadow-xl"
              size="lg"
            >
              <Calendar className="h-5 w-5" />
              Agendar Visita
            </Button>
          </Link>
          <Button 
            onClick={() => scrollToSection("tour")}
            className="bg-white/10 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-white hover:text-angola-blue px-8 py-4 text-lg font-semibold transition-all shadow-xl"
            size="lg"
          >
            Tour Virtual 360°
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
