import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import giftIcon from "@/assets/gift-icon.svg";
import { useTranslation } from "@/i18n/LanguageContext";

const giftIdeaKeys = [
  "gifts.idea1",
  "gifts.idea2",
  "gifts.idea3",
  "gifts.idea4",
  "gifts.idea5",
  "gifts.idea6",
] as const;

const WishlistGiftsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();

  return (
    <section
      ref={ref}
      id="gifts"
      aria-labelledby="gifts-heading"
      className="gifts-section px-6 pb-8 pt-4 md:px-12 md:pb-10 md:pt-6"
    >
      <div className="mx-auto max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <img
            src={giftIcon}
            alt=""
            className="mx-auto mb-8 h-24 w-24 md:h-28 md:w-28"
          />

          <h2 id="gifts-heading" className="section-kicker">
            {t("gifts.title")}
          </h2>

          <div className="mt-6">
            <p className="dresscode__text">{t("gifts.intro")}</p>
            <ul className="dresscode__list">
              {giftIdeaKeys.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
          </div>

          <p className="dresscode__text mx-auto mt-8 max-w-md border-t border-primary/15 pt-6 opacity-90">
            {t("gifts.adultsOnly")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WishlistGiftsSection;
