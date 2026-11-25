import { useState } from 'react';
import { BUSINESS_INFO, STORE_GALLERY, type StorePhoto } from '../data/laundryData';

function StoreGalleryCard({ photo }: { photo: StorePhoto }) {
  const [imgError, setImgError] = useState(false);

  return (
    <figure className="flex flex-col">
      <div className="aspect-[4/3] w-full rounded-xl overflow-hidden border border-[#E5E5E7] bg-[#F5F5F7]">
        {!imgError ? (
          <img
            src={photo.src}
            alt={photo.alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4 text-center">
            <p className="text-xs text-[#6E6E73]">{photo.caption}</p>
          </div>
        )}
      </div>
      <figcaption className="mt-2.5 text-xs text-[#6E6E73] leading-snug">
        {photo.caption}
      </figcaption>
    </figure>
  );
}

export function AboutGallerySection() {
  const [logoError, setLogoError] = useState(false);

  return (
    <section id="sobre" className="bg-white border-b border-[#E5E5E7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Concise History & Values */}
          <div className="lg:col-span-7">
            <p className="text-xs font-medium text-[#004E9A] mb-1.5">Sobre nós</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0A0A0A]">
              7 anos em São Bernardo do Campo cuidando de cada peça.
            </h2>

            <div className="mt-4 space-y-3 text-sm sm:text-base text-[#1D1D1F] leading-relaxed max-w-2xl">
              <p>
                A Lavanderia Santa Maria atua há 7 anos em São Bernardo do Campo,
                oferecendo serviços de lavanderia com produtos de qualidade, cuidado
                especial com cada peça e atendimento personalizado.
              </p>
              <p className="text-[#6E6E73]">
                Temos delivery para proporcionar mais conforto e praticidade aos nossos
                clientes, e nossa unidade também acolhe a comunidade LGBTQ+.
              </p>
            </div>
          </div>

          {/* Right: Compact Brand Identity Card */}
          <div className="lg:col-span-5">
            <div className="p-5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E7] flex items-center gap-5">
              <div className="w-20 h-20 rounded-xl bg-white border border-[#E5E5E7] flex items-center justify-center p-1.5 shrink-0">
                {!logoError ? (
                  <img
                    src={BUSINESS_INFO.assets.logo}
                    alt="Logotipo Facility Clean Santa Maria Lavanderia"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    onError={() => setLogoError(true)}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="font-display text-sm font-semibold text-[#0A0A0A]">
                    Santa Maria
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-xs text-[#6E6E73]">Vila Alves Dias · SBC</p>
                <h3 className="mt-0.5 font-display text-lg font-semibold text-[#0A0A0A]">
                  Lavanderia Santa Maria
                </h3>
                <div className="mt-2.5 flex items-center gap-2" aria-hidden="true">
                  <span className="w-6 h-[2px] bg-[#004E9A]" />
                  <span className="w-6 h-[2px] bg-[#D63384]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store Gallery: 6 Real Photos (3x2 grid on desktop, 2x3 on mobile) */}
        <div className="mt-10 pt-8 border-t border-[#E5E5E7]">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-5">
            <h3 className="font-display text-lg font-semibold text-[#0A0A0A]">
              Galeria da loja
            </h3>
            <p className="text-xs text-[#6E6E73]">
              Unidade, carro de delivery, organização e acabamento real das peças
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {STORE_GALLERY.map((photo) => (
              <StoreGalleryCard key={photo.id} photo={photo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
