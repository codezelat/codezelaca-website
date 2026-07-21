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
  { title: "Full-Stack Developer", slug: "full-stack-developer", divisionId: "software-and-development", image: "/images/cca/it-female-technician-uses-coding-language-computer-agency-1536x864.jpeg", alt: "Full-stack developer at work" },
  { title: "AI/ML Engineer", slug: "ai-ml-engineer", divisionId: "ai-and-data-science", image: "/images/cca/person-using-laptop-using-artificial-intelligence-generate-images-1536x865.jpeg", alt: "AI engineer developing a model" },
  { title: "Back-End Developer", slug: "back-end-developer", divisionId: "software-and-development", image: "/images/cca/male-coder-programming-server-encryption-firewall-software-using-security-network-code-system-data-development-working-with-text-information-script-program-1536x864.jpeg", alt: "Back-end developer programming" },
  { title: "Business Analyst", slug: "business-analyst", divisionId: "marketing-and-business", image: "/images/cca/business-research-768x512.jpeg", alt: "Business analyst reviewing research" },
  { title: "Cyber Security Engineer", slug: "cyber-security-engineer", divisionId: "systems-engineering", image: "/images/cca/night-programmer-man-office-typing-overlay-interface-keyboard-software-dark-dashboard-coder-agency-information-technology-ideas-programming-data-web-1024x686.jpg", alt: "Cyber security engineer at work" },
  { title: "Data Analyst", slug: "data-analyst", divisionId: "ai-and-data-science", image: "/images/cca/portrait-smiling-woman-startup-office-coding-1024x683.jpeg", alt: "Data analyst working in an office" },
  { title: "Data Engineer", slug: "data-engineer", divisionId: "ai-and-data-science", image: "/images/cca/night-programmer-man-office-typing-overlay-interface-keyboard-software-dark-dashboard-coder-agency-information-technology-ideas-programming-data-web-1024x686.jpg", alt: "Data engineer programming" },
  { title: "Data Scientist", slug: "data-scientist", divisionId: "ai-and-data-science", image: "/images/cca/man-using-tablet-work-connect-with-others-1536x1025.jpeg", alt: "Data scientist collaborating with a tablet" },
  { title: "DevOps Engineer", slug: "devops-engineer", divisionId: "systems-engineering", image: "/images/cca/specialist-doing-maintenance-server-farm-providing-secure-scalable-failsafe-infrastructure-storing-computing-analyzing-large-amounts-data-generated-by-ai-applications-1536x1024.jpg", alt: "DevOps engineer in a server room" },
  { title: "Digital Marketing Specialist", slug: "digital-marketing-specialist", divisionId: "marketing-and-business", image: "/images/cca/premium_photo-1683133933219-f975c11fa2f11-1536x1024.jpg", alt: "Digital marketing specialist collaborating" },
  { title: "Front-End Developer", slug: "front-end-developer", divisionId: "software-and-development", image: "/images/cca/happy-smiling-man-working-with-laptop2-1536x1024.jpg", alt: "Front-end developer working on a laptop" },
  { title: "Graphic Designer", slug: "graphic-designer", divisionId: "creative-media-and-design", image: "/images/cca/Frame-1000001114-2-1024x503.png", alt: "Creative design workspace" },
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
