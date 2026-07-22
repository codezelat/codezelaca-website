import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DivisionDetailPage } from "@/components/catalog/DivisionDetailPage";
import { DivisionStructuredData } from "@/components/seo/CatalogStructuredData";
import { divisionBySlug, divisionCatalog, programmeBySlug } from "@/data/program-catalog";
import { createPageMetadata } from "@/lib/page-metadata";

export function generateStaticParams() {
  return divisionCatalog.map((division) => ({ division: division.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ division: string }> }): Promise<Metadata> {
  const { division: slug } = await params;
  const division = divisionBySlug.get(slug);
  if (!division) return {};

  return createPageMetadata({
    title: `${division.title} - CodeZela Career Accelerator`,
    description: `Explore ${division.title} at CodeZela Career Accelerator. Compare practical programmes, mentor support and career-ready learning pathways.`,
    pathname: `/divisions/${division.slug}/`,
    image: division.image,
    imageAlt: division.title,
  });
}

export default async function DivisionRoute({ params }: { params: Promise<{ division: string }> }) {
  const { division: slug } = await params;
  const division = divisionBySlug.get(slug);
  if (!division) notFound();
  const divisionProgrammes = division.programmeSlugs.map((programmeSlug) => programmeBySlug.get(programmeSlug)).filter((programme) => programme !== undefined);

  return (
    <>
      <DivisionStructuredData division={division} programmes={divisionProgrammes} />
      <DivisionDetailPage division={division} />
    </>
  );
}
