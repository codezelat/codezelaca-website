export interface NavigationItem {
  label: string;
  href: string;
}

export interface Metric {
  value: string;
  label: string;
  icon: "trend" | "award" | "energy" | "people";
  tone: "violet" | "pink" | "purple";
}

export interface ProgrammeOutcome {
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface DifferenceItem {
  title: string;
  description: string;
}

export interface Program {
  title: string;
  slug: string;
  image: string;
  alt: string;
}

export interface Recognition {
  name: string;
  image: string;
  width: number;
  height: number;
}
