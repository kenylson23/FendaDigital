import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";

export default function StatsSection() {
  const { t } = useLanguage();
  
  const [counters, setCounters] = useState({
    students: 0,
    teachers: 0,
    experience: 0,
    approval: 0
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  const targets = {
    students: 1200,
    teachers: 85,
    experience: 15,
    approval: 98
  };

  useEffect(() => {
    if (hasAnimated) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const animateCounter = (key: keyof typeof targets) => {
      let current = 0;
      const increment = targets[key] / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= targets[key]) {
          current = targets[key];
          clearInterval(timer);
        }
        
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepDuration);
    };

    // Start all animations
    Object.keys(targets).forEach(key => {
      animateCounter(key as keyof typeof targets);
    });

    setHasAnimated(true);
  }, [hasAnimated]);

  return (
    <motion.section 
      className="py-16 bg-angola-blue"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      onViewportEnter={() => !hasAnimated && setHasAnimated(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white"
          >
            <div className="text-4xl font-bold mb-2">{counters.students}</div>
            <p className="text-blue-200">{t('stats.estudantes')}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white"
          >
            <div className="text-4xl font-bold mb-2">{counters.teachers}</div>
            <p className="text-blue-200">{t('stats.professores')}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white"
          >
            <div className="text-4xl font-bold mb-2">{counters.experience}</div>
            <p className="text-blue-200">{t('stats.programas')}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white"
          >
            <div className="text-4xl font-bold mb-2">{counters.approval}%</div>
            <p className="text-blue-200">{t('stats.parceiros')}</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
