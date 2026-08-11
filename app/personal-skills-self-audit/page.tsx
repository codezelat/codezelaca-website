import type { Metadata } from "next";

import { PageShell } from "@/components/pages/PageShell";
import { SelfAuditExperience } from "@/components/self-audit/SelfAuditExperience";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { createPageMetadata } from "@/lib/page-metadata";

const title = "Personal Skills Self-Audit - Build Your 30-Day Career Plan";
const description = "Reflect on 25 practical career skills, identify your strengths and growth areas, and create a private 30-day action plan with the CCA Personal Skills Self-Audit.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  pathname: "/personal-skills-self-audit/",
  imageAlt: "CodeZela Career Accelerator Personal Skills Self-Audit",
});

export default function PersonalSkillsSelfAuditPage() {
  return (
    <>
      <PageStructuredData
        name="Personal Skills Self-Audit"
        description={description}
        pathname="/personal-skills-self-audit/"
      />
      <PageShell>
        <SelfAuditExperience />
      </PageShell>
    </>
  );
}
