import React from 'react';
import { buildWhatsAppUrl } from '../lib/whatsapp';

export function WhatsAppButton({
  program,
  plan,
  trainer,
  customText,
  variant = 'floating', // 'floating' | 'inline'
  className = '',
  children,
}) {
  const url = buildWhatsAppUrl({ program, plan, trainer, customText });

  if (variant === 'inline') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Iron District Fitness on WhatsApp"
        className={`inline-flex items-center justify-center gap-space-sm border border-[#25D366] text-[#25D366] bg-[#25D366]/5 px-space-lg py-space-md font-headline text-lg uppercase tracking-wide hover:bg-[#25D366] hover:text-black active:scale-[0.98] transition-all duration-200 rounded-sm font-bold ${className}`}
      >
        {children || (
          <>
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.155.57 4.18 1.564 5.928l-1.564 5.728 5.86-1.536c1.693.924 3.633 1.452 5.702 1.452 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>Chat on WhatsApp</span>
          </>
        )}
      </a>
    );
  }

  return (
    <aside aria-label="WhatsApp quick chat option">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct message Iron District Fitness on WhatsApp"
        className={`fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 w-14 h-14 bg-[#25D366] text-black flex items-center justify-center rounded-sm shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group focus-visible:outline-white ${className}`}
      >
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.155.57 4.18 1.564 5.928l-1.564 5.728 5.86-1.536c1.693.924 3.633 1.452 5.702 1.452 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
        </svg>

        {/* Desktop Tooltip */}
        <span className="hidden md:group-hover:block absolute right-16 bg-[#0A0A0A] text-white font-mono text-xs px-3 py-1.5 border border-border whitespace-nowrap shadow-xl">
          Quick Dispatch WhatsApp
        </span>
      </a>
    </aside>
  );
}
