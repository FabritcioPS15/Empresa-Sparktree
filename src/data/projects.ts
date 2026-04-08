export interface ProjectMedia {
  url: string;
  category?: string;
  type?: "image" | "video" | "web";
}

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
  resultImages: (string | ProjectMedia)[];
  additionalImages: (string | ProjectMedia)[];
  isFeatured?: boolean;
  isVisible?: boolean;
  orderRank?: number;
}

export const projects: Project[] = [];
