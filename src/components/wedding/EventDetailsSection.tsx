import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Map, ArrowRight } from "lucide-react";
import venueImage from "@/assets/lago-hall.jpg";
import guestsIcon from "@/assets/program-icon-guests.svg";
import ceremonyIcon from "@/assets/program-icon-ceremony.svg";
import { useTranslation } from "@/i18n/LanguageContext";

/** Roz pudrat, Lila pudrat, Albastru cer — mai deschis / original / mai închis */
const ladiesDressColors = [
  "#EFD3D9",
  "#EAC9D0",
  "#DEB4BA",
  "#DDD2DF",
  "#D3C8D7",
  "#C8B9CE",
  "#D4E3F3",
  "#C5D9EE",
  "#B4CDE8",
];

const ladiesDressColorRows = [
  ladiesDressColors.slice(0, 3),
  ladiesDressColors.slice(3, 6),
  ladiesDressColors.slice(6, 9),
];

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
    <section
      ref={ref}
      id="details"
      aria-labelledby="details-heading"
      className="moodboard-surface px-6 pb-6 pt-12 md:px-12 md:pb-8 md:pt-16"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center md:mb-10"
        >
          <h2 id="details-heading" className="section-kicker">
            {t("details.title")}
          </h2>
        </motion.div>

        {/* Venue Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10 md:mb-12"
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
                    <span className="text-foreground text-sm font-sans tracking-wide">{t("details.getDirections")}</span>
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
          className="program-timing mb-10 md:mb-12"
        >
          <h3 className="section-kicker program-timing__kicker">{t("details.program.kicker")}</h3>
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
          className="dresscode max-w-xl mx-auto"
        >
          <h3 className="section-kicker dresscode__title">{t("details.dressCode")}</h3>

          <div className="dresscode__block">
            <p className="dresscode__heading">{t("details.dressCode.ladiesHeading")}</p>
            <p className="dresscode__text">{t("details.dressCode.ladiesBody")}</p>
            <div
              className="dresscode__swatches-stack dresscode__swatches-stack--ladies"
              role="group"
              aria-label={t("details.dressCode.ladiesHeading")}
            >
              {ladiesDressColorRows.map((row) => (
                <ul key={row.join("-")} className="dresscode__swatches dresscode__swatches--ladies-row">
                  {row.map((color) => (
                    <li key={color}>
                      <span className="dresscode__dot" style={{ backgroundColor: color }} aria-hidden="true" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
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
