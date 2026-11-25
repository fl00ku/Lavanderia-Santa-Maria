import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

const NAV_LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#pacotes', label: 'Pacotes' },
  { href: '#avaliacoes', label: 'Avaliações' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const primaryWhatsAppUrl = buildWhatsAppUrl(
    'Olá!\n\nGostaria de agendar uma coleta ou solicitar um orçamento na Lavanderia Santa Maria.'
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#inicio"
          className="font-display text-base sm:text-lg font-semibold tracking-tight text-[#0A0A0A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#004E9A] rounded-sm"
        >
          Lavanderia Santa Maria
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6E6E73]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#0A0A0A] hover:underline underline-offset-4 decoration-[#004E9A] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#004E9A] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary CTA + mobile drawer toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={primaryWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-white bg-[#004E9A] hover:bg-[#003B75] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004E9A]"
          >
            Agendar Coleta
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004E9A]"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Menu mobile"
          className="md:hidden bg-white border-t border-[#E5E5E7] px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 px-3 text-sm font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-lg transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={primaryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full py-3 px-4 text-sm font-medium text-white bg-[#004E9A] hover:bg-[#003B75] rounded-lg transition-colors duration-150"
            >
              Agendar Coleta pelo WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
