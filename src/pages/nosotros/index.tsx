import { usePageMeta } from '@/hooks/usePageMeta';
import { Target, Eye, Shield, Users, Rocket, Zap } from 'lucide-react';
import CountUp from '@/components/common/CountUp';
import PageBanner from '@/components/ui/PageBanner';

export default function Nosotros() {
  usePageMeta({
    title: 'Nosotros | SparkTree - Hub Empresarial de Innovación Digital',
    description: 'Conoce la historia, misión y el equipo detrás de SparkTree. Somos un hub empresarial dedicado a potenciar negocios a través de la tecnología y el diseño estratégico.',
  });

  const stats = [
    { label: 'Proyectos Entregados', value: 150, suffix: '+' },
    { label: 'Clientes Felices', value: 80, suffix: '+' },
    { label: 'Años de Experiencia', value: 5, suffix: '+' },
    { label: 'Especialistas', value: 12, suffix: '' },
  ];

  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Nosotros' }
  ];

  const values = [
    {
      icon: <Target className="w-6 h-6 text-emerald-500" />,
      title: 'Propósito',
      description: 'Nuestra misión es democratizar el acceso a tecnología de alto nivel para empresas que buscan liderar su mercado.'
    },
    {
      icon: <Eye className="w-6 h-6 text-blue-500" />,
      title: 'Visión',
      description: 'Convertirnos en el hub empresarial de referencia en Latinoamérica, siendo el motor de innovación de nuestros aliados.'
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      title: 'Confianza',
      description: 'Trabajamos con total transparencia y compromiso, tratando cada proyecto como si fuera nuestro propio negocio.'
    }
  ];

  return (
    <div className="pt-[72px]">
      <PageBanner 
        title="Más que una agencia, somos tu Hub Empresarial" 
        subtitle="En SparkTree, fusionamos la creatividad del diseño con la precisión de la ingeniería para construir el futuro de los negocios digitales."
        breadcrumbs={breadcrumbs}
      />

      {/* Stats Section */}
      <section className="py-12 bg-[#41f0a5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <CountUp 
                  end={stat.value} 
                  suffix={stat.suffix} 
                  className="text-4xl md:text-5xl font-black text-gray-950 mb-2 block" 
                />
                <p className="text-gray-900 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Nuestra Filosofía</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Entendemos que el mercado actual no solo exige presencia digital, sino <strong>relevancia estratégica</strong>. No creamos sitios web; creamos ecosistemas de ventas. No diseñamos logos; construimos identidades que perduran.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-emerald-100 p-1 rounded-full"><Zap className="w-4 h-4 text-emerald-600" /></div>
                  <p className="text-gray-700"><strong>Innovación Constante:</strong> Siempre a la vanguardia de las últimas tendencias tecnológicas.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-100 p-1 rounded-full"><Rocket className="w-4 h-4 text-blue-600" /></div>
                  <p className="text-gray-700"><strong>Enfoque en Resultados:</strong> Cada línea de código tiene un propósito comercial.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-purple-100 p-1 rounded-full"><Users className="w-4 h-4 text-purple-600" /></div>
                  <p className="text-gray-700"><strong>Colaboración Radical:</strong> Somos una extensión de tu equipo de trabajo.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gray-100 overflow-hidden shadow-2xl">
                {/* Placeholder for a professional team image */}
                <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
                  [Imagen del equipo SparkTree]
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-gray-100">
                <p className="text-gray-900 font-bold italic">"Nuestra meta es que tu negocio nunca deje de crecer."</p>
                <p className="text-emerald-500 text-sm mt-2">— Dirección SparkTree</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
