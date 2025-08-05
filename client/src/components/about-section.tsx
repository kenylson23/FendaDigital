import { motion } from "framer-motion";
import { Globe, Award, Users } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Sobre Nossa Escola</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma instituição pioneira no intercâmbio educacional Angola-China, 
            oferecendo educação de qualidade mundial com perspectiva multicultural.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://pixabay.com/get/g2f9c9cdff64f0d2ccbbd9071a8cf025cb1606628e0df25548407c55b8138c43e673232067e767aed4a68935af3c5de4c9f65ad1dd47660c5c73de50c4c62d1fc_1280.jpg" 
              alt="Estudantes estudando juntos" 
              className="rounded-2xl shadow-xl w-full"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-angola-blue p-3 rounded-lg">
                <Globe className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Intercâmbio Cultural</h3>
                <p className="text-gray-600">
                  Programa único de intercâmbio que conecta estudantes angolanos e chineses, 
                  promovendo compreensão cultural e colaboração internacional.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-china-yellow p-3 rounded-lg">
                <Award className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Excelência Acadêmica</h3>
                <p className="text-gray-600">
                  Currículo internacional reconhecido, preparando estudantes para universidades 
                  de prestígio em Angola, China e no mundo.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-green-500 p-3 rounded-lg">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Comunidade Diversa</h3>
                <p className="text-gray-600">
                  Ambiente inclusivo que celebra a diversidade cultural e promove o 
                  desenvolvimento integral dos nossos estudantes.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
