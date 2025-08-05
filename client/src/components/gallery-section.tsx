import { motion } from "framer-motion";

export default function GallerySection() {
  const images = [
    {
      src: "https://pixabay.com/get/gc0ecf312e7d9c4f951c80e4839d398522080dec726d1ec826794f427aaa092cc548aa6c14848f73873bca4b464f8411bc3eb2fab1149f134125f433f7ca3080b_1280.jpg",
      alt: "Intercâmbio cultural Angola-China"
    },
    {
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      alt: "Estudantes em projeto científico"
    },
    {
      src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      alt: "Campus escolar moderno"
    },
    {
      src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      alt: "Laboratório de informática"
    },
    {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      alt: "Celebração cultural"
    },
    {
      src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      alt: "Apresentação de projetos"
    },
    {
      src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      alt: "Biblioteca moderna"
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      alt: "Atividades desportivas"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Galeria</h2>
          <p className="text-xl text-gray-600">
            Momentos especiais da nossa comunidade escolar.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full h-48 object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
