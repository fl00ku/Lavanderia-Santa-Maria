import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PackagesSection } from './components/PackagesSection';
import { AdvantagesReviewsSection } from './components/AdvantagesReviewsSection';
import { AboutGallerySection } from './components/AboutGallerySection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1D1D1F]">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#004E9A] focus:text-white focus:text-xs focus:font-medium focus:rounded-lg"
      >
        Ir para o conteúdo principal
      </a>

      <Navbar />

      <main id="conteudo-principal" className="flex-1">
        <HeroSection />
        <ServicesSection />
        <PackagesSection />
        <AdvantagesReviewsSection />
        <AboutGallerySection />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
