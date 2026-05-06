import React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ShoppingCart, User, Droplet, SunMedium, Shield, ChevronDown } from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" as const } }
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-base/80 backdrop-blur-md border-b border-wood/10">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img src="/images/logo.svg" alt="BY CHINO" className="h-12 w-auto" />
        </button>
      </div>
      <div className="hidden md:flex space-x-8 text-sm tracking-wide text-subtext uppercase font-sans">
        <button 
          onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
          className="hover:text-wood transition-colors cursor-pointer"
        >
          Catálogo
        </button>
        <button 
          onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
          className="hover:text-wood transition-colors cursor-pointer"
        >
          Nosotros
        </button>
        <button 
          onClick={() => document.getElementById('care')?.scrollIntoView({ behavior: 'smooth' })}
          className="hover:text-wood transition-colors cursor-pointer"
        >
          Cuidados
        </button>
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-subtext hover:text-wood transition-colors flex items-center space-x-2 text-sm uppercase tracking-wider">
          <User size={18} />
          <span className="hidden md:inline">Cuenta</span>
        </button>
        <button className="text-subtext hover:text-wood transition-colors relative">
          <ShoppingCart size={20} />
          <span className="absolute -top-1 -right-1 bg-wood text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
        </button>
      </div>
    </div>
  </nav>
);

const HeroSection = () => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const gallery = [
    '/images/beauty/beauty_photo_1.png',
    '/images/beauty/beauty_photo_2.png',
    '/images/beauty/beauty_photo_3.png',
    '/images/beauty/beauty_photo_4.png',
    '/images/beauty/beauty_photo_6.png',
    '/images/beauty/beauty_photo_7.png',
    '/images/beauty/beauty_photo_8.png',
    '/images/beauty/beauty_photo_9.png',
  ];

  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % gallery.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, gallery.length]);

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-32 min-h-[90vh] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="space-y-8 z-10"
        >
          <div className="space-y-4">
            <h2 className="text-wood uppercase tracking-[0.3em] text-sm font-sans font-semibold">Hecho a mano en México</h2>
            <h1 className="text-5xl md:text-8xl font-serif leading-[1] text-text">
              Lo artesanal,<br /><span className="italic">lo nuestro.</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-subtext font-sans max-w-md leading-relaxed">
            Nuestras manos convierten madera mexicana en piezas únicas, pensadas para durar y embellecer cualquier espacio.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <button className="bg-wood text-white px-12 py-5 rounded-full text-sm tracking-[0.2em] font-bold uppercase hover:bg-wood/90 transition-all hover:scale-105 hover:shadow-[0_10px_30px_rgba(142,91,62,0.3)]">
              Explorar Colección
            </button>
            <button className="group border-2 border-wood/20 text-wood px-12 py-5 rounded-full text-sm tracking-[0.2em] font-bold uppercase hover:bg-wood hover:text-white transition-all duration-300">
              Nuestra Historia
            </button>
          </div>
        </motion.div>

        <div className="relative h-[60vh] md:h-[85vh] w-full">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative h-full w-full rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(42,37,34,0.15)]"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={gallery[currentImage]}
                alt="Galería By Chino"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2 }}
                className="w-full h-full object-cover image-treatment"
              />
            </AnimatePresence>
            <div className="noise-overlay" />

            {/* Invisible Navigation Areas */}
            <div className="absolute inset-0 flex z-30">
              <div
                onClick={() => setCurrentImage((prev) => (prev - 1 + gallery.length) % gallery.length)}
                className="w-1/2 h-full"
                title="Anterior"
              />
              <div
                onClick={() => setCurrentImage((prev) => (prev + 1) % gallery.length)}
                className="w-1/2 h-full"
                title="Siguiente"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-8 right-8 flex space-x-2 z-40">
              {gallery.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 transition-all duration-500 rounded-full ${i === currentImage ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
                />
              ))}
            </div>
          </motion.div>
          {/* Subtle Accent Element */}
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-olive/10 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
};

const StorySection = () => (
  <section id="story" className="py-24 bg-[#F0EBE1] overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="relative h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden order-2 md:order-1 group"
      >
        <img
          src="/images/beauty/Chino.png"
          alt="Artesano Chino"
          className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105 image-treatment"
        />
        <div className="noise-overlay" />
        <div className="absolute inset-0 bg-wood/5 group-hover:bg-transparent transition-colors duration-1000" />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="order-1 md:order-2 space-y-8 md:pl-12"
      >
        <h2 className="text-4xl md:text-6xl font-serif text-text leading-tight italic">El arte de contar historias en madera</h2>
        <div className="space-y-4 text-subtext font-sans leading-relaxed text-lg max-w-lg">
          <p>
            Todo comenzó con una pasión por la madera. Chino experimenta con formas, acabados y maderas como parota, sicomoro y teca para lograr piezas auténticas, funcionales y sostenibles.
          </p>
          <p className="text-lg italic text-wood font-medium border-l-2 border-wood/30 pl-6 py-1">
            "Cada veta de la madera nos cuenta una historia única, mi trabajo es simplemente permitir que esa historia se luzca en tu mesa."
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

const HistorySection = () => (
  <section className="py-24 bg-base overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-center mb-20"
      >
        <h3 className="text-sm tracking-[0.4em] uppercase text-wood font-bold mb-4">Así comenzó</h3>
        <h2 className="text-4xl md:text-5xl font-serif text-text">Nuestra Historia</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {[
          {
            title: "Inicio de la idea",
            text: "Todo comenzó con una pasión por la madera y el deseo de crear algo único. El amor por el tratamiento artesanal de la madera y el deseo de ofrecer algo especial llevan a Chino a crear sus primeras tablas, marcando el inicio de By Chino."
          },
          {
            title: "Desarrollo del diseño",
            text: "El diseño de nuestras tablas evoluciona con cada creación. Chino experimenta con formas, acabados y maderas para lograr piezas auténticas y funcionales."
          },
          {
            title: "Proceso de fabricación",
            text: "Cada tabla se produce con dedicación y precisión. Utilizando maderas como parota, sicomoro y teca, Chino corta y moldea a mano cada pieza, asegurando una calidad superior y un acabado impecable."
          },
          {
            title: "Compromiso ambiental",
            text: "En By Chino, la sostenibilidad es fundamental. Fomentamos prácticas responsables de reforestación para reducir nuestro impacto ambiental y honrar a la naturaleza."
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative pl-8 border-l border-wood/20"
          >
            <h4 className="font-serif text-xl text-text mb-4 font-bold">{item.title}</h4>
            <p className="text-subtext font-sans text-sm leading-relaxed">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const BannerSection = () => (
  <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
    <motion.div
      initial={{ scale: 1.2 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0"
    >
      <img
        src="/images/beauty/beauty_photo_5.png"
        alt="Banner artesanal"
        className="w-full h-full object-cover image-treatment"
      />
      <div className="noise-overlay" />
      <div className="absolute inset-0 bg-black/20" />
    </motion.div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center text-white space-y-4 px-6">
        <h2 className="text-4xl md:text-6xl font-serif italic">Calidad que se siente.</h2>
        <p className="text-lg tracking-widest uppercase opacity-90">Artesanía mexicana para el mundo.</p>
      </div>
    </div>
  </section>
);

const ProductCard = ({ product, index }: { product: any, index: number }) => {
  const [currentImg, setCurrentImg] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isHovered) {
      setCurrentImg(1); 
      interval = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % product.images.length);
      }, 2500); 
    } else {
      setCurrentImg(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, product.images.length]);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.0, delay: index * 0.15 } }
      }}
      className="group cursor-pointer"
    >
      <div className="bg-[#F3F0E9] rounded-2xl overflow-hidden aspect-[4/5] mb-6 relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg}
            src={product.images[currentImg]}
            alt={product.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover mix-blend-multiply p-8"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
        
        <div className="absolute top-6 right-6 flex flex-col gap-2 z-20">
          {product.images.map((_: any, i: number) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === currentImg ? 'bg-wood h-4' : 'bg-wood/20'}`}
            />
          ))}
        </div>

        <button className="absolute bottom-6 left-6 right-6 bg-white py-4 rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 font-sans text-sm font-bold uppercase tracking-widest shadow-xl z-10">
          Añadir al Carrito
        </button>
      </div>
      <div className="space-y-1">
        <h3 className="font-serif text-2xl text-text">{product.name}</h3>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-subtext text-xs font-sans uppercase tracking-widest">{product.category}</p>
            <p className="text-wood/60 text-sm font-sans italic">{product.size}</p>
          </div>
          <p className="text-wood font-bold text-xl">{product.price}</p>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedCatalog = () => {
  const products = [
    {
      id: 1,
      name: "Tabla Rústica Parota",
      category: "Madera Mexicana",
      size: "Mediana",
      price: "$ 928.00",
      images: [
        "/images/catalog/Tabla_Tústica_A_Parota_1.png",
        "/images/catalog/Tabla_Tústica_A_Parota_2.png",
        "/images/catalog/Tabla_Tústica_A_Parota_3.png"
      ]
    },
    {
      id: 2,
      name: "Tabla Geométrica A",
      category: "Parota / Nogal",
      size: "Diseño Único",
      price: "$ 870.00",
      images: [
        "/images/catalog/Tabla_Tústica_A_Teca_1.png",
        "/images/catalog/Tabla_Tústica_A_Teca_2.png",
        "/images/catalog/Tabla_Tústica_A_Teca_3.png"
      ]
    }
  ];

  return (
    <section id="catalog" className="py-24 bg-white/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-serif text-text">Nuestra Colección</h2>
            <p className="text-subtext font-sans text-lg max-w-md leading-relaxed">
              Piezas curadas con múltiples ángulos para apreciar la maestría de Chino.
              <br />
              <span className="text-wood font-serif italic mt-4 block text-xl">¿Buscas algo único? Personalizamos tu tabla eligiendo entre Parota, Teca o Nogal, en diseños rústicos o geométricos.</span>
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-20">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="flex justify-center">
          <button className="border border-wood text-wood px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-wood hover:text-white transition-all duration-300">
            Ver colección completa (30 productos)
          </button>
        </div>
      </div>
    </section>
  );
};

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      q: "¿Cómo limpiar la tabla?",
      a: "Utiliza un paño suave y húmedo. Evita sumergirla completamente en agua o usar productos químicos agresivos. Asegúrate de secar bien la superficie de inmediato."
    },
    {
      q: "¿Debo aceitar la tabla?",
      a: "Sí, es importante aplicar aceite mineral de calidad alimentaria una vez al mes o cuando veas que la madera se seca. Esto sella los poros, previene grietas y mantiene el color original."
    },
    {
      q: "¿Dónde almacenar la tabla?",
      a: "Guárdala en un lugar fresco y seco, lejos de la luz solar directa o fuentes de calor como estufas. Esto evitará deformaciones y cambios bruscos de temperatura."
    },
    {
      q: "¿Puedo usarla en exteriores?",
      a: "No se recomienda a menos que estén tratadas específicamente para ello. La exposición constante a la humedad y al sol puede dañarlas gravemente."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto mt-32">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="space-y-4"
      >
        <h3 className="font-serif text-3xl text-text mb-12 text-center">Preguntas Frecuentes</h3>
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-wood/10 last:border-0">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full py-6 flex items-center justify-between text-left group"
            >
              <span className="font-serif text-xl md:text-2xl text-text group-hover:text-wood transition-colors">{faq.q}</span>
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-wood/60"
              >
                <ChevronDown size={24} />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-subtext font-sans leading-relaxed text-lg">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const CareInstructions = () => {
  const instructions = [
    {
      icon: <Droplet size={32} strokeWidth={1.5} />,
      title: "Limpieza",
      desc: (
        <>
          Lavar a mano con agua tibia y jabón suave. Secar inmediatamente con un paño.{" "}
          <span className="italic text-wood/80 block mt-2 text-sm">
            Tip del taller: Si tu tabla ha estado en contacto con ingredientes fuertes, frota sal gruesa con medio limón para eliminar bacterias y olores.
          </span>
        </>
      )
    },
    {
      icon: <SunMedium size={32} strokeWidth={1.5} />,
      title: "Temperatura",
      desc: "Evitar calor extremo, exposición directa al sol o sumergir en agua prolongadamente."
    },
    {
      icon: <Shield size={32} strokeWidth={1.5} />,
      title: "Humectación",
      desc: "Aplicar aceite mineral o cera de abeja mensualmente para mantener el brillo y protección."
    }
  ];

  return (
    <section id="care" className="py-24 bg-wood/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif text-text">Diseñadas para perdurar</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {instructions.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.0, delay: index * 0.2 } }
              }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="text-wood/80 p-4 bg-wood/10 rounded-full">
                {item.icon}
              </div>
              <h3 className="font-serif text-2xl text-text">{item.title}</h3>
              <div className="text-subtext font-sans max-w-xs">{item.desc}</div>
            </motion.div>
          ))}
        </div>

        <FAQAccordion />
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-text text-base py-16">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-center text-center md:text-left">
      <div>
        <h2 className="text-2xl font-serif tracking-widest mb-4">BY CHINO</h2>
        <p className="text-white/60 text-sm font-sans">Hecho en México con dedicación y maestría.</p>
      </div>
      <div className="space-y-2 font-sans text-sm text-white/80">
        <p>614 457 9449</p>
        <p>madebychinochih@gmail.com</p>
      </div>
      <div className="flex justify-center md:justify-end space-x-6 text-sm">
        <a href="https://www.instagram.com/bychinotchina/" target="_blank" rel="noopener noreferrer" className="hover:text-wood transition-colors">Instagram</a>
        <a href="https://www.facebook.com/profile.php?id=100031868936039" target="_blank" rel="noopener noreferrer" className="hover:text-wood transition-colors">Facebook</a>
      </div>
    </div>

    <a
      href="https://wa.me/526144579449"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-olive text-white p-4 rounded-full shadow-lg hover:bg-olive/90 transition-transform hover:scale-105 z-50 flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    </a>
  </footer>
);

function App() {
  return (
    <div className="font-sans text-text bg-base selection:bg-wood/20">
      <Navbar />
      <HeroSection />
      <StorySection />
      <HistorySection />
      <BannerSection />
      <FeaturedCatalog />
      <CareInstructions />
      <Footer />
    </div>
  );
}

export default App;
