import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "@/i18n/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useTranslation();

  return (
    <footer ref={ref} className="footer-section gradient-rose border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="section-kicker mb-4 !text-[clamp(1.25rem,4vw,1.75rem)]">
            {t("footer.thanks")}
          </p>
          <p className="dresscode__text max-w-lg whitespace-pre-line">
            {t("footer.message")}
          </p>

          <div className="footer-monogram mt-4 mb-8">
            A <span className="text-[hsl(var(--pearl-gold))]">&</span> E
          </div>

          <div className="flex justify-center">
            <LanguageToggle />
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
