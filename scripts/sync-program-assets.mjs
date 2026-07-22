import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const assets = {
  "ui-ux-designer": "https://cca.it.com/wp-content/uploads/2025/11/Untitled-design-6.png",
  "software-engineer": "https://cca.it.com/wp-content/uploads/2025/11/it-development-supervisor-advising-trainee.jpeg",
  "seo-aeo-specialist": "https://cca.it.com/wp-content/uploads/2025/11/man-woman-discussing-business-project-scaled.jpg",
  "qa-engineer": "https://cca.it.com/wp-content/uploads/2025/11/stock-exchange-woman-working-desk-office.jpeg",
  "project-manager": "https://cca.it.com/wp-content/uploads/2025/11/skilled-manager-standing-glass-wall-while-looking-camera-tracery1.jpg",
  "mobile-app-developer": "https://cca.it.com/wp-content/uploads/2025/11/profile-it-looking-camera-wearing-glasses-against-coding-pc-surmise.jpeg",
  "graphic-designer": "https://cca.it.com/wp-content/uploads/2025/11/photographer-graphic-designer-working-office-with-laptop-monitor-graphic-drawing-tablet-color-palette-scaled.jpg",
  "front-end-developer": "https://cca.it.com/wp-content/uploads/2025/11/portrait-male-programmer-office-scaled.jpg",
  "digital-marketing-specialist": "https://cca.it.com/wp-content/uploads/2025/11/businesswoman-with-clipboard-sitting-desk-startup-business-office-smiling-employee-red-shirt-comparing-charts-successful-entrepreneur-looking-desktop-computer-analyze-business-data.jpeg",
  "devops-engineer": "https://cca.it.com/wp-content/uploads/2025/11/specialist-doing-maintenance-server-farm-providing-secure-scalable-failsafe-infrastructure-storing-computing-analyzing-large-amounts-data-generated-by-ai-applications-scaled.jpg",
  "data-scientist": "https://cca.it.com/wp-content/uploads/2025/11/man-using-tablet-work-connect-with-others.jpeg",
  "data-engineer": "https://cca.it.com/wp-content/uploads/2025/11/night-programmer-man-office-typing-overlay-interface-keyboard-software-dark-dashboard-coder-agency-information-technology-ideas-programming-data-web-scaled.jpg",
  "data-analyst": "https://cca.it.com/wp-content/uploads/2025/11/portrait-smiling-woman-startup-office-coding.jpeg",
  "cyber-security-engineer": "https://cca.it.com/wp-content/uploads/2025/11/developer-typing-code-home-office-develop-software-application.jpeg",
  "business-analyst": "https://cca.it.com/wp-content/uploads/2025/11/business-research.jpeg",
  "back-end-developer": "https://cca.it.com/wp-content/uploads/2025/11/male-coder-programming-server-encryption-firewall-software-using-security-network-code-system-data-development-working-with-text-information-script-program.jpeg",
  "ai-ml-engineer": "https://cca.it.com/wp-content/uploads/2025/11/person-using-laptop-using-artificial-intelligence-generate-images.jpeg",
  "full-stack-developer": "https://cca.it.com/wp-content/uploads/2025/11/it-female-technician-uses-coding-language-computer-agency.jpeg",
};

const directory = path.join(process.cwd(), "public", "images", "programs");
await mkdir(directory, { recursive: true });

for (const [slug, url] of Object.entries(assets)) {
  const extension = path.extname(new URL(url).pathname).toLowerCase();
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`Unable to download ${slug}: ${response.status}`);
  await writeFile(path.join(directory, `${slug}${extension}`), Buffer.from(await response.arrayBuffer()));
  console.log(`Synced ${slug}${extension}`);
}
