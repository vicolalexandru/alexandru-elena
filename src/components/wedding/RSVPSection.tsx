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
    <section ref={ref} id="rsvp" className="moodboard-surface px-6 pb-16 pt-8 md:px-12 md:pb-24 md:pt-10">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="section-title section-title--rsvp mb-4">
            {t("rsvp.title")}
          </h2>
          <div className="decorative-line mb-6" />
          <p className="section-body font-light opacity-90">
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
              className="form-label"
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
              className="form-field"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="form-label"
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
              className="form-field"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="form-label"
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
              className="form-field"
            />
          </div>

          <div>
            <label className="form-label mb-4">
              {t("rsvp.attending")}
            </label>
            <div className="space-y-3">
              <label className="form-choice">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  required
                  checked={formData.attending === "yes"}
                  onChange={handleChange}
                  className="mr-4 h-5 w-5 border-primary/30 text-primary focus:ring-primary"
                />
                <span className="font-[Raleway,sans-serif] text-base text-foreground">{t("rsvp.yes")}</span>
              </label>
              <label className="form-choice">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  required
                  checked={formData.attending === "no"}
                  onChange={handleChange}
                  className="mr-4 h-5 w-5 border-primary/30 text-primary focus:ring-primary"
                />
                <span className="font-[Raleway,sans-serif] text-base text-foreground">{t("rsvp.no")}</span>
              </label>
            </div>
          </div>

          {formData.attending === "yes" && (
            <>
              <div>
                <label
                  htmlFor="numberOfGuests"
                  className="form-label"
                >
                  {t("rsvp.numberOfGuests")}
                </label>
                <select
                  id="numberOfGuests"
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  className="form-field"
                >
                  {[1, 2].map(n => (
                    <option key={n} value={String(n)}>{n}</option>
                  ))}
                </select>
              </div>

              <label className="form-choice">
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
                  className="mr-4 h-5 w-5 rounded border-primary/30 text-primary focus:ring-primary"
                />
                <span className="font-[Raleway,sans-serif] text-base text-foreground">{t("rsvp.withChildren")}</span>
              </label>

              {formData.withChildren && (
                <>
                  <div>
                    <label
                      htmlFor="numberOfChildren"
                      className="form-label"
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
                      className="form-field"
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
                        className="form-label"
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
                        className="form-field"
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
              className="form-label"
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
              className="form-field resize-none"
            />
            {formData.attending === "no" && formData.essay.length > 0 && formData.essay.length < 200 && (
              <p className="text-sm text-muted-foreground mt-1">{formData.essay.length}{t("rsvp.charCount")}</p>
            )}
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting || submitted || !formData.attending}
              className="btn-pearl w-full py-4 disabled:cursor-not-allowed disabled:opacity-50"
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
