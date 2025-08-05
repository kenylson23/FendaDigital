import { useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import StudentPortalModal from "@/components/student-portal-modal";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <GraduationCap className="text-2xl text-angola-blue mr-3" size={32} />
              <span className="text-xl font-bold text-gray-900">Fenda da Tundavala</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-gray-700 hover:text-angola-blue transition-colors"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-angola-blue transition-colors"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection("programs")}
              className="text-gray-700 hover:text-angola-blue transition-colors"
            >
              Programas
            </button>
            <button 
              onClick={() => scrollToSection("calculator")}
              className="text-gray-700 hover:text-angola-blue transition-colors"
            >
              Mensalidades
            </button>
            <button 
              onClick={() => scrollToSection("tour")}
              className="text-gray-700 hover:text-angola-blue transition-colors"
            >
              Tour Virtual
            </button>
            <Button 
              onClick={() => scrollToSection("contact")}
              className="bg-angola-blue text-white hover:bg-blue-700"
            >
              Contato
            </Button>
            <Button 
              onClick={() => setIsPortalModalOpen(true)}
              variant="outline"
              className="border-angola-blue text-angola-blue hover:bg-angola-blue hover:text-white"
            >
              Portal do Aluno
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => scrollToSection("home")}
              className="block px-3 py-2 text-gray-700 w-full text-left"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="block px-3 py-2 text-gray-700 w-full text-left"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection("programs")}
              className="block px-3 py-2 text-gray-700 w-full text-left"
            >
              Programas
            </button>
            <button 
              onClick={() => scrollToSection("calculator")}
              className="block px-3 py-2 text-gray-700 w-full text-left"
            >
              Mensalidades
            </button>
            <button 
              onClick={() => scrollToSection("tour")}
              className="block px-3 py-2 text-gray-700 w-full text-left"
            >
              Tour Virtual
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="block px-3 py-2 text-gray-700 w-full text-left"
            >
              Contato
            </button>
            <button 
              onClick={() => {
                setIsPortalModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="block px-3 py-2 text-angola-blue font-semibold w-full text-left"
            >
              Portal do Aluno
            </button>
          </div>
        </div>
      )}
      
      <StudentPortalModal 
        isOpen={isPortalModalOpen} 
        onClose={() => setIsPortalModalOpen(false)} 
      />
    </nav>
  );
}
