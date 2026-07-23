import type {
  DifferenceItem,
  Metric,
  NavigationItem,
  Program,
  ProgrammeOutcome,
  Recognition,
} from "@/types/home";

export const navigation: NavigationItem[] = [
  { label: "About Us", href: "/about-us/" },
  { label: "Divisions", href: "/divisions/" },
  { label: "Contact Us", href: "/contact-us/" },
];

export const metrics: Metric[] = [
  { value: "100%", label: "Placement Ready", icon: "trend", tone: "violet" },
  { value: "18", label: "Career Tracks", icon: "award", tone: "pink" },
  { value: "10K+", label: "Job Market", icon: "energy", tone: "purple" },
  { value: "50+", label: "Professional Mentors", icon: "people", tone: "purple" },
];

export const programmeOutcomes: ProgrammeOutcome[] = [
  {
    title: "Career-Focused",
    description: "Every project, every lesson, every mentor session is designed to make you job-ready.",
    image: "/images/cca/happy-smiling-man-working-with-laptop2-1536x1024.jpg",
    alt: "Learner working with a laptop",
  },
  {
    title: "Real Verification",
    description: "Build a portfolio of real-world projects with verifiable work experience that prove your skills to employers.",
    image: "/images/cca/premium_photo-1683133933219-f975c11fa2f11-1536x1024.jpg",
    alt: "Team reviewing a real project",
  },
  {
    title: "Expert Mentorship",
    description: "Learn from industry professionals with 10+ years of experience in top IT companies.",
    image: "/images/cca/vitaly-gariev-hqFPR1b2koc-unsplash-1536x864.jpg",
    alt: "Professionals in a mentoring conversation",
  },
  {
    title: "6 Months Sprint",
    description: "Intensive, structured learning that gets you from beginner to professional fast.",
    image: "/images/cca/thisisengineering-hOCYuLmTTnY-unsplash1-1536x1025.jpg",
    alt: "Mentor guiding a learner at a whiteboard",
  },
];

export const differences: DifferenceItem[] = [
  { title: "Industry-Aligned Curriculum", description: "Built with input from hiring managers at top companies" },
  { title: "Real-world Project Approach", description: "Learn by building production-grade projects with modern technologies" },
  { title: "Personalized Learning Paths", description: "Choose from over 18 specialized tracks tailored to your career goals" },
  { title: "Direct Placement Support", description: "Direct placement opportunities through global partnerships" },
  { title: "Lifetime Alumni Network", description: "Join a community of 5000+ professionals across the globe" },
  { title: "Flexible Learning Options", description: "Standard, Intensive, or Executive tracks to fit your schedule" },
];

export const programs: Program[] = [
  { title: "Full-Stack Developer", slug: "full-stack-developer", divisionId: "software-and-development", image: "/images/programs/detail/full-stack-developer.webp", alt: "Full-stack developer building a web application" },
  { title: "AI/ML Engineer", slug: "ai-ml-engineer", divisionId: "ai-and-data-science", image: "/images/programs/detail/ai-ml-engineer.webp", alt: "AI and machine learning engineer at work" },
  { title: "Back-End Developer", slug: "back-end-developer", divisionId: "software-and-development", image: "/images/programs/detail/back-end-developer.webp", alt: "Back-end developer engineering a server application" },
  { title: "Business Analyst", slug: "business-analyst", divisionId: "marketing-and-business", image: "/images/programs/detail/business-analyst.webp", alt: "Business analyst reviewing a process" },
  { title: "Cyber Security Engineer", slug: "cyber-security-engineer", divisionId: "systems-engineering", image: "/images/programs/detail/cyber-security-engineer.webp", alt: "Cyber security engineer monitoring systems" },
  { title: "Data Analyst", slug: "data-analyst", divisionId: "ai-and-data-science", image: "/images/programs/detail/data-analyst.webp", alt: "Data analyst reviewing business insights" },
  { title: "Data Engineer", slug: "data-engineer", divisionId: "ai-and-data-science", image: "/images/programs/detail/data-engineer.webp", alt: "Data engineer working with data infrastructure" },
  { title: "Data Scientist", slug: "data-scientist", divisionId: "ai-and-data-science", image: "/images/programs/detail/data-scientist.webp", alt: "Data scientist analysing a model" },
  { title: "DevOps Engineer", slug: "devops-engineer", divisionId: "systems-engineering", image: "/images/programs/detail/devops-engineer.webp", alt: "DevOps engineer managing technology operations" },
  { title: "Digital Marketing Specialist", slug: "digital-marketing-specialist", divisionId: "marketing-and-business", image: "/images/programs/detail/digital-marketing-specialist.webp", alt: "Digital marketing specialist planning a campaign" },
  { title: "Front-End Developer", slug: "front-end-developer", divisionId: "software-and-development", image: "/images/programs/detail/front-end-developer.webp", alt: "Front-end developer building a responsive interface" },
  { title: "Graphic Designer", slug: "graphic-designer", divisionId: "creative-media-and-design", image: "/images/programs/detail/graphic-designer.webp", alt: "Graphic designer creating visual artwork" },
];

export const recognitions: Recognition[] = [
  { name: "ISO Certified Training Provider", image: "/images/cca/iso.png", width: 456, height: 128 },
  { name: "SITC Campus", image: "/images/cca/sitc-logo-768x235-1.png", width: 768, height: 235 },
  { name: "Gatehouse Awards", image: "/images/cca/Gatehouse-Awards_big-1.png", width: 218, height: 64 },
  { name: "London Business Consultancy", image: "/images/cca/seal-logo-full-768x240.png", width: 768, height: 240 },
  { name: "Distance Education Council", image: "/images/cca/DEC1-768x323.png", width: 768, height: 323 },
  { name: "Chamber of Psychology and Counselling", image: "/images/cca/Chamber-of-Psychology-and-Counselling.png", width: 200, height: 100 },
];

export const whatsappRegistration = "https://wa.me/94766772923";
