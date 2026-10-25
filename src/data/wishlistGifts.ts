export type GiftItem = {
  id: string;
  name: { en: string; ro: string };
  productUrl?: string;
};

export type GiftCategory = {
  id: string;
  label: { en: string; ro: string };
  items: GiftItem[];
};

/** Edit categories and items here; reserved items are tracked in localStorage. */
export const giftCategories: GiftCategory[] = [
  {
    id: "appliances",
    label: { en: "Home appliances", ro: "Electrocasnice" },
    items: [
      {
        id: "kettle",
        name: {
          en: "Polaris PWK1765CA kettle",
          ro: "Fierbător Polaris PWK1765CA",
        },
        productUrl: "https://www.emag.ro",
      },
      {
        id: "multicooker",
        name: {
          en: "Polaris PMC0567AD multicooker",
          ro: "Multifierbător Polaris PMC0567AD",
        },
        productUrl: "https://www.emag.ro",
      },
      {
        id: "blender",
        name: {
          en: "Ninja CI100EU hand blender",
          ro: "Blender de mână Ninja CI100EU",
        },
        productUrl: "https://www.emag.ro",
      },
      {
        id: "food-processor",
        name: {
          en: "Bosch MCM42024 food processor",
          ro: "Robot de bucătărie Bosch MCM42024",
        },
        productUrl: "https://www.emag.ro",
      },
      {
        id: "robot-vacuum",
        name: {
          en: "Xiaomi Vacuum S10 robot vacuum",
          ro: "Aspirator robot Xiaomi Vacuum S10",
        },
        productUrl: "https://www.emag.ro",
      },
      {
        id: "coffee",
        name: {
          en: "DeLonghi EC 685.R espresso machine",
          ro: "Espressor DeLonghi EC 685.R",
        },
        productUrl: "https://www.emag.ro",
      },
    ],
  },
  {
    id: "kitchen",
    label: { en: "Kitchen & dining", ro: "Bucătărie & masă" },
    items: [
      {
        id: "wine-glasses",
        name: { en: "Wine glass set", ro: "Set pahare de vin" },
      },
      {
        id: "cookware",
        name: { en: "Cookware set", ro: "Set vase pentru gătit" },
        productUrl: "https://www.emag.ro",
      },
      {
        id: "cutlery",
        name: { en: "Cutlery set", ro: "Set tacâmuri" },
      },
    ],
  },
  {
    id: "home",
    label: { en: "Home & comfort", ro: "Casă & confort" },
    items: [
      {
        id: "bed-linen",
        name: { en: "Bed linen set", ro: "Set lenjerie de pat" },
      },
      {
        id: "towels",
        name: { en: "Towel set", ro: "Set prosoape" },
      },
      {
        id: "decor",
        name: { en: "Decorative object", ro: "Obiect decorativ pentru casă" },
      },
    ],
  },
];

export const GIFT_RESERVATIONS_KEY = "alex-elena-gift-reservations-v1";

export type GiftReservations = Record<string, string>;

export function loadGiftReservations(): GiftReservations {
  try {
    const raw = localStorage.getItem(GIFT_RESERVATIONS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as GiftReservations;
  } catch {
    return {};
  }
}

export function saveGiftReservation(itemId: string, guestName: string): GiftReservations {
  const next = { ...loadGiftReservations(), [itemId]: guestName };
  localStorage.setItem(GIFT_RESERVATIONS_KEY, JSON.stringify(next));
  return next;
}
