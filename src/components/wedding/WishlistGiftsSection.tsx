import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import giftIcon from "@/assets/gift-icon.svg";
import { useTranslation } from "@/i18n/LanguageContext";
import GiftListDialog from "@/components/wedding/GiftListDialog";

const WishlistGiftsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useTranslation();
  const [listOpen, setListOpen] = useState(false);

  return (
    <section
      ref={ref}
      id="gifts"
      aria-labelledby="gifts-heading"
      className="gifts-section px-6 pb-10 pt-6 md:px-12 md:pb-12 md:pt-8"
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

          <div className="section-body mx-auto mt-8 max-w-md space-y-6 font-light">
            <p>{t("gifts.body")}</p>
            <p>{t("gifts.bodyHousehold")}</p>
          </div>

          <button
            type="button"
            onClick={() => setListOpen(true)}
            className="btn-pearl-outline mt-10 px-8 py-3 text-xs uppercase tracking-[0.22em]"
          >
            {t("gifts.openList")}
            <ArrowUpRight className="h-4 w-4" />
          </button>

          <p className="section-body mx-auto mt-10 max-w-lg border-t border-primary/15 pt-8 text-base font-light opacity-90">
            {t("gifts.adultsOnly")}
          </p>
        </motion.div>
      </div>

      <GiftListDialog open={listOpen} onOpenChange={setListOpen} />
    </section>
  );
};

export default WishlistGiftsSection;
