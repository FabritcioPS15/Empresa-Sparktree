export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  published_date: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

// Mock data for blog posts
const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Estrategias de contenido para redes sociales",
    slug: "estrategias-contenido-redes-sociales",
    excerpt: "Descubre las mejores estrategias para crear contenido atractivo en redes sociales que genere engagement y conversiones.",
    content: `## Introducción

En el mundo digital actual, las redes sociales se han convertido en una herramienta fundamental para el crecimiento de cualquier negocio. Sin embargo, crear contenido que realmente conecte con tu audiencia requiere de estrategias bien pensadas y ejecutadas.

## ¿Por qué es importante el contenido en redes sociales?

- **Aumenta la visibilidad** de tu marca
- **Genera engagement** con tu audiencia
- **Construye confianza** y autoridad
- **Conduce tráfico** a tu sitio web
- **Mejora las conversiones**

## Estrategias efectivas

### 1. Conoce a tu audiencia

Antes de crear cualquier contenido, es fundamental entender quién es tu audiencia objetivo. Investiga:

- Demografía (edad, género, ubicación)
- Intereses y pasatiempos
- Problemas y necesidades
- Plataformas que más utilizan

### 2. Planifica tu contenido

La planificación es clave para mantener consistencia:

- Crea un calendario editorial
- Define temas relevantes para tu industria
- Establece la frecuencia de publicación
- Prepara contenido con anticipación

### 3. Diversifica los formatos

No te limites a un solo tipo de contenido:

- **Imágenes** atractivas y profesionales
- **Videos** cortos y dinámicos
- **Infografías** informativas
- **Stories** para mostrar el detrás de escena
- **Contenido en vivo** para mayor interacción

## Conclusión

Crear contenido efectivo para redes sociales requiere tiempo, planificación y creatividad. Pero con las estrategias correctas, puedes construir una presencia sólida que genere resultados reales para tu negocio.`,
    image_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
    published_date: "2025-01-15",
    is_featured: true,
    created_at: "2025-01-15T10:00:00Z",
    updated_at: "2025-01-15T10:00:00Z"
  },
  {
    id: "2",
    title: "¿Cuáles son las redes que más utilizan los E-commerce?",
    slug: "redes-sociales-ecommerce",
    excerpt: "Analizamos las plataformas sociales más efectivas para vender online y aumentar las ventas de tu tienda virtual.",
    content: `## Las redes sociales más efectivas para E-commerce

En el mundo del comercio electrónico, las redes sociales se han convertido en un canal de ventas fundamental. Pero no todas las plataformas son iguales cuando se trata de generar conversiones.

## Top 5 redes sociales para E-commerce

### 1. Instagram
- **Visual por naturaleza** - perfecto para mostrar productos
- **Shopping tags** integrados
- **Stories y Reels** para engagement
- **Influencer marketing** muy efectivo

### 2. Facebook
- **Audiencia masiva** y diversa
- **Facebook Shops** integrado
- **Anuncios dirigidos** muy precisos
- **Marketplace** para ventas locales

### 3. TikTok
- **Alcance orgánico** muy alto
- **Contenido viral** potencial
- **Audiencia joven** y activa
- **TikTok Shopping** en crecimiento

### 4. Pinterest
- **Intención de compra** alta
- **Búsqueda visual** de productos
- **Pins shoppables** efectivos
- **Audiencia femenina** predominante

### 5. YouTube
- **Contenido educativo** sobre productos
- **Unboxing y reviews** muy populares
- **YouTube Shopping** integrado
- **SEO de video** para descubrimiento

## Estrategias por plataforma

### Instagram
- Usa hashtags relevantes
- Publica contenido de alta calidad
- Aprovecha las Stories para promociones
- Colabora con influencers

### Facebook
- Crea grupos de la comunidad
- Usa Facebook Live para demostraciones
- Implementa Facebook Pixel
- Aprovecha el Marketplace

## Métricas importantes

- **Tasa de conversión** por plataforma
- **Costo por adquisición** (CPA)
- **Valor de vida del cliente** (LTV)
- **Engagement rate** por contenido

## Conclusión

La elección de redes sociales para tu E-commerce debe basarse en tu audiencia objetivo y tipo de productos. Instagram y Facebook siguen siendo los líderes, pero TikTok está ganando terreno rápidamente.`,
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    published_date: "2025-01-14",
    is_featured: false,
    created_at: "2025-01-14T10:00:00Z",
    updated_at: "2025-01-14T10:00:00Z"
  },
  {
    id: "3",
    title: "El posicionamiento SEO como herramienta de crecimiento",
    slug: "posicionamiento-seo-crecimiento",
    excerpt: "Aprende cómo el SEO puede impulsar el crecimiento de tu negocio y aumentar la visibilidad orgánica en los motores de búsqueda.",
    content: `## ¿Qué es el SEO y por qué es importante?

El SEO (Search Engine Optimization) es el proceso de optimizar tu sitio web para que aparezca en los primeros resultados de los motores de búsqueda como Google. Es una herramienta fundamental para el crecimiento sostenible de cualquier negocio online.

## Beneficios del SEO para el crecimiento

### 1. Visibilidad orgánica
- **Tráfico gratuito** de calidad
- **Credibilidad** y autoridad
- **Alcance a largo plazo** sin inversión continua
- **Competitividad** en el mercado digital

### 2. ROI sostenible
- **Inversión inicial** con retorno a largo plazo
- **Menor costo** que la publicidad pagada
- **Mayor conversión** que otros canales
- **Escalabilidad** del negocio

## Estrategias SEO fundamentales

### Optimización técnica
- **Velocidad de carga** optimizada
- **Diseño responsive** para móviles
- **URLs amigables** y descriptivas
- **Estructura de enlaces** interna clara

### Contenido de calidad
- **Palabras clave** relevantes y estratégicas
- **Contenido original** y valioso
- **Actualización regular** del contenido
- **Longitud adecuada** de los artículos

### Autoridad del dominio
- **Enlaces externos** de calidad
- **Menciones** en otros sitios
- **Presencia en directorios** relevantes
- **Colaboraciones** con influencers

## Herramientas esenciales

- **Google Analytics** - para medir el tráfico
- **Google Search Console** - para monitorear el rendimiento
- **SEMrush** - para análisis de palabras clave
- **Ahrefs** - para análisis de enlaces
- **Screaming Frog** - para auditorías técnicas

## Métricas clave a seguir

- **Posiciones** en resultados de búsqueda
- **Tráfico orgánico** mensual
- **Tasa de clics** (CTR)
- **Tiempo en página**
- **Tasa de rebote**

## Conclusión

El SEO es una inversión a largo plazo que puede transformar completamente el crecimiento de tu negocio. Aunque requiere tiempo y paciencia, los resultados son sostenibles y escalables.`,
    image_url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
    published_date: "2025-01-13",
    is_featured: false,
    created_at: "2025-01-13T10:00:00Z",
    updated_at: "2025-01-13T10:00:00Z"
  }
];

// Simulate async operations with local data
export const getFeaturedPost = async (): Promise<BlogPost | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const featuredPost = mockBlogPosts.find(post => post.is_featured);
      resolve(featuredPost || null);
    }, 100);
  });
};

export const getRecentPosts = async (limit: number = 10): Promise<BlogPost[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const recentPosts = mockBlogPosts
        .filter(post => !post.is_featured)
        .sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime())
        .slice(0, limit);
      resolve(recentPosts);
    }, 100);
  });
};

export const getAllPosts = async (): Promise<BlogPost[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allPosts = mockBlogPosts
        .sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime());
      resolve(allPosts);
    }, 100);
  });
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = mockBlogPosts.find(post => post.slug === slug);
      resolve(post || null);
    }, 100);
  });
};
