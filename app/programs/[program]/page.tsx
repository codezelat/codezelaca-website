import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProgrammeDetailPage } from "@/components/catalog/ProgrammeDetailPage";
import { ProgrammeStructuredData } from "@/components/seo/CatalogStructuredData";
import { divisionById, programmeBySlug, programmes } from "@/data/program-catalog";
import { createPageMetadata } from "@/lib/page-metadata";

export function generateStaticParams() {
  return programmes.map((programme) => ({ program: programme.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ program: string }> }): Promise<Metadata> {
  const { program: slug } = await params;
  const programme = programmeBySlug.get(slug);
  if (!programme) return {};
  const description = `Train as a ${programme.title} with CodeZela Career Accelerator. Build real projects, learn from industry mentors and prepare for a job-ready career.`;

  return createPageMetadata({
    title: `${programme.title} Career Accelerator Programme - CodeZela`,
    description,
    pathname: `/programs/${programme.slug}/`,
    image: programme.image,
    imageAlt: programme.imageAlt,
  });
}

export default async function ProgrammeRoute({ params }: { params: Promise<{ program: string }> }) {
  const { program: slug } = await params;
  const programme = programmeBySlug.get(slug);
  if (!programme) notFound();
  const division = divisionById.get(programme.divisionId);
  if (!division) notFound();

  return (
    <>
      <ProgrammeStructuredData programme={programme} division={division} />
      <ProgrammeDetailPage programme={programme} />
    </>
  );
}
