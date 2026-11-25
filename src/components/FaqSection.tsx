import { useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { FAQ_ITEMS } from '../data/laundryData';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  function toggleItem(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section id="duvidas" className="bg-white border-b border-[#E5E5E7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Intro + Small Discreet Guarantee */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium text-[#004E9A] mb-1.5">
              Dúvidas frequentes
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0A0A0A]">
              Respostas rápidas antes do seu atendimento.
            </h2>
            <p className="mt-3 text-sm text-[#6E6E73] leading-relaxed max-w-md">
              Veja os pontos principais sobre delivery, orçamento, prazos e cuidado com
              cada tipo de peça.
            </p>

            {/* Discreet minimal guarantee box */}
            <div className="mt-6 p-3.5 rounded-lg border border-[#E5E5E7] bg-[#FAFAFA] inline-flex items-start gap-2.5 max-w-sm">
              <ShieldCheck
                className="w-4 h-4 text-[#004E9A] shrink-0 mt-0.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                <strong className="font-semibold text-[#0A0A0A]">
                  Garantia Santa Maria:
                </strong>{' '}
                conferência individual de peças e reavaliação sem custo adicional caso
                necessário.
              </p>
            </div>
          </div>

          {/* Right Column: Clean Native Accordion */}
          <div className="lg:col-span-7 divide-y divide-[#E5E5E7] border-y border-[#E5E5E7]">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-panel`}
                    onClick={() => toggleItem(item.id)}
                    className="w-full py-4 flex items-center justify-between gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004E9A] rounded-sm"
                  >
                    <span className="font-display text-sm sm:text-base font-semibold text-[#0A0A0A]">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6E6E73] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#004E9A]' : ''
                      }`}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`${item.id}-panel`}
                      className="pb-4 pr-6 text-xs sm:text-sm text-[#6E6E73] leading-relaxed"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
