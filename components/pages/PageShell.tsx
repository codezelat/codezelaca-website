import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

