import { useState } from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/laundryData';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export function HeroSection() {
  const [photoError, setPhotoError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const heroWhatsAppUrl = buildWhatsAppUrl(
    'Olá!\n\nGostaria de solicitar um orçamento e agendar uma coleta com a Lavanderia Santa Maria.'
  );

  return (
    <section id="inicio" className="bg-white border-b border-[#E5E5E7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-9 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14">
        <div className="hero-enter grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Creative Editorial Title, Primary CTA & Discreet Guarantee */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium text-[#6E6E73] mb-3 flex items-center gap-2">
              <span className="inline-block w-4 h-[2px] bg-[#D63384]" aria-hidden="true" />
              <span>São Bernardo do Campo</span>
              <span aria-hidden="true">·</span>
              <span>Lavanderia Delivery</span>
            </p>

            <h1 className="font-display text-[clamp(2.1rem,3.8vw,3.25rem)] font-semibold tracking-tight leading-[1.09] text-[#0A0A0A] max-w-xl">
              O cuidado que suas roupas{' '}
              <span className="relative inline-block font-[family-name:var(--font-cursive)] italic font-medium text-[#0A0A0A] pr-1">
                merecem
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-1 bottom-1 h-[2px] bg-[#004E9A]/85"
                />
              </span>
              , sem sair de casa.
            </h1>

            <p className="mt-4 text-sm sm:text-base text-[#6E6E73] leading-relaxed max-w-lg">
              Há 7 anos na Vila Alves Dias, a Lavanderia Santa Maria une produtos de
              qualidade, cuidado especial com cada peça e delivery em São Bernardo do
              Campo.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={heroWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#004E9A] hover:bg-[#003B75] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004E9A]"
              >
                <span>Solicitar orçamento no WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              </a>

              <a
                href="#montador-pedido"
                className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#EAEAEF] border border-[#E5E5E7] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004E9A]"
              >
                Montar lista de peças
              </a>
            </div>

            {/* Discreet, non-generic micro guarantee mark */}
            <div className="mt-5 inline-flex items-center gap-2 text-xs text-[#6E6E73]">
              <ShieldCheck
                className="w-3.5 h-3.5 text-[#004E9A] shrink-0"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span>
                <strong className="font-medium text-[#1D1D1F]">Garantia de cuidado</strong>
                <span aria-hidden="true"> · </span>
                Conferência por peça e reavaliação sem custo
              </span>
            </div>
          </div>

          {/* Right Column: Balanced 6-col 16:9 Banner Frame for Laptop & Desktop */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-3.5">
            <div className="group relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#004E9A]/20 bg-[#F5F5F7] shadow-[0_14px_38px_-12px_rgba(0,78,154,0.22),0_0_0_1px_rgba(0,78,154,0.08)] transition-shadow duration-300 hover:shadow-[0_18px_44px_-10px_rgba(0,78,154,0.30),0_0_0_1px_rgba(0,78,154,0.14)]">
              {!photoError ? (
                <img
                  src={BUSINESS_INFO.assets.heroBanner}
                  alt="Recepção e espaço interno da Lavanderia Santa Maria em São Bernardo do Campo"
                  referrerPolicy="no-referrer"
                  fetchPriority="high"
                  decoding="async"
                  onError={() => setPhotoError(true)}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.015]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F5F5F7]">
                  <p className="font-display text-sm font-semibold text-[#1D1D1F]">
                    Lavanderia Santa Maria
                  </p>
                  <p className="mt-1 text-xs text-[#6E6E73]">
                    Vila Alves Dias · São Bernardo do Campo
                  </p>
                </div>
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/45"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 inset-x-0 h-[1px] bg-white/80"
              />
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl border border-[#E5E5E7] bg-[#FAFAFA]">
              <div className="w-11 h-11 rounded-lg overflow-hidden border border-[#E5E5E7] bg-white shrink-0 flex items-center justify-center">
                {!logoError ? (
                  <img
                    src={BUSINESS_INFO.assets.logo}
                    alt="Logotipo oficial Lavanderia Santa Maria Facility Clean"
                    referrerPolicy="no-referrer"
                    decoding="async"
                    onError={() => setLogoError(true)}
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <span className="font-display text-xs font-semibold text-[#1D1D1F]">
                    SM
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-[#0A0A0A] truncate">
                  Facility Clean · Santa Maria
                </p>
                <p className="text-xs text-[#6E6E73] mt-0.5 leading-snug">
                  R. Nossa Sra. de Fátima, 221 · Vila Alves Dias
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact 4-Column Proof Strip */}
        <div className="mt-8 pt-6 border-t border-[#E5E5E7] grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          <div>
            <p className="font-display text-xl sm:text-2xl font-semibold text-[#0A0A0A] tabular-nums">
              7 anos
            </p>
            <p className="mt-0.5 text-xs text-[#6E6E73]">
              Em São Bernardo do Campo
            </p>
          </div>
          <div>
            <p className="font-display text-xl sm:text-2xl font-semibold text-[#0A0A0A] tabular-nums">
              4,8 / 5
            </p>
            <p className="mt-0.5 text-xs text-[#6E6E73]">
              Avaliação no Google
            </p>
          </div>
          <div>
            <p className="font-display text-xl sm:text-2xl font-semibold text-[#0A0A0A]">
              Delivery
            </p>
            <p className="mt-0.5 text-xs text-[#6E6E73]">
              Coleta e entrega na região
            </p>
          </div>
          <div>
            <p className="font-display text-xl sm:text-2xl font-semibold text-[#0A0A0A]">
              Inclusão
            </p>
            <p className="mt-0.5 text-xs text-[#6E6E73]">
              Acolhimento à comunidade LGBTQ+
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
