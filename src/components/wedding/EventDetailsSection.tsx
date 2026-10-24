import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, CalendarDays, Map, ArrowRight } from "lucide-react";
import venueImage from "@/assets/lago-hall.jpg";
import { useTranslation } from "@/i18n/LanguageContext";

const dressPalette = [
  { color: "#5C3A2E", labelKey: "details.palette.darkChocolate" },
  { color: "#C4B6A5", labelKey: "details.palette.oatMilk" },
  { color: "#E8D9C4", labelKey: "details.palette.almondBeige" },
  { color: "#C4956A", labelKey: "details.palette.saltedCaramel" },
  { color: "#8B9A68", labelKey: "details.palette.olivePistachio" },
  { color: "#1A1A1A", labelKey: "details.palette.creamyEspresso" },
];

const EventDetailsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  const events = [
    {
      title: t("details.ceremony.title"),
      time: t("details.ceremony.time"),
      description: t("details.ceremony.desc"),
      icon: CalendarDays,
    },
    {
      title: t("details.cocktail.title"),
      time: t("details.cocktail.time"),
      description: t("details.cocktail.desc"),
      icon: Clock,
    },
    {
      title: t("details.reception.title"),
      time: t("details.reception.time"),
      description: t("details.reception.desc"),
      icon: MapPin,
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d3344]/55 via-transparent to-transparent" />
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

        {/* Event Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              className="text-center p-8 bg-card border border-border hover:border-primary transition-colors duration-300"
            >
              <event.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-foreground mb-2">
                {event.title}
              </h3>
              <p className="text-primary font-serif text-xl mb-4">{event.time}</p>
              <p className="text-muted-foreground font-light text-sm leading-relaxed">
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dress Code */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center max-w-4xl mx-auto pt-4"
        >
          <h3 className="font-serif text-4xl md:text-6xl font-normal uppercase tracking-[0.18em] text-foreground mb-8">
            {t("details.dressCode")}
          </h3>
          <p className="font-serif text-lg md:text-2xl leading-relaxed text-foreground max-w-3xl mx-auto">
            {t("details.dressCodeBody")}{" "}
            <strong className="font-semibold">{t("details.dressCodeAvoid")}</strong>
          </p>
          <ul className="mt-12 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-6 sm:gap-x-3 max-w-3xl mx-auto">
            {dressPalette.map((swatch) => (
              <li key={swatch.labelKey}>
                <span
                  className="mx-auto block h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] rounded-full"
                  style={{ backgroundColor: swatch.color }}
                  aria-hidden="true"
                />
                <span className="mt-3 block font-serif text-sm sm:text-base leading-tight text-foreground whitespace-pre-line">
                  {t(swatch.labelKey)}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default EventDetailsSection;
