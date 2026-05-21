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
          className="w-full px-5 py-4 bg-gradient-to-br from-gray-50 to-indigo-50/30 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 transition-all h-32 leading-relaxed resize-none"
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
          className="w-full px-5 py-4 bg-gradient-to-br from-gray-50 to-purple-50/30 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-300 transition-all h-32 leading-relaxed resize-none"
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
          className="w-full px-5 py-4 bg-gradient-to-br from-gray-50 to-emerald-50/30 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-300 transition-all h-32 leading-relaxed resize-none"
          placeholder="¿Cómo abordaste el desafío y qué solución implementaste?"
        />
      </div>
    </div>
  );
};
