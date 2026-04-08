import React from "react";
import { Project } from "@/data/projects";
import { X } from "lucide-react";

interface TabImpactProps {
  formData: Partial<Project>;
  handleArrayChange: (field: keyof Project, index: number, value: string) => void;
  addArrayItem: (field: keyof Project) => void;
  removeArrayItem: (field: keyof Project, index: number) => void;
}

export const TabImpact: React.FC<TabImpactProps> = ({
  formData,
  handleArrayChange,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
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
                  handleArrayChange("results", idx, e.target.value)
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
                    handleArrayChange("technologies", idx, e.target.value)
                  }
                  className="flex-1 px-4 py-2 bg-gray-50 border-none rounded-lg"
                  placeholder="Ej: React, Supabase..."
                />
                <button
                  onClick={() => removeArrayItem("technologies", idx)}
                  className="text-red-400"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem("technologies")}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition"
            >
              + Añadir Tecnología
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
                  placeholder="Nombre y Rol"
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
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition"
            >
              + Añadir Miembro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
