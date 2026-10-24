import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/i18n/LanguageContext";

const CHILD_AGE_KEYS = ["under7", "7to12", "over12"] as const;

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby1WlhZ9TqHitSVe7TC7Qj5fnI9MLvhwrj7viJWuh8IW8GsRHd76SyosyrJrWgn9qemaQ/exec";

const RSVPSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attending: "",
    numberOfGuests: "1",
    withChildren: false,
    numberOfChildren: "1",
    childAges: [] as string[],
    essay: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const childCount = formData.attending === "yes" && formData.withChildren
        ? Number(formData.numberOfChildren)
        : 0;
      const ages = formData.childAges.slice(0, childCount);
      const body = new FormData();
      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("phone", formData.phone);
      body.append("attending", formData.attending);
      body.append("numberOfGuests", formData.attending === "yes" ? formData.numberOfGuests : "0");
      body.append("children", String(childCount));
      body.append("child1", ages[0] ?? "");
      body.append("child2", ages[1] ?? "");
      body.append("child3", ages[2] ?? "");
      body.append("essay", formData.essay);
      body.append("timestamp", new Date().toISOString());

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body,
      });

      setSubmitted(true);
      toast({
        title: t("rsvp.successTitle"),
        description: t("rsvp.successDesc"),
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        attending: "",
        numberOfGuests: "1",
        withChildren: false,
        numberOfChildren: "1",
        childAges: [],
        essay: "",
      });
    } catch (error) {
      toast({
        title: t("rsvp.errorTitle"),
        description: t("rsvp.errorDesc"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section ref={ref} id="rsvp" className="py-16 md:py-24 px-6 md:px-12 bg-background">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="decorative-flourish mb-4">✉</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            {t("rsvp.title")}
          </h2>
          <div className="decorative-line mb-6" />
          <p className="text-muted-foreground font-light">
            {t("rsvp.deadline")}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm uppercase tracking-widest text-primary mb-2 font-sans font-semibold"
            >
              {t("rsvp.fullName")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-primary focus:outline-none transition-colors font-sans text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm uppercase tracking-widest text-primary mb-2 font-sans font-semibold"
            >
              {t("rsvp.email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-primary focus:outline-none transition-colors font-sans text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm uppercase tracking-widest text-primary mb-2 font-sans font-semibold"
            >
              {t("rsvp.phone")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-primary focus:outline-none transition-colors font-sans text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm uppercase tracking-widest text-primary mb-4 font-sans font-semibold">
              {t("rsvp.attending")}
            </label>
            <div className="space-y-3">
              <label className="flex items-center p-4 bg-white border border-gray-300 cursor-pointer hover:border-primary transition-colors">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  required
                  checked={formData.attending === "yes"}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary border-gray-300 focus:ring-primary mr-4"
                />
                <span className="text-primary font-sans text-base">{t("rsvp.yes")}</span>
              </label>
              <label className="flex items-center p-4 bg-white border border-gray-300 cursor-pointer hover:border-primary transition-colors">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  required
                  checked={formData.attending === "no"}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary border-gray-300 focus:ring-primary mr-4"
                />
                <span className="text-primary font-sans text-base">{t("rsvp.no")}</span>
              </label>
            </div>
          </div>

          {formData.attending === "yes" && (
            <>
              <div>
                <label
                  htmlFor="numberOfGuests"
                  className="block text-sm uppercase tracking-widest text-primary mb-2 font-sans font-semibold"
                >
                  {t("rsvp.numberOfGuests")}
                </label>
                <select
                  id="numberOfGuests"
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-primary focus:outline-none transition-colors font-sans text-foreground"
                >
                  {[1, 2].map(n => (
                    <option key={n} value={String(n)}>{n}</option>
                  ))}
                </select>
              </div>

              <label className="flex items-center p-4 bg-white border border-gray-300 cursor-pointer hover:border-primary transition-colors">
                <input
                  type="checkbox"
                  name="withChildren"
                  checked={formData.withChildren}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData((prev) => ({
                      ...prev,
                      withChildren: checked,
                      numberOfChildren: "1",
                      childAges: checked ? [""] : [],
                    }));
                  }}
                  className="w-5 h-5 text-primary border-gray-300 focus:ring-primary mr-4"
                />
                <span className="text-primary font-sans text-base">{t("rsvp.withChildren")}</span>
              </label>

              {formData.withChildren && (
                <>
                  <div>
                    <label
                      htmlFor="numberOfChildren"
                      className="block text-sm uppercase tracking-widest text-primary mb-2 font-sans font-semibold"
                    >
                      {t("rsvp.numberOfChildren")}
                    </label>
                    <select
                      id="numberOfChildren"
                      name="numberOfChildren"
                      value={formData.numberOfChildren}
                      onChange={(e) => {
                        const count = Number(e.target.value);
                        setFormData((prev) => ({
                          ...prev,
                          numberOfChildren: e.target.value,
                          childAges: Array.from({ length: count }, (_, i) => prev.childAges[i] ?? ""),
                        }));
                      }}
                      className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-primary focus:outline-none transition-colors font-sans text-foreground"
                    >
                      {[1, 2, 3].map((n) => (
                        <option key={n} value={String(n)}>{n}</option>
                      ))}
                    </select>
                  </div>

                  {formData.childAges.map((age, index) => (
                    <div key={index}>
                      <label
                        htmlFor={`childAge-${index}`}
                        className="block text-sm uppercase tracking-widest text-primary mb-2 font-sans font-semibold"
                      >
                        {t("rsvp.childAge", { n: String(index + 1) })}
                      </label>
                      <select
                        id={`childAge-${index}`}
                        name={`childAge-${index}`}
                        required
                        value={age}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            childAges: prev.childAges.map((current, i) => (i === index ? value : current)),
                          }));
                        }}
                        className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-primary focus:outline-none transition-colors font-sans text-foreground"
                      >
                        <option value="" disabled>{t("rsvp.childAge", { n: String(index + 1) })}</option>
                        {CHILD_AGE_KEYS.map((key) => (
                          <option key={key} value={key}>
                            {t(key === "under7" ? "rsvp.ageUnder7" : key === "7to12" ? "rsvp.age7to12" : "rsvp.ageOver12")}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </>
              )}

            </>
          )}

          <div>
            <label
              htmlFor="essay"
              className="block text-sm uppercase tracking-widest text-primary mb-2 font-sans font-semibold"
            >
              {t("rsvp.messageLabel")} {formData.attending === "no" ? t("rsvp.required") : t("rsvp.optional")}
            </label>
            <textarea
              id="essay"
              name="essay"
              rows={4}
              required={formData.attending === "no"}
              minLength={formData.attending === "no" ? 200 : undefined}
              value={formData.essay}
              onChange={handleChange}
              placeholder={formData.attending === "no" ? t("rsvp.declinePlaceholder") : t("rsvp.messagePlaceholder")}
              className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-primary focus:outline-none transition-colors font-sans text-foreground resize-none"
            />
            {formData.attending === "no" && formData.essay.length > 0 && formData.essay.length < 200 && (
              <p className="text-sm text-muted-foreground mt-1">{formData.essay.length}{t("rsvp.charCount")}</p>
            )}
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting || submitted || !formData.attending}
              className="w-full py-4 bg-primary text-primary-foreground font-sans text-base tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitted ? t("rsvp.successTitle") : isSubmitting ? t("rsvp.submitting") : t("rsvp.submit")}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVPSection;
