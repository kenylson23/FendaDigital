import { GraduationCap, Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <GraduationCap className="text-2xl text-china-yellow mr-3" size={32} />
              <span className="text-xl font-bold">Fenda da Tundavala</span>
            </div>
            <p className="text-gray-400 mb-4">
              Educação de excelência conectando Angola e China através do conhecimento e cultura.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-china-yellow transition-colors">
                <Facebook size={24} />
              </button>
              <button className="text-gray-400 hover:text-china-yellow transition-colors">
                <Instagram size={24} />
              </button>
              <button className="text-gray-400 hover:text-china-yellow transition-colors">
                <Linkedin size={24} />
              </button>
              <button className="text-gray-400 hover:text-china-yellow transition-colors">
                <Youtube size={24} />
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection("home")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("about")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sobre
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("programs")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Programas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("tour")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tour Virtual
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Programas</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Ensino Primário</span></li>
              <li><span className="text-gray-400">Ensino Secundário</span></li>
              <li><span className="text-gray-400">Intercâmbio Angola-China</span></li>
              <li><span className="text-gray-400">Atividades Extracurriculares</span></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-2 text-gray-400">
              <p><MapPin className="inline mr-2" size={16} />Fenda da Tundavala, Huíla</p>
              <p><Phone className="inline mr-2" size={16} />+244 123 456 789</p>
              <p><Mail className="inline mr-2" size={16} />info@fendatundavala.edu.ao</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Escola Fenda da Tundavala. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
