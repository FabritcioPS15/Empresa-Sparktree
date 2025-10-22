export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  services?: string[];
  overlayColor?: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  duration: string;
  team: string[];
  heroImage: string;
  resultImages: string[];
  additionalImages: string[];
}

export const projects: Project[] = [
  {
    id: 'mcdonalds-web',
    title: 'McDonald\'s - Diseño de Página Web',
    client: 'McDonald\'s Perú',
    category: 'Diseño Web',
    services: ['Diseño web', 'Branding'],
    description: 'Rediseño completo de la página web de McDonald\'s Perú con enfoque en conversión y experiencia de usuario. El proyecto incluyó una nueva arquitectura de información, diseño responsive y optimización para dispositivos móviles.',
    challenge: 'La página web anterior tenía una alta tasa de rebote y baja conversión. Los usuarios tenían dificultades para encontrar información sobre productos y ubicaciones de restaurantes.',
    solution: 'Implementamos un diseño centrado en el usuario con navegación intuitiva, secciones claras para productos y promociones, y un sistema de localización de restaurantes más eficiente.',
    results: [
      'Aumento del 45% en tiempo de permanencia en la página',
      'Reducción del 30% en tasa de rebote',
      'Incremento del 60% en búsquedas de restaurantes',
      'Mejora del 25% en conversión de promociones'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Google Maps API'],
    duration: '3 meses',
    team: ['Fabricio Peña - Desarrollador', 'Roman Reto - Diseñador UX/UI'],
    heroImage: 'Imagen de la marca, su nombre y de lo que trata',
    resultImages: ['Imagen referencial del resultado del proyecto'],
    additionalImages: ['Imagen referencial del resultado del proyecto', 'Imagen referencial del resultado del proyecto']
  },
  {
    id: 'coca-cola-web',
    title: 'Coca-Cola - Diseño de Página Web',
    client: 'Coca-Cola Perú',
    category: 'Diseño Web',
    services: ['Diseño web', 'Branding'],
    description: 'Desarrollo de una plataforma web moderna para Coca-Cola Perú que refleja la identidad de marca y mejora la experiencia digital de los consumidores.',
    challenge: 'Necesidad de modernizar la presencia digital manteniendo la esencia de la marca Coca-Cola y creando una experiencia memorable para los usuarios.',
    solution: 'Creamos un diseño que combina elementos clásicos de la marca con tecnologías modernas, incluyendo animaciones fluidas y contenido interactivo.',
    results: [
      'Incremento del 50% en engagement de usuarios',
      'Mejora del 40% en navegación móvil',
      'Aumento del 35% en tiempo de interacción',
      'Crecimiento del 20% en leads generados'
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'GSAP'],
    duration: '4 meses',
    team: ['Fabricio Peña - Desarrollador', 'Roman Reto - Diseñador UX/UI'],
    heroImage: 'Imagen de la marca, su nombre y de lo que trata',
    resultImages: ['Imagen referencial del resultado del proyecto'],
    additionalImages: ['Imagen referencial del resultado del proyecto', 'Imagen referencial del resultado del proyecto']
  },
  {
    id: 'sparktree-branding',
    title: 'SparkTree - Branding',
    client: 'SparkTree',
    category: 'Branding',
    services: ['Branding', 'Diseño web'],
    description: 'Desarrollo completo de identidad de marca para SparkTree, una startup de tecnología verde. Incluyó logo, paleta de colores, tipografía y guías de marca.',
    challenge: 'Crear una identidad de marca que comunique innovación tecnológica y responsabilidad ambiental, diferenciándose en un mercado competitivo.',
    solution: 'Desarrollamos una identidad visual que combina elementos tecnológicos con referencias naturales, usando colores verdes y formas orgánicas que sugieren crecimiento y sostenibilidad.',
    results: [
      'Reconocimiento de marca del 80% en target audience',
      'Aumento del 70% en engagement en redes sociales',
      'Mejora del 45% en percepción de innovación',
      'Crecimiento del 60% en leads cualificados'
    ],
    technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Brand Guidelines'],
    duration: '2 meses',
    team: ['Roman Reto - Diseñador UX/UI', 'Fabricio Peña - Estrategia de Marca'],
    heroImage: 'Imagen de la marca, su nombre y de lo que trata',
    resultImages: ['Imagen referencial del resultado del proyecto'],
    additionalImages: ['Imagen referencial del resultado del proyecto', 'Imagen referencial del resultado del proyecto']
  }
  ,
  {
    id: 'lima-bakery-ecommerce',
    title: 'Lima Bakery - Ecommerce',
    client: 'Lima Bakery',
    category: 'Ecommerce',
    services: ['Diseño web', 'Ecommerce', 'SEO'],
    description: 'Tienda online optimizada para conversiones con catálogo, carrito y checkout simplificado.',
    challenge: 'Migrar desde catálogo en Instagram a una experiencia de compra completa con inventario y envíos.',
    solution: 'Diseño mobile-first, integración de pasarela de pago y optimización de velocidad para Core Web Vitals.',
    results: [
      'Aumento del 72% en ventas online',
      'Tiempo de carga < 1s en móviles',
      '+38% en tasa de conversión'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    duration: '2 meses',
    team: ['Fabricio Peña - Desarrollador', 'Roman Reto - Diseñador UX/UI'],
    heroImage: 'Imagen de la tienda online con productos destacados',
    resultImages: ['Página de producto optimizada', 'Carrito y checkout simplificado'],
    additionalImages: ['Detalle de producto', 'Listado de categorías']
  },
  {
    id: 'andes-travel-landing',
    title: 'Andes Travel - Landing de Captación',
    client: 'Andes Travel',
    category: 'Landing Page',
    services: ['Diseño web', 'CRO', 'Analytics'],
    description: 'Landing page de captación para tours y paquetes turísticos en la sierra peruana.',
    challenge: 'Baja tasa de leads calificados por información dispersa y CTAs poco visibles.',
    solution: 'Arquitectura clara, prueba social y CTAs persistentes con medición de eventos.',
    results: [
      '+120% en leads',
      '-34% en costo por lead',
      '+46% en tiempo en página'
    ],
    technologies: ['Vite', 'React', 'Tailwind CSS', 'GA4'],
    duration: '1 mes',
    team: ['Roman Reto - Diseñador UX/UI', 'Fabricio Peña - Implementación'],
    heroImage: 'Imagen hero con paisaje andino',
    resultImages: ['Sección de beneficios', 'Formulario optimizado'],
    additionalImages: ['Testimonios', 'Preguntas frecuentes']
  },
  {
    id: 'inkashop-branding-web',
    title: 'InkaShop - Branding + Web',
    client: 'InkaShop',
    category: 'Branding + Web',
    services: ['Branding', 'Diseño web', 'SEO'],
    description: 'Identidad de marca y sitio web para e-commerce de artesanías peruanas.',
    challenge: 'Crear una marca memorable que respete la cultura andina y conecte con el público internacional.',
    solution: 'Sistema visual con paleta inspirada en textiles andinos y web con foco en storytelling.',
    results: [
      '+65% en reconocimiento de marca',
      '+52% tráfico orgánico',
      '+28% en valor promedio de pedido'
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Contentful'],
    duration: '3 meses',
    team: ['Roman Reto - Branding', 'Fabricio Peña - Desarrollo'],
    heroImage: 'Aplicaciones de marca y mockups',
    resultImages: ['Catálogo con storytelling', 'Blog SEO'],
    additionalImages: ['Guía de marca', 'Componentes UI']
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

