import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Presentation, FlaskConical, Book, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VirtualTour() {
  const [currentLocation, setCurrentLocation] = useState("classroom");
  
  const locations = {
    classroom: {
      name: "Sala de Aula Principal",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=800",
      icon: Presentation
    },
    laboratory: {
      name: "Laboratório de Ciências",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=800",
      icon: FlaskConical
    },
    library: {
      name: "Biblioteca Central",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=800",
      icon: Book
    },
    sports: {
      name: "Centro Desportivo",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=800",
      icon: Dumbbell
    }
  };

  const tourButtons = [
    { key: "classroom", label: "Salas de Aula", color: "bg-angola-blue hover:bg-blue-700" },
    { key: "laboratory", label: "Laboratórios", color: "bg-china-yellow hover:bg-yellow-600" },
    { key: "library", label: "Biblioteca", color: "bg-green-500 hover:bg-green-600" },
    { key: "sports", label: "Desportos", color: "bg-red-500 hover:bg-red-600" }
  ];

  return (
    <section id="tour" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tour Virtual 360°</h2>
          <p className="text-xl text-gray-600">
            Explore nossa escola virtualmente e conheça nossas instalações de perto.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="relative h-96 md:h-[500px]">
            <motion.img
              key={currentLocation}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={locations[currentLocation as keyof typeof locations].image}
              alt={locations[currentLocation as keyof typeof locations].name}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Button 
                  className="bg-white bg-opacity-90 text-gray-900 hover:bg-opacity-100 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all"
                  size="lg"
                >
                  <Play className="mr-2" size={24} />
                  Iniciar Tour Virtual
                </Button>
              </motion.div>
            </div>
            
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-3">
              <p className="text-sm font-medium text-gray-700">
                {locations[currentLocation as keyof typeof locations].name}
              </p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tourButtons.map((button) => {
                const Icon = locations[button.key as keyof typeof locations].icon;
                const isActive = currentLocation === button.key;
                
                return (
                  <motion.button
                    key={button.key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentLocation(button.key)}
                    className={`${button.color} ${isActive ? 'ring-4 ring-white ring-opacity-60' : ''} text-white p-4 rounded-lg transition-all`}
                  >
                    <Icon className="mx-auto mb-2" size={24} />
                    <p className="text-sm">{button.label}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
