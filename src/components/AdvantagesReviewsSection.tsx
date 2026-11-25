import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import {
  BUSINESS_INFO,
  GOOGLE_REVIEWS,
  LAUNDRY_ADVANTAGES,
} from '../data/laundryData';

const LOOP_REVIEWS = [...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS];

export function AdvantagesReviewsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    let rafId = 0;
    let lastTime = performance.now();

    const step = (now: number) => {
      const dt = Math.min(48, now - lastTime);
      lastTime = now;

      if (!isPaused && !isDraggingRef.current && el.scrollWidth > el.clientWidth) {
        el.scrollLeft += dt * 0.09;
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isPaused]);

  function handleScrollWrap() {
    const el = trackRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;
    if (halfWidth <= 0) return;
    if (el.scrollLeft >= halfWidth) {
      el.scrollLeft -= halfWidth;
    } else if (el.scrollLeft <= 0 && isDraggingRef.current) {
      el.scrollLeft += halfWidth;
    }
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse') return;
    const el = trackRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    setIsPaused(true);
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return;
    const el = trackRef.current;
    if (!el) return;
    const delta = e.clientX - dragStartXRef.current;
    el.scrollLeft = dragStartScrollRef.current - delta;
    handleScrollWrap();
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return;
    const el = trackRef.current;
    if (el && el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    isDraggingRef.current = false;
    setIsPaused(false);
  }

  return (
    <section id="avaliacoes" className="bg-[#FAFAFA] border-b border-[#E5E5E7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Compact Advantages Block with Bold Aesthetic Titles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#E5E5E7]">
          <div className="lg:col-span-4">
            <p className="text-xs font-medium text-[#004E9A] mb-1.5">
              Nossos diferenciais
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0A0A0A]">
              Qualidade no acabamento e tranquilidade na entrega.
            </h2>
          </div>

          <div className="lg:col-span-8 divide-y divide-[#E5E5E7] border border-[#E5E5E7] bg-white rounded-xl px-6">
            {LAUNDRY_ADVANTAGES.map((advantage) => (
              <div
                key={advantage.index}
                className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 items-baseline"
              >
                <div className="sm:col-span-5 flex items-baseline gap-3">
                  <span className="font-display text-xs font-bold tabular-nums text-[#004E9A]">
                    {advantage.index}.
                  </span>
                  <h3 className="font-display text-base sm:text-[17px] font-bold tracking-tight text-[#0A0A0A]">
                    {advantage.title}
                  </h3>
                </div>
                <p className="sm:col-span-7 text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Google 4.8/5 Reviews: Faster Arrow-Free Auto-scrolling + Touch/Mouse Swipeable Carousel */}
        <div className="pt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div>
              <p className="text-xs font-medium text-[#D63384] mb-1.5">
                Avaliações no Google
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0A0A0A]">
                Aprovada por quem confia suas peças toda semana.
              </h2>
            </div>

            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-[#E5E5E7] self-start sm:self-auto shrink-0">
              <p className="font-display text-2xl font-semibold text-[#0A0A0A] tabular-nums leading-none">
                {BUSINESS_INFO.googleRating}
                <span className="text-sm font-normal text-[#6E6E73]">
                  /{BUSINESS_INFO.googleRatingMax}
                </span>
              </p>
              <div
                className="flex items-center gap-0.5 text-[#0A0A0A]"
                aria-label="Avaliação 4,8 de 5 estrelas no Google"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-3.5 h-3.5 fill-[#0A0A0A] text-[#0A0A0A]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            ref={trackRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              if (!isDraggingRef.current) setIsPaused(false);
            }}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            onScroll={handleScrollWrap}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            role="region"
            aria-label="Carrossel de depoimentos de clientes"
            tabIndex={0}
            className="mt-7 flex gap-4 overflow-x-auto no-scrollbar select-none cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#004E9A] rounded-xl"
          >
            {LOOP_REVIEWS.map((review, index) => (
              <figure
                key={`${review.id}-${index}`}
                aria-hidden={index >= GOOGLE_REVIEWS.length}
                className="w-[82vw] sm:w-[340px] lg:w-[360px] shrink-0 flex flex-col justify-between p-5 sm:p-6 rounded-xl bg-white border border-[#E5E5E7]"
              >
                <blockquote className="text-sm sm:text-base text-[#1D1D1F] leading-relaxed">
                  “{review.quote}”
                </blockquote>

                <figcaption className="mt-5 pt-3.5 border-t border-[#F0F0F2]">
                  <p className="font-display text-sm font-semibold text-[#0A0A0A]">
                    {review.author}
                  </p>
                  <p className="text-xs text-[#6E6E73] mt-0.5">{review.context}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-3 text-xs text-[#6E6E73]">
            Deslize para o lado para navegar pelos depoimentos.
          </p>
        </div>
      </div>
    </section>
  );
}
