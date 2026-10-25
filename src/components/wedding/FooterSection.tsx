import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useTranslation();

  return (
    <footer ref={ref} className="section-padding gradient-rose border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-serif text-2xl md:text-3xl text-foreground mb-4 uppercase tracking-[0.22em] font-normal">
            {t("footer.thanks")}
          </p>
          <p className="font-serif text-xl md:text-2xl text-foreground mb-2 leading-relaxed whitespace-pre-line font-light italic">
            {t("footer.message")}
          </p>

          <div className="font-serif text-6xl md:text-8xl text-primary mb-8 italic">
            A <span className="text-muted-foreground">&</span> E
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <span className="h-px w-12 bg-border" />
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span className="h-px w-12 bg-border" />
          </div>

          <div className="space-y-2 text-muted-foreground font-sans text-sm font-light">
            <p>{t("footer.contact")}</p>
            <p className="flex flex-col items-center gap-1 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3 sm:gap-y-1">
              <a
                href="mailto:alexandru.vicol.94@gmail.com"
                className="text-foreground underline-offset-4 hover:text-primary hover:underline transition-colors"
              >
                alexandru.vicol.94@gmail.com
              </a>
              <span className="hidden sm:inline text-border" aria-hidden="true">
                ·
              </span>
              <a
                href="mailto:egorgan@ymail.com"
                className="text-foreground underline-offset-4 hover:text-primary hover:underline transition-colors"
              >
                egorgan@ymail.com
              </a>
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <LanguageToggle />
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
