import React from "react";
import { Project } from "@/data/projects";
import { Eye, EyeOff, Star, X } from "lucide-react";

interface TabGeneralProps {
  formData: Partial<Project>;
  setFormData: (data: any) => void;
  predefinedServices: Record<string, string[]>;
  handleArrayChange: (field: keyof Project, index: number, value: string) => void;
  addArrayItem: (field: keyof Project) => void;
  removeArrayItem: (field: keyof Project, index: number) => void;
}

export const TabGeneral: React.FC<TabGeneralProps> = ({
  formData,
  setFormData,
  predefinedServices,
  handleArrayChange,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="grid sm:grid-cols-2 gap-6 animate-fade-in-scale">
      <div className="sm:col-span-2">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          Título del Proyecto
        </label>
        <input
          type="text"
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, client: e.target.value })}
          className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          Categoría Principal
        </label>
        <select
          value={formData.category || ""}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition appearance-none cursor-pointer"
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>
          <option value="Webs">Webs (Sitios Web, Landing Pages, E-commerce)</option>
          <option value="Diseño">Diseño (Branding, Identidad Corporativa)</option>
          <option value="Multimedia">Multimedia (Video, Fotografía)</option>
          <option value="Sistemas">Sistemas (Desarrollo a Medida, TI)</option>
          <option value="Marketing">Marketing (SEO, Redes Sociales)</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          Duración
        </label>
        <input
          type="text"
          value={formData.duration || ""}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
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
          <Star size={18} fill={formData.isFeatured ? "currentColor" : "none"} />
          {formData.isFeatured ? "Proyecto Destacado" : "Marcar como Destacado"}
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
            <div>
              <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">
                Servicios Generales:
              </p>
              <div className="flex flex-wrap gap-2">
                {predefinedServices["Generales"].map((service) => {
                  const isSelected = formData.services?.includes(service);
                  return (
                    <button
                      key={service}
                      onClick={() => {
                        const currentServices = formData.services || [];
                        if (isSelected) {
                          setFormData({
                            ...formData,
                            services: currentServices.filter((s) => s !== service),
                          });
                        } else {
                          setFormData({
                            ...formData,
                            services: [...currentServices, service],
                          });
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
                        isSelected
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

            {formData.category && predefinedServices[formData.category] && (
              <div>
                <p className="text-[9px] text-indigo-400 font-black uppercase tracking-widest mb-2">
                  Específicos para {formData.category}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {predefinedServices[formData.category].map((service) => {
                    const isSelected = formData.services?.includes(service);
                    return (
                      <button
                        key={service}
                        onClick={() => {
                          const currentServices = formData.services || [];
                          if (isSelected) {
                            setFormData({
                              ...formData,
                              services: currentServices.filter((s) => s !== service),
                            });
                          } else {
                            setFormData({
                              ...formData,
                              services: [...currentServices, service],
                            });
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
                          isSelected
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
                onChange={(e) => handleArrayChange("services", idx, e.target.value)}
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
  );
};
