import React from "react";
import { Project } from "@/data/projects";

interface TabContentProps {
  formData: Partial<Project>;
  setFormData: (data: any) => void;
}

export const TabContent: React.FC<TabContentProps> = ({
  formData,
  setFormData,
}) => {
  return (
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
          placeholder="Escribe una breve introducción del proyecto..."
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
          placeholder="¿Cuál era el problema principal a resolver?"
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
          placeholder="¿Cómo abordaste el desafío y qué solución implementaste?"
        />
      </div>
    </div>
  );
};
