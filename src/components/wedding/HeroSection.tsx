import { motion } from "framer-motion";
import { BadgeCheck, CalendarPlus } from "lucide-react";
import heroPhoto from "@/assets/hero-couple.jpeg";
import { useTranslation } from "@/i18n/LanguageContext";

const generateICS = () => {
  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Alexandru & Elena Wedding//EN
BEGIN:VEVENT
DTSTART:20270627T170000
DTEND:20270628T010000
SUMMARY:Alexandru & Elena Wedding
LOCATION:Lago Event Park, Sicily hall, Dănceni, Chișinău
DESCRIPTION:Join us for our wedding celebration at Lago Event Park.
END:VEVENT
END:VCALENDAR`;
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "alexandru-elena-wedding.ics";
  a.click();
  URL.revokeObjectURL(url);
};

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative flex min-h-svh flex-col bg-transparent moodboard-surface">
      <div className="relative z-10 shrink-0 px-5 pb-5 pt-10 text-center sm:px-6 sm:pb-6 sm:pt-12 md:pt-14">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-eyebrow mb-1.5 sm:mb-2"
        >
          {t("hero.gettingMarried")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="hero-names"
        >
          Alexandru <span className="text-[hsl(var(--pearl-gold))]">&</span> Elena
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="decorative-line mx-auto my-2.5 sm:my-4"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="hero-meta text-lg sm:text-xl md:text-2xl"
        >
          {t("hero.date")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="hero-meta mx-auto mt-1.5 max-w-md text-sm leading-snug opacity-85 sm:mt-2 sm:text-base"
        >
          {t("hero.venue")}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          type="button"
          onClick={generateICS}
          className="btn-pearl-outline mt-4 px-5 py-2 sm:mt-5 sm:px-6 sm:py-2.5"
        >
          <CalendarPlus className="h-4 w-4 text-[hsl(var(--primary))]" />
          {t("hero.saveTheDate")}
        </motion.button>
      </div>

      <div className="relative min-h-[38svh] w-full flex-1 overflow-hidden sm:min-h-[42svh]">
        <img
          src={heroPhoto}
          alt="Alexandru și Elena"
          className="absolute inset-0 h-full w-full object-cover object-[center_52%] sm:object-[center_50%]"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[hsl(var(--background))] to-transparent"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-14 z-10 flex justify-center sm:bottom-16">
          <motion.a
            href="#rsvp"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="btn-pearl-sheen hero-confirm-cta"
          >
            <BadgeCheck className="h-6 w-6 shrink-0 text-[hsl(var(--pearl-gold))]" aria-hidden />
            <span>{t("hero.confirm")}</span>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="animate-float">
            <svg
              className="h-6 w-6 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
