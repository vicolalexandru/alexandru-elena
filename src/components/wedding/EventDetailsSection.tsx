import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Map, ArrowRight } from "lucide-react";
import venueImage from "@/assets/lago-hall.jpg";
import guestsIcon from "@/assets/program-icon-guests.svg";
import ceremonyIcon from "@/assets/program-icon-ceremony.svg";
import { useTranslation } from "@/i18n/LanguageContext";

const ladiesDressColors = ["#EEDC9A", "#E1B1B8", "#A4AC86", "#A7C2D1", "#CDB5D9"];

const gentlemenDressColors = ["#1A1A1A", "#1D2941", "#493628"];

const EventDetailsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  const program = [
    {
      title: t("details.program.arrival"),
      time: t("details.program.arrivalTime"),
      icon: guestsIcon,
    },
    {
      title: t("details.program.ceremony"),
      time: t("details.program.ceremonyTime"),
      icon: ceremonyIcon,
    },
  ];

  return (
    <section ref={ref} id="details" className="py-16 md:py-24 px-6 md:px-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="decorative-flourish mb-4">✦</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            {t("details.title")}
          </h2>
          <div className="decorative-line" />
        </motion.div>

        {/* Venue Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 md:mb-16"
        >
          <div className="relative -mx-6 overflow-hidden md:mx-0 md:aspect-[16/9] md:min-h-[320px]">
            <img
              src={venueImage}
              alt={t("details.venueAlt")}
              className="h-auto w-full md:absolute md:inset-0 md:h-full md:object-cover md:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a2622]/55 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)] md:bottom-8 md:left-8 md:right-8">
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light mb-1">
                {t("details.venueName")}
              </h3>
              <p className="font-sans text-sm md:text-base font-light mb-3 text-white/90">
                {t("details.venueHall")}
              </p>
              <div className="flex flex-col gap-3">
                <motion.a
                  href="https://www.google.com/maps/search/?api=1&query=Lago+Event+Park+Danceni+Chisinau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-100 rounded-full transition-colors duration-300 group shadow-lg self-start"
                  aria-label="Open in Google Maps"
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-foreground text-sm font-sans uppercase tracking-wide">{t("details.getDirections")}</span>
                    <ArrowRight className="w-4 h-4 text-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="w-px h-5 bg-gray-300" />
                  <Map className="w-5 h-5 text-primary" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="program-timing mb-16"
        >
          <p className="program-timing__kicker">{t("details.program.kicker")}</p>
          <div className="program-timing__grid">
            {program.map((item) => (
              <article key={item.title} className="program-timing__item">
                <div className="program-timing__icon">
                  <img src={item.icon} alt="" />
                </div>
                <p className="program-timing__time">{item.time}</p>
                <p className="program-timing__title">{item.title}</p>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="dresscode max-w-xl mx-auto pt-4"
        >
          <h3 className="dresscode__title">{t("details.dressCode")}</h3>

          <div className="dresscode__block">
            <p className="dresscode__heading">{t("details.dressCode.ladiesHeading")}</p>
            <p className="dresscode__text">{t("details.dressCode.ladiesBody")}</p>
            <ul className="dresscode__swatches dresscode__swatches--ladies" aria-label={t("details.dressCode.ladiesHeading")}>
              {ladiesDressColors.map((color) => (
                <li key={color}>
                  <span className="dresscode__dot" style={{ backgroundColor: color }} aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>

          <div className="dresscode__block">
            <p className="dresscode__heading">{t("details.dressCode.gentlemenHeading")}</p>
            <p className="dresscode__text">{t("details.dressCode.gentlemenBody")}</p>
            <ul className="dresscode__swatches" aria-label={t("details.dressCode.gentlemenHeading")}>
              {gentlemenDressColors.map((color) => (
                <li key={color}>
                  <span className="dresscode__dot" style={{ backgroundColor: color }} aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventDetailsSection;
