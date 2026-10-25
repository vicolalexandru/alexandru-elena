import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";
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
    <section id="hero" className="relative flex min-h-svh flex-col bg-background">
      <div className="relative z-10 shrink-0 px-5 pb-5 pt-10 text-center sm:px-6 sm:pb-6 sm:pt-12 md:pt-14">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-1.5 font-sans text-[11px] font-light uppercase tracking-[0.28em] text-primary sm:mb-2 sm:text-xs md:text-sm"
        >
          {t("hero.gettingMarried")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-[2rem] font-light italic leading-tight text-foreground sm:text-5xl md:text-7xl lg:text-8xl"
        >
          Alexandru <span className="text-primary">&</span> Elena
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto my-2.5 h-px w-20 bg-primary/50 sm:my-4 sm:w-24"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-serif text-lg font-light text-foreground sm:text-xl md:text-3xl"
        >
          {t("hero.date")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mx-auto mt-1.5 max-w-md font-sans text-sm font-light leading-snug tracking-wide text-foreground/80 sm:mt-2 sm:text-base"
        >
          {t("hero.venue")}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          type="button"
          onClick={generateICS}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/80 px-5 py-2 font-sans text-xs uppercase tracking-wider text-primary shadow-sm backdrop-blur-sm transition-colors hover:bg-secondary/90 sm:mt-5 sm:px-6 sm:text-sm"
        >
          <CalendarPlus className="h-4 w-4" />
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
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent"
          aria-hidden="true"
        />

        <div className="absolute bottom-14 left-1/2 z-10 -translate-x-1/2 sm:bottom-16">
          <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
            <motion.svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            >
              <path
                d="M50,85 C50,85 20,60 20,40 C20,25 30,20 40,25 C45,27.5 50,32.5 50,32.5 C50,32.5 55,27.5 60,25 C70,20 80,25 80,40 C80,60 50,85 50,85 Z"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
              />
            </motion.svg>
            <motion.svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            >
              <path
                d="M50,85 C50,85 20,60 20,40 C20,25 30,20 40,25 C45,27.5 50,32.5 50,32.5 C50,32.5 55,27.5 60,25 C70,20 80,25 80,40 C80,60 50,85 50,85 Z"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
              />
            </motion.svg>
            <motion.svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
            >
              <path
                d="M50,85 C50,85 20,60 20,40 C20,25 30,20 40,25 C45,27.5 50,32.5 50,32.5 C50,32.5 55,27.5 60,25 C70,20 80,25 80,40 C80,60 50,85 50,85 Z"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
              />
            </motion.svg>

            <motion.a
              href="#rsvp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group relative"
            >
              <svg
                viewBox="0 0 100 100"
                className="h-24 w-24 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:h-28 sm:w-28"
              >
                <path
                  d="M50,85 C50,85 20,60 20,40 C20,25 30,20 40,25 C45,27.5 50,32.5 50,32.5 C50,32.5 55,27.5 60,25 C70,20 80,25 80,40 C80,60 50,85 50,85 Z"
                  fill="hsl(var(--primary))"
                  className="transition-all duration-300 group-hover:fill-primary/90"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pt-2">
                <span className="font-sans text-sm font-medium uppercase tracking-widest text-white">
                  {t("hero.rsvp")}
                </span>
              </div>
            </motion.a>
          </div>
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
