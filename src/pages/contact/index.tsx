import { useEffect, useState } from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaInstagram, FaLinkedin, FaTiktok, FaCalendar, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { MdOutlineHeadsetMic } from "react-icons/md";
import { ChevronDown } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function Contact() {
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
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  // States for split phone logic
  const [dialCode, setDialCode] = useState('51');
  const [phoneBody, setPhoneBody] = useState('');

  useEffect(() => {
    setFormData(prev => ({ ...prev, phone: dialCode + phoneBody }));
  }, [dialCode, phoneBody]);

  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Contacto' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', service: '', budget: '', timeline: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicesList = ['Diseño Web', 'SEO', 'Branding', 'Social Media', 'Apps Móviles', 'Otro'];
  const budgets = ['< $1,000', '$1,000 - $3,000', '$3,000 - $5,000', '> $5,000'];
  const timelines = ['Inmediato', 'En 1 mes', 'En 3 meses', 'A definir'];

  return (
    <div className="pt-[72px] bg-[#f8fafc]">
      <PageBanner
        title="Contacto"
        subtitle="Estamos aquí para ayudarte a impulsar tu negocio digital."
        breadcrumbs={breadcrumbs}
      />

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Side: Project Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 shadow-[0_10px_40px_-15px_rgba(37,99,235,0.1)] border border-blue-50">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-gray-900 mb-2">Cuéntanos tu proyecto</h2>
              <p className="text-gray-500 font-medium">Completa el formulario y te contactaremos en menos de 24 horas</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Nombre completo</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleInputChange} required
                    className="w-full px-5 py-4 bg-white border border-blue-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-gray-300"
                    placeholder="Nombre completo"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleInputChange} required
                    className="w-full px-5 py-4 bg-white border border-blue-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-gray-300"
                    placeholder="Correo electrónico"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 relative group/phone">
                  <label className="text-sm font-bold text-gray-700 ml-1">Teléfono</label>
                  <div className="flex items-center border border-blue-100 rounded-2xl bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all h-[58px] relative">
                    <div className="relative h-full flex items-center">
                      <PhoneInput
                        country={'pe'}
                        value={dialCode}
                        onChange={(_, data: any) => {
                          setDialCode(data.dialCode);
                          const btn = document.querySelector('.group\\/phone .selected-flag');
                          if (btn) btn.setAttribute('data-dial-code', `+${data.dialCode}`);
                        }}
                        onMount={(_, data: any) => {
                          setDialCode(data.dialCode);
                          const btn = document.querySelector('.group\\/phone .selected-flag');
                          if (btn) btn.setAttribute('data-dial-code', `+${data.dialCode}`);
                          const flagBtn = document.querySelector('.group\\/phone .flag-dropdown button');
                          if (flagBtn) flagBtn.setAttribute('type', 'button');
                        }}
                        countryCodeEditable={false}
                        inputClass="!hidden"
                        containerClass="!border-none !w-auto !h-full"
                        buttonClass="!bg-white !border-r !border-blue-50 !rounded-l-2xl !px-3 hover:!bg-gray-100 !flex !items-center !justify-center !w-[90px] !h-full !static"
                        dropdownClass="!bg-white !rounded-xl !shadow-2xl !border-blue-50 !text-gray-700"
                        enableSearch={true}
                        searchPlaceholder="Buscar..."
                        disableSearchIcon={true} // Removes the default emoji/icon
                      />
                    </div>
                    <input
                      type="tel"
                      value={phoneBody}
                      onChange={(e) => setPhoneBody(e.target.value.replace(/\D/g, ''))}
                      className="flex-1 px-5 py-4 bg-transparent outline-none placeholder:text-gray-300 font-medium text-gray-900 h-full rounded-r-2xl"
                      placeholder="Número de celular"
                    />
                  </div>
                  <style>{`
                    .group\\/phone .react-tel-input .flag-dropdown {
                      background: transparent;
                      border: none;
                      width: 90px;
                    }
                    .group\\/phone .react-tel-input .selected-flag {
                      width: 100%;
                      background: transparent;
                      display: flex !important;
                      align-items: center !important;
                      gap: 4px !important;
                      padding-left: 12px !important;
                      border-radius: 1rem 0 0 1rem !important;
                    }
                    .group\\/phone .react-tel-input .selected-flag::after {
                      content: attr(data-dial-code);
                      display: block;
                      font-size: 14px;
                      font-weight: 700;
                      color: #000000ff;
                      margin-left: 36px;
                    }
                    .group\\/phone .react-tel-input .flag {
                      position: absolute;
                      left: 12px;
                    }
                    /* Beautiful & Premium Search/Filter Box */
                    .group\\/phone .react-tel-input .search {
                      padding: 12px 16px !important;
                      margin: 0 !important;
                      background: #ffffff !important;
                      border-bottom: 1px solid #f1f5f9 !important;
                      position: sticky !important;
                      top: 0 !important;
                      z-index: 20 !important;
                      display: block !important;
                    }
                    .group\\/phone .react-tel-input .search-box {
                      width: 100% !important;
                      height: 42px !important;
                      padding: 10px 14px 10px 42px !important; /* Extra padding for icon */
                      border: 1px solid #e2e8f0 !important;
                      border-radius: 12px !important;
                      font-size: 14px !important;
                      font-weight: 500 !important;
                      background: #f8faff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cpath d='m21 21-4.3-4.3'%3E%3C/path%3E%3C/svg%3E") no-repeat 14px center !important;
                      color: #1e293b !important;
                      outline: none !important;
                      transition: all 0.2s !important;
                    }
                    .group\\/phone .react-tel-input .search-box:focus {
                      background: #ffffff !important;
                      border-color: #3b82f6 !important;
                      box-shadow: 0 4px 12px -2px rgba(59, 130, 246, 0.1) !important;
                    }
                    .group\\/phone .react-tel-input .country-list {
                      max-height: 320px !important;
                      width: 340px !important;
                      border-radius: 1.25rem !important;
                      margin-top: 10px !important;
                      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
                      border: 1px solid #f1f5f9 !important;
                      z-index: 9999;
                      /* Perfect Scroll Interaction */
                      overflow-y: auto !important;
                      overflow-x: hidden !important;
                      pointer-events: auto !important;
                      scrollbar-width: thin !important;
                      scrollbar-color: #e2e8f0 transparent !important;
                    }

                    /* Mobile Responsiveness */
                    @media (max-width: 640px) {
                      .group\\/phone .react-tel-input .country-list {
                        width: calc(100vw - 48px) !important;
                        position: fixed !important;
                        left: 24px !important;
                        top: 20% !important;
                        margin-top: 0 !important;
                        max-height: 60vh !important;
                      }
                    }

                    .group\\/phone .react-tel-input .country-list::-webkit-scrollbar {
                      width: 5px !important;
                    }
                    .group\\/phone .react-tel-input .country-list::-webkit-scrollbar-thumb {
                      background: #e2e8f0 !important;
                      border-radius: 10px !important;
                    }
                    .group\\/phone .react-tel-input .country-list .country {
                      padding: 14px 16px 14px 52px !important;
                      font-size: 14px !important;
                      font-weight: 500 !important;
                      color: #475569 !important;
                      transition: all 0.2s !important;
                      position: relative !important;
                    }
                    .group\\/phone .react-tel-input .country-list .country .flag {
                      position: absolute !important;
                      left: 16px !important;
                      top: 50% !important;
                      transform: translateY(-50%) !important;
                    }
                    .group\\/phone .react-tel-input .country-list .country.highlight {
                      background-color: #eff6ff !important;
                      color: #2563eb !important;
                    }
                    .group\\/phone .react-tel-input .country-list .country:hover {
                      background-color: #f8faff !important;
                      color: #1e293b !important;
                    }
                  `}</style>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Empresa</label>
                  <input
                    type="text" name="company" value={formData.company} onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-white border border-blue-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-gray-300"
                    placeholder="Nombre de empresa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Servicio de interés</label>
                  <div className="relative">
                    <select
                      name="service" value={formData.service} onChange={handleInputChange} required
                      className="w-full appearance-none px-5 py-4 bg-white border border-blue-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer text-gray-600 font-medium"
                    >
                      <option value="">Selecciona un servicio</option>
                      {servicesList.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Presupuesto aproximado</label>
                  <div className="relative">
                    <select
                      name="budget" value={formData.budget} onChange={handleInputChange} required
                      className="w-full appearance-none px-5 py-4 bg-white border border-blue-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer text-gray-600 font-medium"
                    >
                      <option value="">Selecciona un rango</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">¿Cuándo necesitas el proyecto?</label>
                <div className="relative">
                  <select
                    name="timeline" value={formData.timeline} onChange={handleInputChange} required
                    className="w-full appearance-none px-5 py-4 bg-white border border-blue-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer text-gray-600 font-medium"
                  >
                    <option value="">Selecciona un plazo</option>
                    {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Cuéntanos sobre tu proyecto</label>
                <textarea
                  name="message" value={formData.message} onChange={handleInputChange} required rows={4}
                  className="w-full px-5 py-4 bg-white border border-blue-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-gray-300 resize-none font-medium text-gray-600"
                  placeholder="Describe tu proyecto, objetivos, características, datos importantes, referencias..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 animate-fade-in-up">
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <p className="text-green-800 font-bold text-sm">¡Mensaje recibido! Te contactaremos muy pronto.</p>
                </div>
              )}

              <button
                type="submit" disabled={isSubmitting}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg tracking-widest uppercase transition-all shadow-lg shadow-blue-200 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Procesando...' : 'Enviar'}
              </button>
            </form>
          </div>

          {/* Right Side: Info Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div className="mb-2">
              <h2 className="text-2xl font-black text-gray-900 mb-2">Información de contacto</h2>
              <p className="text-gray-500 text-sm font-medium">Estamos disponibles para responder tus consultas y ayudarte con tu proyecto.</p>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-[#41F0A5] rounded-[2rem] p-8 text-center shadow-lg shadow-green-100">
              <h3 className="text-gray-900 font-black text-lg mb-4">¿Prefieres WhatsApp?</h3>
              <a
                href="https://wa.me/51958077827" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-2xl text-gray-900 font-bold hover:scale-105 transition-all shadow-sm"
              >
                <FaWhatsapp className="text-2xl text-green-500" />
                Chatea por WhatsApp
              </a>
            </div>

            {/* Contact Box Card */}
            <div className="bg-blue-600 rounded-[2.5rem] p-8 space-y-4 shadow-xl shadow-blue-100">
              <div
                onClick={() => setIsConsultationModalOpen(true)}
                className="bg-white hover:bg-gray-50 transition-colors p-4 rounded-xl flex items-center gap-4 cursor-pointer group"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg group-hover:scale-110 transition-transform">
                  <MdOutlineHeadsetMic className="text-blue-600 text-xl" />
                </div>
                <span className="text-blue-600 font-bold">Consulta gratuita</span>
              </div>

              <a href="tel:+51958077827" className="bg-white hover:bg-gray-50 transition-colors p-4 rounded-xl flex items-center gap-4 cursor-pointer group">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg group-hover:scale-110 transition-transform">
                  <FaPhone className="text-blue-600 text-lg" />
                </div>
                <span className="text-blue-600 font-bold">+51 958 077 827</span>
              </a>

              <a href="mailto:sparktree.pe@gmail.com" className="bg-white hover:bg-gray-50 transition-colors p-4 rounded-xl flex items-center gap-4 cursor-pointer group">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg group-hover:scale-110 transition-transform">
                  <FaEnvelope className="text-blue-600 text-lg" />
                </div>
                <span className="text-blue-600 font-bold">sparktree.pe@gmail.com</span>
              </a>

              <div className="bg-white/95 p-4 rounded-xl flex items-center gap-4 border border-white/20">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg">
                  <FaMapMarkerAlt className="text-blue-600 text-lg" />
                </div>
                <span className="text-blue-600 font-bold">Lima, Lima, Perú</span>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-white rounded-3xl p-8 border border-blue-50 shadow-lg shadow-blue-50">
              <h4 className="text-blue-600 font-bold text-center mb-6">Siguenos en nuestras redes sociales</h4>
              <div className="flex justify-center gap-6">
                <a href="#" className="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-md shadow-blue-100">
                  <FaInstagram size={24} />
                </a>
                <a href="#" className="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-md shadow-blue-100">
                  <FaTiktok size={24} />
                </a>
                <a href="#" className="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-md shadow-blue-100">
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      {isConsultationModalOpen && (
        <>
          <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm" onClick={() => setIsConsultationModalOpen(false)} />
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10 relative">
              <button onClick={() => setIsConsultationModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"><FaXmark size={24} /></button>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4"><FaCalendar className="text-blue-600 text-2xl" /></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Consulta Estratégica</h3>
                <p className="text-gray-500 text-sm">Agenda una reunión gratuita de 30 minutos.</p>
              </div>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsConsultationModalOpen(false); alert('¡Recibido!'); }}>
                <input required className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium" placeholder="Tu nombre" />
                <input type="email" required className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium" placeholder="Email de contacto" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" required className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold" />
                  <select required className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold">
                    <option value="">Hora</option>
                    <option>09:00 AM</option><option>11:00 AM</option><option>03:00 PM</option><option>05:00 PM</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all mt-4">Confirmar Cita</button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}