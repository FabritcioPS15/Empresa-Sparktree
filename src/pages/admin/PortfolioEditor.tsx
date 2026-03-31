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
  RefreshCw,
  Video,
  Monitor,
} from "lucide-react";
import ProjectDetail from "../portfolio/ProjectDetail";

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
    isVisible: true,
    isFeatured: false,
    orderRank: 0,
  });
  const [activeTab, setActiveTab] = useState<
    "general" | "content" | "impact" | "media"
  >("general");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    checkUser();
    fetchProjects();
  }, []);

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
      // Map database snake_case to component camelCase if necessary, 
      // but here we'll assume exact match or map explicitly if you created snake_case columns.
      // For simplicity in this edit, assuming columns match interface keys.
      setProjectsList(data as Project[]);
    }
  }

  // Helper for array inputs
  const handleArrayChange = (
    field: keyof Project,
    index: number,
    value: string,
  ) => {
    const newArr = [...(formData[field] as string[])];
    newArr[index] = value;
    setFormData({ ...formData, [field]: newArr });
  };

  const addArrayItem = (field: keyof Project) => {
    setFormData({
      ...formData,
      [field]: [...((formData[field] as string[]) || []), ""],
    });
  };

  const removeArrayItem = (field: keyof Project, index: number) => {
    const newArr = [...(formData[field] as string[])];
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
          <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
            <div className="sticky top-0 z-[110] bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-600 text-[10px] font-black px-2 py-1 rounded uppercase">Modo Vista Previa</span>
                <h2 className="font-bold text-gray-900">Visualizando: {formData.title || "Nuevo Proyecto"}</h2>
              </div>
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition shadow-lg"
              >
                <X size={16} /> Cerrar Previsualización
              </button>
            </div>
            <ProjectDetail projectId={editingId || "preview"} initialData={formData as any} isPreview={true} />
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
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in duration-300">
          <div className="sticky top-0 z-[110] bg-white/95 backdrop-blur-md border-b border-gray-100 p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center">
                <Monitor className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Sparktree Visual System <span className="text-green-500">• Vista Previa Activa</span>
                </div>
                <h2 className="font-bold text-gray-900">{formData.title || "Sin título"}</h2>
              </div>
            </div>
            <button 
              onClick={() => setIsPreviewOpen(false)}
              className="bg-gray-900 text-white px-6 py-3 rounded-2xl text-sm font-black flex items-center gap-2 hover:bg-black transition-all shadow-xl shadow-gray-200"
            >
              <X size={18} /> Cerrar Previsualización
            </button>
          </div>
          <ProjectDetail projectId={editingId || "preview"} initialData={formData as any} isPreview={true} />
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
              {/* Tabs Navigation */}
              <div className="flex border-b border-gray-100 bg-gray-50/50">
                {[
                  {
                    id: "general",
                    label: "General",
                    icon: <FileText size={16} />,
                  },
                  {
                    id: "content",
                    label: "Contenido",
                    icon: <PencilLine size={16} />,
                  },
                  {
                    id: "impact",
                    label: "Impacto",
                    icon: <Rocket size={16} />,
                  },
                  {
                    id: "media",
                    label: "Multimedia",
                    icon: <ImageIcon size={16} />,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() =>
                      setActiveTab(
                        tab.id as "general" | "content" | "impact" | "media",
                      )
                    }
                    className={`flex-1 py-4 text-sm font-bold transition-all flex items-center justify-center gap-2 border-b-2 ${
                      activeTab === tab.id
                        ? "border-indigo-600 text-indigo-600 bg-white"
                        : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
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
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                          formData.isVisible
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
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                          formData.isFeatured
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
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Servicios Prestados
                      </label>
                      <div className="space-y-3">
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
                              className="flex-1 px-5 py-2 bg-gray-50 border-none rounded-xl"
                            />
                            <button
                              onClick={() => removeArrayItem("services", idx)}
                              className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addArrayItem("services")}
                          className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
                        >
                          + Añadir Servicio
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
                        Galería Superior (Carrusel)
                      </label>
                      <div className="grid gap-3">
                        {formData.resultImages?.map((val, idx) => (
                          <div key={idx} className="flex gap-3 items-center">
                            <input
                              placeholder="URL o link del medio..."
                              value={val}
                              onChange={(e) =>
                                handleArrayChange(
                                  "resultImages",
                                  idx,
                                  e.target.value,
                                )
                              }
                              className="flex-1 px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm"
                            />
                            <label
                              className={`flex items-center gap-2 px-3 py-3 bg-indigo-50 text-indigo-600 font-bold rounded-2xl cursor-pointer hover:bg-indigo-100 transition ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
                            >
                              <Upload size={16} />
                              <input
                                type="file"
                                accept="image/*,video/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageUpload(e, (url) =>
                                    handleArrayChange("resultImages", idx, url),
                                  )
                                }
                              />
                            </label>
                            <button
                              onClick={() =>
                                removeArrayItem("resultImages", idx)
                              }
                              className="text-red-400 p-2 hover:bg-red-50 rounded-2xl transition"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addArrayItem("resultImages")}
                          className="flex items-center gap-2 text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl w-fit hover:bg-indigo-100 transition"
                        >
                          <ImageIcon size={14} /> + Añadir Imagen/Video
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Galería Inferior (Detalles Adicionales)
                      </label>
                      <div className="grid gap-3">
                        {formData.additionalImages?.map((val, idx) => (
                          <div key={idx} className="flex gap-3 items-center">
                            <input
                              placeholder="URL o link del medio..."
                              value={val}
                              onChange={(e) =>
                                handleArrayChange(
                                  "additionalImages",
                                  idx,
                                  e.target.value,
                                )
                              }
                              className="flex-1 px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm"
                            />
                            <label
                              className={`flex items-center gap-2 px-3 py-3 bg-indigo-50 text-indigo-600 font-bold rounded-2xl cursor-pointer hover:bg-indigo-100 transition ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
                            >
                              <Upload size={16} />
                              <input
                                type="file"
                                accept="image/*,video/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageUpload(e, (url) =>
                                    handleArrayChange(
                                      "additionalImages",
                                      idx,
                                      url,
                                    ),
                                  )
                                }
                              />
                            </label>
                            <button
                              onClick={() =>
                                removeArrayItem("additionalImages", idx)
                              }
                              className="text-red-400 p-2 hover:bg-red-50 rounded-2xl transition"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addArrayItem("additionalImages")}
                          className="flex items-center gap-2 text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl w-fit hover:bg-indigo-100 transition"
                        >
                          <Video size={14} /> + Añadir Imagen/Video
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="p-8 border-t border-gray-100 flex items-center justify-between gap-3 bg-gray-50/30">
                <div className="flex-1">
                  {saveSuccess && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg w-fit animate-fade-in-scale">
                      <CheckCircle2 size={18} />
                      <span className="text-sm font-bold">
                        ¡Guardado correctamente!
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`px-10 py-4 text-white rounded-2xl font-bold transition-all shadow-xl shadow-gray-200 flex items-center justify-center min-w-[280px] ${
                    isSaving
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-gray-900 hover:bg-black"
                  }`}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Guardando en base de datos...
                    </>
                  ) : editingId ? (
                    "Guardar Cambios del Proyecto"
                  ) : (
                    "Crear Proyecto Completo"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* List Sidebar */}
          <div className="lg:col-span-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Inventario Estratégico
            </h2>
            <div className="space-y-3">
              {projectsList.map((project) => (
                <div
                  key={project.id}
                  className={`group bg-white rounded-2xl p-4 border transition-all cursor-pointer ${
                    editingId === project.id
                      ? "border-indigo-600 ring-4 ring-indigo-50 shadow-lg"
                      : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                  } ${!project.isVisible ? "opacity-60 bg-gray-50/50" : ""}`}
                  onClick={() => handleEdit(project)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg flex-shrink-0 bg-gray-100 overflow-hidden relative">
                        {project.heroImage ? (
                          <img
                            src={project.heroImage}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-indigo-50 flex items-center justify-center text-indigo-300 text-xs font-bold">
                            {project.title.charAt(0)}
                          </div>
                        )}
                        {!project.isVisible && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <EyeOff size={12} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-gray-900 leading-tight line-clamp-1">
                            {project.title}
                          </h4>
                          {project.isFeatured && (
                            <Star
                              size={12}
                              className="text-amber-500 fill-amber-500"
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                            {project.category}
                          </p>
                          <span className="text-[9px] bg-gray-100 px-1.5 rounded-full text-gray-500 font-bold">
                            #{project.orderRank || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(project.id);
                      }}
                      className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
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
