import React from 'react';
import { SITE_CONFIG, MAP_EMBED_URL, MAP_QUERY } from '../lib/config';
import { WhatsAppButton } from './WhatsAppButton';
import { Icon } from './Icon';

export function ContactInfo() {
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    MAP_QUERY
  )}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
      {/* Left Column: Coordinates & Comms */}
      <div className="lg:col-span-5 flex flex-col justify-between">
        <div>
          <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1.5 font-bold">
            // 07. PHYSICAL LOCATION
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl uppercase tracking-tight text-text-heading mb-6">
            The Sector 4 Headquarters.
          </h2>

          <div className="space-y-6 mb-8">
            {/* Street Address */}
            <div className="flex items-start gap-3">
              <Icon name="location_on" size={24} className="text-primary mt-0.5 shrink-0" />
              <div>
                <div className="font-mono text-xs text-text-muted uppercase">STREET ADDRESS</div>
                <div className="font-body text-base text-text-heading font-medium">
                  {SITE_CONFIG.address}
                </div>
                <div className="font-body text-xs text-text-body">
                  {SITE_CONFIG.city}
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex items-start gap-3">
              <Icon name="schedule" size={24} className="text-primary mt-0.5 shrink-0" />
              <div>
                <div className="font-mono text-xs text-text-muted uppercase">STAFFED HOURS</div>
                <div className="font-body text-sm text-text-heading">
                  {SITE_CONFIG.hours.monSat}
                </div>
                <div className="font-body text-sm text-text-heading">
                  {SITE_CONFIG.hours.sun}
                </div>
                <div className="font-mono text-xs text-primary mt-1">
                  * {SITE_CONFIG.hours.badge}
                </div>
              </div>
            </div>

            {/* Comms */}
            <div className="flex items-start gap-3">
              <Icon name="call" size={24} className="text-primary mt-0.5 shrink-0" />
              <div>
                <a
                  href={`tel:${SITE_CONFIG.phoneClean}`}
                  className="font-body text-base text-text-heading font-medium hover:text-primary transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp & Directions Actions */}
        <div className="pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-3">
            <WhatsAppButton variant="inline" className="flex-1 sm:flex-initial" />
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-border text-text-heading hover:border-primary hover:text-primary px-space-lg py-space-md font-headline text-lg uppercase tracking-wide rounded-sm transition-colors font-bold"
            >
              <span>Get Directions</span>
              <Icon name="directions" size={18} />
            </a>
          </div>
          <p className="font-mono text-[11px] text-text-muted mt-2">
            Demo site: messages go to the developer.
          </p>
        </div>
      </div>

      {/* Right Column: Google Maps Iframe + HUD Overlay */}
      <div className="lg:col-span-7 flex flex-col justify-between">
        <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[320px] sm:min-h-[380px] border border-border relative rounded-sm overflow-hidden bg-surface-lowest">
          {/* Top HUD */}
          <div className="absolute top-3 left-3 z-10 p-2 bg-[#0A0A0A]/90 backdrop-blur-md border border-border font-mono text-xs text-text-body flex items-center gap-2 rounded-sm shadow-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>{SITE_CONFIG.coordinates.label}</span>
          </div>

          {/* Embedded Google Maps with grayscale dark styling or styled fallback */}
          {MAP_EMBED_URL ? (
            <iframe
              title="Map showing the Iron District Fitness demo location"
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(85%)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[320px] sm:min-h-[380px] block"
            ></iframe>
          ) : (
            <div className="w-full h-full min-h-[320px] sm:min-h-[380px] flex flex-col items-center justify-center p-6 text-center bg-surface-lowest">
              <Icon name="location_on" size={36} className="text-primary mb-3" />
              <div className="font-headline text-xl uppercase text-text-heading font-bold">
                Location Map
              </div>
              <div className="font-mono text-xs text-text-muted mt-1 max-w-xs">
                {MAP_QUERY || SITE_CONFIG.fullAddress}
              </div>
            </div>
          )}
        </div>

        {/* Small note under the map */}
        <p className="font-mono text-[11px] text-text-muted mt-2">
          Map shows a placeholder location (demo)
        </p>
      </div>
    </div>
  );
}
