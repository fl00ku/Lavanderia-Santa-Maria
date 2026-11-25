import { BUSINESS_INFO } from '../data/laundryData';

const ALLOWED_WHATSAPP_ORIGIN = 'https://wa.me/';

/**
 * Sanitizes single-line user input (neighborhood, short notes):
 * strips control characters, line breaks, and angle brackets.
 */
export function sanitizeUserInput(value: string, maxLength = 160): string {
  return value
    .replace(/[\u0000-\u001F\u007F<>`]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitizes multi-line WhatsApp message templates while preserving intentional paragraphs (\n).
 */
export function sanitizeMessageBody(value: string, maxLength = 700): string {
  return value
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F<>`]/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxLength);
}

/**
 * Builds a validated WhatsApp Click-to-Chat URL pointing strictly to an official business number.
 */
export function buildWhatsAppUrl(
  message: string,
  channel: 'primary' | 'secondary' = 'primary'
): string {
  const baseUrl =
    channel === 'secondary'
      ? BUSINESS_INFO.whatsappSecondaryBaseUrl
      : BUSINESS_INFO.whatsappBaseUrl;

  const cleanMessage = sanitizeMessageBody(message, 700);
  const url = `${baseUrl}?text=${encodeURIComponent(cleanMessage)}`;
  if (!url.startsWith(ALLOWED_WHATSAPP_ORIGIN)) {
    return baseUrl;
  }
  return url;
}

/**
 * Builds a safe Google Maps search URL for the physical address.
 */
export function buildSafeMapsUrl(): string {
  const query = encodeURIComponent(BUSINESS_INFO.address);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export interface SelectedOrderItem {
  id: string;
  title: string;
  quantity: number;
}

export interface CustomQuoteParams {
  items: SelectedOrderItem[];
  serviceMode: 'delivery' | 'balcao';
  neighborhood: string;
  notes: string;
}

export function composeCustomQuoteMessage({
  items,
  serviceMode,
  neighborhood,
  notes,
}: CustomQuoteParams): string {
  const cleanNeighborhood = sanitizeUserInput(neighborhood, 60);
  const cleanNotes = sanitizeUserInput(notes, 180);
  const modeText =
    serviceMode === 'delivery'
      ? 'Coleta e entrega (Delivery)'
      : 'Levar e retirar na loja (Vila Alves Dias)';

  const paragraphs: string[] = [
    'Olá! Gostaria de solicitar um orçamento na Lavanderia Santa Maria.',
  ];

  if (items.length > 0) {
    const itemsList = items
      .map((item) => `- ${item.quantity}x ${item.title}`)
      .join('\n');
    paragraphs.push(`Peças selecionadas:\n${itemsList}`);
  }

  const details: string[] = [`Modalidade: ${modeText}`];
  if (cleanNeighborhood) {
    details.push(`Bairro: ${cleanNeighborhood}`);
  }
  if (cleanNotes) {
    details.push(`Observações: ${cleanNotes}`);
  }

  paragraphs.push(details.join('\n'));

  return paragraphs.join('\n\n');
}

export interface BusinessStatus {
  isOpen: boolean;
  label: string;
  detail: string;
}

/**
 * Computes real-time open/closed status in America/Sao_Paulo timezone.
 */
export function getSaoPauloBusinessStatus(now: Date = new Date()): BusinessStatus {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? '';
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  const minutesSinceMidnight = hour * 60 + minute;

  const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(weekday);
  const isSaturday = weekday === 'Sat';

  if (isWeekday) {
    const open = minutesSinceMidnight >= 8 * 60 && minutesSinceMidnight < 18 * 60;
    if (open) {
      return {
        isOpen: true,
        label: 'Aberto agora',
        detail: 'Atendimento hoje até 18h',
      };
    }
    if (minutesSinceMidnight < 8 * 60) {
      return {
        isOpen: false,
        label: 'Fechado no momento',
        detail: 'Abre hoje às 08h',
      };
    }
    return {
      isOpen: false,
      label: 'Fechado no momento',
      detail: weekday === 'Fri' ? 'Abre sábado às 09h' : 'Abre amanhã às 08h',
    };
  }

  if (isSaturday) {
    const open = minutesSinceMidnight >= 9 * 60 && minutesSinceMidnight < 13 * 60;
    if (open) {
      return {
        isOpen: true,
        label: 'Aberto agora',
        detail: 'Atendimento hoje até 13h',
      };
    }
    if (minutesSinceMidnight < 9 * 60) {
      return {
        isOpen: false,
        label: 'Fechado no momento',
        detail: 'Abre hoje às 09h',
      };
    }
    return {
      isOpen: false,
      label: 'Fechado no momento',
      detail: 'Abre segunda-feira às 08h',
    };
  }

  return {
    isOpen: false,
    label: 'Fechado aos domingos',
    detail: 'Abre segunda-feira às 08h',
  };
}
