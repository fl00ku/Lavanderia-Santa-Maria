import { useMemo, useState } from 'react';
import { ArrowUpRight, Minus, Plus, RotateCcw } from 'lucide-react';
import { LAUNDRY_SERVICES } from '../data/laundryData';
import {
  buildWhatsAppUrl,
  composeCustomQuoteMessage,
  type SelectedOrderItem,
} from '../utils/whatsapp';

type CategoryFilter = 'todos' | 'casa' | 'social' | 'diario';

const FILTER_TABS: { id: CategoryFilter; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'casa', label: 'Cama e Casa' },
  { id: 'social', label: 'Linha Social' },
  { id: 'diario', label: 'Dia a Dia' },
];

export function ServicesSection() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('todos');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [serviceMode, setServiceMode] = useState<'delivery' | 'balcao'>('delivery');
  const [neighborhood, setNeighborhood] = useState('');
  const [notes, setNotes] = useState('');

  const filteredServices = useMemo(() => {
    if (activeFilter === 'todos') return LAUNDRY_SERVICES;
    return LAUNDRY_SERVICES.filter((service) => service.category === activeFilter);
  }, [activeFilter]);

  const selectedItems: SelectedOrderItem[] = useMemo(() => {
    return LAUNDRY_SERVICES.filter((s) => (quantities[s.id] ?? 0) > 0).map((s) => ({
      id: s.id,
      title: s.title,
      quantity: quantities[s.id],
    }));
  }, [quantities]);

  const totalPiecesCount = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.quantity, 0),
    [selectedItems]
  );

  const customMessage = useMemo(
    () =>
      composeCustomQuoteMessage({
        items: selectedItems,
        serviceMode,
        neighborhood,
        notes,
      }),
    [selectedItems, serviceMode, neighborhood, notes]
  );

  const customWhatsAppUrl = useMemo(
    () => buildWhatsAppUrl(customMessage),
    [customMessage]
  );

  function updateQuantity(serviceId: string, delta: number) {
    setQuantities((prev) => {
      const current = prev[serviceId] ?? 0;
      const next = Math.max(0, Math.min(50, current + delta));
      if (next === 0) {
        const copy = { ...prev };
        delete copy[serviceId];
        return copy;
      }
      return { ...prev, [serviceId]: next };
    });
  }

  function resetQuoteBuilder() {
    setQuantities({});
    setNeighborhood('');
    setNotes('');
    setServiceMode('delivery');
  }

  return (
    <section id="servicos" className="bg-[#FAFAFA] border-b border-[#E5E5E7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Section Header + Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-8 border-b border-[#E5E5E7]">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#004E9A] mb-1.5">
              Serviços especializados
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0A0A0A]">
              Cuidado sob medida para cada peça.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filtrar serviços por categoria"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#EAEAEF] rounded-lg self-start lg:self-auto"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#004E9A] ${
                    isActive
                      ? 'bg-white text-[#0A0A0A] shadow-xs'
                      : 'text-[#6E6E73] hover:text-[#0A0A0A]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact 9-Service Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="p-5 rounded-xl bg-white border border-[#E5E5E7]"
            >
              <div className="flex items-center justify-between gap-2 text-xs text-[#6E6E73]">
                <span className="font-display font-semibold tabular-nums text-[#1D1D1F]">
                  {service.index}.
                </span>
                <span>{service.categoryLabel}</span>
              </div>

              <h3 className="mt-2.5 font-display text-base font-semibold tracking-tight text-[#0A0A0A]">
                {service.title}
              </h3>

              <p className="mt-1.5 text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        {/* Unified WhatsApp Order Builder */}
        <div
          id="montador-pedido"
          className="mt-10 p-5 sm:p-7 rounded-xl bg-white border border-[#E5E5E7]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs font-medium text-[#D63384] mb-0.5">
                    Orçamento rápido
                  </p>
                  <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-[#0A0A0A]">
                    Monte sua lista de peças para o WhatsApp
                  </h3>
                </div>

                {(selectedItems.length > 0 || neighborhood || notes) && (
                  <button
                    type="button"
                    onClick={resetQuoteBuilder}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#6E6E73] hover:text-[#0A0A0A] hover:bg-[#F5F5F7] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />
                    <span>Limpar</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 divide-y sm:divide-y-0 border-y border-[#E5E5E7]">
                {LAUNDRY_SERVICES.map((service) => {
                  const qty = quantities[service.id] ?? 0;
                  return (
                    <div
                      key={service.id}
                      className="py-2.5 sm:border-b sm:border-[#F0F0F2] flex items-center justify-between gap-3"
                    >
                      <span className="text-xs sm:text-sm font-medium text-[#1D1D1F] truncate">
                        {service.title}
                      </span>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQuantity(service.id, -1)}
                          disabled={qty === 0}
                          aria-label={`Remover uma unidade de ${service.title}`}
                          className="w-7 h-7 inline-flex items-center justify-center rounded-md border border-[#E5E5E7] text-[#1D1D1F] hover:bg-[#F5F5F7] disabled:opacity-35 disabled:hover:bg-transparent transition-colors duration-150"
                        >
                          <Minus className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                        </button>
                        <span
                          aria-live="polite"
                          className="w-6 text-center text-xs sm:text-sm font-medium tabular-nums text-[#0A0A0A]"
                        >
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(service.id, 1)}
                          aria-label={`Adicionar uma unidade de ${service.title}`}
                          className="w-7 h-7 inline-flex items-center justify-center rounded-md border border-[#E5E5E7] text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors duration-150"
                        >
                          <Plus className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between gap-4 lg:border-l lg:border-[#E5E5E7] lg:pl-7">
              <div className="space-y-3.5">
                <div>
                  <span className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                    Modalidade
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F5F5F7] rounded-lg border border-[#E5E5E7]">
                    <button
                      type="button"
                      onClick={() => setServiceMode('delivery')}
                      className={`py-1.5 px-2.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap ${
                        serviceMode === 'delivery'
                          ? 'bg-white text-[#0A0A0A] shadow-xs'
                          : 'text-[#6E6E73] hover:text-[#0A0A0A]'
                      }`}
                    >
                      Delivery (coleta)
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceMode('balcao')}
                      className={`py-1.5 px-2.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap ${
                        serviceMode === 'balcao'
                          ? 'bg-white text-[#0A0A0A] shadow-xs'
                          : 'text-[#6E6E73] hover:text-[#0A0A0A]'
                      }`}
                    >
                      Levar na loja
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="quote-neighborhood"
                    className="block text-xs font-medium text-[#1D1D1F] mb-1"
                  >
                    Bairro em SBC (opcional)
                  </label>
                  <input
                    id="quote-neighborhood"
                    type="text"
                    maxLength={60}
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Ex.: Vila Alves Dias, Assunção"
                    className="w-full px-3 py-2 text-sm text-[#0A0A0A] bg-[#FAFAFA] border border-[#D2D2D7] rounded-lg placeholder:text-[#86868B] focus:outline-none focus:border-[#004E9A] focus:bg-white transition-colors duration-150"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quote-notes"
                    className="block text-xs font-medium text-[#1D1D1F] mb-1"
                  >
                    Observações (opcional)
                  </label>
                  <input
                    id="quote-notes"
                    type="text"
                    maxLength={180}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex.: Edredom queen, mancha na gola"
                    className="w-full px-3 py-2 text-sm text-[#0A0A0A] bg-[#FAFAFA] border border-[#D2D2D7] rounded-lg placeholder:text-[#86868B] focus:outline-none focus:border-[#004E9A] focus:bg-white transition-colors duration-150"
                  />
                </div>

                <div className="p-3.5 rounded-lg bg-[#F5F5F7] border border-[#E5E5E7]">
                  <div className="flex items-center justify-between text-xs text-[#6E6E73] mb-1.5">
                    <span>Prévia da mensagem</span>
                    <span className="tabular-nums">
                      {totalPiecesCount} {totalPiecesCount === 1 ? 'peça' : 'peças'}
                    </span>
                  </div>
                  <p className="text-xs text-[#1D1D1F] leading-relaxed whitespace-pre-line break-words">
                    {customMessage}
                  </p>
                </div>
              </div>

              <a
                href={customWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 text-sm font-medium text-white bg-[#004E9A] hover:bg-[#003B75] rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004E9A]"
              >
                <span>Solicitar orçamento pelo WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
