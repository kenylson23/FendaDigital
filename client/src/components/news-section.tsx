import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

export default function NewsSection() {  
  const { t } = useLanguage();
  
  const articles = [
    {
      date: "15 de Janeiro, 2024",
      title: "Feira de Ciências Internacional 2024",
      description: "Nossos estudantes apresentaram projetos inovadores na Feira de Ciências, conquistando o primeiro lugar na categoria...",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      category: "Ciências",
      color: "text-angola-blue"
    },
    {
      date: "8 de Janeiro, 2024",
      title: "Nova Parceria com Universidade de Pequim",
      description: "Firmamos nova parceria que oferecerá bolsas de estudo integrais para nossos melhores estudantes...",
      image: "https://pixabay.com/get/g52b0f3bd39e01e992ac452f09e6859cc0ada5181a6c0683837c90175b565a433e22e68aec5201dc8b58faf92e177b45b8d261e469fee3d5a8409c441d8e0086e_1280.jpg",
      category: "Intercâmbio",
      color: "text-china-yellow"
    },
    {
      date: "3 de Janeiro, 2024",
      title: "Modernização das Salas de Aula",
      description: "Investimento em tecnologia educacional moderna com quadros interativos e sistemas de realidade aumentada...",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      category: "Tecnologia",
      color: "text-green-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('news.title')}</h2>
          <p className="text-xl text-gray-600">
            {t('news.subtitle')}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            >
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className={`text-sm font-semibold mb-2 ${article.color}`}>
                  {article.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <button className="text-angola-blue font-semibold hover:underline">
                  {t('news.btn_ler_mais')}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
