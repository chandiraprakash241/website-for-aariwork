"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "916369713427";
const WHATSAPP_MESSAGE = "Hi, I'm interested in Aari blouse design. Can you share details?";

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setIsDesktop(!isMobile);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDesktop || !isVisible) return null;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const mailtoUrl = "mailto:muthusowmiya001@gmail.com";

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-oxblood/95 via-oxblood/88 to-oxblood/72 backdrop-blur-md border-t border-cream/15 px-4 py-3 safe-area-bottom"
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex gap-2">
        <a
          href={mailtoUrl}
          className="flex-1 btn-primary text-center py-3 text-sm font-semibold"
          data-cursor="interactive"
        >
          Contact / Order
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 btn-secondary flex items-center justify-center gap-2 py-3 text-sm font-semibold"
          data-cursor="interactive"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378l-.361.214-3.741-.982.998 3.645-.235.364a9.847 9.847 0 001.51 5.169c1.473 2.1 3.546 3.291 6.46 3.561l.364.004c1.637 0 3.233-.383 4.694-1.14 2.712-1.422 4.467-4.296 4.467-7.468 0-2.267-.55-4.43-1.614-6.29-1.616-2.876-4.597-4.514-7.522-4.512zM2.534 1.969C3.614.75 5.166 0 6.582 0c1.756 0 3.316.811 4.313 2.254.405.575.763 1.213 1.068 1.9.793 1.94 1.465 4.509 1.599 7.084.024.469.02.937-.012 1.4-.215 3.29-1.488 5.909-3.595 7.412-1.165.828-2.735 1.32-4.317 1.32-.424 0-.847-.03-1.269-.089-1.68-.23-3.22-.897-4.42-1.979C1.115 20.127 0 17.474 0 14.644c0-2.987 1.184-5.822 3.368-7.976.651-.645 1.469-1.185 2.166-1.699z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
