import { ArrowUpRight, Check } from 'lucide-react';
import { LAUNDRY_PACKAGES } from '../data/laundryData';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export function PackagesSection() {
  const packagesWhatsAppUrl = buildWhatsAppUrl(
    'Olá!\n\nGostaria de consultar as opções de pacotes personalizados (Mensal, Família ou Corporativo) da Lavanderia Santa Maria.'
  );

  return (
    <section id="pacotes" className="bg-white border-b border-[#E5E5E7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#D63384] mb-1.5">
              Planos e pacotes personalizados
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0A0A0A]">
              Pacotes flexíveis sob consulta para sua rotina.
            </h2>
            <p className="mt-2 text-sm text-[#6E6E73] leading-relaxed">
              Valores definidos diretamente pelo WhatsApp conforme o volume e a
              frequência de peças.
            </p>
          </div>

          <a
            href={packagesWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#0A0A0A] hover:bg-[#27272A] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 self-start lg:self-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
          >
            <span>Consultar pacotes no WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>

        {/* Unified Tight Package Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#E5E5E7] rounded-xl bg-[#FAFAFA] border border-[#E5E5E7]">
          {LAUNDRY_PACKAGES.map((pkg) => {
            const accentLineClass =
              pkg.accentColor === 'pink' ? 'bg-[#D63384]' : 'bg-[#004E9A]';

            return (
              <article key={pkg.id} className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-xs font-semibold tabular-nums text-[#6E6E73]">
                      {pkg.index}.
                    </span>
                    <span
                      className={`w-5 h-[2px] ${accentLineClass}`}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-[#0A0A0A]">
                    {pkg.title}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-[#6E6E73]">
                    {pkg.subtitle}
                  </p>

                  <p className="mt-3 text-sm text-[#1D1D1F] leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                <ul className="mt-5 pt-4 border-t border-[#E5E5E7] space-y-2">
                  {pkg.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs sm:text-sm text-[#6E6E73]"
                    >
                      <Check
                        className="w-4 h-4 text-[#004E9A] shrink-0 mt-0.5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
