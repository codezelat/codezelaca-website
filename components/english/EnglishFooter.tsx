import Link from "next/link";

export function EnglishFooter() {
  return (
    <footer className="border-t border-[#dedaf0] bg-white px-5 py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-sans text-[18px] font-bold text-[#17125c]">CCA School of English</p>
          <p className="mt-2 font-body text-[13px] text-[#625f7d]">Helping learners build the English skills to move forward.</p>
        </div>
        <nav aria-label="School of English footer navigation">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 font-sans text-[13px] font-semibold text-[#625f7d] sm:justify-end">
            <li><Link href="/" prefetch={false} className="transition hover:text-[#3216b8]">Main CCA Site</Link></li>
            <li><Link href="/privacy-policy/" className="transition hover:text-[#3216b8]">Privacy</Link></li>
            <li><Link href="/terms-and-conditions/" className="transition hover:text-[#3216b8]">Terms</Link></li>
          </ul>
        </nav>
        <p className="font-body text-[12px] text-[#77738f]">© 2025 - {new Date().getFullYear()} Codezela Technologies</p>
      </div>
    </footer>
  );
}
