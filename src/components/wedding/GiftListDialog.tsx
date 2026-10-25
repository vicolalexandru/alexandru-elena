import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronLeft, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { useTranslation } from "@/i18n/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import {
  giftCategories,
  loadGiftReservations,
  saveGiftReservation,
  type GiftCategory,
  type GiftItem,
} from "@/data/wishlistGifts";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DEFAULT_CATEGORY_ID = "appliances";

const GiftListDialog = ({ open, onOpenChange }: Props) => {
  const { t, language } = useTranslation();
  const { toast } = useToast();
  const [view, setView] = useState<"categories" | "items">("items");
  const [category, setCategory] = useState<GiftCategory | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reservations, setReservations] = useState(loadGiftReservations);

  useEffect(() => {
    if (open) {
      setReservations(loadGiftReservations());
      const defaultCat =
        giftCategories.find((c) => c.id === DEFAULT_CATEGORY_ID) ?? giftCategories[0];
      setCategory(defaultCat);
      setView("items");
      setSelectedId(null);
    }
  }, [open]);

  const availableItems = useMemo(() => {
    if (!category) return [];
    return category.items.filter((item) => !reservations[item.id]);
  }, [category, reservations]);

  const pickLabel = (item: GiftItem) => item.name[language];

  const handleChoose = () => {
    if (!selectedId) return;
    saveGiftReservation(selectedId, "");
    setReservations(loadGiftReservations());
    toast({
      title: t("gifts.claimSuccessTitle"),
      description: t("gifts.claimSuccessDesc"),
    });
    setSelectedId(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-[#3a3530]/55 backdrop-blur-[2px]" />
        <DialogPrimitive.Content
          className={cn(
            "gift-list-dialog fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2",
            "max-h-[min(92vh,780px)] overflow-y-auto rounded-[1.75rem] border-0 bg-[#faf8f5] p-0",
            "shadow-[0_28px_90px_rgba(30,26,22,0.22)]",
            "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
        >
          <DialogTitle className="sr-only">{t("gifts.listTitle")}</DialogTitle>

          <DialogPrimitive.Close
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-white/80 text-foreground/70 transition-colors hover:bg-white hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label={t("gifts.close")}
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </DialogPrimitive.Close>

          {view === "categories" ? (
            <div className="px-8 pb-10 pt-14 text-center">
              <h3 className="section-kicker !text-[clamp(1.125rem,3.5vw,1.65rem)]">
                {t("gifts.categoriesHeading")}
              </h3>
              <p className="section-body mt-4 text-base font-light opacity-90">
                {t("gifts.listIntro")}
              </p>
              <ul className="mt-8 space-y-2 text-left">
                {giftCategories.map((cat) => {
                  const left = cat.items.filter((i) => !reservations[i.id]).length;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setCategory(cat);
                          setView("items");
                          setSelectedId(null);
                        }}
                        className="flex w-full items-center justify-between border-b border-foreground/10 py-4 text-left transition-colors hover:text-primary"
                      >
                        <span className="font-serif text-lg text-foreground">
                          {cat.label[language]}
                        </span>
                        <span className="font-[Raleway,sans-serif] text-xs text-muted-foreground">
                          {left > 0
                            ? t("gifts.itemsAvailable", { n: String(left) })
                            : t("gifts.categoryFull")}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            category && (
              <div className="px-7 pb-12 pt-14 sm:px-9">
                {giftCategories.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setView("categories")}
                    className="mb-2 inline-flex items-center gap-0.5 font-[Raleway,sans-serif] text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    {t("gifts.backToCategories")}
                  </button>
                )}

                <h3 className="section-kicker mx-auto max-w-md text-center !text-[clamp(1.125rem,3.5vw,1.75rem)]">
                  {t("gifts.listTitle")}
                </h3>
                <p className="section-body mx-auto mt-5 max-w-md text-center text-base italic opacity-90">
                  *{t("gifts.listDisclaimer")}*
                </p>

                {availableItems.length === 0 ? (
                  <p className="mt-12 text-center font-[Raleway,sans-serif] text-sm text-muted-foreground">
                    {t("gifts.allClaimed")}
                  </p>
                ) : (
                  <ul className="mt-10 space-y-0">
                    {availableItems.map((item) => (
                      <li
                        key={item.id}
                        className="border-b border-foreground/10 py-[1.15rem] last:border-b-0"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <input
                            type="radio"
                            name="gift-choice"
                            id={`gift-${item.id}`}
                            checked={selectedId === item.id}
                            onChange={() => setSelectedId(item.id)}
                            className="gift-list-radio mt-1.5 shrink-0"
                          />
                          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                            <label
                              htmlFor={`gift-${item.id}`}
                              className="cursor-pointer font-serif text-base leading-snug text-foreground sm:text-[1.05rem]"
                            >
                              {pickLabel(item)}
                            </label>
                            {item.productUrl ? (
                              <a
                                href={item.productUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex shrink-0 items-center gap-0.5 self-start font-[Raleway,sans-serif] text-sm text-[hsl(32_18%_46%)] underline decoration-[hsl(32_18%_46%)]/50 underline-offset-[3px] hover:decoration-[hsl(32_18%_46%)]"
                              >
                                {t("gifts.viewProduct")}
                                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {availableItems.length > 0 && (
                  <div className="mt-12 flex justify-center">
                    <button
                      type="button"
                      disabled={!selectedId}
                      onClick={handleChoose}
                      className="rounded-full border border-[hsl(32_22%_42%)] bg-transparent px-12 py-3.5 font-[Raleway,sans-serif] text-sm tracking-wide text-[hsl(32_22%_42%)] transition-colors hover:bg-[hsl(32_22%_42%)] hover:text-[#faf8f5] disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      {t("gifts.chooseGift")}
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default GiftListDialog;
