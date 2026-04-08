import { useState, useEffect } from "react";
import { Project } from "@/data/projects";
import { supabase } from "@/lib/supabase";
import {
  FileText,
  PencilLine,
  Rocket,
  Image as ImageIcon,
  Upload,
  X,
  Lock,
  Loader2,
  CheckCircle2,
  LogOut,
  Eye,
  EyeOff,
  Star,
  Video,
  Globe,
  Monitor,
  Tag,
  Eye as EyeIcon,
} from "lucide-react";
import ProjectDetail from "../portfolio/ProjectDetail";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PREDEFINED_SERVICES: Record<string, string[]> = {
  "Generales": ["Diseño Web", "Branding Corporativo", "Marketing Digital", "Producción Audiovisual", "Desarrollo de Software", "Estrategia Digital"],
  "Webs": ["Desarrollo Web", "E-commerce", "Landing Page", "Diseño UI/UX", "WordPress", "Optimización Web"],
  "Diseño": ["Branding", "Logotipo", "Identidad Visual", "Ilustración", "Packaging", "Diseño Editorial"],
  "Multimedia": ["Video Corporativo", "Fotografía", "Animación 2D/3D", "Edición de Video", "Drone", "Streaming"],
  "Sistemas": ["Software a Medida", "App Móvil", "QA & Testing", "Arquitectura Cloud", "Ciberseguridad", "Soporte TI"],
  "Marketing": ["Social Media", "Google Ads", "Meta Ads", "SEO", "Estrategia de Contenidos", "Inbound Marketing"],
};

export default function PortfolioEditor() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    services: [],
    results: [],
    technologies: [],
    team: [],
    resultImages: [],
    additionalImages: [],
    heroImages: [],
    isVisible: true,
    isFeatured: false,
    orderRank: 0,
  });
  const [activeTab, setActiveTab] = useState<
    "general" | "content" | "impact" | "media"
  >("general");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [expandedPreviews, setExpandedPreviews] = useState<Set<string>>(new Set());

  useEffect(() => {
    checkUser();
    fetchProjects();
  }, []);

  useEffect(() => {
    if (isPreviewOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPreviewOpen]);

  async function checkUser() {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("orderRank", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
    } else if (data) {
      // Normalize media arrays to ensure they have proper ProjectMedia structure
      const normalizedData = data.map((project: any) => ({
        ...project,
        resultImages: (project.resultImages || []).map((item: any) => {
          // Si es string, verificar si ya es un JSON válido o solo es una URL
          if (typeof item === "string") {
            try {
              const parsed = JSON.parse(item);
              // Si el parseado es un objeto con url, usarlo
              if (typeof parsed === "object" && parsed.url) {
                return parsed;
              }
              // Si no, tratar el string original como URL
              return { url: item, category: "", type: "image" };
            } catch {
              // Si falla el parseo, tratar el string como URL
              return { url: item, category: "", type: "image" };
            }
          }
          // Si ya es objeto, retornarlo directamente
          return typeof item === "object" && item.url ? item : { url: item, category: "", type: "image" };
        }),
        additionalImages: (project.additionalImages || []).map((item: any) => {
          // Si es string, verificar si ya es un JSON válido o solo es una URL
          if (typeof item === "string") {
            try {
              const parsed = JSON.parse(item);
              // Si el parseado es un objeto con url, usarlo
              if (typeof parsed === "object" && parsed.url) {
                return parsed;
              }
              // Si no, tratar el string original como URL
              return { url: item, category: "", type: "image" };
            } catch {
              // Si falla el parseo, tratar el string como URL
              return { url: item, category: "", type: "image" };
            }
          }
          // Si ya es objeto, retornarlo directamente
          return typeof item === "object" && item.url ? item : { url: item, category: "", type: "image" };
        }),
      }));
      setProjectsList(normalizedData as Project[]);
    }
  }

  // Helper for array inputs
  const handleArrayChange = (
    field: keyof Project,
    index: number,
    value: string,
  ) => {
    const arr = (formData[field] as any[]) || [];
    const newArr = [...arr];
    newArr[index] = value;
    setFormData({ ...formData, [field]: newArr });
  };

  const handleMediaChange = (
    field: "resultImages" | "additionalImages",
    index: number,
    value: string,
    property: "url" | "category" | "type" = "url"
  ) => {
    const arr = (formData[field] as any[]) || [];
    const newArr = [...arr];
    const current = newArr[index];

    if (typeof current === "string" || !current) {
      newArr[index] = {
        url: property === "url" ? value : current || "",
        category: property === "category" ? value : "",
        type: property === "type" ? (value as any) : "image",
      };
    } else {
      newArr[index] = { ...current, [property]: value };
    }

    setFormData({ ...formData, [field]: newArr });
  };

  const addArrayItem = (field: keyof Project) => {
    const currentArray = (formData[field] as any[]) || [];
    const newItem = (field === 'resultImages' || field === 'additionalImages')
      ? { url: "", category: "", type: "image" as const }
      : "";

    setFormData({
      ...formData,
      [field]: [...currentArray, newItem],
    });
  };

  const removeArrayItem = (field: keyof Project, index: number) => {
    const newArr = [...(formData[field] as any[])];
    newArr.splice(index, 1);
    setFormData({ ...formData, [field]: newArr });
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    callback: (url: string) => void,
  ) => {
    try {
      if (!event.target.files || event.target.files.length === 0) return;
      const file = event.target.files[0];

      setIsUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Correct bucket name
      const { error: uploadError } = await supabase.storage
        .from("PortafolioVirtualSparktree")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("PortafolioVirtualSparktree")
        .getPublicUrl(filePath);

      callback(data.publicUrl);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error subiendo imagen: ${error.message}`);
      } else {
        alert("Error desconocido al subir imagen");
      }
    } finally {
      setIsUploading(false);
      // Reset input
      event.target.value = "";
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData(project);
    setActiveTab("general");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async () => {
    if (!formData.title) return alert("El título es obligatorio");

    setIsSaving(true);

    const projectId =
      editingId ||
      formData.id ||
      formData.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const projectData = {
      ...formData,
      id: projectId,
    };

    const { error } = await supabase.from("projects").upsert(projectData);

    if (error) {
      alert(`Error al guardar: ${error.message}`);
    } else {
      setSaveSuccess(true);
      setEditingId(null);
      setFormData({
        services: [],
        results: [],
        technologies: [],
        team: [],
        resultImages: [],
        additionalImages: [],
        heroImages: [],
        cardImage: "",
      });
      fetchProjects();
      setTimeout(() => setSaveSuccess(false), 3000);
    }

    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este proyecto?")
    ) {
      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) {
        alert(`Error al eliminar: ${error.message}`);
      } else {
        if (editingId === id) {
          setEditingId(null);
          setFormData({
            services: [],
            results: [],
            technologies: [],
            team: [],
            resultImages: [],
            additionalImages: [],
            heroImages: [],
          });
        }
        fetchProjects();
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });

    if (error) {
      setLoginError(error.message);
    } else {
      setIsAuthenticated(true);
    }
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        {isPreviewOpen && (
          <div className="fixed inset-0 z-[100] bg-white overflow-y-auto overflow-x-hidden scroll-smooth">
            <Header currentPage="project-detail" onNavigate={() => { }} />
            <ProjectDetail projectId={editingId || "preview"} initialData={formData as any} isPreview={true} />
            <Footer onNavigate={() => { }} currentPage="project-detail" />

            {/* Botón Flotante para salir de Vista Previa */}
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-gray-900/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-black transition-all shadow-2xl hover:scale-105 active:scale-95 border border-white/20 group"
            >
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center group-hover:rotate-90 transition-transform">
                <X size={20} />
              </div>
              <span>Salir de Vista Previa</span>
            </button>
          </div>
        )}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100 animate-fade-in-scale">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Acceso Restringido
          </h1>
          <p className="text-gray-500 text-center text-sm mb-8">
            Ingresa tus credenciales para administrar el portafolio
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                className="w-full px-5 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="admin@sparktree.pe"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="w-full px-5 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="••••••••"
                required
              />
            </div>

            {loginError && (
              <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-lg">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-md"
            >
              Ingresar al Editor
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-50 pb-20 relative">
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[150] bg-white overflow-y-auto overflow-x-hidden scroll-smooth animate-in fade-in duration-300">
          <div className="min-h-screen flex flex-col">
            <Header currentPage="project-detail" onNavigate={() => { }} />
            <main className="flex-grow">
              <ProjectDetail projectId={editingId || "preview"} initialData={formData as any} isPreview={true} />
            </main>
            <Footer onNavigate={() => { }} currentPage="project-detail" />
          </div>

          {/* Botón Flotante para salir de Vista Previa */}
          <button
            onClick={() => setIsPreviewOpen(false)}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-gray-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-black transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 border border-white/10 group"
          >
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center group-hover:rotate-90 transition-transform shadow-inner">
              <X size={20} />
            </div>
            <span className="tracking-tight">Salir de Vista Previa</span>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Editor Maestro de Portafolio
            </h1>
            <p className="text-gray-500 mt-1">
              Configura cada detalle de tus proyectos con precisión quirúrgica.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition shadow-sm"
            >
              <Eye size={18} /> Vista Previa
            </button>
            <button
              onClick={() => {
                setFormData({
                  services: [],
                  results: [],
                  technologies: [],
                  team: [],
                  resultImages: [],
                  additionalImages: [],
                });
                setEditingId(null);
                setActiveTab("general");
              }}
              className="px-5 py-2.5 bg-gray-900 border border-transparent text-white rounded-xl hover:bg-black transition font-medium shadow-md shadow-gray-200"
            >
              Nuevo Proyecto
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition font-medium shadow-sm flex items-center gap-2"
            >
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Editing Area */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
              {/* Area de Título del Proyecto (Editor de Contexto) */}
              <div className="p-8 pb-0">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                    {editingId ? <PencilLine size={24} /> : <Rocket size={24} />}
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">En Edición</h2>
                    <h3 className="text-xl font-bold text-gray-900 truncate max-w-[400px]">
                      {formData.title || "Nuevo Proyecto Estratégico"}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Tabs Navigation (Sticky) */}
              <div className="sticky top-0 z-[55] flex border-b border-gray-100 bg-white/90 backdrop-blur-xl mt-6 px-4">
                {[
                  {
                    id: "general",
                    label: "General",
                    icon: <FileText size={18} />,
                  },
                  {
                    id: "content",
                    label: "Contenido",
                    icon: <PencilLine size={18} />,
                  },
                  {
                    id: "impact",
                    label: "Impacto",
                    icon: <Rocket size={18} />,
                  },
                  {
                    id: "media",
                    label: "Multimedia",
                    icon: <ImageIcon size={18} />,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() =>
                      setActiveTab(
                        tab.id as "general" | "content" | "impact" | "media",
                      )
                    }
                    className={`flex-1 py-6 text-[10px] font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-3 border-b-4 ${activeTab === tab.id
                      ? "border-indigo-600 text-indigo-600 bg-indigo-50/10"
                      : "border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50/50"
                      }`}
                  >
                    <span className={`${activeTab === tab.id ? "scale-110" : "scale-100"} transition-transform`}>{tab.icon}</span>
                    <span className="hidden lg:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === "general" && (
                  <div className="grid sm:grid-cols-2 gap-6 animate-fade-in-scale">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Título del Proyecto
                      </label>
                      <input
                        type="text"
                        value={formData.title || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-lg font-semibold"
                        placeholder="Nombre comercial del proyecto"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Cliente
                      </label>
                      <input
                        type="text"
                        value={formData.client || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, client: e.target.value })
                        }
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Categoría Principal
                      </label>
                      <select
                        value={formData.category || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition appearance-none cursor-pointer"
                      >
                        <option value="" disabled>
                          Selecciona una categoría
                        </option>
                        <option value="Webs">
                          Webs (Sitios Web, Landing Pages, E-commerce)
                        </option>
                        <option value="Diseño">
                          Diseño (Branding, Identidad Corporativa)
                        </option>
                        <option value="Multimedia">
                          Multimedia (Video, Fotografía)
                        </option>
                        <option value="Sistemas">
                          Sistemas (Desarrollo a Medida, TI)
                        </option>
                        <option value="Marketing">
                          Marketing (SEO, Redes Sociales)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Duración
                      </label>
                      <input
                        type="text"
                        value={formData.duration || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, duration: e.target.value })
                        }
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition"
                        placeholder="Ej: 3 meses"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Orden de Visualización
                      </label>
                      <input
                        type="number"
                        value={formData.orderRank || 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            orderRank: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition"
                        placeholder="Ej: 1"
                      />
                    </div>

                    <div className="sm:col-span-2 flex flex-wrap gap-4 pt-2">
                      <button
                        onClick={() =>
                          setFormData({
                            ...formData,
                            isVisible: !formData.isVisible,
                          })
                        }
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${formData.isVisible
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                          : "bg-gray-100 text-gray-400"
                          }`}
                      >
                        {formData.isVisible ? (
                          <>
                            <Eye size={18} /> Proyecto Visible
                          </>
                        ) : (
                          <>
                            <EyeOff size={18} /> Proyecto Oculto
                          </>
                        )}
                      </button>

                      <button
                        onClick={() =>
                          setFormData({
                            ...formData,
                            isFeatured: !formData.isFeatured,
                          })
                        }
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${formData.isFeatured
                          ? "bg-amber-500 text-white shadow-lg shadow-amber-100"
                          : "bg-gray-100 text-gray-400"
                          }`}
                      >
                        <Star
                          size={18}
                          fill={formData.isFeatured ? "currentColor" : "none"}
                        />
                        {formData.isFeatured
                          ? "Proyecto Destacado"
                          : "Marcar como Destacado"}
                      </button>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Servicios Prestados
                        </label>
                        <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                          {formData.services?.length || 0} SELECCIONADOS
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="flex flex-col gap-4">
                          {/* Sugerencias Generales */}
                          <div>
                            <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Servicios Generales:</p>
                            <div className="flex flex-wrap gap-2">
                              {PREDEFINED_SERVICES["Generales"].map((service) => {
                                const isSelected = formData.services?.includes(service);
                                return (
                                  <button
                                    key={service}
                                    onClick={() => {
                                      const currentServices = formData.services || [];
                                      if (isSelected) {
                                        setFormData({ ...formData, services: currentServices.filter(s => s !== service) });
                                      } else {
                                        setFormData({ ...formData, services: [...currentServices, service] });
                                      }
                                    }}
                                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${isSelected
                                      ? "bg-gray-800 text-white border-gray-800 shadow-md"
                                      : "bg-white text-gray-400 border-gray-100 hover:border-gray-300 hover:text-gray-600"
                                      }`}
                                  >
                                    {service}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Sugerencias por Categoría */}
                          {formData.category && PREDEFINED_SERVICES[formData.category] && (
                            <div>
                              <p className="text-[9px] text-indigo-400 font-black uppercase tracking-widest mb-2">Específicos para {formData.category}:</p>
                              <div className="flex flex-wrap gap-2">
                                {PREDEFINED_SERVICES[formData.category].map((service) => {
                                  const isSelected = formData.services?.includes(service);
                                  return (
                                    <button
                                      key={service}
                                      onClick={() => {
                                        const currentServices = formData.services || [];
                                        if (isSelected) {
                                          setFormData({ ...formData, services: currentServices.filter(s => s !== service) });
                                        } else {
                                          setFormData({ ...formData, services: [...currentServices, service] });
                                        }
                                      }}
                                      className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${isSelected
                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100"
                                        : "bg-white text-gray-500 border-gray-100 hover:border-indigo-200 hover:text-indigo-600"
                                        }`}
                                    >
                                      {service}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3 p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                        {formData.services?.map((val, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              value={val}
                              onChange={(e) =>
                                handleArrayChange(
                                  "services",
                                  idx,
                                  e.target.value,
                                )
                              }
                              className="flex-1 px-5 py-3 bg-white border border-gray-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                              placeholder="Nombre del servicio personalizado..."
                            />
                            <button
                              onClick={() => removeArrayItem("services", idx)}
                              className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-colors"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addArrayItem("services")}
                          className="flex items-center gap-2 py-3 px-5 text-xs font-black text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all w-full border-2 border-dashed border-indigo-100"
                        >
                          + Añadir Servicio Personalizado
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "content" && (
                  <div className="space-y-6 animate-fade-in-scale">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Descripción General (Intro)
                      </label>
                      <textarea
                        value={formData.description || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition h-32 leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        El Desafío (Problemática)
                      </label>
                      <textarea
                        value={formData.challenge || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            challenge: e.target.value,
                          })
                        }
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition h-32 leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        La Solución (Implementación)
                      </label>
                      <textarea
                        value={formData.solution || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, solution: e.target.value })
                        }
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition h-32 leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {activeTab === "impact" && (
                  <div className="space-y-8 animate-fade-in-scale">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Resultados Obtenidos (Métricas)
                      </label>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {formData.results?.map((val, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              value={val}
                              onChange={(e) =>
                                handleArrayChange(
                                  "results",
                                  idx,
                                  e.target.value,
                                )
                              }
                              className="flex-1 px-5 py-3 bg-gray-50 border-none rounded-xl"
                              placeholder="Ej: +45% Retención"
                            />
                            <button
                              onClick={() => removeArrayItem("results", idx)}
                              className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addArrayItem("results")}
                          className="col-span-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-indigo-400 hover:text-indigo-500 transition"
                        >
                          + Añadir Métrica de Éxito
                        </button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Tecnologías Usadas
                        </label>
                        <div className="space-y-2">
                          {formData.technologies?.map((val, idx) => (
                            <div key={idx} className="flex gap-2">
                              <input
                                value={val}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "technologies",
                                    idx,
                                    e.target.value,
                                  )
                                }
                                className="flex-1 px-4 py-2 bg-gray-50 border-none rounded-lg"
                              />
                              <button
                                onClick={() =>
                                  removeArrayItem("technologies", idx)
                                }
                                className="text-red-400"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => addArrayItem("technologies")}
                            className="text-xs font-bold text-indigo-600"
                          >
                            + Añadir Tech
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Equipo del Proyecto
                        </label>
                        <div className="space-y-2">
                          {formData.team?.map((val, idx) => (
                            <div key={idx} className="flex gap-2">
                              <input
                                value={val}
                                onChange={(e) =>
                                  handleArrayChange("team", idx, e.target.value)
                                }
                                className="flex-1 px-4 py-2 bg-gray-50 border-none rounded-lg"
                              />
                              <button
                                onClick={() => removeArrayItem("team", idx)}
                                className="text-red-400"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => addArrayItem("team")}
                            className="text-xs font-bold text-indigo-600"
                          >
                            + Añadir Miembro
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "media" && (
                  <div className="space-y-8 animate-fade-in-scale">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Imagen de Tarjeta (Miniatura del Portafolio)
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={formData.cardImage || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              cardImage: e.target.value,
                            })
                          }
                          className="flex-1 px-5 py-3 bg-gray-50 border-none rounded-2xl text-sm"
                          placeholder="URL de la imagen para la miniatura..."
                        />
                        <label
                          className={`flex items-center gap-2 px-6 bg-indigo-50 text-indigo-600 font-bold rounded-2xl cursor-pointer hover:bg-indigo-100 transition ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
                        >
                          {isUploading ? (
                            <Loader2 className="animate-spin" size={16} />
                          ) : (
                            <Upload size={16} />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(e, (url) =>
                                setFormData({ ...formData, cardImage: url }),
                              )
                            }
                          />
                        </label>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1 italic">Se recomienda una imagen de 800x600px aproximadamente.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Media Principal (Hero - Imagen o Video)
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={formData.heroImage || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              heroImage: e.target.value,
                            })
                          }
                          className="flex-1 px-5 py-3 bg-gray-50 border-none rounded-2xl text-sm"
                          placeholder="URL de imagen, video o link de YouTube..."
                        />
                        <label
                          className={`flex items-center gap-2 px-6 bg-indigo-600 text-white font-bold rounded-2xl cursor-pointer hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
                        >
                          {isUploading ? (
                            <Loader2 className="animate-spin" size={16} />
                          ) : (
                            <Upload size={16} />
                          )}
                          <span className="hidden sm:inline">Subir Archivo</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(e, (url) =>
                                setFormData({ ...formData, heroImage: url }),
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Imágenes para el Slider (Hero Carrusel)
                      </label>
                      <div className="grid gap-3 mb-6 bg-green-50/30 p-6 rounded-[2rem] border border-green-100">
                        {formData.heroImages?.map((val, idx) => (
                          <div key={idx} className="flex gap-3 items-center">
                            <div className="flex-1 relative">
                              <input
                                placeholder="URL de imagen o link de Youtube..."
                                value={val}
                                onChange={(e) => handleArrayChange("heroImages", idx, e.target.value)}
                                className="w-full px-5 py-3 bg-white border border-gray-100 rounded-2xl text-sm pr-12 focus:ring-2 focus:ring-[#41F0A5] transition"
                              />
                              {(val.includes('youtube.com') || val.includes('youtu.be') || val.includes('vimeo.com') || val.includes('drive.google.com') || val.toLowerCase().endsWith('.mp4')) && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500">
                                  <Video size={18} />
                                </div>
                              )}
                            </div>
                            <label className="flex items-center gap-2 px-3 py-3 bg-white text-indigo-600 font-bold rounded-2xl cursor-pointer hover:bg-indigo-50 border border-gray-100 transition">
                              <Upload size={16} />
                              <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => handleImageUpload(e, (url) => handleArrayChange("heroImages", idx, url))} />
                            </label>
                            <button onClick={() => removeArrayItem("heroImages", idx)} className="text-red-400 p-2 hover:bg-red-50 rounded-2xl transition">
                              <X size={20} />
                            </button>
                          </div>
                        ))}
                        <button onClick={() => addArrayItem("heroImages")} className="flex items-center gap-2 text-xs font-black text-[#1e293b] bg-[#41F0A5] px-6 py-3 rounded-xl w-fit hover:scale-105 transition shadow-lg shadow-green-200">
                          <ImageIcon size={14} /> + Añadir Imagen al Slider
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <ImageIcon size={14} className="text-indigo-500" />
                        Galería de Resultados (Universal)
                      </label>
                      <div className="grid gap-6">
                        {formData.resultImages?.map((item, idx) => {
                          const val = typeof item === "string" ? item : item?.url || "";
                          const category = typeof item === "string" ? "" : item?.category || "";
                          const type = typeof item === "string" ? "image" : item?.type || "image";

                          return (
                            <div key={idx} className="group bg-white p-6 rounded-[2.5rem] border border-gray-100 space-y-4 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-500 relative">
                              {/* Botón Eliminar Flotante */}
                              <button
                                onClick={() => removeArrayItem("resultImages", idx)}
                                className="absolute -top-2 -right-2 bg-white text-red-400 p-2 shadow-lg border border-red-50 rounded-full hover:bg-red-500 hover:text-white transition-all scale-0 group-hover:scale-100 z-10"
                              >
                                <X size={16} />
                              </button>

                              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                                {/* Type Selector */}
                                <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100 shrink-0 shadow-inner">
                                  <button
                                    onClick={() => handleMediaChange("resultImages", idx, "image", "type")}
                                    className={`p-2.5 rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter ${type === 'image' ? 'bg-white text-indigo-600 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                                    title="Imagen"
                                  >
                                    <ImageIcon size={14} />
                                    {type === 'image' && <span>Imagen</span>}
                                  </button>
                                  <button
                                    onClick={() => handleMediaChange("resultImages", idx, "video", "type")}
                                    className={`p-2.5 rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter ${type === 'video' ? 'bg-white text-amber-500 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                                    title="Video"
                                  >
                                    <Video size={14} />
                                    {type === 'video' && <span>Video</span>}
                                  </button>
                                  <button
                                    onClick={() => handleMediaChange("resultImages", idx, "web", "type")}
                                    className={`p-2.5 rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter ${type === 'web' ? 'bg-white text-emerald-500 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                                    title="Sitio Web"
                                  >
                                    <Globe size={14} />
                                    {type === 'web' && <span>Web</span>}
                                  </button>
                                </div>

                                <div className="flex-1 w-full relative group/input">
                                  <input
                                    placeholder="URL, link de YouTube, Drive..."
                                    value={val}
                                    onChange={(e) => handleMediaChange("resultImages", idx, e.target.value, "url")}
                                    className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] text-sm focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-200 transition-all outline-none"
                                  />
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    {val && (
                                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center opacity-0 group-focus-within/input:opacity-100 transition-opacity">
                                        <CheckCircle2 size={14} />
                                      </div>
                                    )}
                                    <button
                                      onClick={() => {
                                        const previewId = `result-${idx}`;
                                        setExpandedPreviews(prev => {
                                          const newSet = new Set(prev);
                                          if (newSet.has(previewId)) {
                                            newSet.delete(previewId);
                                          } else {
                                            newSet.add(previewId);
                                          }
                                          return newSet;
                                        });
                                      }}
                                      className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                      title="Ver vista previa"
                                    >
                                      <EyeIcon size={14} className="text-gray-600" />
                                    </button>
                                    <label className="w-8 h-8 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors">
                                      <Upload size={14} />
                                      <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => handleImageUpload(e, (url) => handleMediaChange("resultImages", idx, url, "url"))} />
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 bg-gray-50/30 px-5 py-3 rounded-2xl border border-gray-100/50 group-hover:border-indigo-50 group-hover:bg-white transition-all">
                                  <Tag size={12} className="text-gray-400 group-hover:text-indigo-400 transition-colors" />
                                  <input
                                    placeholder="Categoría del medio (ej: Diseño UI, Video Drone...)"
                                    value={category}
                                    onChange={(e) => handleMediaChange("resultImages", idx, e.target.value, "category")}
                                    className="flex-1 bg-transparent border-none rounded-xl text-xs font-bold text-gray-600 outline-none placeholder:font-normal"
                                  />
                                </div>

                                {val && (
                                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest bg-gray-50/20 px-4 rounded-xl truncate">
                                    <Monitor size={10} />
                                    Preview URL Detectado
                                  </div>
                                )}
                              </div>

                              {/* Vista Previa Desplegable */}
                              {val && expandedPreviews.has(`result-${idx}`) && (
                                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mt-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-wider">Vista Previa</span>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${type === 'image' ? 'bg-indigo-100 text-indigo-600' :
                                      type === 'video' ? 'bg-amber-100 text-amber-600' :
                                        'bg-emerald-100 text-emerald-600'
                                      }`}>
                                      {type === 'image' ? 'IMAGEN' : type === 'video' ? 'VIDEO' : 'WEB'}
                                    </span>
                                  </div>

                                  <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
                                    {type === 'image' && (
                                      <div className="aspect-video bg-gray-100 flex items-center justify-center">
                                        <img
                                          src={val}
                                          alt="Preview"
                                          className="max-w-full max-h-full object-contain"
                                          onError={(e) => {
                                            e.currentTarget.src = '/placeholder-image.png';
                                          }}
                                        />
                                      </div>
                                    )}

                                    {type === 'video' && (
                                      <div className="aspect-video bg-gray-900 flex items-center justify-center">
                                        {val.includes('youtube.com') || val.includes('youtu.be') ? (
                                          <iframe
                                            src={val.replace('watch?v=', 'embed/').split('&')[0]}
                                            className="w-full h-full"
                                            allowFullScreen
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                          />
                                        ) : (
                                          <div className="text-center text-white">
                                            <Video size={48} className="mx-auto mb-2 opacity-50" />
                                            <p className="text-sm opacity-75">Video URL: {val}</p>
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    {type === 'web' && (
                                      <div className="aspect-video bg-gradient-to-br from-indigo-50 to-emerald-50 flex items-center justify-center">
                                        <div className="text-center">
                                          <Globe size={48} className="mx-auto mb-2 text-emerald-500" />
                                          <p className="text-sm text-gray-600 font-medium truncate max-w-xs">{val}</p>
                                          <a
                                            href={val}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 mt-2 text-xs bg-emerald-500 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-600 transition-colors"
                                          >
                                            Abrir Sitio Web
                                            <Globe size={10} />
                                          </a>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}

                        <button
                          onClick={() => addArrayItem("resultImages")}
                          className="group flex items-center justify-center gap-3 text-sm font-black text-indigo-600 bg-white border-2 border-dashed border-indigo-100 p-8 rounded-[2.5rem] hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-500"
                        >
                          <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ImageIcon size={20} />
                          </div>
                          <span>Añadir nuevo elemento a la galería estratégica</span>
                        </button>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Monitor size={14} className="text-amber-500" />
                        Media Adicional / Extras
                      </label>
                      <div className="grid gap-6">
                        {formData.additionalImages?.map((item, idx) => {
                          const val = typeof item === "string" ? item : item?.url || "";
                          const category = typeof item === "string" ? "" : item?.category || "";
                          const type = typeof item === "string" ? "image" : item?.type || "image";

                          return (
                            <div key={idx} className="group bg-white p-6 rounded-[2.5rem] border border-gray-100 space-y-4 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all duration-500 relative">
                              <button
                                onClick={() => removeArrayItem("additionalImages", idx)}
                                className="absolute -top-2 -right-2 bg-white text-red-400 p-2 shadow-lg border border-red-50 rounded-full hover:bg-red-500 hover:text-white transition-all scale-0 group-hover:scale-100 z-10"
                              >
                                <X size={16} />
                              </button>

                              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                                <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100 shrink-0 shadow-inner">
                                  <button
                                    onClick={() => handleMediaChange("additionalImages", idx, "image", "type")}
                                    className={`p-2.5 rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter ${type === 'image' ? 'bg-white text-indigo-600 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                                  >
                                    <ImageIcon size={14} />
                                    {type === 'image' && <span>Imagen</span>}
                                  </button>
                                  <button
                                    onClick={() => handleMediaChange("additionalImages", idx, "video", "type")}
                                    className={`p-2.5 rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter ${type === 'video' ? 'bg-white text-amber-500 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                                  >
                                    <Video size={14} />
                                    {type === 'video' && <span>Video</span>}
                                  </button>
                                  <button
                                    onClick={() => handleMediaChange("additionalImages", idx, "web", "type")}
                                    className={`p-2.5 rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter ${type === 'web' ? 'bg-white text-emerald-500 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                                  >
                                    <Globe size={14} />
                                    {type === 'web' && <span>Web</span>}
                                  </button>
                                </div>

                                <div className="flex-1 w-full relative">
                                  <input
                                    placeholder="URL del recurso adicional..."
                                    value={val}
                                    onChange={(e) => handleMediaChange("additionalImages", idx, e.target.value, "url")}
                                    className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] text-sm focus:bg-white transition-all outline-none"
                                  />
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    {val && (
                                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center opacity-0 group-focus-within/input:opacity-100 transition-opacity">
                                        <CheckCircle2 size={14} />
                                      </div>
                                    )}
                                    <button
                                      onClick={() => {
                                        const previewId = `additional-${idx}`;
                                        setExpandedPreviews(prev => {
                                          const newSet = new Set(prev);
                                          if (newSet.has(previewId)) {
                                            newSet.delete(previewId);
                                          } else {
                                            newSet.add(previewId);
                                          }
                                          return newSet;
                                        });
                                      }}
                                      className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                      title="Ver vista previa"
                                    >
                                      <EyeIcon size={14} className="text-gray-600" />
                                    </button>
                                    <label className="w-8 h-8 flex items-center justify-center bg-amber-50 text-amber-600 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors">
                                      <Upload size={14} />
                                      <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => handleImageUpload(e, (url) => handleMediaChange("additionalImages", idx, url, "url"))} />
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 bg-gray-50/30 px-5 py-3 rounded-2xl border border-gray-100/50 group-hover:border-amber-50 group-hover:bg-white transition-all">
                                <Tag size={12} className="text-gray-400 group-hover:text-amber-400 transition-colors" />
                                <input
                                  placeholder="Nombre o categoría del recurso..."
                                  value={category}
                                  onChange={(e) => handleMediaChange("additionalImages", idx, e.target.value, "category")}
                                  className="flex-1 bg-transparent border-none rounded-xl text-xs font-bold text-gray-600 outline-none placeholder:font-normal"
                                />
                              </div>

                              {/* Vista Previa Desplegable */}
                              {val && expandedPreviews.has(`additional-${idx}`) && (
                                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mt-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-wider">Vista Previa</span>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${type === 'image' ? 'bg-indigo-100 text-indigo-600' :
                                      type === 'video' ? 'bg-amber-100 text-amber-600' :
                                        'bg-emerald-100 text-emerald-600'
                                      }`}>
                                      {type === 'image' ? 'IMAGEN' : type === 'video' ? 'VIDEO' : 'WEB'}
                                    </span>
                                  </div>

                                  <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
                                    {type === 'image' && (
                                      <div className="aspect-video bg-gray-100 flex items-center justify-center">
                                        <img
                                          src={val}
                                          alt="Preview"
                                          className="max-w-full max-h-full object-contain"
                                          onError={(e) => {
                                            e.currentTarget.src = '/placeholder-image.png';
                                          }}
                                        />
                                      </div>
                                    )}

                                    {type === 'video' && (
                                      <div className="aspect-video bg-gray-900 flex items-center justify-center">
                                        {val.includes('youtube.com') || val.includes('youtu.be') ? (
                                          <iframe
                                            src={val.replace('watch?v=', 'embed/').split('&')[0]}
                                            className="w-full h-full"
                                            allowFullScreen
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                          />
                                        ) : (
                                          <div className="text-center text-white">
                                            <Video size={48} className="mx-auto mb-2 opacity-50" />
                                            <p className="text-sm opacity-75">Video URL: {val}</p>
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    {type === 'web' && (
                                      <div className="aspect-video bg-gradient-to-br from-indigo-50 to-emerald-50 flex items-center justify-center">
                                        <div className="text-center">
                                          <Globe size={48} className="mx-auto mb-2 text-emerald-500" />
                                          <p className="text-sm text-gray-600 font-medium truncate max-w-xs">{val}</p>
                                          <a
                                            href={val}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 mt-2 text-xs bg-emerald-500 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-600 transition-colors"
                                          >
                                            Abrir Sitio Web
                                            <Globe size={10} />
                                          </a>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                        <button
                          onClick={() => addArrayItem("additionalImages")}
                          className="group flex items-center justify-center gap-3 text-sm font-black text-amber-600 bg-white border-2 border-dashed border-amber-100 p-8 rounded-[2.5rem] hover:bg-amber-50 hover:border-amber-300 transition-all duration-500"
                        >
                          <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Video size={20} />
                          </div>
                          <span>Añadir multimedia de apoyo o secundaria</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Bar - Sticky and Elevated */}
              <div className="sticky bottom-0 z-[60] bg-white/90 backdrop-blur-xl border-t border-gray-100 p-6 flex items-center justify-between gap-6 shadow-[0_-20px_50px_rgba(0,0,0,0.04)]">
                <div className="flex-1">
                  {saveSuccess && (
                    <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 px-6 py-3 rounded-2xl w-fit animate-fade-in-scale border border-emerald-100 shadow-sm">
                      <CheckCircle2 size={20} className="animate-bounce" />
                      <span className="text-sm font-black uppercase tracking-wider">
                        Estrategia Guardada con Éxito
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPreviewOpen(true)}
                    className="group px-6 py-4 bg-white border border-gray-200 text-gray-700 font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-50 transition-all flex items-center gap-2"
                  >
                    <Eye size={16} className="group-hover:scale-110 transition-transform" />
                    Vista Previa Móvil/Web
                  </button>

                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`group px-12 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl flex items-center justify-center min-w-[320px] ${isSaving
                      ? "bg-indigo-400 cursor-not-allowed scale-95"
                      : "bg-gray-900 hover:bg-black hover:scale-[1.02] active:scale-95 shadow-indigo-200"
                      }`}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="animate-spin mr-3" size={20} />
                        Procesando Cambios...
                      </>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Rocket size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <span>{editingId ? "Actualizar Proyecto" : "Publicar Proyecto"}</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* List Sidebar */}
          <div className="lg:col-span-4 h-[calc(100vh-200px)] sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Inventario Estratégico
              </h2>
              <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-black">
                {projectsList.length} TOTAL
              </span>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Buscar proyecto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-100 px-5 py-3 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
              />
              <FileText size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
            </div>

            <div className="space-y-3 overflow-y-auto h-full pr-2 custom-scrollbar">
              {projectsList
                .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.client.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((project) => (
                  <div
                    key={project.id}
                    className={`group bg-white rounded-3xl p-5 border transition-all cursor-pointer relative overflow-hidden ${editingId === project.id
                      ? "border-indigo-600 ring-4 ring-indigo-50 shadow-2xl scale-[1.02] z-10"
                      : "border-gray-100 hover:border-indigo-200 shadow-sm hover:shadow-xl"
                      } ${!project.isVisible ? "opacity-60 bg-gray-50/50" : ""}`}
                    onClick={() => handleEdit(project)}
                  >
                    {editingId === project.id && (
                      <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-600 flex items-center justify-center text-white rounded-bl-3xl shadow-lg">
                        <PencilLine size={18} />
                      </div>
                    )}

                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-2xl flex-shrink-0 bg-gray-50 overflow-hidden relative border border-gray-100">
                        {project.heroImage ? (
                          <img
                            src={project.heroImage}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-indigo-50 flex items-center justify-center text-indigo-300 text-lg font-black">
                            {project.title.charAt(0)}
                          </div>
                        )}
                        {!project.isVisible && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                            <EyeOff size={16} className="text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <h4 className="font-bold text-gray-900 leading-tight truncate pr-4">
                            {project.title}
                          </h4>
                          {project.isFeatured && (
                            <Star
                              size={12}
                              className="text-amber-500 fill-amber-500 shrink-0"
                            />
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md uppercase tracking-tighter">
                            {project.category}
                          </span>
                          <span className="text-[9px] font-bold text-gray-400 uppercase">
                            {project.client}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">
                        Rank #{project.orderRank || 0}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(project.id);
                        }}
                        className="p-2 text-gray-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-8 p-6 bg-indigo-900 rounded-3xl text-white shadow-2xl shadow-indigo-200">
              <h4 className="font-bold text-lg mb-2">Consejo SEO</h4>
              <p className="text-indigo-100 text-xs leading-relaxed opacity-80 font-medium">
                Asegúrate de que la "Descripción General" contenga palabras
                clave relevantes para el nicho del proyecto. Esto ayudará a que
                cada página de detalle posicione orgánicamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

