import { useEffect, useRef, useState } from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaInstagram, FaLinkedin, FaTiktok, FaTelegram, FaCalendar, FaHeadset, FaRocket, FaChevronLeft, FaChevronRight, FaPlus, FaMinus } from 'react-icons/fa6';
import { FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

interface ContactProps {
  onNavigate?: (page: string) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  const heroRef = useRef<HTMLDivElement>(null);
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
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [lineProgress, setLineProgress] = useState(0);
  const [expandedFAQs, setExpandedFAQs] = useState<Set<number>>(new Set());

  useEffect(() => {
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
      // Observe reveal elements
      if (heroRef.current) {
        const elements = heroRef.current.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));
      }
      if (formRef.current) {
        const elements = formRef.current.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));
      }
      if (infoRef.current) {
        const elements = infoRef.current.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));
      }
      
      // Observe scroll-entrance elements
      const scrollElements = document.querySelectorAll('.scroll-entrance');
      scrollElements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  // Animación de línea de tiempo
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mostrar pasos uno por uno
      const stepInterval = setInterval(() => {
        setVisibleSteps(prev => {
          const nextStep = prev.length;
          if (nextStep < 4) {
            return [...prev, nextStep];
          }
          clearInterval(stepInterval);
          return prev;
        });
      }, 600); // Cada 600ms aparece un paso

      // Animar la línea después de que aparezcan todos los pasos
      setTimeout(() => {
        setLineProgress(100);
      }, 2400); // 4 pasos * 600ms = 2400ms

      return () => clearInterval(stepInterval);
    }, 500); // Delay inicial

    return () => clearTimeout(timer);
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
    const totalFAQs = 6; // Número total de preguntas
    if (expandedFAQs.size === totalFAQs) {
      // Si todas están abiertas, cerrar todas
      setExpandedFAQs(new Set());
    } else {
      // Si no todas están abiertas, abrir todas
      setExpandedFAQs(new Set([0, 1, 2, 3, 4, 5]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        timeline: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    'Diseño de Páginas Web',
    'Posicionamiento SEO',
    'Branding',
    'E-commerce',
    'Aplicaciones Móviles',
    'Consultoría Digital',
    'Marketing Digital',
    'Mantenimiento Web',
    'Otro'
  ];

  const budgets = [
    'Menos de $1,000',
    '$1,000 - $3,000',
    '$3,000 - $5,000',
    '$5,000 - $10,000',
    'Más de $10,000',
    'Por definir'
  ];

  const timelines = [
    'Urgente (1-2 semanas)',
    'Rápido (2-4 semanas)',
    'Normal (1-2 meses)',
    'Flexible (2-3 meses)',
    'Sin prisa'
  ];

  const contactMethods = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: FaWhatsapp,
      description: 'Respuesta inmediata',
      color: 'bg-green-600',
      href: 'https://wa.me/51999999999'
    },
    {
      id: 'phone',
      name: 'Llamada',
      icon: FaPhone,
      description: 'Lun-Vie 9:00-18:00',
      color: 'bg-blue-600',
      href: 'tel:+51999999999'
    },
    {
      id: 'email',
      name: 'Email',
      icon: FaEnvelope,
      description: 'Respuesta en 24h',
      color: 'bg-gray-600',
      href: 'mailto:contacto@sparktree.com'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: FaTelegram,
      description: 'Chat rápido',
      color: 'bg-blue-500',
      href: 'https://t.me/sparktree'
    }
  ];

  const contactCards = [
    {
      icon: FaPhone,
      title: 'Teléfono',
      content: '+51 999 999 999',
      subtitle: 'Lun-Vie 9:00-18:00',
      href: 'tel:+51999999999'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      content: 'contacto@sparktree.com',
      subtitle: 'Respuesta en 24 horas',
      href: 'mailto:contacto@sparktree.com'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Ubicación',
      content: 'Surco, Lima, Perú',
      subtitle: 'Reuniones presenciales disponibles',
      href: null
    },
    {
      icon: FaCalendar,
      title: 'Consulta gratuita',
      content: '30 minutos de asesoría sin costo',
      subtitle: 'Agenda tu cita',
      href: null
    }
  ];

  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-gray-50 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-12 sm:-top-24 -right-12 sm:-right-24 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-gradient-to-br from-gray-200 to-white blur-3xl" />
          <div className="absolute -bottom-12 sm:-bottom-24 -left-12 sm:-left-24 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-gradient-to-tr from-gray-200 to-white blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 scroll-entrance initial-visible">
              <span className="inline-block h-2 w-2 rounded-full bg-gray-900" />
              Contacto
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4 scroll-entrance initial-visible">
              Hablemos de tu
              <span className="text-gradient"> proyecto</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto px-2 scroll-entrance initial-visible slide-left">
              Cuéntanos sobre tu idea y te ayudaremos a hacerla realidad. Estamos aquí para escucharte y ofrecerte la mejor solución.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-6 sm:py-8 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 scroll-entrance">
              Elige tu forma preferida de contacto
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base scroll-entrance px-2">
              Selecciona el método que prefieras para comunicarte con nosotros
            </p>
          </div>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={method.id}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group p-3 sm:p-4 md:p-6 rounded-xl border-2 border-gray-200 hover:border-gray-900 transition-all duration-300 text-center scroll-entrance slide-up scroll-stagger-${index + 1} hover:shadow-lg hover:scale-105`}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 ${method.color} rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className="text-white text-base sm:text-lg md:text-xl" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base mb-1">
                  {method.name}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {method.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Contact Form */}
            <div ref={formRef} className="scroll-entrance slide-left order-2 lg:order-1">
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaRocket className="text-white text-lg" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                      Cuéntanos tu proyecto
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Completa el formulario y te contactaremos en menos de 24 horas
                    </p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors duration-200"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors duration-200"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors duration-200"
                        placeholder="+51 999 999 999"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors duration-200"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="service" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Servicio de interés *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Selecciona un servicio</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Presupuesto aproximado
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Selecciona un rango</option>
                        {budgets.map((budget) => (
                          <option key={budget} value={budget}>
                            {budget}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      ¿Cuándo necesitas el proyecto?
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors duration-200"
                    >
                      <option value="">Selecciona un plazo</option>
                      {timelines.map((timeline) => (
                        <option key={timeline} value={timeline}>
                          {timeline}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Cuéntanos sobre tu proyecto *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors duration-200 resize-none"
                      placeholder="Describe tu proyecto, objetivos, características específicas que necesitas, referencias de sitios que te gustan, y cualquier detalle que consideres importante..."
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                      <FaCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                      <div>
                        <p className="text-green-800 font-medium text-sm">
                          ¡Mensaje enviado correctamente!
                        </p>
                        <p className="text-green-700 text-xs">
                          Te contactaremos pronto. Revisa tu email para confirmación.
                        </p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">
                        Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos directamente.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 font-medium text-xs sm:text-sm flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <FaRocket className="text-xs sm:text-sm" />
                        Enviar proyecto
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info Carrusel */}
            <div ref={infoRef} className="scroll-entrance slide-right order-1 lg:order-2">
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">
                    Información de contacto
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                    Estamos disponibles para responder tus consultas y ayudarte con tu proyecto.
                  </p>
                </div>

                {/* Contact Cards Carrusel */}
                <div className="relative">
                  <div className="overflow-hidden rounded-lg">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
                    >
                      {contactCards.map((card, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                          <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 min-h-[100px] sm:min-h-[120px]">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                              <card.icon className="text-white text-base sm:text-lg" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">
                                {card.title}
                              </h3>
                              {card.href ? (
                                <a 
                                  href={card.href}
                                  className="text-gray-600 hover:text-gray-900 transition-colors text-xs sm:text-sm md:text-base block mb-1"
                                >
                                  {card.content}
                                </a>
                              ) : (
                                <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-1">
                                  {card.content}
                                </p>
                              )}
                              <p className="text-gray-500 text-xs">
                                {card.subtitle}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Controles del carrusel */}
                  <div className="flex items-center justify-between mt-3 sm:mt-4">
                    <button
                      onClick={() => setCurrentCardIndex((prev) => (prev - 1 + 4) % 4)}
                      className="p-1.5 sm:p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <FaChevronLeft className="text-gray-600 text-xs sm:text-sm" />
                    </button>
                    
                    {/* Indicadores */}
                    <div className="flex gap-1.5 sm:gap-2">
                      {contactCards.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentCardIndex(index)}
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-200 ${
                            index === currentCardIndex ? 'bg-gray-900' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentCardIndex((prev) => (prev + 1) % 4)}
                      className="p-1.5 sm:p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <FaChevronRight className="text-gray-600 text-xs sm:text-sm" />
                    </button>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-gray-900 rounded-xl p-4 sm:p-6 text-center">
                  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <FaWhatsapp className="text-green-400 text-xl sm:text-2xl" />
                    <h3 className="text-white font-medium text-base sm:text-lg">
                      ¿Prefieres WhatsApp?
                    </h3>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
                    Chatea con nosotros directamente para una respuesta más rápida
                  </p>
                  <a
                    href="https://wa.me/51999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium text-xs sm:text-sm"
                  >
                    <FaWhatsapp size={16} />
                    Chatear por WhatsApp
                  </a>
                </div>

                {/* Social Links */}
                <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                  <h3 className="font-medium text-gray-900 text-xs sm:text-sm md:text-base mb-3 sm:mb-4">
                    Síguenos en redes sociales
                  </h3>
                  <div className="flex gap-2 sm:gap-3 justify-center sm:justify-start">
                    <a 
                      href="https://instagram.com/sparktree" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-gray-200 text-gray-900 hover:bg-gray-100 transition-colors duration-300 shadow-sm"
                    >
                      <FaInstagram size={16} />
                    </a>
                    <a 
                      href="https://linkedin.com/company/sparktree" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-gray-200 text-gray-900 hover:bg-gray-100 transition-colors duration-300 shadow-sm"
                    >
                      <FaLinkedin size={16} />
                    </a>
                    <a 
                      href="https://tiktok.com/@sparktree" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-gray-200 text-gray-900 hover:bg-gray-100 transition-colors duration-300 shadow-sm"
                    >
                      <FaTiktok size={16} />
                    </a>
                    <a 
                      href="https://t.me/sparktree" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-gray-200 text-gray-900 hover:bg-gray-100 transition-colors duration-300 shadow-sm"
                    >
                      <FaTelegram size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Timeline */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4 scroll-entrance">
              Nuestro proceso de trabajo
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base scroll-entrance px-2">
              Así es como trabajamos contigo para hacer realidad tu proyecto
            </p>
          </div>

          <div className="relative">
            {/* Línea de tiempo */}
            <div className="hidden lg:block absolute top-8 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200">
              <div 
                className="absolute top-0 left-0 w-full bg-gray-900 transition-all duration-2000 ease-out"
                style={{ height: `${lineProgress}%` }}
              />
            </div>

            {/* Línea de tiempo móvil */}
            <div className="lg:hidden absolute top-8 left-8 w-1 h-full bg-gray-200">
              <div 
                className="absolute top-0 left-0 w-full bg-gray-900 transition-all duration-2000 ease-out"
                style={{ height: `${lineProgress}%` }}
              />
            </div>

            <div className="space-y-8 lg:space-y-12">
              {[
                {
                  step: "01",
                  title: "Consulta inicial",
                  description: "Analizamos tus necesidades y objetivos en una reunión gratuita de 30 minutos.",
                  icon: FaHeadset
                },
                {
                  step: "02", 
                  title: "Propuesta personalizada",
                  description: "Creamos una propuesta detallada con cronograma, presupuesto y alcance del proyecto.",
                  icon: FaRocket
                },
                {
                  step: "03",
                  title: "Desarrollo",
                  description: "Trabajamos en tu proyecto con comunicación constante y entregas parciales.",
                  icon: FaCheckCircle
                },
                {
                  step: "04",
                  title: "Lanzamiento y soporte",
                  description: "Lanzamos tu proyecto y te brindamos soporte continuo para su éxito.",
                  icon: FaCalendar
                }
              ].map((process, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-start lg:items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } transition-all duration-700 ease-out ${
                    visibleSteps.includes(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  {/* Punto de la línea de tiempo */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto transition-all duration-500 ${
                      visibleSteps.includes(index) 
                        ? 'scale-100 opacity-100' 
                        : 'scale-75 opacity-0'
                    }`}>
                      <process.icon className="text-white text-xl" />
                    </div>
                  </div>

                  {/* Contenido del paso */}
                  <div className={`ml-6 sm:ml-8 lg:ml-12 lg:w-1/2 ${
                    index % 2 === 0 ? 'lg:pr-4 lg:pr-8' : 'lg:pl-4 lg:pl-8'
                  }`}>
                    <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="text-xl sm:text-2xl font-bold text-gray-900">{process.step}</div>
                        <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                          {process.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        {process.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4 scroll-entrance">
              Preguntas frecuentes
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base scroll-entrance px-2 mb-4">
              Respuestas a las consultas más comunes sobre nuestros servicios
            </p>
            <button
              onClick={toggleAllFAQs}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {expandedFAQs.size === 6 ? (
                <>
                  <FaMinus size={14} />
                  Cerrar todas
                </>
              ) : (
                <>
                  <FaPlus size={14} />
                  Expandir todas
                </>
              )}
            </button>
          </div>

          <div className="space-y-0">
            {[
              {
                question: "¿Cuánto tiempo toma desarrollar un sitio web?",
                answer: "El tiempo de desarrollo depende de la complejidad del proyecto. Un sitio web básico puede tomar 2-3 semanas, mientras que proyectos más complejos pueden requerir 6-8 semanas. Incluimos tiempo para revisiones y ajustes."
              },
              {
                question: "¿Ofrecen mantenimiento después del lanzamiento?",
                answer: "Sí, ofrecemos planes de mantenimiento que incluyen actualizaciones de seguridad, respaldos regulares, monitoreo de rendimiento, soporte técnico y actualizaciones de contenido. Los planes van desde $50/mes hasta $200/mes según las necesidades."
              },
              {
                question: "¿Trabajan con empresas de cualquier tamaño?",
                answer: "Absolutamente. Trabajamos con startups, pequeñas empresas, medianas empresas y corporaciones. Adaptamos nuestros servicios y precios a las necesidades específicas de cada cliente, desde proyectos de $500 hasta $50,000+."
              },
              {
                question: "¿Qué incluye el servicio de SEO?",
                answer: "Nuestro servicio de SEO incluye auditoría técnica completa, optimización de contenido, investigación de palabras clave, optimización local, link building, reportes mensuales de progreso y seguimiento de rankings en Google."
              },
              {
                question: "¿Pueden trabajar con mi presupuesto?",
                answer: "Sí, trabajamos con diferentes rangos de presupuesto. Ofrecemos opciones desde sitios web básicos hasta soluciones empresariales completas. Siempre buscamos la mejor relación calidad-precio para tu proyecto."
              },
              {
                question: "¿Qué tecnologías utilizan?",
                answer: "Utilizamos las tecnologías más modernas y confiables: React, Next.js, Node.js, WordPress, Shopify, y bases de datos como PostgreSQL y MongoDB. Siempre elegimos la mejor tecnología para cada proyecto específico."
              }
            ].map((faq, index) => {
              const isExpanded = expandedFAQs.has(index);
              
              return (
                <div key={index} className="bg-white border-b border-gray-200 last:border-b-0 scroll-entrance hover:shadow-sm transition-shadow duration-200">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:bg-gray-50 group"
                  >
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base md:text-lg pr-4 group-hover:text-gray-700 transition-colors duration-200">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <div className={`transform transition-transform duration-300 ease-in-out ${
                        isExpanded ? 'rotate-180' : 'rotate-0'
                      }`}>
                        {isExpanded ? (
                          <FaMinus className="text-gray-600 text-sm sm:text-base" />
                        ) : (
                          <FaPlus className="text-gray-500 text-sm sm:text-base group-hover:text-gray-600 transition-colors duration-200" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                      <div className="border-l-2 border-gray-200 pl-4">
                        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4 scroll-entrance">
            ¿Listo para comenzar tu proyecto?
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-6 sm:mb-8 scroll-entrance px-2">
            No esperes más. Contáctanos ahora y recibe una consulta gratuita de 30 minutos para evaluar tu proyecto.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center scroll-entrance">
            <a
              href="https://wa.me/51999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium text-xs sm:text-sm md:text-base"
            >
              <FaWhatsapp size={16} />
              Chatear por WhatsApp
            </a>
            <a
              href="tel:+51999999999"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium text-xs sm:text-sm md:text-base"
            >
              <FaPhone size={16} />
              Llamar ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
