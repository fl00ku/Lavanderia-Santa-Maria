import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/laundryData';
import {
  buildSafeMapsUrl,
  buildWhatsAppUrl,
  getSaoPauloBusinessStatus,
} from '../utils/whatsapp';

export function ContactSection() {
  const status = getSaoPauloBusinessStatus();
  const mapsUrl = buildSafeMapsUrl();

  const primaryWhatsAppUrl = buildWhatsAppUrl(
    'Olá!\n\nGostaria de falar com a Lavanderia Santa Maria sobre orçamento, entrega ou agendamento.'
  );

  const secondaryWhatsAppUrl = buildWhatsAppUrl(
    'Olá!\n\nGostaria de agendar um atendimento ou tirar uma dúvida com a Lavanderia Santa Maria.',
    'secondary'
  );

  return (
    <section id="contato" className="bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-2xl pb-8 border-b border-[#E5E5E7]">
          <p className="text-xs font-medium text-[#004E9A] mb-1.5">
            Contato e localização
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0A0A0A]">
            Visite nossa unidade ou agende pelo WhatsApp.
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Address, Dual WhatsApp Numbers, Email & Map Button */}
          <div className="lg:col-span-7 p-6 rounded-xl bg-white border border-[#E5E5E7] flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 text-[#004E9A] shrink-0 mt-1"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-medium text-[#6E6E73]">Endereço</p>
                  <p className="mt-0.5 text-sm sm:text-base font-medium text-[#0A0A0A]">
                    {BUSINESS_INFO.streetLine}
                  </p>
                  <p className="text-xs sm:text-sm text-[#6E6E73]">
                    {BUSINESS_INFO.cityLine}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone
                  className="w-4 h-4 text-[#004E9A] shrink-0 mt-1"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-medium text-[#6E6E73]">
                    WhatsApp e Atendimento
                  </p>
                  <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                    <a
                      href={primaryWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm sm:text-base font-medium text-[#0A0A0A] hover:text-[#004E9A] transition-colors duration-150 tabular-nums"
                    >
                      {BUSINESS_INFO.whatsappDisplay}
                    </a>
                    <span className="hidden sm:inline text-[#D2D2D7]" aria-hidden="true">
                      ·
                    </span>
                    <a
                      href={secondaryWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm sm:text-base font-medium text-[#0A0A0A] hover:text-[#004E9A] transition-colors duration-150 tabular-nums"
                    >
                      {BUSINESS_INFO.whatsappSecondaryDisplay}
                    </a>
                  </div>
                  <p className="mt-1 text-xs text-[#6E6E73]">
                    Chame em qualquer um dos dois números para orçamentos, compras ou agendamentos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  className="w-4 h-4 text-[#004E9A] shrink-0 mt-1"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-medium text-[#6E6E73]">E-mail</p>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="mt-0.5 inline-block text-sm sm:text-base font-medium text-[#0A0A0A] hover:text-[#004E9A] transition-colors duration-150 break-all"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-[#E5E5E7] flex flex-wrap items-center gap-3">
              <a
                href={primaryWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#004E9A] hover:bg-[#003B75] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004E9A]"
              >
                <span>WhatsApp {BUSINESS_INFO.whatsappDisplay}</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              </a>

              <a
                href={secondaryWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#004E9A] hover:bg-[#003B75] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004E9A]"
              >
                <span>WhatsApp {BUSINESS_INFO.whatsappSecondaryDisplay}</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              </a>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#EAEAEF] border border-[#E5E5E7] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004E9A]"
              >
                <span>Abrir no Google Maps</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right: Business Hours & Real-Time Schedule Status */}
          <div className="lg:col-span-5 p-6 rounded-xl bg-white border border-[#E5E5E7] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E5E5E7]">
                <h3 className="font-display text-base font-semibold text-[#0A0A0A]">
                  Horário de funcionamento
                </h3>
                <span className="text-xs font-medium text-[#1D1D1F]">
                  {status.label}
                </span>
              </div>

              <p className="mt-2.5 text-xs text-[#6E6E73]">{status.detail}</p>

              <dl className="mt-4 divide-y divide-[#F0F0F2]">
                {BUSINESS_INFO.hours.map((row) => (
                  <div
                    key={row.day}
                    className="py-3 flex items-center justify-between gap-4 text-sm"
                  >
                    <dt className="text-[#6E6E73]">{row.day}</dt>
                    <dd className="font-medium text-[#0A0A0A] tabular-nums">
                      {row.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-5 pt-4 border-t border-[#E5E5E7]">
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                Atendimento na Vila Alves Dias e coleta/entrega delivery em São Bernardo
                do Campo dentro do horário comercial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
