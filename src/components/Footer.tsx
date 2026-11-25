import { BUSINESS_INFO } from '../data/laundryData';
import { buildSafeMapsUrl, buildWhatsAppUrl } from '../utils/whatsapp';

export function Footer() {
  const primaryWhatsAppUrl = buildWhatsAppUrl(
    'Olá!\n\nGostaria de solicitar um orçamento na Lavanderia Santa Maria.'
  );
  const secondaryWhatsAppUrl = buildWhatsAppUrl(
    'Olá!\n\nGostaria de agendar um serviço ou falar com a Lavanderia Santa Maria.',
    'secondary'
  );
  const mapsUrl = buildSafeMapsUrl();

  return (
    <footer className="bg-white border-t border-[#E5E5E7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <p className="font-display text-base font-semibold text-[#0A0A0A]">
              {BUSINESS_INFO.name}
            </p>
            <p className="mt-1 text-xs text-[#6E6E73]">{BUSINESS_INFO.address}</p>
          </div>

          <nav
            aria-label="Links do rodapé"
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#6E6E73]"
          >
            <a
              href="#servicos"
              className="hover:text-[#0A0A0A] transition-colors duration-150"
            >
              Serviços
            </a>
            <a
              href="#pacotes"
              className="hover:text-[#0A0A0A] transition-colors duration-150"
            >
              Pacotes
            </a>
            <a
              href="#avaliacoes"
              className="hover:text-[#0A0A0A] transition-colors duration-150"
            >
              Avaliações
            </a>
            <a
              href="#sobre"
              className="hover:text-[#0A0A0A] transition-colors duration-150"
            >
              Sobre nós
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0A0A0A] transition-colors duration-150"
            >
              Google Maps
            </a>
            <a
              href={primaryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#004E9A] hover:text-[#003B75] transition-colors duration-150 tabular-nums"
            >
              WhatsApp {BUSINESS_INFO.whatsappDisplay}
            </a>
            <a
              href={secondaryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#004E9A] hover:text-[#003B75] transition-colors duration-150 tabular-nums"
            >
              WhatsApp {BUSINESS_INFO.whatsappSecondaryDisplay}
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-[#F0F0F2] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#86868B]">
          <p>
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. Todos os direitos
            reservados.
          </p>
          <p>São Bernardo do Campo, SP · Ambiente acolhedor LGBTQ+</p>
        </div>
      </div>
    </footer>
  );
}
