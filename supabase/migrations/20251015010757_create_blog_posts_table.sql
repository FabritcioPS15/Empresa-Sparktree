/*
  # Create blog posts table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key) - Unique identifier for each post
      - `title` (text) - Post title
      - `slug` (text, unique) - URL-friendly version of title
      - `excerpt` (text) - Short description/preview
      - `content` (text) - Full article content
      - `image_url` (text) - Featured image URL
      - `published_date` (timestamptz) - When the post was published
      - `is_featured` (boolean) - Whether post appears in featured section
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policy for public read access (anyone can view published posts)
    - Posts are read-only for public users
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text DEFAULT '',
  published_date timestamptz DEFAULT now(),
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (true);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, is_featured, published_date) VALUES
(
  '¿Cuales son las redes que más utilizan los E-commerce?',
  'redes-sociales-mas-utilizadas-ecommerce',
  'Las plataformas sociales son cruciales para el éxito del e-commerce. Conoce cuáles son las más efectivas y cómo utilizarlas.',
  'El e-commerce y las redes sociales van de la mano en 2025. Analizamos las plataformas más efectivas y cómo aprovecharlas al máximo.\n\n## Top 5 Redes Sociales para E-commerce\n\n### 1. Instagram\nPerfecto para productos visuales. Instagram Shopping permite compras directas.\n\n### 2. Facebook\nAún domina con Facebook Marketplace y anuncios altamente segmentados.\n\n### 3. TikTok\nEl crecimiento más rápido. Ideal para marcas que buscan audiencias jóvenes.\n\n### 4. Pinterest\nExcelente para moda, decoración y productos lifestyle.\n\n### 5. WhatsApp Business\nFundamental para atención al cliente y ventas directas.\n\n## Estrategias clave\n\n- Contenido consistente y de calidad\n- Interacción auténtica con la comunidad\n- Publicidad pagada estratégica\n- Influencer marketing',
  false,
  '2025-10-11T10:00:00Z'
),
(
  'El posicionamiento SEO como herramienta de crecimiento',
  'posicionamiento-seo-herramienta-crecimiento',
  'El SEO no es un gasto, es una inversión a largo plazo que genera tráfico orgánico constante y clientes calificados.',
  'El posicionamiento en buscadores (SEO) es una de las estrategias más rentables para hacer crecer tu negocio digital de forma sostenible.\n\n## ¿Por qué invertir en SEO?\n\n### Tráfico orgánico constante\nA diferencia de la publicidad pagada, el SEO genera resultados duraderos.\n\n### Clientes de alta calidad\nLas personas que buscan activamente tus servicios están más cerca de comprar.\n\n### Credibilidad y confianza\nAparecer en los primeros resultados genera autoridad.\n\n### ROI superior\nMenor costo por adquisición que otros canales.\n\n## Componentes de una estrategia SEO exitosa\n\n1. **Investigación de palabras clave**: Entender qué busca tu audiencia\n2. **Optimización on-page**: Contenido, meta tags, estructura\n3. **SEO técnico**: Velocidad, mobile-friendly, indexación\n4. **Link building**: Autoridad mediante enlaces de calidad\n5. **Contenido de valor**: Artículos, guías, recursos útiles\n\n## Resultados esperados\n\nEl SEO requiere paciencia. Resultados típicos:\n- 3-6 meses: Primeras mejoras\n- 6-12 meses: Crecimiento significativo\n- 12+ meses: Tráfico constante y sostenible',
  false,
  '2025-10-11T10:00:00Z'
);
