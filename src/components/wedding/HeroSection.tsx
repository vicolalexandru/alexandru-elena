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
    <section id="hero" className="relative min-h-screen flex flex-col bg-background">
      <div className="relative z-10 text-center px-6 pt-20 pb-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs md:text-sm tracking-[0.3em] uppercase text-primary mb-2 font-sans font-light"
        >
          {t("hero.gettingMarried")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-foreground italic"
        >
          Alexandru <span className="text-primary">&</span> Elena
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-24 h-px bg-primary/50 mx-auto my-4"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-serif text-2xl md:text-3xl text-foreground font-light"
        >
          {t("hero.date")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-foreground/80 mt-2 font-sans font-light tracking-wide"
        >
          {t("hero.venue")}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          onClick={generateICS}
          className="mt-5 inline-flex items-center gap-2 px-6 py-2 bg-white border border-primary/30 text-primary font-sans text-sm tracking-wider uppercase hover:bg-secondary transition-colors rounded-full"
        >
          <CalendarPlus className="w-4 h-4" />
          {t("hero.saveTheDate")}
        </motion.button>
      </div>

      <div className="relative flex-1 min-h-[68vh] overflow-hidden">
        <img
          src={heroPhoto}
          alt="Alexandru și Elena"
          className="absolute inset-0 h-full w-full object-cover object-[center_70%]"
        />

      {/* RSVP Button - Heart Shape */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Heart-shaped ripple animations */}
          <motion.svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            animate={{
              scale: [1, 1.5],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            <path
              d="M50,85 C50,85 20,60 20,40 C20,25 30,20 40,25 C45,27.5 50,32.5 50,32.5 C50,32.5 55,27.5 60,25 C70,20 80,25 80,40 C80,60 50,85 50,85 Z"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
            />
          </motion.svg>
          <motion.svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            animate={{
              scale: [1, 1.5],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5,
            }}
          >
            <path
              d="M50,85 C50,85 20,60 20,40 C20,25 30,20 40,25 C45,27.5 50,32.5 50,32.5 C50,32.5 55,27.5 60,25 C70,20 80,25 80,40 C80,60 50,85 50,85 Z"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
            />
          </motion.svg>
          <motion.svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            animate={{
              scale: [1, 1.5],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1,
            }}
          >
            <path
              d="M50,85 C50,85 20,60 20,40 C20,25 30,20 40,25 C45,27.5 50,32.5 50,32.5 C50,32.5 55,27.5 60,25 C70,20 80,25 80,40 C80,60 50,85 50,85 Z"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
            />
          </motion.svg>

          {/* Heart-shaped Button */}
          <motion.a
            href="#rsvp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-28 h-28 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              {/* Heart shape */}
              <path
                d="M50,85 C50,85 20,60 20,40 C20,25 30,20 40,25 C45,27.5 50,32.5 50,32.5 C50,32.5 55,27.5 60,25 C70,20 80,25 80,40 C80,60 50,85 50,85 Z"
                fill="hsl(var(--primary))"
                className="transition-all duration-300 group-hover:fill-primary/90"
              />
            </svg>
            {/* Text centered in heart */}
            <div className="absolute inset-0 flex items-center justify-center pt-2">
              <span className="text-white font-sans text-sm tracking-widest uppercase font-medium">
                {t("hero.rsvp")}
              </span>
            </div>
          </motion.a>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="animate-float">
          <svg
            className="w-6 h-6 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
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
