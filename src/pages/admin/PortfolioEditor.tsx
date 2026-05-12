import { useState, useEffect } from "react";
import { Project } from "@/data/projects";
import { supabase } from "@/lib/supabase";
import {
  FileText,
  PencilLine,
  Rocket,
  Image as ImageIcon,
  Loader2,
  LogOut,
  Eye,
  X,
  CheckCircle2,
} from "lucide-react";
import ProjectDetail from "../portfolio/ProjectDetail";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Modular Admin Components
import { TabGeneral } from "@/components/admin/TabGeneral";
import { TabContent } from "@/components/admin/TabContent";
import { TabImpact } from "@/components/admin/TabImpact";
import { TabMedia } from "@/components/admin/TabMedia";
import { ProjectList } from "@/components/admin/ProjectList";
import { LoginOverlay } from "@/components/admin/LoginOverlay";

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
      <LoginOverlay
        isPreviewOpen={isPreviewOpen}
        setIsPreviewOpen={setIsPreviewOpen}
        editingId={editingId}
        formData={formData}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        handleLogin={handleLogin}
        loginError={loginError}
      />
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
                  <TabGeneral
                    formData={formData}
                    setFormData={setFormData}
                    predefinedServices={PREDEFINED_SERVICES}
                    handleArrayChange={handleArrayChange}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                  />
                )}

                {activeTab === "content" && (
                  <TabContent formData={formData} setFormData={setFormData} />
                )}

                {activeTab === "impact" && (
                  <TabImpact
                    formData={formData}
                    handleArrayChange={handleArrayChange}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                  />
                )}

                {activeTab === "media" && (
                  <TabMedia
                    formData={formData}
                    setFormData={setFormData}
                    isUploading={isUploading}
                    handleImageUpload={handleImageUpload}
                    handleArrayChange={handleArrayChange}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    handleMediaChange={handleMediaChange}
                    expandedPreviews={expandedPreviews}
                    setExpandedPreviews={setExpandedPreviews}
                  />
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
          <ProjectList
            projects={projectsList}
            editingId={editingId}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

