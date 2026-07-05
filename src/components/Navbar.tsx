"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        setIsMenuOpen(false);
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Top bar with email */}
      <div 
        className={`w-full bg-[#351114] text-cream/80 text-xs py-2 px-4 md:px-12 flex justify-between items-center transition-all duration-300 border-b border-cream/5 z-50 relative ${
          isScrolled ? "h-0 py-0 overflow-hidden border-b-0" : "h-auto"
        }`}
      >
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <a href="mailto:muthusowmiya001@gmail.com" className="hover:text-brass transition-colors micro-link" data-cursor="interactive">
            muthusowmiya001@gmail.com
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>Premium Bridal Aari Embroidery</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "top-0 bg-oxblood/95 shadow-lg border-b border-brass/20 py-2.5 backdrop-blur-md" 
            : "top-8 bg-[#4a1a1f]/80 py-4 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <a href="#" className="flex items-center gap-2 md:gap-3 group" data-cursor="interactive">
            <img
              src="/photo/logo.webp"
              alt="Sewzy Bee logo"
              className="h-8 w-8 object-contain logo-glow transition duration-300 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/photo/logo.png";
              }}
            />
            <span className="font-display text-xl font-bold tracking-[0.03em] text-cream group-hover:text-gold transition duration-300">
              Sewzy Bee
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#artisan-masterwork"
              onClick={(e) => handleLinkClick(e, "#artisan-masterwork")}
              className="text-sm font-semibold tracking-wider text-cream/90 hover:text-gold transition-colors duration-300 micro-link"
              data-cursor="interactive"
            >
              Explore Designs
            </a>
            <a
              href="https://wa.me/916369713427"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold tracking-wider text-cream/90 hover:text-gold transition-colors duration-300 micro-link"
              data-cursor="interactive"
            >
              Start Your Blouse
            </a>
            <a
              href="https://wa.me/916369713427"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold tracking-wider text-cream/90 hover:text-gold transition-colors duration-300 micro-link"
              data-cursor="interactive"
            >
              WhatsApp
            </a>
          </nav>

          {/* Call & WhatsApp CTAs (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+916369713427"
              className="btn-secondary px-4 py-2 text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
              data-cursor="interactive"
            >
              <svg className="w-3.5 h-3.5 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call
            </a>
            <a
              href="https://wa.me/916369713427"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-4 py-2 text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
              data-cursor="interactive"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378l-.361.214-3.741-.982.998 3.645-.235.364a9.847 9.847 0 001.51 5.169c1.473 2.1 3.546 3.291 6.46 3.561l.364.004c1.637 0 3.233-.383 4.694-1.14 2.712-1.422 4.467-4.296 4.467-7.468 0-2.267-.55-4.43-1.614-6.29-1.616-2.876-4.597-4.514-7.522-4.512zM2.534 1.969C3.614.75 5.166 0 6.582 0c1.756 0 3.316.811 4.313 2.254.405.575.763 1.213 1.068 1.9.793 1.94 1.465 4.509 1.599 7.084.024.469.02.937-.012 1.4-.215 3.29-1.488 5.909-3.595 7.412-1.165.828-2.735 1.32-4.317 1.32-.424 0-.847-.03-1.269-.089-1.68-.23-3.22-.897-4.42-1.979C1.115 20.127 0 17.474 0 14.644c0-2.987 1.184-5.822 3.368-7.976.651-.645 1.469-1.185 2.166-1.699z" />
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Quick-action contact buttons + Hamburger menu (Mobile) */}
          <div className="flex md:hidden items-center gap-3">
            {/* Quick Call */}
            <a
              href="tel:+916369713427"
              className="p-2.5 rounded-full border border-cream/15 bg-[#4a1a1f]/40 hover:bg-brass/20 text-cream transition duration-300"
              data-cursor="interactive"
              aria-label="Call Us"
            >
              <svg className="w-4 h-4 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>

            {/* Quick WhatsApp */}
            <a
              href="https://wa.me/916369713427"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-cream/15 bg-[#4a1a1f]/40 hover:bg-brass/20 text-cream transition duration-300"
              data-cursor="interactive"
              aria-label="WhatsApp Us"
            >
              <svg className="w-4 h-4 text-brass" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378l-.361.214-3.741-.982.998 3.645-.235.364a9.847 9.847 0 001.51 5.169c1.473 2.1 3.546 3.291 6.46 3.561l.364.004c1.637 0 3.233-.383 4.694-1.14 2.712-1.422 4.467-4.296 4.467-7.468 0-2.267-.55-4.43-1.614-6.29-1.616-2.876-4.597-4.514-7.522-4.512zM2.534 1.969C3.614.75 5.166 0 6.582 0c1.756 0 3.316.811 4.313 2.254.405.575.763 1.213 1.068 1.9.793 1.94 1.465 4.509 1.599 7.084.024.469.02.937-.012 1.4-.215 3.29-1.488 5.909-3.595 7.412-1.165.828-2.735 1.32-4.317 1.32-.424 0-.847-.03-1.269-.089-1.68-.23-3.22-.897-4.42-1.979C1.115 20.127 0 17.474 0 14.644c0-2.987 1.184-5.822 3.368-7.976.651-.645 1.469-1.185 2.166-1.699z" />
              </svg>
            </a>

            {/* Menu Trigger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 text-cream hover:text-gold transition duration-300"
              data-cursor="interactive"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden w-full bg-[#4a1a1f] border-t border-brass/10 overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                <a
                  href="#artisan-masterwork"
                  onClick={(e) => handleLinkClick(e, "#artisan-masterwork")}
                  className="text-lg font-semibold text-cream/90 hover:text-gold transition-colors duration-300"
                >
                  Explore Designs
                </a>
                <a
                  href="https://wa.me/916369713427"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-semibold text-cream/90 hover:text-gold transition-colors duration-300"
                >
                  Start Your Blouse
                </a>
                <a
                  href="https://wa.me/916369713427"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-semibold text-cream/90 hover:text-gold transition-colors duration-300"
                >
                  WhatsApp
                </a>

                <div className="h-px bg-cream/10 my-2" />

                <div className="flex flex-col gap-3">
                  <a
                    href="tel:+916369713427"
                    className="btn-secondary w-full py-3 text-center text-sm font-semibold tracking-wider flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/916369713427"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full py-3 text-center text-sm font-semibold tracking-wider flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378l-.361.214-3.741-.982.998 3.645-.235.364a9.847 9.847 0 001.51 5.169c1.473 2.1 3.546 3.291 6.46 3.561l.364.004c1.637 0 3.233-.383 4.694-1.14 2.712-1.422 4.467-4.296 4.467-7.468 0-2.267-.55-4.43-1.614-6.29-1.616-2.876-4.597-4.514-7.522-4.512zM2.534 1.969C3.614.75 5.166 0 6.582 0c1.756 0 3.316.811 4.313 2.254.405.575.763 1.213 1.068 1.9.793 1.94 1.465 4.509 1.599 7.084.024.469.02.937-.012 1.4-.215 3.29-1.488 5.909-3.595 7.412-1.165.828-2.735 1.32-4.317 1.32-.424 0-.847-.03-1.269-.089-1.68-.23-3.22-.897-4.42-1.979C1.115 20.127 0 17.474 0 14.644c0-2.987 1.184-5.822 3.368-7.976.651-.645 1.469-1.185 2.166-1.699z" />
                    </svg>
                    WhatsApp Us
                  </a>
                </div>

                <div className="text-center mt-2">
                  <span className="text-xs text-cream/50 block">Email Us</span>
                  <a
                    href="mailto:muthusowmiya001@gmail.com"
                    className="text-sm font-semibold text-brass hover:text-gold"
                  >
                    muthusowmiya001@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
