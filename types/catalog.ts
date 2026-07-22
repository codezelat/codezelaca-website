export type DivisionId =
  | "software-and-development"
  | "ai-and-data-science"
  | "systems-engineering"
  | "creative-media-and-design"
  | "marketing-and-business";

export interface CurriculumModule {
  title: string;
  description: string;
}

export interface ProgrammeCatalogEntry {
  slug: string;
  title: string;
  divisionId: DivisionId;
  image: string;
  imageAlt: string;
  detailImage: string;
  detailImageAlt: string;
  heroDescription: string;
  roleDescription: string;
  modules: CurriculumModule[];
}

export interface DivisionCatalogEntry {
  id: DivisionId;
  slug: string;
  shortTitle: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  programmeSlugs: string[];
}
