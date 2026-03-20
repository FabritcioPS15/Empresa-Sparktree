import { useEffect, useRef, useState } from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaInstagram, FaLinkedin, FaTiktok, FaCalendar, FaRocket, FaPlus, FaMinus, FaXmark } from 'react-icons/fa6';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import PageBanner from '@/components/ui/PageBanner';

interface ContactProps {
}

export default function Contact({ }: ContactProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [expandedFAQs, setExpandedFAQs] = useState<Set<number>>(new Set());
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Contacto' }
  ];

  const isFormValid = (
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.service.trim() !== '' &&
    formData.message.trim() !== ''
  );

  const buildEmailLink = () => {
    const subject = `Nuevo proyecto: ${formData.service || 'Consulta'}`;
    const body = [
      `Nombre: ${formData.name}`,
      `Email: ${formData.email}`,
      `Teléfono: ${formData.phone}`,
      `Empresa: ${formData.company || '-'}`,
      `Servicio: ${formData.service}`,
      `Presupuesto: ${formData.budget || '-'}`,
      `Plazo: ${formData.timeline || '-'}`,
      '',
      'Mensaje:',
      formData.message
    ].join('\n');
    return `mailto:contacto@sparktree.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const buildWhatsAppLink = () => {
    const lines = [
      '*Nuevo proyecto*',
      `Nombre: ${formData.name}`,
      `Email: ${formData.email}`,
      `Teléfono: ${formData.phone}`,
      `Empresa: ${formData.company || '-'}`,
      `Servicio: ${formData.service}`,
      `Presupuesto: ${formData.budget || '-'}`,
      `Plazo: ${formData.timeline || '-'}`,
      '',
      'Mensaje:',
      formData.message
    ];
    const text = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/51999999999?text=${text}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const timeoutId = setTimeout(() => {
      if (formRef.current) {
        const elements = formRef.current.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));
      }
      if (infoRef.current) {
        const elements = infoRef.current.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));
      }

      const scrollElements = document.querySelectorAll('.scroll-entrance');
      scrollElements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const toggleAllFAQs = () => {
    if (expandedFAQs.size === 6) {
      setExpandedFAQs(new Set());
    } else {
      setExpandedFAQs(new Set([0, 1, 2, 3, 4, 5]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '', email: '', phone: '', company: '', service: '', budget: '', timeline: '', message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicesList = [
    'Diseño de Páginas Web', 'Posicionamiento SEO', 'Branding', 'E-commerce', 
    'Aplicaciones Móviles', 'Consultoría Digital', 'Marketing Digital', 
    'Mantenimiento Web', 'Otro'
  ];

  const budgets = [
    'Menos de $1,000', '$1,000 - $3,000', '$3,000 - $5,000', 
    '$5,000 - $10,000', 'Más de $10,000', 'Por definir'
  ];


  const contactCards = [
    {
      icon: FaPhone, title: 'Teléfono', content: '+51 958 077 827',
      subtitle: 'Lun-Vie 9:00-18:00', href: 'tel:+51958077827'
    },
    {
      icon: FaEnvelope, title: 'Email', content: 'contacto@sparktree.com',
      subtitle: 'Respuesta en 24 horas', href: 'mailto:contacto@sparktree.com'
    },
    {
      icon: FaMapMarkerAlt, title: 'Ubicación', content: 'Lima, Lima, Perú',
      subtitle: 'Reuniones virtuales disponibles', href: null
    },
    {
      icon: FaCalendar, title: 'Consulta gratuita', content: '30 min de asesoría',
      subtitle: 'Agenda tu cita', href: null, action: () => setIsConsultationModalOpen(true)
    }
  ];

  return (
    <div className="pt-[72px]">
      <PageBanner 
        title="Hablemos de tu proyecto" 
        subtitle="Cuéntanos sobre tu idea y te ayudaremos a hacerla realidad. Estamos aquí para escucharte."
        breadcrumbs={breadcrumbs}
      />

      {/* Contact Form & Info Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
        {/* Decorative Modern Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#41f0a5]/5 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#3750f0]/5 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:items-start">
            
            {/* Contact Form - Glass Style */}
            <div ref={formRef} className="lg:col-span-7 scroll-entrance slide-left">
              <div className="relative group">
                {/* Glow Effect on Hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#41f0a5]/20 to-[#3750f0]/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                
                <div className="relative bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[3rem] p-8 sm:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12">
                    <div className="w-16 h-16 bg-gray-950 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <FaRocket className="text-[#41f0a5] text-3xl" />
                    </div>
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                        Transformemos tu visión
                      </h2>
                      <p className="text-gray-500 mt-2 text-lg">
                        Escuchamos tus ideas, impulsamos tus resultados.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label htmlFor="name" className="text-sm font-bold text-gray-800 ml-1 tracking-wide uppercase opacity-70">Tu Nombre</label>
                        <input
                          type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required
                          className="w-full px-6 py-5 bg-gray-50/50 backdrop-blur-sm border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#41f0a5] focus:bg-white focus:border-transparent transition-all duration-500 outline-none placeholder:text-gray-400 shadow-sm"
                          placeholder="Fabricio Peña"
                        />
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="email" className="text-sm font-bold text-gray-800 ml-1 tracking-wide uppercase opacity-70">Email de contacto</label>
                        <input
                          type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required
                          className="w-full px-6 py-5 bg-gray-50/50 backdrop-blur-sm border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#41f0a5] focus:bg-white focus:border-transparent transition-all duration-500 outline-none placeholder:text-gray-400 shadow-sm"
                          placeholder="hola@tuempresa.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label htmlFor="company" className="text-sm font-bold text-gray-800 ml-1 tracking-wide uppercase opacity-70">Empresa / Proyecto</label>
                        <input
                          type="text" id="company" name="company" value={formData.company} onChange={handleInputChange}
                          className="w-full px-6 py-5 bg-gray-50/50 backdrop-blur-sm border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#41f0a5] focus:bg-white focus:border-transparent transition-all duration-500 outline-none placeholder:text-gray-400 shadow-sm"
                          placeholder="Tu empresa o marca"
                        />
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="service" className="text-sm font-bold text-gray-800 ml-1 tracking-wide uppercase opacity-70">Servicio de interés</label>
                        <div className="relative">
                          <select
                            id="service" name="service" value={formData.service} onChange={handleInputChange} required
                            className="w-full px-6 py-5 bg-gray-50/50 backdrop-blur-sm border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#41f0a5] focus:bg-white focus:border-transparent transition-all duration-500 outline-none appearance-none shadow-sm cursor-pointer"
                          >
                            <option value="">Selecciona un servicio</option>
                            {servicesList.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                            <FaPlus size={14} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label htmlFor="budget" className="text-sm font-bold text-gray-800 ml-1 tracking-wide uppercase opacity-70">Presupuesto estimado</label>
                        <div className="relative">
                          <select
                            id="budget" name="budget" value={formData.budget} onChange={handleInputChange}
                            className="w-full px-6 py-5 bg-gray-50/50 backdrop-blur-sm border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#41f0a5] focus:bg-white focus:border-transparent transition-all duration-500 outline-none appearance-none shadow-sm cursor-pointer"
                          >
                            <option value="">Rango de inversión</option>
                            {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                            <FaPlus size={14} />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="timeline" className="text-sm font-bold text-gray-800 ml-1 tracking-wide uppercase opacity-70">Plazo deseado</label>
                        <input
                          type="text" id="timeline" name="timeline" value={formData.timeline} onChange={handleInputChange}
                          className="w-full px-6 py-5 bg-gray-50/50 backdrop-blur-sm border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#41f0a5] focus:bg-white focus:border-transparent transition-all duration-500 outline-none placeholder:text-gray-400 shadow-sm"
                          placeholder="Ej: 2 meses"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="message" className="text-sm font-bold text-gray-800 ml-1 tracking-wide uppercase opacity-70">Detalles del Proyecto</label>
                      <textarea
                        id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={5}
                        className="w-full px-6 py-5 bg-gray-50/50 backdrop-blur-sm border border-gray-100 rounded-[2rem] focus:ring-2 focus:ring-[#41f0a5] focus:bg-white focus:border-transparent transition-all duration-500 outline-none placeholder:text-gray-400 resize-none shadow-sm"
                        placeholder="Cuéntanos sobre tus objetivos, retos y cualquier detalle relevante..."
                      />
                    </div>

                    {submitStatus === 'success' && (
                      <div className="p-5 bg-[#41f0a5]/10 border border-[#41f0a5]/20 rounded-[1.5rem] flex items-center gap-4 animate-fade-in-scale">
                        <div className="w-10 h-10 bg-[#41f0a5] rounded-full flex items-center justify-center flex-shrink-0">
                          <FaCheckCircle className="text-white text-xl" />
                        </div>
                        <p className="text-gray-900 font-bold">¡Mensaje recibido! Te contactaremos muy pronto.</p>
                      </div>
                    )}

                    <div className="relative pt-6">
                      <button
                        type="submit" disabled={!isFormValid || isSubmitting}
                        className={`w-full py-6 bg-gray-950 text-white rounded-2xl font-black text-lg tracking-widest uppercase transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed group overflow-hidden`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-4">
                          {isSubmitting ? 'Procesando...' : 'Enviar Solicitud'}
                          {!isSubmitting && <FaRocket className="text-[#41f0a5] group-hover:translate-x-12 group-hover:-translate-y-12 transition-all duration-700 ease-in-out" />}
                        </span>
                        
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                      </button>
                      
                      {/* Secondary Contact Options overlay on hover */}
                      {isFormValid && (
                        <div className="absolute inset-x-0 bottom-0 top-[24px] flex opacity-0 hover:opacity-100 transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl translate-y-2 hover:translate-y-0">
                          <a href={buildEmailLink()} className="flex-1 bg-white border-2 border-gray-950 text-gray-950 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-black text-sm uppercase tracking-wider">
                            <MdOutlineAlternateEmail size={20} /> Vía Email
                          </a>
                          <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#41f0a5] text-black flex items-center justify-center gap-3 hover:bg-[#35d18d] transition-colors font-black text-sm uppercase tracking-wider">
                            <FaWhatsapp size={22} /> Vía WhatsApp
                          </a>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Info Section - Premium Side Cards */}
            <div ref={infoRef} className="lg:col-span-5 space-y-8 scroll-entrance slide-right">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {contactCards.map((card, idx) => (
                  <div 
                    key={idx} 
                    className="group relative p-8 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] transition-all duration-500 hover:translate-x-2 hover:shadow-2xl hover:shadow-black/5"
                    onClick={() => card.action?.()}
                  >
                    {/* Active Accent Bar */}
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-1.5 bg-[#41f0a5] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#41f0a5] group-hover:text-black transition-all duration-500 group-hover:rotate-6 shadow-sm">
                        <card.icon className="text-gray-900 text-2xl group-hover:text-inherit" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">{card.title}</h3>
                        {card.href ? (
                          <a href={card.href} className="text-xl font-bold text-gray-900 hover:text-[#41f0a5] transition-colors decoration-2 hover:underline underline-offset-4">{card.content}</a>
                        ) : (
                          <p className="text-xl font-bold text-gray-900">{card.content}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-2 font-medium">{card.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Redes Sociales - Glass & Dark Mix */}
              <div className="p-10 bg-gray-950 rounded-[3rem] relative overflow-hidden group shadow-2xl">
                {/* Background Decor */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#41f0a5]/20 blur-[100px] group-hover:bg-[#41f0a5]/30 transition-colors duration-700" />
                
                <div className="relative z-10">
                  <h3 className="text-white font-bold text-xl mb-8 tracking-tight">Síguenos en nuestras redes</h3>
                  <div className="flex gap-4">
                    {[
                      { icon: FaInstagram, href: "#", color: "hover:bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]" },
                      { icon: FaLinkedin, href: "#", color: "hover:bg-[#0077b5]" },
                      { icon: FaTiktok, href: "#", color: "hover:bg-white hover:text-black" }
                    ].map((social, i) => (
                      <a 
                        key={i} 
                        href={social.href} 
                        className={`w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white transition-all duration-500 ${social.color} hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]`}
                      >
                        <social.icon className="text-xl" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">Preguntas frecuentes</h2>
            <button
              onClick={toggleAllFAQs}
              className="px-6 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm font-bold text-gray-600 transition-all border border-gray-200"
            >
              {expandedFAQs.size === 6 ? 'Contraer todas' : 'Expandir todas'}
            </button>
          </div>

          <div className="space-y-4">
            {[
              { q: "¿Cuánto tiempo toma desarrollar un sitio web?", a: "Un sitio web estándar toma entre 3 a 5 semanas. Proyectos complejos de E-commerce o plataformas personalizadas pueden requerir de 8 a 12 semanas para garantizar la perfección en cada detalle." },
              { q: "¿Ofrecen mantenimiento después del lanzamiento?", a: "Absolutamente. No te dejamos solo. Ofrecemos planes de soporte mensual que incluyen actualizaciones de seguridad, respaldos regulares y optimización continua de rendimiento." },
              { q: "¿Trabajan con presupuesto ajustado?", a: "Creemos en democratizar la tecnología. Adaptamos nuestras soluciones para ofrecer el máximo valor posible según tu inversión, priorizando siempre las funcionalidades que generen más impacto." },
              { q: "¿Qué incluye el servicio de SEO?", a: "Mucho más que palabras clave. Realizamos una optimización técnica profunda, estrategia de contenidos, perfiles de autoridad y SEO local para asegurar que tus clientes te encuentren primero." },
              { q: "¿Garantizan resultados?", a: "Garantizamos un servicio de clase mundial. Nuestra metodología está diseñada para maximizar conversiones y visibilidad, basándonos en datos reales y las mejores prácticas de la industria." },
              { q: "¿Qué tecnologías utilizan?", a: "Solo lo último y mejor. Dominamos React, Next.js, Node.js y las mejores soluciones No-Code según el caso. Elegimos herramientas que aseguren que tu sitio sea rápido, seguro y escalable." }
            ].map((faq, i) => (
              <div key={i} className={`rounded-3xl border transition-all duration-500 ${expandedFAQs.has(i) ? 'border-[#41f0a5] bg-gray-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between"
                >
                  <span className="font-bold text-gray-900 text-lg">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${expandedFAQs.has(i) ? 'bg-[#41f0a5] text-black' : 'bg-gray-100 text-gray-500'}`}>
                    {expandedFAQs.has(i) ? <FaMinus size={12} /> : <FaPlus size={12} />}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedFAQs.has(i) ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-8 pt-0 text-gray-500 leading-relaxed text-lg border-t border-gray-100/50 mt-2">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      {isConsultationModalOpen && (
        <>
          <div className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-xl" onClick={() => setIsConsultationModalOpen(false)} />
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <div className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-lg pointer-events-auto p-10 animate-scale-in">
              <button onClick={() => setIsConsultationModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 transition-colors"><FaXmark size={24} /></button>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-[#41f0a5]/10 rounded-3xl flex items-center justify-center mx-auto mb-6"><FaCalendar className="text-[#41f0a5] text-3xl" /></div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Consulta Estratégica</h3>
                <p className="text-gray-500">30 minutos para transformar tu visión en un plan real.</p>
              </div>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsConsultationModalOpen(false); alert('¡Recibido! Nos vemos pronto.'); }}>
                <input required className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#41f0a5] outline-none" placeholder="Tu nombre" />
                <input type="email" required className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#41f0a5] outline-none" placeholder="Email de contacto" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" required className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#41f0a5] outline-none text-sm" />
                  <select required className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#41f0a5] outline-none text-sm">
                    <option value="">Hora</option>
                    <option>09:00 AM</option><option>11:00 AM</option><option>03:00 PM</option><option>05:00 PM</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-5 bg-gray-950 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all mt-4">Confirmar Cita</button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}