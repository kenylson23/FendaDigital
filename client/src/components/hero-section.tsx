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
        backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.7), rgba(59, 130, 246, 0.5)), url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
      }}
    >
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Escola <span className="china-yellow">Fenda da Tundavala</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl mb-8 opacity-90"
        >
          Conectando Angola e China através da educação de excelência
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            onClick={() => scrollToSection("calculator")}
            className="bg-china-yellow text-gray-900 hover:bg-yellow-500 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all"
            size="lg"
          >
            Calculadora de Mensalidades
          </Button>
          <Link href="/agendar-visita">
            <Button 
              className="bg-transparent border-2 border-china-yellow text-china-yellow hover:bg-china-yellow hover:text-gray-900 px-8 py-4 text-lg font-semibold transition-all flex items-center gap-2"
              size="lg"
            >
              <Calendar className="h-5 w-5" />
              Agendar Visita
            </Button>
          </Link>
          <Button 
            onClick={() => scrollToSection("tour")}
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-angola-blue px-8 py-4 text-lg font-semibold transition-all"
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
