export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  services?: string[];
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  duration: string;
  team: string[];
  heroImage: string;
  heroImages?: string[];
  cardImage?: string;
  resultImages: string[];
  additionalImages: string[];
  isFeatured?: boolean;
  isVisible?: boolean;
  orderRank?: number;
}

export const projects: Project[] = [];
