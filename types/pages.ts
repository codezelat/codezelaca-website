export interface PageAction {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "deep";
}

export interface Division {
  id: string;
  shortTitle: string;
  title: string;
  description: string;
  programmes: string[];
  image: string;
  imageAlt: string;
  href: string;
}

export interface LegalSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

