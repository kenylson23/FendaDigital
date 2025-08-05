import { motion } from "framer-motion";
import { Baby, GraduationCap, ArrowRightLeft, Check } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function ProgramsSection() {
  const { t } = useLanguage();
  
  const programs = [
    {
      icon: Baby,
      title: t('programs.primario'),
      description: t('programs.primario_desc'),
      features: ["Currículo Internacional", "Educação Bilíngue", "Atividades Extracurriculares"],
      color: "bg-angola-blue"
    },
    {
      icon: GraduationCap,
      title: t('programs.secundario'),
      description: t('programs.secundario_desc'),
      features: ["Preparação Universitária", "Laboratórios Modernos", "Orientação Vocacional"],
      color: "bg-china-yellow"
    },
    {
      icon: ArrowRightLeft,
      title: t('programs.intercambio'),
      description: t('programs.intercambio_desc'),
      features: ["Imersão Cultural", "Universidades Parceiras", "Certificação Internacional"],
      color: "bg-red-500"
    }
  ];

  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('programs.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('programs.subtitle')}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all"
            >
              <div className={`${program.color} p-4 rounded-lg w-fit mb-6`}>
                <program.icon className="text-white" size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h3>
              <p className="text-gray-600 mb-6">{program.description}</p>
              
              <ul className="space-y-2">
                {program.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <Check className="text-green-500 mr-2" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
